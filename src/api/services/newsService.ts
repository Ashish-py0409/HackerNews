import { request, APIRequestContext } from '@playwright/test';
import LoggerSingleton from '../../../utilities/logger';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const logger = LoggerSingleton.getInstance();

export class NewsService {
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }
//
  async fetchStoryIds(): Promise<number[]> {
    const response = await this.requestContext.get(`${BASE_URL}/newstories.json?print=pretty`);
    if (!response.ok()) {
      logger.error(`Failed to fetch story IDs: ${response.status()}`);
      throw new Error(`Failed to fetch story IDs: ${response.status()}`);
    }
    return await response.json();
  }

  async fetchStoryDetails(storyId: number): Promise<any> {
    const response = await this.requestContext.get(`${BASE_URL}/item/${storyId}.json?print=pretty`);
    if (!response.ok()) {
      logger.error(`Failed to fetch story details for ID ${storyId}: ${response.status()}`);
      throw new Error(`Failed to fetch story details for ID ${storyId}: ${response.status()}`);
    }
    return await response.json();
  }
}