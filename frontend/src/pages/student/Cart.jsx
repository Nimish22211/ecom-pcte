import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconShoppingBag, IconTrash } from "@tabler/icons-react";
import Skeleton from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";
import { getCart, removeFromCart } from "../../services/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCart()
      .then(({ data }) => setCartItems(data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load cart"))
      .finally(() => setLoading(false));
  }, []);

  const removeItem = async (productId) => {
    try {
      await removeFromCart(productId);
      setCartItems((prev) => prev.filter((item) => item.productId._id !== productId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove item");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.productId?.price || 0), 0);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Skeleton className="h-8 w-48" />
        <div className="mt-6 flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <IconShoppingBag size={48} className="mx-auto text-ink-muted" aria-hidden="true" />
        <h1 className="mt-4 text-[16px] font-medium text-ink-primary">Your cart is empty</h1>
        <p className="mt-2 text-ink-secondary">Items you add to your cart will appear here.</p>
        <Link to="/student/collections" className="inline-block mt-4 text-sm font-medium text-ink-primary underline underline-offset-4">
          Start shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-h1 font-bold tracking-[-0.02em] text-ink-primary">Your Cart ({cartItems.length} items)</h1>
      {error && (
        <p role="alert" className="mt-4 rounded-2xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {cartItems.map((item) => (
          <div
            key={item.productId._id}
            className="flex items-center gap-4 rounded-[24px] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          >
            <img
              src={item.productId.images?.[0] || "https://via.placeholder.com/100x100"}
              alt={item.productId.title}
              className="h-14 w-14 flex-shrink-0 rounded-2xl object-cover bg-[#F5F5F5]"
            />

            <div className="flex-1">
              <h2 className="text-[14px] font-medium text-ink-primary">{item.productId.title}</h2>
              <p className="text-[12px] text-ink-muted mt-0.5">{item.productId.category}</p>
            </div>

            <p className="text-[14px] font-semibold text-ink-primary">₹{item.productId.price}</p>

            <button
              type="button"
              onClick={() => removeItem(item.productId._id)}
              aria-label={`Remove ${item.productId.title} from cart`}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <IconTrash size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-[28px] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between">
          <span className="text-ink-secondary text-sm">Subtotal</span>
          <span className="text-[18px] font-semibold text-ink-primary">₹{totalPrice}</span>
        </div>
        <p className="text-[12px] text-ink-muted">No taxes, no shipping — settle the final price with each seller.</p>
        <Button variant="secondary" disabled className="h-12 w-full mt-2">
          Chat with sellers to complete your purchase
        </Button>
      </div>
    </div>
  );
};

export default Cart;
