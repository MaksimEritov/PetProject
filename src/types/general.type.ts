export type Currency = string;
export type CurrencyPair = string;
export type Balance = number;
export type Price = number;

export enum BalanceAction {
    ADD = "ADD",
    SUBTRACT = "SUBTRACT",
}

export enum BotConfigChangeAction {
    ADD = "ADD",
    SUBTRACT = "SUBTRACT",
    CHANGE = "CHANGE",
    RESUME = "RESUME",
}

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}
