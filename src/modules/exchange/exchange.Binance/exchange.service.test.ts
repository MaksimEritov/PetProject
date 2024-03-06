import { binanceCommunicatorMock, configServiceMock, finalTrades, spotBinanceMock } from "./exchange.service.mock";
import { ConfigService } from "@nestjs/config";

import ExchangeBinance from "./exchange.service";

import { OrderSide, OrderType, PlaceOrderArgs } from "../../../types/order.type";

jest.mock("@binance/connector", () => binanceCommunicatorMock);

describe("ExchangeBinance", () => {
    let service: ExchangeBinance;
    it("should throw error if the API key or secret is not found in .env file", () => {
        expect(() => new ExchangeBinance({ get: jest.fn().mockReturnValue(undefined) } as any)).toThrowError(
            "Binance API key or secret not found in .env file"
        );
    });

    beforeEach(() => {
        service = new ExchangeBinance(configServiceMock as unknown as ConfigService);
    });

    describe("getAllBalances", () => {
        it("should return account not nullable account balance", async () => {
            const balances = await service.getAllBalances();
            expect(balances).toMatchObject({ xxx: 1000, zzzz: 0.1 });
        });

        it("should throw an error if the getAccountData method throws an error", async () => {
            spotBinanceMock.account.mockRejectedValueOnce(new Error("test error"));
            await expect(service.getAllBalances()).rejects.toThrowError("test error");
        });
    });

    describe("getBalance", () => {
        it("should return the balance of the given currency", async () => {
            const balance = await service.getBalance("xxx");
            expect(balance).toBe(1000);
        });
        it("should throw an error if the getAccountData method throws an error", async () => {
            spotBinanceMock.account.mockRejectedValueOnce(new Error("test error"));
            await expect(service.getBalance("xxx")).rejects.toThrowError("test error");
        });
        it("should return 0 if the given currency is not found", async () => {
            const balance = await service.getBalance("yyy");
            expect(balance).toBe(0);
        });
    });

    describe("getAllPrices", () => {
        it("should return all prices", async () => {
            const prices = await service.getAllPrices();
            expect(prices).toMatchObject({ xxxzzzz: 0.1 });
        });
        it("should return undefined if the getPrices method throws an error", async () => {
            spotBinanceMock.bookTicker.mockRejectedValueOnce(new Error("test error"));
            await expect(service.getAllPrices()).resolves.toBeUndefined();
        });
    });

    describe("getCurrentPrice", () => {
        it("should return the current price of the given currency", async () => {
            const price = await service.getCurrentPrice("xxxzzzz");
            expect(price).toBe(0.1);
        });
        it("should throw an error if the getPrices method throws an error", async () => {
            spotBinanceMock.bookTicker.mockRejectedValueOnce(new Error("test error"));
            await expect(service.getCurrentPrice("xxxzzzz")).rejects.toThrowError("test error");
        });
        it("should return throw error if the given currency is not found", async () => {
            await expect(service.getCurrentPrice("yyyzzzz")).rejects.toThrowError();
        });
    });

    describe("getOrder", () => {
        it("should return the order", async () => {
            const order = await service.getOrder("xxx", "zzzz", "123");
            expect(order).toMatchObject({
                id: "123",
                baseCurrency: "xxx",
                marketCurrency: "zzzz",
                orderSide: "Buy",
                orderType: "LIMIT",
                status: "Closed",
                orderPrice: 2737,
                quantity: 0.8011,
                quantityRemaining: 0,
                filledQuantity: 0.8011,
                filledPercent: 1,
                orderSize: 2192.6107,
                filledPrice: 2192.6107,
            });
        });
        it("should throw an error if the getOrder method throws an error", async () => {
            spotBinanceMock.allOrders.mockRejectedValueOnce(new Error("test error"));
            await expect(service.getOrder("xxx", "zzzz", "123")).rejects.toThrowError("test error");
        });
    });

    describe("cancelOrder", () => {
        it("should call the Binance client", async () => {
            await service.cancelOrder("xxx", "zzzz", "123");
            expect(spotBinanceMock.cancelOrder).toBeCalledWith("zzzzxxx", { orderId: 123 });
        });

        it("should not throw an error if the cancelOrder method throws 'Unknown order sent.' error", async () => {
            spotBinanceMock.cancelOrder.mockRejectedValueOnce({
                response: { data: { code: -2011, msg: "Unknown order sent." } },
            });
            await expect(service.cancelOrder("xxx", "zzzz", "123")).resolves.toBeUndefined();
        });

        it("should throw an error if the cancelOrder method throws an unknown error", async () => {
            spotBinanceMock.cancelOrder.mockRejectedValueOnce(new Error("test error"));
            expect(service.cancelOrder("xxx", "zzzz", "123")).rejects.toThrowError("test error");
        });
    });

    describe("placeOrder", () => {
        it("should call the Binance client", async () => {
            const orderDetails: PlaceOrderArgs = {
                baseCurrency: "zzzz",
                marketCurrency: "yyy",
                orderType: OrderType.Limit,
                orderSide: OrderSide.Buy,
                orderPrice: 10,
                quantity: 1,
                orderSize: 10,
            };
            const result = await service.placeOrder(orderDetails);
            expect(result).toEqual("1");
        });

        it("should throw an error if the placeOrder method throws an error", async () => {
            spotBinanceMock.newOrder.mockRejectedValueOnce(new Error("test error"));
            const orderDetails: PlaceOrderArgs = {
                baseCurrency: "zzzz",
                marketCurrency: "yyy",
                orderType: OrderType.Limit,
                orderSide: OrderSide.Buy,
                orderPrice: 10,
                quantity: 1,
                orderSize: 10,
            };
            expect(service.placeOrder(orderDetails)).rejects.toThrowError("test error");
        });

        it("should store the trades", async () => {
            const orderDetails: PlaceOrderArgs = {
                baseCurrency: "zzzz",
                marketCurrency: "yyy",
                orderType: OrderType.Limit,
                orderSide: OrderSide.Buy,
                orderPrice: 10,
                quantity: 1,
                orderSize: 10,
            };
            await service.placeOrder(orderDetails);
            const trades = await service.getTrades();
            expect(trades).toEqual(finalTrades);
        });
    });
});
