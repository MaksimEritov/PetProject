import { CurrencyPair, Price } from "../../types/general.type";
import { EventArgs } from "./event";

export default class PriceTickEvent extends EventArgs {
    currencyPair: CurrencyPair;
    price: Price;
    timestamp: Date;
}
