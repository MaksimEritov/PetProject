import { CurrencyPair } from "./general.type";

export enum TrendSubscribtionType {
    SINGLE_TREND_CHANGE = "SINGLE_TREND_CHANGE",
    CROSS_TREND_EVENT = "CROSS_TREND_EVENT",
}

export enum TrendDirection {
    UP = "UP",
    DOWN = "DOWN",
}

export enum TrendMonitorStatus {
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
}

export enum StrategyType {
    SMA = "SMA",
    EMA = "EMA",
    DIRECTION_CHANGE = "DIRECTION_CHANGE",
}

export type SMAStrategy = {
    name: string;
    type: StrategyType.SMA;
    ticksCount: number;
};

export type EMAStrategy = {
    name: string;
    type: StrategyType.EMA;
    period: number;
    smoothingCoefficient: number;
};

export type DirectionChangeStrategy = {
    name: string;
    type: StrategyType.DIRECTION_CHANGE;
    threshold: number;
};

type StrategyWithCrossStrategy =
    | (SMAStrategy & {
          crossStrategy?: Strategy;
      })
    | (EMAStrategy & {
          crossStrategy?: Strategy;
      })
    | (DirectionChangeStrategy & {
          crossStrategy?: Strategy;
      });

export type Strategy = SMAStrategy | EMAStrategy | DirectionChangeStrategy;

export type TrendMonitorConfig = {
    currencyPair: CurrencyPair;
    strategy: StrategyWithCrossStrategy[];
};
