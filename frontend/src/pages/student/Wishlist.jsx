import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import { getWishlist, removeFromWishlist } from "../../services/api";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWishlist()
      .then(({ data }) => setWishlistItems(data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load wishlist"))
      .finally(() => setLoading(false));
  }, []);

  const removeFromWishlistHandler = async (id) => {
    try {
      await removeFromWishlist(id);
      setWishlistItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove from wishlist");
    }
  };

  if (loading) return <Loader />;

  if (wishlistItems.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <svg
          className="mx-auto h-12 w-12 text-slate-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">
          You haven't saved anything yet
        </h1>
        <p className="mt-2 text-slate-500">
          Items you save will show up here so you can find them easily.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">My Wishlist</h1>
      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <ProductCard key={item._id} product={item}>
            <button
              type="button"
              onClick={() => removeFromWishlistHandler(item._id)}
              className="mt-2 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Remove from Wishlist
            </button>
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
