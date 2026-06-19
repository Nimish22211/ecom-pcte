import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/ImageUploader";
import { createListing } from "../../services/api";

const CATEGORIES = ["Books", "Electronics", "Notes", "Stationery", "Hostel", "Other"];

function Sell() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (imageUrls.length === 0) return setError("Please upload at least one image");
    if (!category) return setError("Please select a category");

    setLoading(true);
    try {
      const data = { title, description, price: Number(price), category, images: imageUrls };
      await createListing(data);
      navigate("/student/my-listing");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center ">
        <div className=" bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl">
          <div>
            <h1 className="text-4xl text-center font-bold text-blue-600 ">
              Create New Listing
            </h1>
            <p className="text-center mb-4 text-blue-950 font-serif ">
              Sell your products to students on campus
            </p>
          </div>

          {error && (
            <p className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-2 mb-4">
              {error}
            </p>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h2 className="font-semibold">1. Product Details</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Product Name"
                className="border rounded-lg px-4 py-2  "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Product Description"
                className="border rounded-lg px-4 py-2  "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <h2 className="font-semibold">2. Pricing & Category</h2>
            <div className="flex flex-col gap-2">
              <input
                type="number"
                placeholder="Price(₹)"
                className="border rounded-lg px-4 py-2  "
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min={1}
              />
              <select
                className="border rounded-lg px-4 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <h2 className="font-semibold">3. Product Images</h2>
            <ImageUploader onUploadComplete={setImageUrls} maxImages={3} />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition disabled:opacity-60"
            >
              {loading ? "Posting..." : "Post Listing"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Sell;
