
# Project Overview

This is a React-based web application built with Vite and TypeScript. It appears to be a "Digital Product Studio" that includes features like an AI Assistant, analytics, a creation hub, and a template library. The project uses Redux for state management, React Router for navigation, and Firebase for backend services (Authentication, Firestore, Realtime Database). Styling is handled by Tailwind CSS. The project is set up with a comprehensive testing suite using Jest for unit tests and Cypress for end-to-end tests. Storybook is also included for component development and visualization.

# Building and Running

## Development

To run the application in development mode:

```bash
npm run dev
```

This will start the Vite development server, typically on `http://localhost:5173`.

## Building for Production

To build the application for production:

```bash
npm run build
```

This will create a `dist` directory with the optimized production build.

## Running Tests

To run the Jest unit tests:

```bash
npm test
```

To run the Cypress end-to-end tests:

```bash
npm run cypress:run
```

To open the Cypress test runner UI:

```bash
npm run cypress:open
```

## Storybook

To run Storybook for component development:

```bash
npm run storybook
```

This will start the Storybook server, typically on `http://localhost:6006`.

# Development Conventions

## Linting

The project uses ESLint for code linting. To run the linter:

```bash
npm run lint
```

## Testing

-   **Unit Tests:** Jest is used for unit and component testing. Test files are located alongside the components they test (e.g., `Button.test.tsx`).
-   **End-to-End Tests:** Cypress is used for end-to-end testing. Test files are located in the `cypress/e2e` directory.
-   **Coverage:** Test coverage is configured to be collected from all `src` files. The coverage threshold is set to 80% for branches, functions, lines, and statements.

## Continuous Integration

The project has a CI/CD pipeline configured with GitHub Actions (`.github/workflows/ci.yml`). The pipeline runs on pushes and pull requests to the `main` and `develop` branches. It performs the following steps:

1.  Installs dependencies (`npm ci`)
2.  Runs the linter (`npm run lint`)
3.  Runs tests (`npm test`)
4.  Builds the project (`npm run build`)
5.  Uploads coverage reports to Codecov.

## Firebase

The project is configured to use Firebase services. The Firebase configuration is located in `src/firebase.js`. **IMPORTANT:** The configuration in this file contains placeholder values. You will need to replace them with your actual Firebase project credentials to use the backend services.
