import { Page, expect } from "@playwright/test";
import LoggerSingleton from "../../../utilities/logger";


export class BasePage {
    protected logger: any;
    constructor(public page: Page) {
        this.page = page;
        this.logger = LoggerSingleton.getInstance();
    }

    // Function to extract timestamps from articles
    async extractTimestamps(): Promise<(string | null)[]> {
        try {
            return await this.page.evaluate(() => {
                const timestamps: (string | null)[] = [];
                const items = document.querySelectorAll('.age');
                for (let i = 0; i < items.length && i < 100; i++) {
                    timestamps.push(items[i].getAttribute('title'));
                }
                return timestamps;
            });
        } catch (error) {
            console.error('Error extracting timestamps:', error);
            throw error;
        }
    };

    // Function to validate timestamps are sorted from newest to oldest
    async validateSorting(timestamps: (string | null)[]): Promise<boolean> {
        const dates = timestamps.map(timestamp => new Date(timestamp as string));
        for (let i = 0; i < dates.length - 1; i++) {
            if (dates[i] < dates[i + 1]) {
                return false;
            }
        }
        return true;
    };

    // Function to validate sorting on a given page
    async validatePageSorting(): Promise<void> {
        const timestamps = await this.extractTimestamps();
        const isSorted = await this.validateSorting(timestamps);

        expect.soft(isSorted, `The articles on ${this.page.url()} are not sorted correctly.`).toBeTruthy()
    };

    async loadMorePagesAndValidateSorting(): Promise<void> {
        let hasNextPage = true;
        while (hasNextPage) {
            try {
                await this.validatePageSorting();
                await this.page.waitForSelector('.morelink', { timeout: 10000 });

                const moreLink = await this.page.$('.morelink');
                if (moreLink) {
                    await moreLink.click();
                    await this.page.waitForLoadState('networkidle');

                    // Check if the "sorry" message is displayed
                    const sorryMessage = await this.page.evaluate(() => document.body.textContent?.includes('sorry'));
                    if (sorryMessage) {
                        console.log('Received "sorry" message. Retrying...');
                        await this.page.waitForTimeout(5000); // Wait a bit before retrying
                        continue;
                    }
                }

                hasNextPage = await this.page.$('.morelink') !== null;
            } catch (error) {
                console.log('Error occurred:', error);
                hasNextPage = false;
            }
        }
    }

}
