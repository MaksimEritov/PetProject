import { Test, TestingModule } from "@nestjs/testing";

import { EventBusService } from "./eventBus.service";

import Events from "../../constants/events";

describe("EventBusService", () => {
    const handler = jest.fn();
    let service: EventBusService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventBusService],
        }).compile();

        service = module.get<EventBusService>(EventBusService);
    });

    describe("subscribeToEvent", () => {
        it("should fire the event after subscription", () => {
            service.subscribeToEvent(Events.orderFilled, handler);
            service.emit(Events.orderFilled, {} as any);
            expect(handler).toBeCalledTimes(1);
        });

        it("should no fire the event if it's has not any listener", () => {
            service.emit(Events.orderFilled, {} as any);
            expect(handler).not.toHaveBeenCalled();
        });

        it("should fire the event 2 times after 2 subscription", () => {
            service.subscribeToEvent(Events.orderFilled, handler);
            service.subscribeToEvent(Events.orderFilled, handler);
            service.emit(Events.orderFilled, {} as any);
            expect(handler).toBeCalledTimes(2);
        });

        it("should fire the orderPlaced event", () => {
            service.subscribeToEvent(Events.orderPlaced, handler);
            service.emit(Events.orderPlaced, {} as any);
            expect(handler).toBeCalledTimes(1);
        });

        it("should fire the priceTick event", () => {
            service.subscribeToEvent(Events.priceTick, handler);
            service.emit(Events.priceTick, {} as any);
            expect(handler).toBeCalledTimes(1);
        });

        it("should fire the priceTickHandled event after the price tick event handled", async () => {
            service.subscribeToEvent(Events.priceTick, handler);
            service.subscribeToEvent(Events.priceTickHandled, handler);
            await service.emit(Events.priceTick, {} as any);
            expect(handler).toBeCalledTimes(2);
        });

        it("should fire the orderPartiallyFilled event", () => {
            service.subscribeToEvent(Events.orderPartiallyFilled, handler);
            service.emit(Events.orderPartiallyFilled, {} as any);
            expect(handler).toBeCalledTimes(1);
        });

        it("should fire the stop event", () => {
            service.subscribeToEvent(Events.stop, handler);
            service.emit(Events.stop, {} as any);
            expect(handler).toBeCalledTimes(1);
        });

        it("should fire the trendChangeDirection event", () => {
            service.subscribeToEvent(Events.trendChangeDirection, handler);
            service.emit(Events.trendChangeDirection, {} as any);
            expect(handler).toBeCalledTimes(1);
        });

        it("should fire the trendCrossed event", () => {
            service.subscribeToEvent(Events.trendCrossed, handler);
            service.emit(Events.trendCrossed, {} as any);
            expect(handler).toBeCalledTimes(1);
        });

        afterEach(() => {
            handler.mockReset();
        });
    });

    describe("emitSync", () => {
        it("should be defined", () => {
            expect(service.emitSync).toBeDefined();
        });

        it("should not fire the event if it's has not any listener", () => {
            service.emitSync(Events.orderFilled, {} as any);
            expect(handler).not.toHaveBeenCalled();
        });

        it("should fire the event after subscription", () => {
            service.subscribeToEvent(Events.orderFilled, handler);
            service.emitSync(Events.orderFilled, {} as any);
            expect(handler).toBeCalledTimes(1);
        });
    });
});
