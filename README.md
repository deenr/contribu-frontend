# Contribu.me - Monorepo for UI Components, Landing Page, and Application

Contribu.me is a web application designed to help developers manage their contributions across various platforms while ensuring privacy and security. This project is structured as a monorepo, containing reusable UI components, a landing page, and the main application, all built using React, TypeScript, and Vite, with Turbo for efficient build and development processes.

## Project Structure

- **UI Components**: Reusable components for building the user interface.
- **Landing Page**: A promotional page that highlights the features of Contribu.me.
- **Main Application**: The core application where users can manage their contributions.

## Features

- **Encrypted Commit Logs**: Protect sensitive commit messages by encrypting them for secure, read-only access.
- **Unified Contribution History**: Easily display your work from various platforms on your GitHub profile.
- **Privacy Guaranteed**: Commit metadata only—your code stays private and secure.
- **Streamlined and Secure**: Contribu.me simplifies the process, providing peace of mind and a professional portfolio.

## Getting Started

To get started with Contribu.me, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/contribu-me.git
   cd contribu-me
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

## Using Turbo

This project uses [Turbo](https://turbo.build/) to optimize the build and development processes. Turbo allows for faster builds and improved performance in a monorepo setup.

### Running Turbo Commands

- To build the entire project:

  ```bash
  npx turbo build
  ```

- To run the development server for all packages:

  ```bash
  npx turbo dev
  ```

- To run tests across all packages:
  ```bash
  npx turbo test
  ```

## ESLint Configuration

If you are developing a production application, we recommend updating the ESLint configuration to enable type-aware lint rules. Here's how to do it:

- Configure the top-level `parserOptions` property in your ESLint config:

  ```js
  export default tseslint.config({
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname
      }
    }
  });
  ```

- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
- Optionally add `...tseslint.configs.stylisticTypeChecked`.
- Install `eslint-plugin-react` and update the config:

  ```js
  // eslint.config.js
  import react from 'eslint-plugin-react';

  export default tseslint.config({
    settings: { react: { version: '18.3' } },
    plugins: {
      react
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules
    }
  });
  ```

## Contributing

We welcome contributions to Contribu.me! If you have suggestions or improvements, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Turbo](https://turbo.build/)
- [Zod](https://zod.dev/)
- [Framer Motion](https://www.framer.com/motion/)
