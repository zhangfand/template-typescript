type LogLevel = "debug" | "info" | "warn" | "error";

const LEVELS: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };

const currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) ?? "warn";

export function createLogger(name: string) {
  const log = (level: LogLevel, message: string, context?: Record<string, unknown>) => {
    if (LEVELS[level] < LEVELS[currentLevel]) return;
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      name,
      message,
      ...context,
    };
    process.stderr.write(JSON.stringify(entry) + "\n");
  };

  return {
    debug: (msg: string, ctx?: Record<string, unknown>) => log("debug", msg, ctx),
    info: (msg: string, ctx?: Record<string, unknown>) => log("info", msg, ctx),
    warn: (msg: string, ctx?: Record<string, unknown>) => log("warn", msg, ctx),
    error: (msg: string, ctx?: Record<string, unknown>) => log("error", msg, ctx),
  };
}
