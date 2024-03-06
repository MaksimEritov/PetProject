import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import ExchangeBinance from "./exchange.Binance/exchange.service";

import { Exchange, IExchange } from "../../interfaces/exchange.interface";

const exchangeServiceProvider = {
    inject: [ConfigService],
    provide: Exchange,
    useFactory: async (configService: ConfigService): Promise<IExchange> => {
        const useExchangeBinance = configService.get<string>("USE_EXCHANGE_BINANCE") === "true";
        let exchange: IExchange;

        if (useExchangeBinance) {
            exchange = new ExchangeBinance(configService);
            await exchange.init();
            return exchange;
        }

        return {
            init: () => {
                return Promise.resolve();
            },
            getBalance: (currency: string) => {
                console.log("getBalance", currency);
                return Promise.resolve(0);
            },
            getAllBalances: () => {
                return Promise.resolve({});
            },
            getAllPrices: () => {
                return Promise.resolve({});
            },
            placeOrder: (order: any) => {
                console.log("placeOrder", order);
                return Promise.resolve("");
            },
            getOrder: (baseCurrency: string, marketCurrency: string, id: string) => {
                console.log("getOrder", id);
                return Promise.resolve(null);
            },
            getCurrentPrice(currency: string) {
                console.log("getCurrentPrice", currency);
                return Promise.resolve(0);
            },
            cancelOrder(id: string) {
                console.log("cancelOrder", id);
                return Promise.resolve();
            },
            getTrades() {
                return Promise.resolve([]);
            },
        };
    },
};

@Module({
    imports: [],
    providers: [exchangeServiceProvider],
    exports: [Exchange],
})
export class ExchangeModule {}
