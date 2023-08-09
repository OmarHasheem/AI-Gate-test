import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/Login";
import {QueryClient, QueryClientProvider} from "react-query";
import RegisterPage from "./pages/Register";
import RootPage from "./pages/Root";
import {ticketRoutes} from "./routes/ticket";
import {logout as logoutLoader} from "./api/authApi";
import WelcomePage from "./pages/WelcomPage";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootPage />,
      children: [
        {
          index:true,
          element: <WelcomePage />,
        },
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/logout',
          element:<LoginPage />,
          loader: logoutLoader,
        },
        {
          path: '/register',
          element: <RegisterPage />
        },
          ticketRoutes,
      ],
    }
  ]);

  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  );
}

export default App;
