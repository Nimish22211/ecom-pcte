import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  addToCart,
  getCart,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([getProductById(id), getWishlist(), getCart()])
      .then(([productRes, wishlistRes, cartRes]) => {
        setProduct(productRes.data);
        setSelectedImage(productRes.data.images?.[0] || "https://via.placeholder.com/600x400");
        setWishlisted(wishlistRes.data.some((p) => p._id === id));
        setInCart(
          cartRes.data.some((item) => (item.productId?._id || item.productId) === id)
        );
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error || !product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {error || "Product not found"}
        </p>
      </div>
    );
  }

  const sellerId = product.sellerId?._id || product.sellerId;
  const sellerName = product.sellerId?.name || "Unknown seller";
  const isSeller = sellerId === user?._id;

  const handleAddToCart = async () => {
    if (inCart) return;
    try {
      await addToCart(product._id);
      setInCart(true);
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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
            <img src={selectedImage} alt={product.title} className="h-full w-full object-cover" />
          </div>
          {product.images?.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View image ${index + 1} of ${product.title}`}
                  aria-pressed={selectedImage === image}
                  className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                    selectedImage === image ? "border-primary-600" : "border-transparent"
                  }`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>
          <p className="mt-2 text-2xl font-semibold text-primary-700">₹{product.price}</p>
          <span className="mt-3 inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
            {product.category}
          </span>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-slate-900">Description</h2>
            <p className="mt-2 text-slate-600">{product.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold text-slate-900">Seller</h2>
            <p className="mt-1 text-slate-600">{sellerName}</p>
          </div>

          {actionMessage && (
            <p role="status" aria-live="polite" className="mt-4 text-sm font-medium text-primary-700">
              {actionMessage}
            </p>
          )}

          {isSeller ? (
            <p className="mt-8 text-slate-500">This is your own listing.</p>
          ) : (
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.status === "sold" || inCart}
                className="rounded-lg bg-primary-700 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {product.status === "sold"
                  ? "Sold Out"
                  : inCart
                  ? "Already in Cart"
                  : "Add to Cart"}
              </button>

              <button
                type="button"
                onClick={handleToggleWishlist}
                aria-pressed={wishlisted}
                className="flex items-center gap-2 rounded-lg border border-primary-700 px-4 py-2 font-medium text-primary-700 transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <svg
                  className="h-5 w-5"
                  fill={wishlisted ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>

              <button
                type="button"
                onClick={handleChat}
                className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                Chat with Seller
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
