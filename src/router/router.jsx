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

const router = createBrowserRouter([
    {
        path : "/",
        element : <Layout/>,
        errorElement : <NotFoundPage/>,
        children : [{
            index : true,
            element : <DashboardPage />

        },
        {
            path : "/products",
            element : <ProductsPage/>
        },
        {
            path : "/products/create", 
            element : <ProductCreatePage />
        },
        {
            path : "/products/edit/:id" , 
            element : <ProductEditPage />
        },
        {
            path : "/Sales",
            element : <SalesPage />
        },
        {
            path : "voucher",
            element : <VoucherPage />
        },
        {
            path : "/voucher-detail/:id",
            element : <VoucherDetailPage />
        }
    ]
    }
]
    
)
export default router;