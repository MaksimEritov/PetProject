import { Balance, Currency } from "../../types/general.type";
import { EventArgs } from "./event";

export default class BalanceChangedEvent extends EventArgs {
    currency: Currency;
    balance: Balance;
    timestamp: Date;
}
