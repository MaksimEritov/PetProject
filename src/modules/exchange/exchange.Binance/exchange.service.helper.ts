import { Currency } from "src/types/general.type";

import { Order, OrderSide, OrderStatus, OrderType } from "../../../types/order.type";
import { BinanceOrder } from "./exchange.service.types";

export const mapBinanceOrderStatus = (status: BinanceOrder["status"]): OrderStatus => {
    switch (status) {
        case "NEW":
            return OrderStatus.Open;
        case "PARTIALLY_FILLED":
            return OrderStatus.PartiallyFilled;
        case "FILLED":
            return OrderStatus.Closed;
        case "CANCELED":
            return OrderStatus.Cancelled;
        case "PENDING_CANCEL":
            return OrderStatus.Cancelled;
        case "REJECTED":
            return OrderStatus.Failed;
        case "EXPIRED":
            return OrderStatus.Cancelled;
        case "EXPIRED_IN_MATCH":
            return OrderStatus.Cancelled;
    }
};

export const mapBinanceOrder = (
    binanceOrder: BinanceOrder,
    baseCurrency: Currency,
    marketCurrency: Currency
): Order => {
    const order: Partial<Order> = {
        id: `${binanceOrder.orderId}`,
        baseCurrency,
        marketCurrency,
        orderSide: binanceOrder.side === "BUY" ? OrderSide.Buy : OrderSide.Sell,
        orderType: binanceOrder.type as OrderType,
        status: mapBinanceOrderStatus(binanceOrder.status),
        orderPrice: parseFloat(binanceOrder.price),
        quantity: parseFloat(binanceOrder.origQty),
    };
    if (binanceOrder.executedQty) {
        order.quantityRemaining = order.quantity && order.quantity - parseFloat(binanceOrder.executedQty);
        order.filledQuantity = parseFloat(binanceOrder.executedQty);
        order.filledPercent = order.quantity && order.filledQuantity / order.quantity;
        order.orderSize = order.orderPrice && order.orderPrice * order.filledQuantity;
    }
    if (binanceOrder.cummulativeQuoteQty) {
        order.filledPrice = parseFloat(binanceOrder.cummulativeQuoteQty);
    }
    return order as Order;
};
