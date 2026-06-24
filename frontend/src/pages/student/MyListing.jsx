import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
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

  if (loading) return <Loader />;

  if (listings.length === 0) {
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
        <h2 className="mt-4 text-xl font-semibold text-slate-900">
          You haven't listed anything yet
        </h2>
        <p className="mt-2 text-slate-500">Sell something to get started.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">My Listings</h1>
      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
              <img
                src={item.images?.[0] || "https://via.placeholder.com/300x200"}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="line-clamp-1 text-lg font-semibold text-slate-900">{item.title}</h2>
                <span
                  className={
                    item.status === "available"
                      ? "shrink-0 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700"
                      : "shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500"
                  }
                >
                  {item.status === "available" ? "Available" : "Sold"}
                </span>
              </div>
              <p className="mt-1 font-bold text-primary-700">₹{item.price}</p>
              <div className="mt-4 flex gap-2">
              {item.status === "available" ? (
                <button
                  type="button"
                  onClick={() => markAsSold(item._id)}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  Mark as Sold
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => markAsAvailable(item._id)}
                  className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                >
                  Mark as Unsold
                </button>
              )}

              <button
                type="button"
                onClick={() => deleteListing(item._id)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              >
                Delete
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListing;
