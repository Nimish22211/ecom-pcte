import React from "react";

function ProductCard(props) {
    return (
        <div className="bg-white rounded-xl shadow-md p-4">
            <img
                src="https://via.placeholder.com/200"
                alt="product"
                className="w-full h-40 object-cover rounded-lg"
            />

            <h2 className="text-lg font-semibold mt-3">
                {props.title}
            </h2>

            <p className="text-blue-600 font-bold">
                {props.price}
            </p>

            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg">
                View Details
            </button>
        </div>
    );
}

export default ProductCard;