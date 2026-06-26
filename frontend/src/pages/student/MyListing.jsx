import { useState, useEffect } from "react";
import { IconPackage } from "@tabler/icons-react";
import Skeleton from "../../components/ui/Skeleton";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import {
  getMyListings,
  markProductAsSold,
  markProductAsAvailable,
  deleteProduct,
} from "../../services/api";

const MyListing = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyListings()
      .then(({ data }) => setListings(data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load listings"))
      .finally(() => setLoading(false));
  }, []);

  const markAsSold = async (id) => {
    try {
      await markProductAsSold(id);
      setListings((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: "sold" } : item))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark as sold");
    }
  };

  const markAsAvailable = async (id) => {
    try {
      await markProductAsAvailable(id);
      setListings((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: "available" } : item))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark as available");
    }
  };

  const deleteListing = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmed) return;
    try {
      await deleteProduct(id);
      setListings((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete listing");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Skeleton className="h-8 w-48" />
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <IconPackage size={48} className="mx-auto text-ink-muted" aria-hidden="true" />
        <h2 className="mt-4 text-[16px] font-medium text-ink-primary">You haven't listed anything yet</h2>
        <p className="mt-2 text-ink-secondary">Sell something to get started.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-h1 font-bold tracking-[-0.02em] text-ink-primary">My Listings</h1>
      {error && (
        <p role="alert" className="mt-4 rounded-2xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden rounded-[28px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.18)]"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#F5F5F5]">
              <img
                src={item.images?.[0] || "https://via.placeholder.com/300x200"}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="line-clamp-1 text-[16px] font-semibold text-ink-primary">{item.title}</h2>
                <Badge variant={item.status === "available" ? "success" : "default"} className="shrink-0">
                  {item.status === "available" ? "Available" : "Sold"}
                </Badge>
              </div>
              <p className="mt-1 font-semibold text-ink-primary">₹{item.price}</p>
              <div className="mt-4 flex gap-2">
                {item.status === "available" ? (
                  <Button variant="secondary" className="h-9 text-[13px]" onClick={() => markAsSold(item._id)}>
                    Mark as Sold
                  </Button>
                ) : (
                  <Button variant="secondary" className="h-9 text-[13px]" onClick={() => markAsAvailable(item._id)}>
                    Mark as Unsold
                  </Button>
                )}

                <Button variant="destructive" className="h-9 text-[13px]" onClick={() => deleteListing(item._id)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListing;
