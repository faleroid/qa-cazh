<<<<<<< HEAD
# QA Cazh Automation Testing

Framework: **Cypress** (E2E).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- One of: [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

## Installation

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

Using pnpm:

```bash
pnpm install
```

Then create your environment file:

```bash
cp .env.example .env
```

Fill in the real credentials/values inside `.env`. Do not commit `.env` to the repository.

## Running Cypress

### Interactive Mode (Test Runner)

```bash
# npm
npm run engine:startup

# yarn
yarn engine:startup

# pnpm
pnpm engine:startup
```

This opens the Cypress GUI with Chromium and uses `cypress.original.config.js` (includes the esbuild preprocessor / test-ID transformer).

Alternative:

```bash
# npm
npx cypress open

# yarn
yarn cypress open

# pnpm
pnpm exec cypress open
```

### Headless Mode (CI / terminal)

```bash
# npm
npx cypress run

# yarn
yarn cypress run

# pnpm
pnpm exec cypress run
```

## Useful Commands

| Command | Description |
| --- | --- |
| `npm run engine:startup` / `yarn engine:startup` / `pnpm engine:startup` | Open Cypress GUI (Chromium, `cypress.original.config.js`) |
| `npx cypress run` / `yarn cypress run` / `pnpm exec cypress run` | Run all tests headless |
| `npm run git:add:all` / `yarn git:add:all` / `pnpm git:add:all` | `git add .` |
| `npm run git:commit` / `yarn git:commit` / `pnpm git:commit` | `git commit -m "message"` |
| `npm run git:push:all` / `yarn git:push:all` / `pnpm git:push:all` | Push to `origin main` and `collab main:feature-others` |

## Project Structure

- `cypress/e2e/` - Test files (`.cy.js`)
- `cypress/fixtures/` - Static test data
- `cypress/support/` - Custom commands and global setup
- `cypress.config.js` - Default Cypress config
- `cypress.original.config.js` - Config with the esbuild/PGT transformer used by `engine:startup`
