import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { Layout } from "./layouts/Layout";
import Login from "./components/Login";
import User from "./components/User";
import { AuthProvider } from "./Auth/AuthContext";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import Client from "./components/Client";
import VisionAi from "./components/VisionAi";
import Chatbot from "./components/Chatbot";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user",
          element: (
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          ),
        },
        {
          path: "/client",
          element: (
            <ProtectedRoute>
              <Client />
            </ProtectedRoute>
          ),
        },
        {
          path: "/visionAi",
          element: (
            <ProtectedRoute>
              <VisionAi />
            </ProtectedRoute>
          ),
        },
        {
          path: "/chatbot",
          element: (
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          ),
        },

        {
          path: "*",
          element: <Navigate to="/dashboard" replace />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute>
          <Login />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/dashboard" replace />,
    },
  ]);

  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
