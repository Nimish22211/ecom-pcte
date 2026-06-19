import React from "react";
import { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      _id: 1,
      title: "Engineering Graphics Book",
      price: 300,
      image: "https://via.placeholder.com/300x200",
    },
    {
      _id: 2,
      title: "Calculator",
      price: 500,
      image: "https://via.placeholder.com/300x200",
    },
  ]);
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  if (cartItems.length === 0) {
    return (
      <>
        <Navbar type="student" />
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

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex gap-4 items-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.title}</h2>

                <p className="text-blue-700 font-bold">₹{item.price}</p>
              </div>

              <button
                onClick={() => removeItem(item._id)}
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
