<<<<<<< HEAD
# QA Cazh Automation Testing

Framework: **Cypress**.

## Prerequisites

Before getting started, make sure you have the following installed on your system:
*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [Yarn](https://yarnpkg.com/) (or npm pre-installed with Node.js)
*   [Git](https://git-scm.com/)

---

## Installation

Follow the steps below to set up the project locally:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/faleroid/qa-cazh.git
    cd qa-cazh
    ```

2.  **Install Dependencies**
    You can use `yarn` (recommended as there is a `yarn.lock` file) or `npm`:
    ```bash
    # Using Yarn
    yarn install

    # Or using NPM
    npm install
    ```

---

## Running Cypress

Once the installation is complete, you can run Cypress using one of the following methods:

### 1. Run Cypress Test Runner (Interactive Mode)
This opens the Cypress graphical user interface (GUI) to select and view the test execution visually.
```bash
# Using Yarn
yarn cypress open

# Or using NPM
npx cypress open
```

### 2. Run Cypress in Background (Headless Mode)
This runs all the tests directly in the terminal (suitable for CI/CD environments).
```bash
# Using Yarn
yarn cypress run

# Or using NPM
npx cypress run
```

---

## Project Directory Structure
*   `cypress/e2e/`: Contains the automated test files (`.cy.js`).
*   `cypress/fixtures/`: Contains static test data (such as login credentials or mock payloads).
*   `cypress/support/`: Helper configuration files (custom commands and global setups).
*   `cypress.config.js`: The main Cypress configuration file.
=======
# CAZH v3 - Cypress UAT Test Automation Framework

Framework Otomatisasi User Acceptance Testing (UAT) untuk aplikasi web **School Management System CAZH v3** (URL: [https://v3.cazh.id](https://v3.cazh.id)) menggunakan **Cypress** dengan arsitektur **Page Object Model (POM)**.

---
