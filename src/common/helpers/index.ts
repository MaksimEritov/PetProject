import { promises as fs } from "fs";
import * as path from "path";
import { setTimeout } from "timers/promises";
import * as Joi from "joi";

import { Currency, Price } from "../../types/general.type";

export const sleep = (ms: number) => setTimeout(ms);

export const getSymbol = (marketCurrency: Currency, baseCurrency: Currency) =>
    `${marketCurrency}${baseCurrency}`.toUpperCase();

export const isInRange = (price: Price, rangeTop: Price, rangeBottom: Price): boolean => {
    return price >= rangeBottom && price <= rangeTop;
};

export const getFile = async (relativePathToFile: string) => {
    try {
        const absolutePathToFile = path.resolve(process.cwd(), relativePathToFile);
        await fs.stat(absolutePathToFile);
        const file = await fs.readFile(absolutePathToFile, "utf8");
        return file;
    } catch (error) {
        console.log(error);
    }
};

type Config = {
    [key: string]: any;
};

export const getConfigValueAtPath = <T extends Config>(config: T, key: string): unknown =>
    key.split(".").reduce((acc, curr) => acc[curr], config);

export const segmentsIntersect = (x1: number, x2: number, z1: number, z2: number): boolean => {
    if (x1 > x2) {
        [x1, x2] = [x2, x1];
    }

    if (z1 > z2) {
        [z1, z2] = [z2, z1];
    }

    return x1 <= z2 && z1 <= x2;
};

export const validateJoiSchema = (importedConfig: unknown, schema: Joi.AnySchema) => {
    const { value: result, error, warning } = schema.validate(importedConfig, { abortEarly: false });

    if (error || warning) {
        throw new Error(`Validation error: ${error}`);
    }

    return result as unknown;
};

export const roundNumber = (num: number, precision?: number) => {
    if (precision === undefined) {
        return num;
    }
    return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
};

export const cutNumber = (num: number, precisionAfterDot?: number) => {
    if (precisionAfterDot === undefined) {
        return num;
    }

    const arr = num.toString().split(".");
    if (!arr[1]) {
        return num;
    }

    return parseFloat(
        [arr[0], arr[1].length > precisionAfterDot ? arr[1].slice(0, precisionAfterDot) : arr[1]].join(".")
    );
};
