import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sell() {
  function handlesubmit(e) {
    e.preventDefault();
  }
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [group, setGroup] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (imageUrls.length === 0)
      return alert("Please upload at least one image");
    const data = { title, description, price, category, images: imageUrls };
    await createListing(data); 
    navigate("/my-listings");
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

          <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
            <h2 className="font-semibold">1. Product Details</h2>
            <div className="flex flex-col gap-2">
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
            </div>
            <h2 className="font-semibold">2. Pricing & Catergory</h2>
            <div className="flex flex-col gap-2">
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
            </div>
            <h2 className="font-semibold">3. Product Images</h2>
            <div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="border rounded-lg p-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition"
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
