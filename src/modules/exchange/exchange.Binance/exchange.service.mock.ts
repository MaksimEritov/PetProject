export const configServiceMock = {
    get: jest.fn().mockImplementation((key: string) => {
        if (key === "BINANCE_API") {
            return "https://testnet.binance.vision";
        }
        if (key === "BINANCE_API_KEY") {
            return "KEY";
        }
        if (key === "BINANCE_API_SECRET") {
            return "SECRET";
        }
    }),
};

export const spotBinanceMock = {
    account: jest.fn().mockImplementation(() => ({
        data: {
            makerCommission: 10,
            takerCommission: 10,
            buyerCommission: 0,
            sellerCommission: 0,
            commissionRates: {
                maker: "0.00100000",
                taker: "0.00100000",
                buyer: "0.00000000",
                seller: "0.00000000",
            },
            canTrade: true,
            canWithdraw: true,
            canDeposit: true,
            brokered: false,
            requireSelfTradePrevention: false,
            updateTime: 1684468897636,
            accountType: "SPOT",
            permissions: ["SPOT"],
            balances: [
                { asset: "xxx", free: "1100", locked: "100" },
                { asset: "zzzz", free: "0.2", locked: "0.1" },
            ],
        },
    })),
    allOrders: jest.fn().mockImplementation((symbol: string, options?: { orderId: string }) => {
        return {
            data: [
                {
                    symbol,
                    orderId: options?.orderId || 1,
                    orderListId: -1,
                    clientOrderId: "1",
                    price: "2737.00000000",
                    origQty: "0.80110000",
                    executedQty: "0.80110000",
                    cummulativeQuoteQty: "2192.61070000",
                    status: "FILLED",
                    timeInForce: "GTC",
                    type: "LIMIT",
                    side: "BUY",
                    stopPrice: "0.00000000",
                    icebergQty: "0.00000000",
                    time: 1645426219380,
                    updateTime: 1645426302322,
                    isWorking: true,
                    workingTime: 1645426219380,
                    origQuoteOrderQty: "0.00000000",
                    selfTradePreventionMode: "NONE",
                },
                {
                    symbol,
                    orderId: options?.orderId || 2,
                    orderListId: -1,
                    clientOrderId: "2",
                    price: "2902.00000000",
                    origQty: "0.80020000",
                    executedQty: "0.80020000",
                    cummulativeQuoteQty: "2322.97259800",
                    status: "FILLED",
                    timeInForce: "GTC",
                    type: "LIMIT",
                    side: "SELL",
                    stopPrice: "0.00000000",
                    icebergQty: "0.00000000",
                    time: 1646281470118,
                    updateTime: 1646281470118,
                    isWorking: true,
                    workingTime: 1646281470118,
                    origQuoteOrderQty: "0.00000000",
                    selfTradePreventionMode: "NONE",
                },
            ],
        };
    }),
    bookTicker: jest.fn().mockImplementation((symbol: string) => {
        const response = [
            {
                symbol: "xxxzzzz",
                bidPrice: "0.10000000",
                bidQty: "1.94000000",
                askPrice: "305.10000000",
                askQty: "2.30000000",
            },
            {
                symbol: "BNBBUSD",
                bidPrice: "305.00000000",
                bidQty: "1.94000000",
                askPrice: "305.10000000",
                askQty: "2.30000000",
            },
            {
                symbol: "BTCBUSD",
                bidPrice: "26285.52000000",
                bidQty: "0.02168500",
                askPrice: "26286.47000000",
                askQty: "0.00115500",
            },
            {
                symbol: "ETHBUSD",
                bidPrice: "1785.77000000",
                bidQty: "0.29680000",
                askPrice: "1786.35000000",
                askQty: "0.14012000",
            },
            {
                symbol: "LTCBUSD",
                bidPrice: "85.69000000",
                bidQty: "9.45187000",
                askPrice: "85.71000000",
                askQty: "6.88368000",
            },
            {
                symbol: "TRXBUSD",
                bidPrice: "0.07691000",
                bidQty: "4420.80000000",
                askPrice: "0.07692000",
                askQty: "11180.50000000",
            },
            {
                symbol: "XRPBUSD",
                bidPrice: "0.44980000",
                bidQty: "266.80000000",
                askPrice: "0.44990000",
                askQty: "1933.80000000",
            },
            {
                symbol: "BNBUSDT",
                bidPrice: "304.90000000",
                bidQty: "6.04000000",
                askPrice: "305.00000000",
                askQty: "8.99000000",
            },
            {
                symbol: "BTCUSDT",
                bidPrice: "26285.69000000",
                bidQty: "0.08430200",
                askPrice: "26285.70000000",
                askQty: "0.07989200",
            },
            {
                symbol: "ETHUSDT",
                bidPrice: "1773.35000000",
                bidQty: "0.02000000",
                askPrice: "1786.42000000",
                askQty: "0.36386000",
            },
            {
                symbol: "LTCUSDT",
                bidPrice: "85.67000000",
                bidQty: "6.06902000",
                askPrice: "85.69000000",
                askQty: "11.31988000",
            },
            {
                symbol: "TRXUSDT",
                bidPrice: "0.07689000",
                bidQty: "1428.60000000",
                askPrice: "0.07691000",
                askQty: "12352.10000000",
            },
            {
                symbol: "XRPUSDT",
                bidPrice: "0.44970000",
                bidQty: "256.00000000",
                askPrice: "0.44980000",
                askQty: "1778.60000000",
            },
            {
                symbol: "BNBBTC",
                bidPrice: "0.01160100",
                bidQty: "0.62000000",
                askPrice: "0.01160400",
                askQty: "0.48000000",
            },
            {
                symbol: "ETHBTC",
                bidPrice: "0.06796000",
                bidQty: "0.01472000",
                askPrice: "0.06797000",
                askQty: "0.13536000",
            },
            {
                symbol: "LTCBTC",
                bidPrice: "0.00325900",
                bidQty: "1.81038000",
                askPrice: "0.00326000",
                askQty: "2.54602000",
            },
            {
                symbol: "TRXBTC",
                bidPrice: "0.00000292",
                bidQty: "645.40000000",
                askPrice: "0.00000293",
                askQty: "2047.80000000",
            },
            {
                symbol: "XRPBTC",
                bidPrice: "0.00001708",
                bidQty: "521.10000000",
                askPrice: "0.00001712",
                askQty: "368.00000000",
            },
            {
                symbol: "LTCBNB",
                bidPrice: "0.28090000",
                bidQty: "24.20791000",
                askPrice: "0.28110000",
                askQty: "27.74814000",
            },
            {
                symbol: "TRXBNB",
                bidPrice: "0.00025210",
                bidQty: "13090.10000000",
                askPrice: "0.00025220",
                askQty: "38858.10000000",
            },
            {
                symbol: "XRPBNB",
                bidPrice: "0.00147300",
                bidQty: "5295.40000000",
                askPrice: "0.00147600",
                askQty: "68.40000000",
            },
        ];
        if (symbol) {
            const symbolPriceResponse = response.find((item) => item.symbol === symbol);
            if (!symbolPriceResponse) {
                throw new Error("Symbol not found");
            }
            return { data: symbolPriceResponse };
        }
        return { data: response };
    }),
    cancelOrder: jest.fn(),
    newOrder: jest.fn().mockResolvedValue({
        data: {
            symbol: "xxxzzzz",
            orderId: 1,
            orderListId: 10, //Unless OCO, value will be -1
            clientOrderId: "1",
            transactTime: 1000,
            price: 10,
            origQty: 1,
            executedQty: 1,
            cummulativeQuoteQty: 1,
            status: "FILLED",
            timeInForce: "GTC",
            type: "LIMIT",
            side: "BUY",
            workingTime: 100,
            selfTradePreventionMode: "DECREMENT_AND_CANCEL",
            fills: [
                {
                    price: "9",
                    qty: "0.5",
                    commission: "1",
                    commissionAsset: "1",
                    tradeId: 100,
                },
                {
                    price: "9.5",
                    qty: "0.5",
                    commission: "0.5",
                    commissionAsset: "0.5",
                    tradeId: 110,
                },
            ],
        },
    }),
};

export const binanceCommunicatorMock = {
    Spot: jest.fn().mockImplementation(() => spotBinanceMock),
};

export const finalTrades = [
    {
        baseCurrency: "zzzz",
        marketCurrency: "yyy",
        side: "Buy",
        quantity: 0.5,
        price: 9,
        orderPrice: 10,
        orderId: "1",
        commissionInBaseCurrency: 1,
        commissionInMarketCurrency: 9,
    },
    {
        baseCurrency: "zzzz",
        marketCurrency: "yyy",
        side: "Buy",
        quantity: 0.5,
        price: 9.5,
        orderPrice: 10,
        orderId: "1",
        commissionInBaseCurrency: 0.5,
        commissionInMarketCurrency: 4.75,
    },
];
