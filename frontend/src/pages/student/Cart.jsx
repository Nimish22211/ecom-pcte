import React from "react";
import { useState, useEffect } from "react";
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

  if (loading) return <div className="p-8 text-slate-500">Loading...</div>;

  if (cartItems.length === 0) {
    return (
      <>
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">My Cart</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.productId._id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex gap-4 items-center"
            >
              <img
                src={item.productId.images?.[0] || "https://via.placeholder.com/300x200"}
                alt={item.productId.title}
                className="w-24 h-24 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.productId.title}</h2>

                <p className="text-blue-700 font-bold">₹{item.productId.price}</p>
              </div>

              <button
                onClick={() => removeItem(item.productId._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>

          <p className="text-slate-500 mt-2">
            To complete your purchase, chat with the seller directly.
          </p>
        </div>
      </div>
    </>
  );
};

export default Cart;
