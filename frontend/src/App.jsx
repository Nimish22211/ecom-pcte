import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/student/Dashboard";
import Collections from "./pages/student/Collections";
import Wishlist from "./pages/student/Wishlist";
import MyListing from "./pages/student/MyListing";
import Layout from "./components/Layout";
import Chats from "./pages/student/Chats";
import Profile from "./pages/student/Profile";
import Logout from "./pages/student/Logout";
import ProductDetailPage from "./pages/student/ProductDetailPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PendingPage from "./pages/PendingPage";
import Sell from "./pages/student/Sell";
import Cart from "./pages/student/Cart";
import DeanLoginPage from "./pages/admin/DeanLoginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/student",
      element: <Layout />,
      children: [
        {
          path: "/student",
          element: <Dashboard />,
        },
        {
          path: "/student/collections",
          element: <Collections />,
        },
        {
          path: "/student/product/:id",
          element: <ProductDetailPage />,
        },
        {
          path: "/student/wishlist",
          element: <Wishlist />,
        },
        {
          path: "/student/sell",
          element: <Sell />,
        },
        {
          path: "/student/my-listing",
          element: <MyListing />,
        },
        {
          path: "/student/chats",
          element: <Chats />,
        },
        {
          path: "/student/cart",
          element: <Cart />,
        },
        {
          path: "/student/my-profile",
          element: <Profile />,
        },
        {
          path: "/student/logout",
          element: <Logout />,
        },
      ],
    },
    {
      path: "/",
      element: <LandingPage />,
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
      path: "/pending",
      element: <PendingPage />,
    },
    {
      path: "/admin/login",
      element: <DeanLoginPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
