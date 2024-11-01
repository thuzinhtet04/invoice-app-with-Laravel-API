import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../Pages/Dashboard.page";
import NotFoundPage from "../Pages/NotFound.page";
import Layout from "../components/Layout.component";
import ProductsPage from "../Pages/Products.page";
import SalesPage from "../Pages/Sales.page";
import VoucherDetailPage from "../Pages/VoucherDetail.page";
import VoucherPage from "../Pages/Voucher.page";
import ProductCreatePage from "../Pages/ProductCreate.page";
import ProductEditCard from "../components/ProductEditCard";
import ProductEditPage from "../Pages/ProductEdit.page";
import LoginPage from "../Pages/Login.page";
import RegisterPage from "../Pages/Register.page";
import ProfilePage from "../Pages/Profile.page";
import ChangeNamePage from "../Pages/ChangeName.page";
import ChangePhotoPage from "../Pages/ChangePhoto.page";
import ChangePasswordPage from "../Pages/ChangePassword.page";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/dashboard",
        element: <Layout />,

        children: [
          {
            index: true,
            element: <DashboardPage />,
          },

          {
            path: "products",
            element: <ProductsPage />,
          },
          {
            path: "products/create",
            element: <ProductCreatePage />,
          },
          {
            path: "products/edit/:id",
            element: <ProductEditPage />,
          },
          {
            path: "sales",
            element: <SalesPage />,
          },
          {
            path: "voucher",
            element: <VoucherPage />,
          },
          {
            path: "voucher-detail/:id",
            element: <VoucherDetailPage />,
          },
          {
            path: "user-profile",

            children: [
              {
                index: true,
                element: <ProfilePage />,
              },
              {
                path: "change-name",
                element: <ChangeNamePage />,
              },
              {
                path: "change-photo",
                element: <ChangePhotoPage />,
              },
              {
                path: "change-password",
                element: <ChangePasswordPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
export default router;
