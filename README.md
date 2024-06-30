# Periodic Table App 🧪

This project is an interactive periodic table of elements, built using Vue 3 🛠️. It utilizes modern web technologies and tools to provide a rich user experience with reactive components and state management.

<p align="center">
  <img src="./assets/periodic-table-vue.png" alt="Screenshot of the app" width="400"/>
</p>

## Technologies and Tools 🛠️

- **Core**:
  - Vue 3 🖖 for the frontend framework.
  - Pinia 📦 for state management.
  - Vue Router 🚦 for SPA routing.
  
- **Styling**:
  - Bootstrap 🎨 for responsive UI components and layout.
  
- **Development**:
  - Vite ⚡ as the build tool and development server.
  
- **Testing**:
  - Jest 🃏 for unit testing, ensuring that individual components work as expected.
  - Playwright 🎭 for end-to-end testing, simulating user interactions and verifying the app's behavior in a browser environment.
  - Lighthouse 🌅 for performance and quality auditing, providing insights into how the app can be optimized for speed, accessibility, and SEO.
  
- **Code Quality**:
  - ESLint 🧹 for linting.
  - Prettier 🎨 for code formatting.
  
- **TypeScript**:
  - Used throughout the project for type safety 🛡️.
  
- **CI/CD**:
  - GitHub Actions 🚀 for automating linting, building, and test runs.
  
- **Utilities**:
  - Husky 🐶 for pre-commit hooks.
  - Lint-Staged 🚩 for staged files linting.

## Deployment 🚀

The Periodic Table App is deployed and available live on GitHub Pages. You can interact with the live application by visiting the following URL:

[Periodic Table App Live Demo](https://jagoda11.github.io/Periodic-Table-App/#/periodic-table)

This deployment showcases the latest stable version of the app. Feel free to explore the interactive periodic table and discover more about the elements!

## Code of Conduct 📜

We expect all contributors to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md) when participating in our project. Please review it before getting involved.

## Getting Started with the Periodic Table App 🚀

Follow these steps to set up the project on your local machine and get started with development.

## Initial Setup

1. **Clone the repository**:

   Get the code on your local machine by cloning the repository and then navigate to the project directory:

    ```bash
    git clone https://github.com/Jagoda11/periodic-table-app.git
    cd periodic-table-app
    ```

2. **Install dependencies**:

   Install the necessary project dependencies to get started with development:

    ```bash
    npm install
    ```

## Key Scripts Explained

Here's a breakdown of the main npm scripts you'll use to develop, test, and audit the Periodic Table App:

- **Local Development Server**:
  - `npm run dev`: 🌐 Starts the Vite development server for local development at `http://localhost:3000`. Ideal for your day-to-day development activities.

- **Building for Production**:
  - `npm run build`: 🏗️ Compiles and minifies the application for production, ensuring optimal performance.

- **Running Unit Tests**:
  - `npm run test`: 🧪 Executes the Jest test suites to validate the functionality of individual components.

- **Performing Lighthouse Audits**:
  - `npm run audit`: 🔍 Conducts a Lighthouse audit on your local server at `http://localhost:3000`, offering insights into the app's performance and quality.

- **End-to-End Testing**:
  - `npm run test:e2e:concurrently`: 🤖 Starts a separate server for end-to-end testing on `http://localhost:3001` and runs Playwright tests. This ensures a clean, isolated environment for accurate testing.

By following these instructions and using the scripts provided, you'll be able to effectively develop, test, and optimize your Periodic Table App. Happy coding! 🎉

## Additional Resources 📚

- **License** 📄: For more information on how you can use this project, see the [LICENSE.md](./LICENSE.md) file.
- **Collaboration** 👥: If you're interested in contributing to the project, please review our [CONTRIBUTION.md](./CONTRIBUTION.md) guide for details on how to get started.

## Acknowledgments 🙏

This project utilizes various open-source libraries and frameworks. We extend our gratitude 🙌 to the contributors of these projects.
