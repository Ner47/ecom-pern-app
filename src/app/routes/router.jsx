import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../../pages/HomePage/HomePage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { CartPage } from "../../pages/CartPage/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage/CheckoutPage";
import { OrdersPage } from "../../pages/OrdersPage/OrdersPage";
import { OrderDetailsPage } from "../../pages/OrderDetailsPage/OrderDetailsPage";
import { ProductDetailsPage } from "../../pages/ProductDetailsPage/ProductDetailsPage";
import { AccountPage } from "../../pages/AccountPage/AccountPage";
import { NotFoundPage } from "../../pages/NotFoundPage";

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
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetailsPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
