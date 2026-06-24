import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
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

  if (loading) return <Loader />;

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <svg
          className="mx-auto h-12 w-12 text-slate-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.94-4.785 2.402-7.394.083-.47-.293-.857-.794-.857H5.625m1.875 7.5h11.218m-11.218 0L5.625 5.25M7.5 14.25L5.625 5.25" />
        </svg>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-slate-500">Items you add to your cart will appear here.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">My Cart</h1>
      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.productId._id}
            className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <img
              src={item.productId.images?.[0] || "https://via.placeholder.com/300x200"}
              alt={item.productId.title}
              className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-slate-900">{item.productId.title}</h2>
              <p className="font-bold text-primary-700">₹{item.productId.price}</p>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.productId._id)}
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-bold text-slate-900">Total: ₹{totalPrice}</h2>
        <p className="mt-2 text-slate-500">
          To complete your purchase, chat with the seller directly.
        </p>
      </div>
    </div>
  );
};

export default Cart;
