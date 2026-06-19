import React from "react";
import { useState, useEffect } from "react";
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

  if (loading) return <div className="p-8 text-slate-500">Loading...</div>;

  if (error) return <div className="p-8 text-red-600">{error}</div>;

  if (solditems.length === 0) {
    return (
      <>
        <div className="text-center mt-20">
          <div className="text-6xl mb-4">📦</div>

          <h2 className="text-2xl font-semibold">No Sold Items Yet</h2>

          <p className="text-slate-500 mt-2">
            Your completed sales will appear here.
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Sold Dashboard</h1>

          <p className="text-slate-500 mt-1">
            Track your completed sales and earnings
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Earned</p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">₹{total}</h2>

          <p className="text-slate-500 mt-2">{solditems.length} items sold</p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Sold Products</h2>

          <div className="grid gap-4">
            {solditems.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4"
              >
                <img
                  src={item.images?.[0] || "https://via.placeholder.com/100"}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>

                  <p className="text-green-600 font-medium">₹{item.price}</p>

                  <p className="text-sm text-slate-500">
                    Sold on {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
