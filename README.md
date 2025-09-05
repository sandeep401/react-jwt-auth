# React JWT Authentication Example

This project demonstrates how to implement JWT-based authentication in a React application using Vite.

## Features

- React + Vite setup with HMR
- JWT authentication flow (login, logout, protected routes)
- Minimal ESLint configuration
- Example API integration

## Getting Started

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Run the development server:**
   ```
   npm run dev
   ```

3. **Build for production:**
   ```
   npm run build
   ```

## Authentication Flow

- Users log in with credentials.
- JWT token is stored securely (e.g., in localStorage).
- Protected routes require a valid token.
- Logout clears the token.

## Useful Links

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [JWT Introduction](https://jwt.io/introduction/)

## ESLint

For production, consider expanding the ESLint configuration and using TypeScript. See the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for more