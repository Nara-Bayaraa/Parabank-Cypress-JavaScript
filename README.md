# Parabank Cypress JavaScript Test Suite

Full stack test automation for the [Parabank](https://parabank.parasoft.com/parabank/) demo banking application. Covers both UI end to end flows and REST API endpoints, built with Cypress 14, JavaScript, the Page Object Model, and AJV JSON schema validation.

Live application under test: https://parabank.parasoft.com/parabank/

## Why this project

I built this framework to demonstrate full stack QA automation skills on a real banking application. It validates complete user journeys from registration through fund transfers in the UI, while independently verifying the underlying REST APIs with schema level contract testing. The same banking flows are covered from two angles, mirroring how mature QA teams structure their suites in production.

## Tech stack

| Tool | Version | Purpose |
| --- | --- | --- |
| Cypress | 14.4 | UI and API test framework |
| JavaScript | ES2022 | Programming language |
| Node.js | 18+ | JavaScript runtime |
| AJV | 8.17 | JSON schema validation |
| Faker.js | 9.8 | Dynamic test data generation |
| cypress-plugin-api | 2.11 | API request UI rendering |
| cypress-wait-until | 3.0 | Advanced async waiting |
| cypress-xpath | 2.0 | XPath selector support |
| Mochawesome | latest | HTML test reporting |

## Skills demonstrated

- End to end UI automation with Cypress
- REST API automation with full CRUD coverage
- JSON schema validation using AJV for contract testing
- Page Object Model with 12 page objects
- Custom Cypress commands for reusable flows
- Session caching with `cy.session` for faster test runs
- Dynamic test data generation with Faker.js
- Retry logic for handling username conflicts
- Externalized test data in fixtures
- HTML reporting with Mochawesome

## Test coverage

**UI flows.** User registration, login positive and negative, open checking and savings accounts, fund transfers with balance verification, bill payments, loan applications, transaction search and filtering, contact information updates.

**API flows.** Account CRUD operations, customer data retrieval and updates, deposit and transaction endpoints, loan request API, position trading buy and view, database initialization and cleanup, JSON schema validation on every response.

**Why both UI and API.** UI tests confirm the user can complete a journey. API tests confirm the underlying contract is solid even when the UI changes. Together they catch bugs neither layer alone would find.

## Framework architecture

The framework follows separation of concerns with five core layers.

**Page objects layer.** 12 page objects that encapsulate every UI selector and interaction. Tests never touch raw selectors directly, making them resilient to UI changes.

**Custom commands layer.** Multi step flows like login, registration, and account creation live as reusable Cypress commands, keeping test files focused on assertions.

**Schemas layer.** JSON schemas in `cypress/fixtures/schemas/` validate every API response shape. AJV catches structural regressions that status code checks alone would miss.

**Helpers layer.** Faker.js data generators, formatters, and schema utilities for clean test data management.

**Test specs layer.** Organized by feature area under `cypress/e2e/UI/` and `cypress/e2e/Api/` for clear separation of test types.

## Key design patterns

**Page Object Model.** Each page is a class with locators and actions, keeping test logic separate from UI implementation.

**Custom commands.** Reusable flows like `cy.uiLogin()`, `cy.registerUser()`, and `cy.getAccountBalances()` hide multi step interactions behind a clean API.

**Schema first API testing.** Every API response is validated against a JSON schema, catching contract drift before it reaches production.

**Dynamic test data.** Registration uses freshly generated Faker.js data on every run, with retry logic for username conflicts on the shared demo environment.

**Session caching.** `cy.session()` caches login state across tests, cutting suite runtime significantly while still validating fresh authentication where needed.

## Project structure

```
cypress/
├── e2e/
│   ├── Api/
│   │   ├── accounts/
│   │   ├── customers/
│   │   ├── database/
│   │   ├── loans/
│   │   ├── positions/
│   │   └── transactions/
│   └── UI/
│       ├── login/
│       ├── register/
│       ├── bill-pay/
│       ├── transfer-funds/
│       ├── open-accounts/
│       ├── request-loan/
│       ├── find-transactions/
│       └── update-info/
├── fixtures/
│   ├── schemas/
│   └── ui-test-data/
├── page-objects/
└── support/
    ├── commands/
    ├── helpers/
    └── utils.js
```

## How to run

**Prerequisites:** Node.js 18 or higher, npm 9 or higher, Google Chrome installed.

Clone the repo:

```bash
git clone https://github.com/Nara-Bayaraa/parabank-cypress-javascript.git
cd parabank-cypress-javascript
```

Install dependencies:

```bash
npm install
```

Open Cypress GUI:

```bash
npm run cy:open
```

Run all tests headless:

```bash
npm run cy:run
```

Run only UI tests:

```bash
npx cypress run --spec "cypress/e2e/UI/**/*.cy.js" --browser chrome
```

Run only API tests:

```bash
npx cypress run --spec "cypress/e2e/Api/**/*.cy.js" --browser chrome
```

Run a specific test file:

```bash
npx cypress run --spec "cypress/e2e/UI/login/login.positive.cy.js" --browser chrome
```

## Reports

Reports are generated automatically after each run using Mochawesome.

| Report | Path |
| --- | --- |
| HTML report | `cypress/reports/index.html` |
| Failure screenshots | `cypress/screenshots/` |
| Video recordings | `cypress/videos/` |

Open `cypress/reports/index.html` in your browser to view the full report.

## Custom commands reference

| Command | Description |
| --- | --- |
| `cy.uiLogin(username, password)` | Login via UI with session caching |
| `cy.loginUser(username, password)` | Direct UI login without session cache |
| `cy.logoutUser()` | Click logout |
| `cy.apiLogin(username, password)` | Login via API |
| `cy.registerUser(overrides)` | Register a new user with generated data |
| `cy.registerUserWithRetry(maxRetries)` | Register with retry on username conflict |
| `cy.getAccountBalances()` | Get current and available balance |
| `cy.selectAccountType(accountType)` | Select CHECKING or SAVINGS |

## Configuration

The main configuration lives in `cypress.config.js`.

```js
baseUrl: 'https://parabank.parasoft.com/parabank/'
apiBaseUrl: 'https://parabank.parasoft.com/parabank/services/bank/'
viewportWidth: 1920
viewportHeight: 1080
defaultCommandTimeout: 10000
pageLoadTimeout: 120000
```

## Test data management

Registration data and bill payment information are generated fresh on every run using Faker.js. This avoids stale state, prevents username conflicts on the shared demo environment, and ensures every test run is independent.

Static test data such as expected error messages and reusable credentials live in `cypress/fixtures/ui-test-data/`. JSON schemas for API contract validation live in `cypress/fixtures/schemas/`.

## Author

Nara Bayaraa, QA Automation Engineer based in Chicago, IL

- GitHub: https://github.com/Nara-Bayaraa
- LinkedIn: https://linkedin.com/in/Nara-Bayaraa
- Email: narab.qa@gmail.com

## License

This project is for portfolio and educational purposes.

## Note

Parabank is a publicly available demo application by Parasoft. Tests run against the live instance at `parabank.parasoft.com`. Test availability depends on the external server.

---

**Happy Testing! 🚀**

---
