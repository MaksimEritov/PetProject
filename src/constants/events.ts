const enum Events {
    balanceChanged = "balanceChanged",
    orderCancelled = "orderCancelled",
    orderFailed = "orderFailed",
    orderFilled = "orderFilled",
    orderPartiallyFilled = "orderPartiallyFilled",
    orderPlaced = "orderPlaced",
    priceChangeDirection = "priceChangeDirection",
    priceTick = "priceTick",
    priceTickHandled = "priceTickHandled",
    stop = "stop",
    trendChangeDirection = "trendChangeDirection",
    trendCrossed = "trendCrossed",
}

export default Events;
