# Periodic Table App

This project is an interactive periodic table of elements, built using Vue 3. It utilizes modern web technologies and tools to provide a rich user experience with reactive components and state management.

## Technologies and Tools

- **Core**: Vue 3 for the frontend framework, Pinia for state management, and Vue Router for SPA routing.
- **Styling**: Bootstrap for responsive UI components and layout.
- **Development**: Vite as the build tool and development server.
- **Testing**:
  - Jest for unit testing (currently facing integration challenges with TypeScript).
  - Playwright for end-to-end testing (integration challenges).
  - Lighthouse for performance auditing (integration challenges).
- **Code Quality**: ESLint for linting and Prettier for code formatting.
- **TypeScript**: Used throughout the project for type safety.
- **CI/CD**: GitHub Actions is configured for the `main` branch, automating linting, building, and preliminary test runs.
- **Utilities**: Includes Husky for pre-commit hooks, and Lint-Staged for staged files linting.

## Current Challenges

We are currently facing difficulties integrating our TypeScript tests with Jest, Playwright, and Lighthouse within our CI/CD pipeline. Efforts are ongoing to resolve these integration issues to ensure robust testing across the application.

## Installation and Setup

To get started with the Periodic Table App, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Jagoda11/periodic-table-app.git
    cd periodic-table-app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the development server**:

    ```bash
    npm run dev
    ```

    This will start the application on a local development server, typically available at `http://localhost:3000`.

4. **Build for production**:

    ```bash
    npm run build
    ```

    This compiles and minifies the application for optimal performance in production.

5. **Lint the project**:

    ```bash
    npm run lint
    ```

    This command will check your code for linting errors and fix them automatically wherever possible.

## Additional Resources

- **License**: For more information on how you can use this project, see the [LICENSE.md](./LICENSE.md) file.
- **Collaboration**: If you're interested in contributing to the project, please review our [CONTRIBUTION.md](./CONTRIBUTION.md) guide for details on how to get started.

## Acknowledgments

This project utilizes various open-source libraries and frameworks. We extend our gratitude to the contributors of these projects.
