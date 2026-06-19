import React from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
const ProductDetailPage = () => {
  const { id } = useParams();
  const { state: product } = useLocation();
  if (!product) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }
  console.log(id);
  console.log(product);
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || "https://via.placeholder.com/600x400",
  );
  const [wishlisted, setWishlisted] = useState(false);
  const isSeller = false;
  return (
    <>
      <div className="min-h-screen p-8 bg-slate-50">
        <img
          src={selectedImage}
          alt={product.title}
          className="w-full max-w-xl rounded-xl"
        />
        <div className="flex gap-2 mt-4">
          {product?.images?.map((image) => (
            <img
              key={image}
              src={image}
              alt=""
              onClick={() => setSelectedImage(image)}
              className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
            />
          ))}
        </div>
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <p className="text-2xl font-semibold text-blue-700 mt-2">
          {product.price}
        </p>

        <span className="bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-sm">
          {product.category}
        </span>
        <div className="mt-6">
          <h2 className="font-semibold text-lg">Description</h2>

          <p className="text-slate-600 mt-2">{product.description}</p>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold">Seller</h2>

          <p>{product.seller}</p>
        </div>
        {isSeller ? (
          <>
            <div className="flex gap-4 mt-8">
              <button className="bg-blue-700 text-white rounded-lg px-6 py-2 hover:bg-blue-900">
                Edit
              </button>
              <button className="border border-red-700 text-red-700 rounded-lg px-6 py-2 hover:bg-red-400">
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-4 mt-8">
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">
                Add to Cart
              </button>

              <button
                className="border border-blue-700 text-blue-700 px-4 py-2 rounded-lg"
                onClick={() => setWishlisted(!wishlisted)}
              >
                {wishlisted ? "♥ Wishlisted" : "♡ Wishlist"}
              </button>

              <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Chat with Seller
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;
