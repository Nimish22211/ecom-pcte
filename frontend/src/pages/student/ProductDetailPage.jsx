import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { IconHeart, IconHeartFilled, IconStarFilled, IconMessageCircle } from "@tabler/icons-react";
import {
  getProductById,
  addToCart,
  getCart,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Skeleton from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";

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
        setSelectedImage(productRes.data.images?.[0] || "https://via.placeholder.com/600x600");
        setWishlisted(wishlistRes.data.some((p) => p._id === id));
        setInCart(
          cartRes.data.some((item) => (item.productId?._id || item.productId) === id)
        );
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[55%_45%]">
          <Skeleton className="aspect-square w-full" />
          <div className="flex flex-col gap-3 pt-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-20 w-full mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <p role="alert" className="rounded-2xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
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
      <p className="text-[12px] uppercase tracking-[0.04em] text-ink-muted mb-6">
        <Link to="/student" className="hover:text-ink-secondary">Home</Link> /{" "}
        <span className="text-ink-secondary">{product.category}</span> / {product.title}
      </p>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[55%_45%]">
        <div>
          <div className="aspect-square overflow-hidden rounded-[28px] bg-[#F5F5F5] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <img
              src={selectedImage}
              alt={product.title}
              className="h-full w-full object-cover transition-opacity duration-200"
            />
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
                  className={`h-20 w-20 overflow-hidden rounded-2xl border-2 transition-all duration-200 focus-visible:outline-none ${
                    selectedImage === image ? "border-ink-primary shadow-[0_4px_12px_rgba(0,0,0,0.12)]" : "border-transparent"
                  }`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="text-[12px] uppercase tracking-[0.04em] text-ink-muted">{product.category}</span>
          <h1 className="text-h1 font-bold tracking-[-0.02em] text-ink-primary mt-1">{product.title}</h1>

          <div className="flex items-center gap-1.5 mt-3 text-sm text-ink-secondary">
            <IconStarFilled size={14} className="text-amber-400" />
            4.8 <span className="text-ink-muted">(reviews coming soon)</span>
          </div>

          <p className="mt-4 text-[24px] font-semibold text-ink-primary">₹{product.price}</p>

          <div className="mt-6">
            <h2 className="text-h3 font-semibold text-ink-primary">Description</h2>
            <p className="mt-2 text-[14px] text-ink-secondary leading-[1.7]">{product.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-h3 font-semibold text-ink-primary">Seller</h2>
            <p className="mt-1 text-[14px] text-ink-secondary">{sellerName}</p>
          </div>

          {actionMessage && (
            <p role="status" aria-live="polite" className="mt-4 text-sm font-medium text-ink-primary">
              {actionMessage}
            </p>
          )}

          {isSeller ? (
            <p className="mt-8 text-ink-secondary">This is your own listing.</p>
          ) : (
            <div className="mt-8 flex flex-col gap-3">
              <Button
                variant="primary"
                onClick={handleAddToCart}
                disabled={product.status === "sold" || inCart}
                className="h-12 w-full"
              >
                {product.status === "sold"
                  ? "Sold Out"
                  : inCart
                  ? "Already in Cart"
                  : "Add to Cart"}
              </Button>

              <Button
                variant="secondary"
                onClick={handleToggleWishlist}
                aria-pressed={wishlisted}
                className="h-11 w-full"
              >
                {wishlisted ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
                {wishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>

              <Button variant="ghost" onClick={handleChat} className="h-11 w-full border border-border">
                <IconMessageCircle size={18} />
                Chat with Seller
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
