import { useState, useEffect } from "react";
import { IconHeart } from "@tabler/icons-react";
import ProductCard from "../../components/ProductCard";
import Skeleton from "../../components/ui/Skeleton";
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

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Skeleton className="h-8 w-48" />
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4 mt-3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <IconHeart size={48} className="mx-auto text-ink-muted" aria-hidden="true" />
        <h1 className="mt-4 text-[16px] font-medium text-ink-primary">You haven't saved anything yet</h1>
        <p className="mt-2 text-ink-secondary">Items you save will show up here so you can find them easily.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-h1 font-bold tracking-[-0.02em] text-ink-primary">My Wishlist</h1>
      {error && (
        <p role="alert" className="mt-4 rounded-2xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <ProductCard key={item._id} product={item}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFromWishlistHandler(item._id);
              }}
              className="mt-2 w-full rounded-full border border-border h-9 text-sm font-medium text-ink-secondary transition-all duration-200 hover:border-destructive hover:text-destructive hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
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
