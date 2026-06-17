# cypress-automation-library

Reusable **Cypress npm library** for automation testing — similar to your `seo-library` (Java) and `Infy_mcp_playwright` projects.

## Features

- **Custom Commands** — `safeClick`, `fillField`, `login`, `getByTestId`, `apiRequest`, and more
- **Utilities** — selectors, wait helpers, API helpers, test data generators
- **Plugin** — easy Cypress config setup via `registerPlugin`
- **TypeScript** — full type definitions included

## Installation

```bash
npm install cypress-automation-library cypress
```

## Quick Start

### 1. Register commands in your support file

```typescript
// cypress/support/e2e.ts
import { registerCommands } from 'cypress-automation-library';

registerCommands();
```

### 2. Configure Cypress (optional plugin)

```typescript
// cypress.config.ts
import { defineConfig } from 'cypress';
import { registerPlugin } from 'cypress-automation-library';

export default defineConfig(
  registerPlugin(
    {
      e2e: {
        baseUrl: 'https://your-app.com',
        supportFile: 'cypress/support/e2e.ts',
      },
    },
    {
      viewportWidth: 1280,
      viewportHeight: 720,
      defaultCommandTimeout: 10000,
    }
  )
);
```

### 3. Use in your tests

```typescript
describe('Login flow', () => {
  it('logs in successfully', () => {
    cy.login('user@example.com', 'password123');
    cy.getByTestId('dashboard').should('be.visible');
  });

  it('fills a form safely', () => {
    cy.visit('/contact');
    cy.fillField('[name="email"]', 'test@example.com');
    cy.safeClick('[type="submit"]');
  });
});
```

## Custom Commands

| Command | Description |
|---------|-------------|
| `cy.safeClick(selector)` | Click only after element is visible |
| `cy.fillField(selector, value)` | Clear and type into a field |
| `cy.clearAndType(selector, text)` | Clear field then type |
| `cy.waitForVisible(selector)` | Wait until element is visible |
| `cy.waitForHidden(selector)` | Wait until element is hidden |
| `cy.getByTestId(testId)` | Select by `data-testid` |
| `cy.getByRole(role, name?)` | Select by ARIA role |
| `cy.apiRequest(method, url, body?)` | Make authenticated API calls |
| `cy.login(user, pass, options?)` | Reusable login flow |

## Utilities

```typescript
import {
  byTestId,
  byRole,
  buildSelector,
  waitForStable,
  retryAction,
  generateEmail,
  setAuthToken,
  apiRequest,
} from 'cypress-automation-library';

// Selector helpers
const btn = byTestId('submit-btn');
const link = byRole('link', 'Home');

// Test data
const email = generateEmail('user');

// API auth
setAuthToken('your-jwt-token');
```

## Development

```bash
npm install
npm run build
npm run lint
```

## Publish to npm

```bash
npm login
npm publish
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Cypress automation library"
git remote add origin https://github.com/sujeet0414/cypress-automation-library.git
git push -u origin main
```

## License

MIT
