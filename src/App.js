import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import CheckOut from "./pages/CheckOut";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AdminOrders from "./pages/AdminOrders";
import Dashboard from "./pages/Dashboard";
import NoAccess from "./pages/NoAccess";
import { useSelector } from "react-redux";
import { selectUserInfo } from "./redux/slice/authSlice";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  const user = useSelector(selectUserInfo);
  const adminPath = user.isAdmin ? "/admin" : "/";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/admin",
          element: user.isAdmin ? <Admin /> : <NoAccess />,
        },
        {
          path: "/admin-orders",
          element: <AdminOrders />,
        },
        {
          path: "/checkout",
          element: <CheckOut />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
  ]);
  return (
    <section>
      <RouterProvider router={router} />
    </section>
  );
}

export default App;
