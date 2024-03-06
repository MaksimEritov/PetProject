export const LogLevelEnum = {
    error: "error",
    warn: "warn",
    log: "log",
    verbose: "verbose",
    debug: "debug",
} as const;

export const LogLevel = [LogLevelEnum.error, LogLevelEnum.log, LogLevelEnum.verbose, LogLevelEnum.warn];

export const LogLevelForDevelopment = [
    LogLevelEnum.debug,
    LogLevelEnum.error,
    LogLevelEnum.log,
    LogLevelEnum.verbose,
    LogLevelEnum.warn,
];
