import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
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

  if (loading) return <div className="p-8 text-slate-500">Loading...</div>;

  if (wishlistItems.length === 0) {
    return (
      <>
        <div className="text-center mt-20">
          <h1 className="text-2xl font-semibold text-blue-900">
            You haven't saved anything yet!!
          </h1>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className=" text-blue-700 font-bold text-3xl mb-6">My Wishlist</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map((item) => (
            <ProductCard key={item._id} product={item}>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => removeFromWishlistHandler(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  ♥ Remove
                </button>
              </div>
            </ProductCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
