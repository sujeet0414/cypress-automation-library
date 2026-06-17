import { defineConfig } from 'cypress';
import { registerPlugin } from '../src/plugin';

export default defineConfig(
  registerPlugin(
    {
      e2e: {
        baseUrl: 'https://example.com',
        supportFile: '../src/support/e2e.ts',
        specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
      },
    },
    {
      viewportWidth: 1280,
      viewportHeight: 720,
      defaultCommandTimeout: 10000,
    }
  )
);
