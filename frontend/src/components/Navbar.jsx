import { Link } from "react-router-dom";
import React from "react";

function Navbar({type}) {
    return (
      <nav className="flex justify-between items-center bg-gradient-to-r py-4 px-6 from-blue-800 to-indigo-200">
        <Link to="/" className="text-2xl font-bold text-white">
          CampusCart
        </Link>
        {type === "guest" && (
          <div className="flex justify-around gap-4">
            <Link
              to="/login"
              className="text-blue-950 hover:text-blue-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-blue-950 hover:text-blue-600 transition-colors"
            >
              Register
            </Link>
          </div>
        )}
        {type === "student" && (
          <div className="flex items-center gap-4">
            <Link
              to="/browse"
              className="text-blue-950 hover:text-blue-600 transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/sell"
              className="text-blue-950 hover:text-blue-600 transition-colors"
            >
              Sell
            </Link>
            <Link
              to="/my-listings"
              className="text-blue-950 hover:text-blue-600 transition-colors"
            >
              My Listings
            </Link>
            <Link
              to="/cart"
              className="text-blue-950 hover:text-blue-600 transition-colors"
            >
              Cart
            </Link>
            <Link
              to="/wishlist"
              className="text-blue-950 hover:text-blue-600 transition-colors"
            >
              Wishlist
            </Link>
            <Link
              to="/chat"
              className="text-blue-950 hover:text-blue-600 transition-colors"
            >
              Chat
            </Link>
            <button className="text-blue-950 hover:text-blue-600 transition-colors">
              Student ▼
            </button>
          </div>
        )}
        {type === "dean" && (
          <div className="flex items-center gap-8">
            <div className="flex gap-10">
              <Link
                to="/admin/dashboard"
                className="text-blue-950 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>

              <Link
                to="/admin/students"
                className="text-blue-950 hover:text-blue-600 transition-colors"
              >
                Students
              </Link>
            </div>

            <button className="text-blue-950 hover:text-blue-600 transition-colors">
              Dean ▼
            </button>
          </div>
        )}
      </nav>
    );
}

export default Navbar;