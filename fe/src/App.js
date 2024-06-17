import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./layout/LandingPage/LandingPage";
import Login from "./layout/Auth/Login";
import SignUp from "./layout/Auth/SignUp";
import Cart from "./layout/Cart/Cart";
import ProductListNKC from "./layout/Product/ProductListNKC";
import ProductDetail from "./layout/Product/ProductDetail";
import Checkout from "./layout/Checkout/Checkout";
import LoginEmp from "./layout/Dashboard/Auth/LoginEmp";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./layout/Dashboard/DashBoard";
import EmployeeManage from "./layout/Dashboard/Admin/EmployeeManage";
import CustomerManage from "./layout/Dashboard/Admin/CustomerManage";
import ProductManage from "./layout/Dashboard/ProductManage/ProductManage";
import OrderManage from "./layout/Dashboard/Order/OrderManage";
import GoldManage from "./layout/Dashboard/ProductManage/GoldManage";
import DiamondManage from "./layout/Dashboard/ProductManage/DiamondManage";
import SmallDiamondManage from "./layout/Dashboard/ProductManage/SmallDiamondManage";

const ROLES = {
  User: 2001,
  ADMIN: "Admin",
  SALESSTAFF: "Sales Staff",
};

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.SALESSTAFF]} />
              }
            >
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="/dashboard/employee" element={<EmployeeManage />} />
                <Route path="/dashboard/customer" element={<CustomerManage />} />
                <Route path="/dashboard/product" element={<ProductManage />} />
                <Route path="/dashboard/order" element={<OrderManage />} />
                <Route path="/dashboard/gold" element={<GoldManage />} />
                <Route path="/dashboard/diamond" element={<DiamondManage />} />
                <Route path="/dashboard/smalldiamond" element={<SmallDiamondManage />} />
              </Route>
            </Route>

            <Route path="/" element={<LandingPage />} />

            {/* authen */}
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in-employee" element={<LoginEmp />} />

            {/* cart */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/check-out" element={<Checkout />} />


            {/* ---------------- danh sach san pham ---------------------*/}
            <Route path="/product" element={<ProductListNKC />} />

            {/* thong tin chi tiet san pham */}
            <Route path="/product/:productId" element={<ProductDetail />} />


          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </>
  );
}

export default App;


