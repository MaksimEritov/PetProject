import BalanceChangedEvent from "./balanceChanged.event";
import OrderCancelledEvent from "./orderCancelled.event";
import OrderFailedEvent from "./orderFailed.event";
import OrderFilledEvent from "./orderFilled.event";
import OrderPartiallyFilledEvent from "./orderPartiallyFilled.event";
import OrderPlacedEvent from "./orderPlaced.event";
import PriceChangeDirection from "./priceChangeDirection.event";
import PriceTickEvent from "./priceTick.event";
import TrendChangeDirection from "./trendChangeDirection.event";
import TrendCrossedEvent from "./trendCrossed.event";

export {
    BalanceChangedEvent,
    OrderCancelledEvent,
    OrderFailedEvent,
    OrderFilledEvent,
    OrderPartiallyFilledEvent,
    OrderPlacedEvent,
    PriceChangeDirection,
    PriceTickEvent,
    TrendCrossedEvent,
    TrendChangeDirection,
};

export type EventsPayload =
    | BalanceChangedEvent
    | OrderCancelledEvent
    | OrderFailedEvent
    | OrderFilledEvent
    | OrderPartiallyFilledEvent
    | OrderPlacedEvent
    | PriceChangeDirection
    | PriceTickEvent
    | TrendChangeDirection
    | TrendCrossedEvent;
