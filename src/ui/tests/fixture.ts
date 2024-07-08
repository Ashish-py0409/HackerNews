import { test as base } from "@playwright/test"
import { FrontPage } from "../pages/frontPage"
import { NewestPage } from "../pages/newestPage";
import * as fs from "fs"
import * as path from "path"

type pagesFixture = {
    frontPage: FrontPage;
    newestPage: NewestPage;
    testData: any;
}

export const test = base.extend<pagesFixture>({
    frontPage: async ({ page }, use) => {
        const frontPage = new FrontPage(page);
        await use(frontPage);
    },

    newestPage: async ({ page }, use) => {
        const newestPage = new NewestPage(page);
        await use(newestPage);
    },

    /**
     * Dynamically mapping scripts with test-data file, and the path after below dir should be same.
     * test files: /tests/
     * data files: /test-data/
     * @param param0 
     * @param use 
     * @param testInfo 
     * @returns json data using test title.
     */
    testData: async (
        { }: any,
        use: (arg0: any) => any,
        testInfo: { title: string, titlePath: string[] }
    ) => {
        const testPath = testInfo.titlePath[0].replace("spec.ts", "json");
        const dataPath = path.join(__dirname, `../test-data/${testPath}`);
        const jsonString = fs.readFileSync(dataPath, "utf-8");
        const testData = JSON.parse(jsonString)[testInfo.title.split("@")[0].trim()];
        return use(testData)
    }
})