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

  it('works with tables and iframes', () => {
    cy.getTableCell(1, 2).should('contain', 'Active');
    cy.selectDropdown('#country', 'India');
    cy.withinIframe('iframe#payment', () => {
      cy.fillField('#card', '4111111111111111');
    });
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
| `cy.uploadFile(selector, filePath)` | Upload a file to an input field |
| `cy.selectDropdown(selector, value)` | Select value from dropdown |
| `cy.scrollToElement(selector)` | Scroll element into view |
| `cy.getTableRow(row)` | Get table row by index |
| `cy.getTableCell(row, col)` | Get table cell by row/column |
| `cy.withinIframe(selector, callback)` | Run commands inside iframe |
| `cy.getByLabel(label)` | Find input by label text |
| `cy.getByPlaceholder(placeholder)` | Find input by placeholder |
| `cy.hoverElement(selector)` | Hover over element |
| `cy.checkCheckbox(selector)` | Check a checkbox |
| `cy.uncheckCheckbox(selector)` | Uncheck a checkbox |
| `cy.assertText(selector, text)` | Assert element contains text |
| `cy.assertUrl(path)` | Assert URL contains path |
| `cy.screenshotNamed(name)` | Take named screenshot |
| `cy.setLocalStorage(key, value)` | Set localStorage item |
| `cy.clearLocalStorage()` | Clear all localStorage |
| `cy.waitForPageLoad()` | Wait until page fully loads |
| `cy.interceptApi(method, url, alias)` | Intercept API call |
| `cy.mockApi(method, url, alias, response)` | Mock API response |
| `cy.waitForApi(alias)` | Wait for intercepted API |
| `cy.dragAndDrop(source, target)` | Drag and drop elements |
| `cy.closeModal(selector?)` | Close modal/dialog |
| `cy.typeSlow(selector, text, delay?)` | Slow typing for animations |
| `cy.doubleClickElement(selector)` | Double click element |
| `cy.forceClick(selector)` | Force click element |

## Utilities

```typescript
import {
  byTestId,
  byRole,
  byLabel,
  byPlaceholder,
  buildSelector,
  waitForStable,
  generateEmail,
  generatePhone,
  generatePassword,
  formatDate,
  setAuthToken,
  mockApiResponse,
  apiRequest,
} from 'cypress-automation-library';

// Selector helpers
const btn = byTestId('submit-btn');
const emailInput = byPlaceholder('Enter email');

// Test data
const email = generateEmail('user');
const phone = generatePhone();
const date = formatDate(7); // 7 days from now

// API mock
mockApiResponse('GET', '/api/users', 'getUsers', { users: [] });
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
