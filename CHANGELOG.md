# Changelog

All notable changes to `cypress-automation-library` are documented in this file.

## [1.0.1] - 2026-06-17

### Added
- `cy.uploadFile(selector, filePath)` — upload files to input fields
- `cy.selectDropdown(selector, value)` — select option from dropdown
- `cy.scrollToElement(selector)` — scroll element into view
- `cy.getTableRow(row)` / `cy.getTableCell(row, col)` — table helpers
- `cy.withinIframe(iframeSelector, callback)` — run commands inside iframe
- `cy.getByLabel(label)` / `cy.getByPlaceholder(placeholder)` — find inputs
- `cy.hoverElement(selector)` — hover over element
- `cy.checkCheckbox(selector)` / `cy.uncheckCheckbox(selector)` — checkbox helpers
- `cy.assertText(selector, text)` / `cy.assertUrl(path)` — assertions
- `cy.screenshotNamed(name)` — take named screenshot
- `cy.setLocalStorage(key, value)` / `cy.clearLocalStorage()` — storage helpers
- `cy.waitForPageLoad()` — wait until page fully loads
- `cy.interceptApi(method, url, alias)` / `cy.mockApi()` / `cy.waitForApi(alias)` — API mocking
- `cy.dragAndDrop(source, target)` — drag and drop elements
- `cy.closeModal(closeSelector?)` — close modal/dialog
- `cy.typeSlow(selector, text, delay?)` — slow typing
- `cy.doubleClickElement(selector)` / `cy.forceClick(selector)` — click helpers
- Table utilities: `tableRow`, `tableCell`, `tableRowByText`, `tableHeader`
- Iframe utilities: `iframeSelector`, `iframeByTestId`, `iframeByName`
- Extended selectors: `byLabel`, `byPlaceholder`, `byName`, `byClass`, `modalSelector`
- Extended data generators: `formatDate`, `generatePhone`, `generatePassword`, `generateUsername`
- Storage utilities: `setLocalStorageItem`, `clearLocalStorage`, session storage helpers
- Network utilities: `interceptApi`, `mockApiResponse`, `waitForApi`

## [1.0.0] - 2026-06-17

### Added
- Initial release with custom commands: `safeClick`, `fillField`, `login`, `getByTestId`, `apiRequest`
- Selector, wait, API, and test data utilities
- `registerPlugin` for Cypress config setup
- TypeScript support with full type definitions
