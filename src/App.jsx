import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import AuthProviderWithNavigate from "./components/AuthProviderWithNavigate";

/**
 * The root component of the app.
 *
 * Wraps the app with the AuthProvider, which provides
 * authentication state and functionality to the app.
 *
 * Also sets up the client-side router with the routes
 * defined above.
 */
function App() {
  return (
    <RouterProvider router={router} chlildren={<AuthProviderWithNavigate />} />
  );
}

export default App;
