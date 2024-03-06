declare module "@binance/connector" {
    export type OrderType =
        | "LIMIT"
        | "MARKET"
        | "LIMIT_MAKER"
        | "STOP_LOSS"
        | "STOP_LOSS_LIMIT"
        | "TAKE_PROFIT"
        | "TAKE_PROFIT_LIMIT";

    export type OrderStatus =
        | "NEW"
        | "PARTIALLY_FILLED"
        | "FILLED"
        | "CANCELED"
        | "PENDING_CANCEL"
        | "REJECTED"
        | "EXPIRED"
        | "EXPIRED_IN_MATCH";

    export enum TimeInForce {
        GTC = "GTC", // Good Till Cancel.
        IOC = "IOC", // Immediate or Cancel.
        FOK = "FOK", // Fill or Kill.
        DAY = "DAY", // Good Till Date.
        GTX = "GTX", // Good Till Crossing (Post Only).
    }

    export type OrderSide = "BUY" | "SELL";

    export class Spot {
        constructor(
            apiKey: string,
            apiSecret: string,
            options?: {
                privateKey?: string;
                privateKeyPassphrase?: string;
                privateKeyAlgo?: string;
                baseUrl?:
                    | "https://api1.binance.com"
                    | "https://api2.binance.com"
                    | "https://api3.binance.com"
                    | "https://testnet.binance.vision";
                recvWindow?: number;
                timeout?: number;
                wsURL?: string;
            }
        );
        account(): Promise<{
            data: {
                makerCommission: number;
                takerCommission: number;
                buyerCommission: number;
                sellerCommission: number;
                commissionRates: {
                    maker: string;
                    taker: string;
                    buyer: string;
                    seller: string;
                };
                canTrade: boolean;
                canWithdraw: boolean;
                canDeposit: boolean;
                brokered: boolean;
                requireSelfTradePrevention: boolean;
                updateTime: number;
                accountType: "SPOT";
                balances: [{ asset: string; free: string; locked: string }];
                permissions: ["SPOT"];
            };
        }>;

        bookTicker<T>(arg?: string): T extends undefined
            ? Promise<{
                  data: {
                      symbol: string;
                      bidPrice: string;
                      bidQty: string;
                      askPrice: string;
                      askQty: string;
                  }[];
              }>
            : Promise<{
                  data: {
                      symbol: string;
                      bidPrice: string;
                      bidQty: string;
                      askPrice: string;
                      askQty: string;
                  };
              }>;

        newOrder(
            symbol: string,
            side: OrderSide,
            type: OrderType,
            options: {
                quantity: number;
                quoteOrderQty?: number;
                price: number;
                newClientOrderId?: string;
                stopPrice?: number;
                icebergQty?: number;
                newOrderRespType?: string;
                timeInForce: string;
                strategyId?: number;
                strategytype?: number;
                trailingDelta?: number;
                recvWindow?: number;
            }
        ): Promise<{
            data: {
                symbol: string;
                orderId: number;
                orderListId: number; //Unless OCO, value will be -1
                clientOrderId: string;
                transactTime: number;
                price: string;
                origQty: string;
                executedQty: string;
                cummulativeQuoteQty: string;
                status: OrderStatus;
                timeInForce: TimeInForce;
                type: OrderType;
                side: OrderSide;
                workingTime: number;
                selfTradePreventionMode: string;
                fills: {
                    price: string;
                    qty: string;
                    commission: string;
                    commissionAsset: string;
                    tradeId: number;
                }[];
            };
        }>;

        openOrders(options?: { symbol?: string; recvWindow?: number }): Promise<{
            data: {
                symbol: string;
                orderId: number;
                orderListId: number;
                clientOrderId: string;
                price: string;
                origQty: string;
                executedQty: string;
                cummulativeQuoteQty: string;
                status: OrderStatus;
                timeInForce: TimeInForce;
                type: OrderType;
                side: OrderSide;
                stopPrice: string;
                icebergQty: string;
                time: number;
                updateTime: number;
                isWorking: true;
                workingTime: number;
                origQuoteOrderQty: string;
                selfTradePreventionMode: string;
            }[];
        }>;

        allOrders(
            simbol: string,
            options?: { orderId?: number; startTime?: number; endTime?: number; limit?: number; recvWindow?: string }
        ): Promise<{
            data: {
                symbol: string;
                orderId: number;
                orderListId: number;
                clientOrderId: string;
                price: string;
                origQty: string;
                executedQty: string;
                cummulativeQuoteQty: string;
                status: OrderStatus;
                timeInForce: TimeInForce;
                type: OrderType;
                side: OrderSide;
                stopPrice: string;
                icebergQty: string;
                time: number;
                updateTime: number;
                isWorking: true;
                workingTime: number;
                origQuoteOrderQty: string;
                selfTradePreventionMode: string;
            }[];
        }>;

        cancelOrder(
            symbol: string,
            options: { orderId?: number; origClientOrderId?: string; newClientOrderId?: string; recvWindow?: number }
        ): Promise<{
            data: {
                symbol: string;
                origClientOrderId: string;
                orderId: number;
                orderListId: string;
                clientOrderId: string;
                price: string;
                origQty: string;
                executedQty: string;
                cummulativeQuoteQty: string;
                status: OrderStatus;
                timeInForce: TimeInForce;
                type: OrderType;
                side: OrderSide;
                selfTradePreventionMode: string;
            };
        }>;

        newMarginOrder(
            symbol: string,
            side: OrderSide,
            type: OrderType,
            options: {
                isIsolated?: boolean;
                quantity: number;
                quoteOrderQty?: number;
                price: number;
                newClientOrderId?: string;
                stopPrice?: number;
                icebergQty?: number;
                newOrderRespType?: string;
                timeInForce: string;
                recvWindow?: number;
                sideEffectType?: "NO_SIDE_EFFECT" | "MARGIN_BUY" | "AUTO_REPAY";
            }
        ): Promise<{
            data: {
                symbol: string;
                orderId: number;
                clientOrderId: string;
                transactTime: number;
                price: string;
                origQty: string;
                executedQty: string;
                cummulativeQuoteQty: string;
                status: OrderStatus;
                timeInForce: TimeInForce;
                isIsolated: boolean;
                type: OrderType;
                side: OrderSide;
                selfTradePreventionMode: string;
                fills: {
                    price: string;
                    qty: string;
                    commission: string;
                    commissionAsset: string;
                    tradeId: number;
                }[];
            };
        }>;

        cancelMarginOrder(
            symbol: string,
            options: {
                isIsolated?: boolean;
                orderId: number;
                origClientOrderId?: string;
                newClientOrderId?: string;
                recvWindow?: number;
            }
        ): Promise<{
            data: {
                symbol: string;
                isIsolated: boolean;
                orderId: number;
                origClientOrderId?: string;
                clientOrderId: string;
                price: string;
                origQty: string;
                executedQty: string;
                cummulativeQuoteQty: string;
                status: OrderStatus;
                timeInForce: TimeInForce;
                type: OrderType;
                side: OrderSide;
                fills: {
                    price: string;
                    qty: string;
                    commission: string;
                    commissionAsset: string;
                    tradeId: number;
                }[];
            };
        }>;

        /**
         * Margin Account Cancel all Open Orders on a Symbol (TRADE)<br>
         *
         * DELETE /sapi/v1/margin/openOrders<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-account-cancel-all-open-orders-on-a-symbol-trade}
         *
         * @param {string} symbol
         * @param {object} [options]
         * @param {string} [options.isIsolated] - TRUE or FALSE, default "FALSE"
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        cancelAllOpenMarginOrder(
            symbol: string,
            options: {
                isIsolated?: boolean;
                recvWindow?: number;
            }
        ): Promise<{
            data: {
                symbol: string;
                isIsolated: boolean;
                orderId: number;
                origClientOrderId?: string;
                clientOrderId: string;
                price: string;
                origQty: string;
                executedQty: string;
                cummulativeQuoteQty: string;
                status: OrderStatus;
                timeInForce: TimeInForce;
                type: OrderType;
                side: OrderSide;
                fills: {
                    price: string;
                    qty: string;
                    commission: string;
                    commissionAsset: string;
                    tradeId: number;
                }[];
            }[];
        }>;

        logger: {
            log: (data: any) => void;
            error: (error: any) => void;
        };
    }
}
