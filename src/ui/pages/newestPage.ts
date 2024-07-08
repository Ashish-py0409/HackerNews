import { Page } from "@playwright/test";
import { BasePage } from "./basePage";


export class NewestPage extends BasePage {
    pageUrl: string = "newest"
    constructor(page: Page) {
        super(page);
    }

    async goTo(): Promise<void> {
        await this.logger.info(`Navigating to -> ${this.pageUrl}`);
        await this.page.goto(this.pageUrl);
    }

}