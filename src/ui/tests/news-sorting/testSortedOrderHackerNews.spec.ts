import { test } from "../fixture"

test.describe("Hacker News", () => {
    test("Verify newest Hacker news are sorted @regression", async ({ newestPage }) => {
        await newestPage.goTo();
        await newestPage.loadMorePagesAndValidateSorting();
    })

    test.only("Verify front Hacker news are sorted @regression", async ({ frontPage }) => {
        await frontPage.goTo()
        await frontPage.loadMorePagesAndValidateSorting();
    })

})
