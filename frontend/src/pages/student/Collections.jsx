import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { FaSearch } from "react-icons/fa";
import { getProducts } from "../../services/api";

const CATEGORIES = [
  "All",
  "Books",
  "Electronics",
  "Notes",
  "Stationery",
  "Hostel",
  "Other",
];

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProducts(selectedCategory !== "All" ? selectedCategory : undefined)
      .then(({ data }) => setProducts(data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load products"))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Browse Products</h1>
        <div className="mb-6 flex items-center px-4 py-3 border rounded-lg bg-white">
          <FaSearch className="text-gray-400 mr-2" />

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition
        ${
          selectedCategory === category
            ? "bg-blue-500 text-white"
            : "border bg-white hover:bg-gray-100"
        }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading && <p className="text-slate-500">Loading products...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-slate-500">No products found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Collections;
