import { Order } from "../../types/order.type";
import { EventArgs } from "./event";

export default class OrderPartiallyFilledEvent extends EventArgs {
    order: Order;
    timestamp: Date;
}
