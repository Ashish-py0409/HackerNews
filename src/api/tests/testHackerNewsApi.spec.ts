import test, { expect, request } from "@playwright/test";
import { NewsService } from "../services/newsService";


test.describe("Hacker News", () => {
    test.only("Verify API newest Hacker news are sorted @regression", async ({ }) => {
        const requestContext = await request.newContext();
        const newsService = new NewsService(requestContext);
    
        try {
          // Fetch story IDs
          const storyIds = await newsService.fetchStoryIds();
          //logger.info(storyIds)
          expect(Array.isArray(storyIds)).toBeTruthy();
          expect(storyIds.length).toBeGreaterThan(0);
    
          // Fetch details for the first 10 stories
          const storyDetailsPromises = storyIds.slice(0, 100).map(id => newsService.fetchStoryDetails(id));
          const storyDetails = await Promise.all(storyDetailsPromises);
    
          // Extract and sort timestamps
          const timestamps = storyDetails.map(story => story.time);

          // Check if timestamps are in descending order (newest to oldest)
          let isSorted = true;
          for (let i = 0; i < timestamps.length - 1; i++) {
            if (timestamps[i] < timestamps[i + 1]) {
              isSorted = false;
              break;
            }
          }
    
          expect(isSorted).toBeTruthy();
    
          await requestContext.dispose();
        } catch (error) {
          throw error;
        }
    })

})
