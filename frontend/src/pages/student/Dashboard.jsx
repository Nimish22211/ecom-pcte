import React from "react";
import { useState } from "react";
const Dashboard = () => {
  const [solditems, setSolditems] = useState([
    {
      _id: "1",
      title: "Calculator",
      price: 500,
      image: "image-url",
      status: "sold",
      soldAt: "2026-06-17T08:30:00.000Z",
    },
    {
      _id: "2",
      title: "Engineering Graphics Book",
      price: 300,
      image: "image-url",
      status: "sold",
      soldAt: "2026-06-15T10:20:00.000Z",
    },
  ]);
  const total = solditems.reduce((sum, item) => {
    return sum + item.price;
  }, 0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                  src="https://via.placeholder.com/100"
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>

                  <p className="text-green-600 font-medium">₹{item.price}</p>

                  <p className="text-sm text-slate-500">
                    Sold on {new Date(item.soldAt).toLocaleDateString()}
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
