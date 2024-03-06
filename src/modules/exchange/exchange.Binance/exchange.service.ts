import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IExchange } from "src/interfaces/exchange.interface";

import { Balance, Currency, CurrencyPair, Price } from "../../../types/general.type";
import { Order, OrderSide, PlaceOrderArgs, Trade } from "../../../types/order.type";
import { mapBinanceOrder } from "./exchange.service.helper";

import { Spot } from "@binance/connector";

type BinanceApi =
    | "https://api1.binance.com"
    | "https://api2.binance.com"
    | "https://api3.binance.com"
    | "https://testnet.binance.vision";

enum TimeInForce {
    GTC = "GTC", // Good Till Cancel.
    IOC = "IOC", // Immediate or Cancel.
    FOK = "FOK", // Fill or Kill.
    DAY = "DAY", // Good Till Date.
    GTX = "GTX", // Good Till Crossing (Post Only).
}

const UNKNOWN_ORDER_CODE = -2011;
const UNKNOWN_ORDER_MSG = "Unknown order sent.";

@Injectable()
export default class ExchangeBinance implements IExchange {
    private readonly spotClient: Spot;
    private logger = new Logger(ExchangeBinance.name);
    private trades: Trade[] = [];
    constructor(configService: ConfigService) {
        const api = configService.get<BinanceApi>("BINANCE_API");
        const apiKey = configService.get<string>("BINANCE_API_KEY");
        const apiSecret = configService.get<string>("BINANCE_API_SECRET");
        if (!api || !apiKey || !apiSecret) {
            throw new Error("Binance API key or secret not found in .env file");
        }
        this.spotClient = new Spot(apiKey, apiSecret, {
            baseUrl: api,
        });
    }

    init(): void {
        this.logger.log("Binance exchange initialized");
    }

    private async getAccountData() {
        try {
            const { data } = await this.spotClient.account();
            return data;
        } catch (error) {
            this.logger.error(
                `BinanceExchangeError on getAccountData: ${error.request?.data ?? error}, URL: ${
                    error.config?.url || "N/A"
                }`
            );
            throw error;
        }
    }

    async getAllBalances(): Promise<Record<Currency, Balance>> {
        try {
            const { balances } = await this.getAccountData();
            return balances.reduce((balancesAcc, { asset, free, locked }) => {
                const actualBalance = Number((Number(free) - Number(locked)).toFixed(8));
                if (actualBalance > 0) {
                    balancesAcc[asset] = actualBalance;
                }
                return balancesAcc;
            }, {} as Record<Currency, Balance>);
        } catch (error) {
            this.logger.error(
                `BinanceExchangeError on getAllBanaces: ${error.request?.data ?? error}, URL: ${
                    error.config?.url || "N/A"
                }`
            );
            throw error;
        }
    }

    async getBalance(currency: Currency): Promise<Balance> {
        try {
            const balances = await this.getAllBalances();
            return balances[currency] || 0;
        } catch (error) {
            this.logger.error(
                `BinanceExchangeError on getBalance: ${error.request?.data ?? error}, URL: ${
                    error.config?.url || "N/A"
                }`
            );
            throw error;
        }
    }

    async getAllPrices(): Promise<Record<CurrencyPair, Price> | undefined> {
        try {
            const { data } = await this.spotClient.bookTicker();
            if (!Array.isArray(data)) {
                throw new Error("Unexpected response from Binance");
            }
            return data.reduce((pricesAcc, { symbol, bidPrice }) => {
                pricesAcc[symbol] = Number(bidPrice);
                return pricesAcc;
            }, {} as Record<Currency, Price>);
        } catch (error) {
            this.logger.error(
                `BinanceExchangeError on getAllPrices: ${error.request?.data ?? error}, URL: ${
                    error.config?.url || "N/A"
                }`
            );
            return;
        }
    }

