import { Balance, Currency, CurrencyPair, Price } from "../types/general.type";
import { Order, PlaceOrderArgs, Trade } from "../types/order.type";

export const Exchange = "Exchange";

export interface IExchange {
    init(): void;

    getBalance(currency: Currency): Promise<Balance>;

    getAllBalances(): Promise<Record<Currency, Balance>>;

    getAllPrices(): Promise<Record<CurrencyPair, Price> | undefined>;

    getCurrentPrice(currency: CurrencyPair): Promise<Price>;

    placeOrder(order: PlaceOrderArgs): Promise<Order["id"]>;

    getOrder(baseCurrency: Currency, marketCurrency: Currency, id: Order["id"]): Promise<Order | null>;

    cancelOrder(baseCurrency: Currency, marketCurrency: Currency, id: Order["id"]): Promise<void>;

    getTrades(): Promise<Trade[]>;
}
