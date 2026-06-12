import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";

function SellPage() {
  function handlesubmit(e) {
    e.preventDefault();
  }
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [group, setGroup] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
    <Navbar type="student"/>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 to-slate-50">
        <div className=" bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl text-center font-bold text-blue-600 mb-4">
            Sell your Products
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
            <input
              type="text"
              placeholder="Product Name"
              className="border rounded-lg px-4 py-2  "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Product Description"
              className="border rounded-lg px-4 py-2  "
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price(₹)"
              className="border rounded-lg px-4 py-2  "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <select
              className="border rounded-lg px-4 py-2"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option value="Select">Select Catergory</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded-lg"
            >
              {loading ? "Posting..." : "Post Listing"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SellPage;
