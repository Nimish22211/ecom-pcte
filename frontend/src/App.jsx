import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DeanLoginPage from "./pages/admin/DeanLoginPage";
import PendingPage from "./pages/PendingPage";
import BrowsePage from "./pages/BrowsePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import SellPage from "./pages/SellPage";
import MyListingPage from "./pages/MyListingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/login" element={<DeanLoginPage />} />
        <Route path="/pending" element={<PendingPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/my-listings" element={<MyListingPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
