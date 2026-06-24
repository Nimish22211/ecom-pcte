import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Browse Products</h1>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 transition-colors focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/30">
        <svg
          className="h-5 w-5 flex-shrink-0 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <input
          id="product-search"
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-slate-900 placeholder:text-slate-400 outline-none"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
              selectedCategory === category
                ? "border-primary-700 bg-primary-700 text-white shadow-card"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {loading && <Loader />}
        {!loading && error && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-12 text-center text-slate-500">
            No products found.
          </p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
