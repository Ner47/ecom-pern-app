import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/app/layouts/MainLayout";
import { HomePage } from "@/pages/HomePage/HomePage";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage/RegisterPage";
import { CartPage } from "@/pages/CartPage/CartPage";
import { CheckoutPage } from "@/pages/CheckoutPage/CheckoutPage";
import { OrdersPage } from "@/pages/OrdersPage/OrdersPage";
import { OrderDetailsPage } from "@/pages/OrderDetailsPage/OrderDetailsPage";
import { ProductDetailsPage } from "@/pages/ProductDetailsPage/ProductDetailsPage";
import { AccountPage } from "@/pages/AccountPage/AccountPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

import { PrivateRoute } from "@/features/auth";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders/:orderId",
        element: (
          <PrivateRoute>
            <OrderDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/account",
        element: (
          <PrivateRoute>
            <AccountPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
