import { FullConfig } from "@playwright/test";
import LoggerSingleton from "./utilities/logger";

const logger = LoggerSingleton.getInstance();

async function globalSetup(config: FullConfig): Promise<void> {
    logger.info(`Started Automation Test - Hackers News`);
    // We can optionally handle single login for all scripts here and store the session.
    // Similarly we can create global teardown.
    
}

export default globalSetup