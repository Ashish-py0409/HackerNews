import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const { BASE_URL, BASE_URI } = process.env
export default defineConfig({
  globalSetup: path.join(__dirname, "globalSetup.ts"),
  // testDir: './src/*/tests',
  timeout: 60 * 60 * 1000,
  expect: {
    timeout: 60000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'ui-tests',
      testDir: './src/ui/tests',
      use: {
        baseURL: BASE_URL,
        headless: process.env.CI ? true : false,
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: {
          mode: 'retain-on-failure',
          size: { width: 1600, height: 900 }
        },
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'api-tests',
      testDir: './src/api/tests',
      use: {
        baseURL: BASE_URI,
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
