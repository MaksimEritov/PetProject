import { Injectable } from "@nestjs/common";

import Events from "../../constants/events";
import { EventsPayload } from "../../constants/eventsArgs";

@Injectable()
export class EventBusService {
    private eventListeners: Map<Events, ((data?: EventsPayload) => void)[]> = new Map();

    subscribeToEvent(event: Events, handler: (data?: EventsPayload) => void) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, [handler]);
        } else {
            const eventListeners = this.eventListeners.get(event);
            if (eventListeners) {
                eventListeners.push(handler);
            }
        }
    }

    private async fireEvent(event: Events, data?: EventsPayload) {
        if (!this.eventListeners.has(event)) {
            return;
        }
        const eventListeners = this.eventListeners.get(event);
        if (eventListeners) {
            await Promise.all(eventListeners.map((listener) => listener(data)));
        }
    }

    async emit(event: Events, data?: EventsPayload) {
        await this.fireEvent(event, data);
        if (event === Events.priceTick) {
            this.emitSync(Events.priceTickHandled);
        }
    }

    emitSync(event: Events, data?: EventsPayload) {
        if (!this.eventListeners.has(event)) {
            return;
        }
        const eventListeners = this.eventListeners.get(event);
        if (eventListeners) {
            eventListeners.forEach((listener) => listener(data));
        }
    }
}
