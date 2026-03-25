import { createLogger } from "./logger.js";

const logger = createLogger("main");

function main(): void {
  logger.info("starting");
  console.log("Hello, world!");
}

main();
