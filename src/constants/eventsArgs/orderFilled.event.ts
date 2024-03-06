import { Order } from "../../types/order.type";
import { EventArgs } from "./event";

export default class OrderFilledEvent extends EventArgs {
    order: Order;
    timestamp: Date;
}
