import React from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";

function BrowsePage() {
    const Products = [{
        title: "Calculator",
        price: "₹500"
    },
    {
        title: "Laptop",
        price: "₹25000"
    },
    {
        title: "Engineering Graphics Book",
        price: "₹300"
    },
    {
        title: "Headphones",
        price: "₹1500"
    },
    {
        title: "Cycle",
        price: "₹4000"
    },
    {
        title:"Notes Bundle",
        price:"₹100"
    }];
    return (
      <>
        <Navbar type="student" />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Browse Products</h1>
          <div className="mb-6 flex items-center px-4 py-3 border rounded-lg bg-white">
            <FaSearch className="text-gray-400 mr-2" />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="px-4 py-2 rounded-full bg-blue-400 text-white">
              All
            </button>
            <button className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100">
              Books
            </button>
            <button className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100">
              Electronics
            </button>
            <button className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100">
              Notes
            </button>
            <button className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100">
              Stationery
            </button>
            <button className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100">
              Hostel
            </button>
            <button className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100">
              Others
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Products.map((Product) => (
              <ProductCard title={Product.title} price={Product.price} />
            ))}
          </div>
        </div>
      </>
    );
}

export default BrowsePage;