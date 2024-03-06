import { CurrencyPair, Price } from "../../types/general.type";
import { TrendDirection } from "../../types/trendMonitor.type";
import { EventArgs } from "./event";

export default class TrendCrossedEvent extends EventArgs {
    currencyPair: CurrencyPair;
    trendNames: string;
    trendsDirection: {
        [key: string]: TrendDirection;
    };
    price: Price;
    timestamp: Date;
}
