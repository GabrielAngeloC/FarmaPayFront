import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentsPage from "./pages/PaymentsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/customers",
    element: <CustomersPage />,
    },
    {
    path: "/orders",
    element: <OrdersPage />,
    },
    {
    path: "/payments",
    element: <PaymentsPage />,
    },
]);