import React from "react";
import { useState } from "react";

const MyListing = () => {
  const [listings, setListings] = useState([
    {
      _id: 1,
      title: "Engineering Graphics Book",
      price: 300,
      image: "https://via.placeholder.com/300x200",
      status: "available",
    },
    {
      _id: 2,
      title: "Calculator",
      price: 500,
      image: "https://via.placeholder.com/300x200",
      status: "sold",
    },
  ]);
  const markAsSold = (id) => {
    setListings(
      listings.map((item) =>
        item._id === id ? { ...item, status: "sold" } : item,
      ),
    );
  };
  const deleteListing = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?",
    );

    if (!confirmed) return;
    setListings(listings.filter((item) => item._id !== id));
  };
  if (listings.length === 0) {
    return (
      <>
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">
            You haven't listed anything yet.
          </h2>
          <p className="text-slate-500 mt-2">Sell something!</p>
        </div>
      </>
    );
  }
  return (
    <>  
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">My Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-3">{item.title}</h2>
              <p className="text-blue-700 font-bold">₹{item.price}</p>
              <span
                className={
                  item.status === "available"
                    ? "bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs font-semibold"
                    : "bg-slate-100 text-slate-500 rounded-full px-2 py-1 text-xs font-semibold"
                }
              >
                {item.status === "available" ? "Available" : "Sold"}
              </span>
              <div className="flex gap-2 mt-4">
                {item.status === "available" && (
                  <button
                    onClick={() => markAsSold(item._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Mark as Sold
                  </button>
                )}

                <button
                  onClick={() => deleteListing(item._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyListing;
