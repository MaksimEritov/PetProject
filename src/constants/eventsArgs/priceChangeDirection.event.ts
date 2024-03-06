import { CurrencyPair, Price } from "../../types/general.type";
import { TrendDirection } from "../../types/trendMonitor.type";
import { EventArgs } from "./event";

export default class PriceChangeDirection extends EventArgs {
    currencyPair: CurrencyPair;
    trendName: string;
    trendDirection: TrendDirection;
    price: Price;
    timestamp: Date;
}
