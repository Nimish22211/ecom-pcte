import { useState, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";
import ProductCard from "../../components/ProductCard";
import Skeleton from "../../components/ui/Skeleton";
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
    <div className="w-full mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-h1 font-bold tracking-[-0.02em] text-ink-primary">Browse Products</h1>
        {!loading && (
          <span className="text-sm text-ink-muted">{filteredProducts.length} products</span>
        )}
      </div>

      <div className="mt-6 flex items-center gap-2.5 rounded-[20px] border border-border bg-white px-5 h-11 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 focus-within:border-ink-primary focus-within:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <IconSearch size={18} className="flex-shrink-0 text-ink-muted" aria-hidden="true" />
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <input
          id="product-search"
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-ink-primary placeholder:text-ink-muted outline-none bg-transparent"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
            className={`rounded-full border px-5 h-9 text-sm font-medium transition-all duration-200 focus-visible:outline-none ${
              selectedCategory === category
                ? "border-ink-primary bg-accent text-accent-fg shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
                : "border-border bg-white text-ink-secondary hover:border-border-hover hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {loading && (
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4 mt-3" />
                <Skeleton className="h-4 w-1/3 mt-2" />
              </div>
            ))}
          </div>
        )}
        {!loading && error && (
          <p role="alert" className="rounded-2xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="rounded-[28px] border border-dashed border-border bg-white px-4 py-12 text-center text-ink-secondary">
            No products found.
          </p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
