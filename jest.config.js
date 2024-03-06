module.exports = {
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: "src",
    testRegex: "^(?!.*live\\.test\\.).*\\.test\\..*$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: [
        "**/*.(t|j)s",
        "!**/node_modules/**",
        "!**/*.module.(t|j)s",
        "!**/*.config.(t|j)s",
        "!**/*.mock.(t|j)s",
        "!**/main.ts",
        "!**/config/index.ts",
    ],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
};
