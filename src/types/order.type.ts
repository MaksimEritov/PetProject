import { Currency, Price } from "./general.type";
export enum OrderSide {
    Buy = "Buy",
    Sell = "Sell",
}

export enum OrderType {
    Limit = "LIMIT",
    Market = "MARKET",
    LimitMaker = "LIMIT_MAKER",
    StopLoss = "STOP_LOSS",
    StopLossLimit = "STOP_LOSS_LIMIT",
    TakeProfit = "TAKE_PROFIT",
    TakeProfitLimit = "TAKE_PROFIT_LIMIT",
}

export enum OrderStatus {
    NotPlaced = "NotPlaced",
    Open = "Open",
    Closed = "Closed",
    Cancelled = "Cancelled",
    Failed = "Failed",
    PartiallyFilled = "PartiallyFilled",
}

export type Order = {
    baseCurrency: Currency;
    filledPercent: number;
    filledPrice: number;
    filledQuantity: number;
    id: string;
    marketCurrency: Currency;
    orderPrice: Price;
    orderSide: OrderSide;
    orderSize: number;
    orderType: OrderType;
    quantity: number;
    quantityRemaining: number;
    status: OrderStatus;
    commissionInBaseCurrency: Price;
    commissionInMarketCurrency: Price;
    margin?: number;
};

export type PlaceOrderArgs = Omit<
    Order,
    | "filledQuantity"
    | "filledPercent"
    | "filledPrice"
    | "status"
    | "id"
    | "quantityRemaining"
    | "commissionInMarketCurrency"
    | "commissionInBaseCurrency"
>;

export type OpenOrder = Omit<
    Order,
    | "filledQuantity"
    | "filledPercent"
    | "filledPrice"
    | "quantityRemaining"
    | "commissionInMarketCurrency"
    | "commissionInBaseCurrency"
>;

export type Trade = {
    baseCurrency: Currency;
    marketCurrency: Currency;
    side: OrderSide;
    quantity: number;
    price: Price;
    orderPrice: Price;
    orderId?: Order["id"];
    commissionInBaseCurrency: Price;
    commissionInMarketCurrency: Price;
    margin?: number;
};
