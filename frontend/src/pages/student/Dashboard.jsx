import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { getMySoldItems } from "../../services/api";

const Dashboard = () => {
  const [solditems, setSolditems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMySoldItems()
      .then(({ data }) => setSolditems(data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load sold items"))
      .finally(() => setLoading(false));
  }, []);

  const total = solditems.reduce((sum, item) => sum + item.price, 0);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      </div>
    );
  }

  if (solditems.length === 0) {
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
        <h2 className="mt-4 text-2xl font-semibold text-slate-900">No Sold Items Yet</h2>
        <p className="mt-2 text-slate-500">Your completed sales will appear here.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Sold Dashboard</h1>
        <p className="mt-1 text-slate-500">Track your completed sales and earnings</p>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-primary-700 to-primary-900 p-8 text-white shadow-card">
        <p className="text-sm text-primary-100">Total Earned</p>
        <h2 className="mt-2 text-4xl font-bold">₹{total}</h2>
        <p className="mt-2 text-primary-100">{solditems.length} items sold</p>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Sold Products</h2>
        <div className="grid gap-4">
          {solditems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <img
                src={item.images?.[0] || "https://via.placeholder.com/100"}
                alt={item.title}
                className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="font-medium text-green-600">₹{item.price}</p>
                <p className="text-sm text-slate-500">
                  Sold on {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
