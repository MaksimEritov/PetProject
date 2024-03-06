import { cutNumber, getConfigValueAtPath, getSymbol, isInRange, roundNumber, segmentsIntersect } from ".";

describe("utils", () => {
    describe("isInRange()", () => {
        it("should return true if the price is in range", () => {
            expect(isInRange(100, 200, 50)).toBe(true);
        });

        it("should return false if the price is out of range", () => {
            expect(isInRange(100, 200, 300)).toBe(false);
        });
    });

    describe("getSymbol()", () => {
        it("should return the symbol", () => {
            expect(getSymbol("xxx", "zzzz")).toBe("XXXZZZZ");
        });

        it("should return the symbol in uppercase", () => {
            expect(getSymbol("yyy", "zzzZ")).toBe("YYYZZZZ");
        });

        it("should return the symbol in uppercase", () => {
            expect(getSymbol("xXx", "zzzZ")).toBe("XXXZZZZ");
        });
    });

    describe("getConfigValueAtPath()", () => {
        it("should return the value at the path", () => {
            const config = {
                botsConfig: { botType: "straddleBot" },
                envConfig: { NODE_ENV: "development", useExchangeSimulator: true },
                monitorConfig: {
                    priceMonitorInterval: 1000,
                    balanceMonitorInterval: 500,
                    orderMonitorInterval: 500,
                },
            };

            expect(getConfigValueAtPath(config, "botsConfig.botType")).toBe("straddleBot");
            expect(getConfigValueAtPath(config, "envConfig.NODE_ENV")).toBe("development");
            expect(getConfigValueAtPath(config, "envConfig.useExchangeSimulator")).toBe(true);
            expect(getConfigValueAtPath(config, "monitorConfig.priceMonitorInterval")).toBe(1000);
            expect(getConfigValueAtPath(config, "monitorConfig.balanceMonitorInterval")).toBe(500);
            expect(getConfigValueAtPath(config, "monitorConfig.orderMonitorInterval")).toBe(500);
        });
    });

    describe("segmentsIntersect()", () => {
        it.each([
            [1, 3, 2, 4, true],
            [1, 3, 3, 4, true],
            [1, 3, 1, 2, true],
            [1, 3, 1, 3, true],
            [1, 3, 4, 0, true],
            [1, 3, 0, 4, true],
            [1, 3, 4, 5, false],
            [1, 3, 0, 0, false],
        ])(`segmentsIntersect(%i, %i, %i, %i) should return %p`, (a, b, c, d, expected) => {
            expect(segmentsIntersect(a, b, c, d)).toBe(expected);
        });
    });

    describe("roundNumber()", () => {
        it("should return the quantity if the quantityPrecision is not provided", () => {
            expect(roundNumber(1.123456789)).toBe(1.123456789);
        });

        it("should return the quantity if the quantityPrecision is 0", () => {
            expect(roundNumber(1.123456789, 0)).toBe(1);
        });

        it("should return the quantity rounded to the quantityPrecision", () => {
            expect(roundNumber(1.123456789, 5)).toBe(1.12346);
        });
    });

    describe("cutNumber()", () => {
        it.each([
            [123, 5, 123],
            [1.123456789, undefined, 1.123456789],
            [1.123456789, 0, 1],
            [1.123456789, 5, 1.12345],
            [0.7345, 2, 0.73],
            [-0.7345, 2, -0.73],
            [0.0492997, 6, 0.049299],
        ])("should return the quantity if the quantityPrecision is not provided", (num, precision, res) => {
            expect(cutNumber(num, precision)).toBe(res);
        });
    });
});