    async getCurrentPrice(currency: CurrencyPair): Promise<Price> {
        try {
            const { data } = await this.spotClient.bookTicker(currency);
            if (Array.isArray(data)) {
                throw new Error("Unexpected response from Binance");
            }
            return Number(data.bidPrice);
        } catch (error) {
            this.logger.error(
                `BinanceExchangeError on getCurrentPrice: ${error.request?.data ?? error}, URL: ${
                    error.config?.url || "N/A"
                }`
            );
            throw error;
        }
    }

    async placeOrder(order: PlaceOrderArgs) {
        try {
            const { data: orderBinance } = await this.spotClient.newOrder(
                `${order.marketCurrency}${order.baseCurrency}`,
                order.orderSide === OrderSide.Buy ? "BUY" : "SELL",
                order.orderType,
                {
                    quantity: order.quantity,
                    price: order.orderPrice,
                    timeInForce: TimeInForce.GTC,
                }
            );

            console.log(
                `Binance Order Request - Pair: ${order.marketCurrency}${order.baseCurrency}, Side: ${
                    order.orderSide === OrderSide.Buy ? "BUY" : "SELL"
                }`
            );
            console.log(`Binance Order Response - `, orderBinance);

            if (orderBinance.fills?.length > 0) {
                const trades: Trade[] = orderBinance.fills.map((fill) => ({
                    baseCurrency: order.baseCurrency,
                    marketCurrency: order.marketCurrency,
                    side: order.orderSide,
                    quantity: parseFloat(fill.qty),
                    price: parseFloat(fill.price),
                    orderPrice: order.orderPrice,
                    orderId: `${orderBinance.orderId}`,
                    commissionInBaseCurrency: parseFloat(fill.commission),
                    commissionInMarketCurrency: parseFloat(fill.commission) * parseFloat(fill.price),
                }));
                this.trades = [...this.trades, ...trades];
            } else {
                this.trades.push({
                    baseCurrency: order.baseCurrency,
                    marketCurrency: order.marketCurrency,
                    side: order.orderSide,
                    quantity: parseFloat(orderBinance.executedQty),
                    price: parseFloat(orderBinance.price),
                    orderPrice: order.orderPrice,
                    orderId: `${orderBinance.orderId}`,
                    commissionInBaseCurrency: 0,
                    commissionInMarketCurrency: 0,
                });
            }
            return `${orderBinance.orderId}`;
        } catch (error) {
            this.logger.error(
                `BinanceExchangeError on placeOrder: ${error.request?.data ?? error}, URL: ${
                    error.config?.url || "N/A"
                }`
            );
            throw error;
        }
    }

    async getOrder(baseCurrency: Currency, marketCurrency: Currency, id: Order["id"]): Promise<Order | null> {
        try {
            const { data: orderFromBinance } = await this.spotClient.allOrders(`${marketCurrency}${baseCurrency}`, {
                orderId: Number(id),
            });
            const orderBinance = orderFromBinance.find((order) => order.orderId === Number(id));
            return orderBinance ? mapBinanceOrder(orderBinance, baseCurrency, marketCurrency) : null;
        } catch (error) {
            this.logger.error(
                `BinanceExchangeError on getOrder: ${error.request?.data ?? error}, URL: ${error.config?.url || "N/A"}`
            );
            throw error;
        }
    }

    async cancelOrder(baseCurrency: Currency, marketCurrency: Currency, id: string) {
        try {
            await this.spotClient.cancelOrder(`${marketCurrency}${baseCurrency}`, {
                orderId: Number(id),
            });
        } catch (error) {
            const response = error?.response?.data;
            if (response?.code === UNKNOWN_ORDER_CODE && response?.msg === UNKNOWN_ORDER_MSG) {
                return;
            }
            this.logger.error(
                `BinanceExchangeError on cancel: ${error.request?.data ?? error}, URL: ${error.config?.url || "N/A"}`
            );
            throw error;
        }
    }

    async getTrades() {
        return this.trades;
    }
}
