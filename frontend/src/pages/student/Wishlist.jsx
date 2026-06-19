import React from "react";
import { useState } from "react";
import ProductCard from "../../components/ProductCard";
const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      _id: 1,
      title: "Engineering Graphics Book",
      price: "₹300",
      category: "Books",
      description:
        "Almost new condition. Used for one semester and contains no markings.",
      seller: "Priya Das",
      images: [
        "https://via.placeholder.com/600x400?text=Book+1",
        "https://via.placeholder.com/600x400?text=Book+2",
      ],
    },
    {
      _id: 2,
      title: "Calculator",
      price: "₹500",
      category: "Stationery",
      description:
        "Scientific calculator in excellent condition. Suitable for engineering and mathematics courses.",
      seller: "Rahul Sharma",
      images: [
        "https://via.placeholder.com/600x400?text=Calculator+1",
        "https://via.placeholder.com/600x400?text=Calculator+2",
      ],
    },
  ]);
  const removeFromWishlistHandler = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item._id !== id));
  };
  if (wishlistItems.length === 0) {
    return (
      <>
        <div className="text-center mt-20">
          <h1 className="text-2xl font-semibold text-blue-900">
            You haven't saved anything yet!!
          </h1>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className=" text-blue-700 font-bold text-3xl mb-6">My Wishlist</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map((item) => (
            <ProductCard product={item}>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => removeFromWishlistHandler(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  ♥ Remove
                </button>
              </div>
            </ProductCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
