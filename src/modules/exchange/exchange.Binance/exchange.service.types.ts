import { OrderStatus, OrderType } from "@binance/connector";

export type BinanceOrder = {
    symbol: string;
    orderId: number;
    orderListId: number;
    clientOrderId: string;
    price: string;
    origQty: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    status: OrderStatus;
    timeInForce: string;
    type: OrderType;
    side: "BUY" | "SELL";
    stopPrice: string;
    icebergQty: string;
    time: number;
    updateTime: number;
    isWorking: true;
    workingTime: number;
    origQuoteOrderQty: string;
    selfTradePreventionMode: string;
};
