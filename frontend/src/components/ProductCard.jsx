import React from "react";
import { useNavigate } from "react-router-dom";
function ProductCard({ product, children }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <img
        src="https://via.placeholder.com/200"
        alt="product"
        className="w-full h-40 object-cover rounded-lg"
      />

      <h2 className="text-lg font-semibold mt-3">{product.title}</h2>

      <p className="text-blue-600 font-bold">{product.price}</p>

      <button
        onClick={() =>
          navigate(`/student/product/${product._id}`, {
            state: product,
          })
        }
        className="bg-blue-700 text-white rounded-lg px-4 py-2 hover:bg-blue-800"
      >
        View Details
      </button>
      {children}
    </div>
  );
}

export default ProductCard;
