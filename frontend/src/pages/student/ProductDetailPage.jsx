import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  addToCart,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([getProductById(id), getWishlist()])
      .then(([productRes, wishlistRes]) => {
        setProduct(productRes.data);
        setSelectedImage(productRes.data.images?.[0] || "https://via.placeholder.com/600x400");
        setWishlisted(wishlistRes.data.some((p) => p._id === id));
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-slate-500">Loading...</div>;
  if (error || !product) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">{error || "Product not found"}</h1>
      </div>
    );
  }

  const sellerId = product.sellerId?._id || product.sellerId;
  const sellerName = product.sellerId?.name || "Unknown seller";
  const isSeller = sellerId === user?._id;

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id);
      setActionMessage("Added to cart");
    } catch (err) {
      setActionMessage(err.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleToggleWishlist = async () => {
    try {
      if (wishlisted) {
        await removeFromWishlist(product._id);
        setWishlisted(false);
      } else {
        await addToWishlist(product._id);
        setWishlisted(true);
      }
    } catch (err) {
      setActionMessage(err.response?.data?.message || "Failed to update wishlist");
    }
  };

  const handleChat = () => {
    // One room per pair of people — independent of product, sorted so it's
    // the same roomId no matter who's buying/selling or who opens it first.
    const roomId = [user._id, sellerId].sort().join("_");
    navigate("/student/chats", { state: { roomId, otherUserName: sellerName } });
  };

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
        <h1 className="text-3xl font-bold mt-4">{product.title}</h1>

        <p className="text-2xl font-semibold text-blue-700 mt-2">
          ₹{product.price}
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

          <p>{sellerName}</p>
        </div>

        {actionMessage && (
          <p className="text-sm text-blue-700 mt-4">{actionMessage}</p>
        )}

        {isSeller ? (
          <div className="flex gap-4 mt-8">
            <span className="text-slate-500">This is your own listing.</span>
          </div>
        ) : (
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              disabled={product.status === "sold"}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {product.status === "sold" ? "Sold Out" : "Add to Cart"}
            </button>

            <button
              className="border border-blue-700 text-blue-700 px-4 py-2 rounded-lg"
              onClick={handleToggleWishlist}
            >
              {wishlisted ? "♥ Wishlisted" : "♡ Wishlist"}
            </button>

            <button
              onClick={handleChat}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Chat with Seller
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;
