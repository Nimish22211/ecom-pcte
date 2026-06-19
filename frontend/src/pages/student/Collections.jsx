import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const Products = [
    {
      _id: "1",
      title: "Calculator",
      price: "₹500",
      category: "Stationery",
      description:
        "Scientific calculator in excellent condition. Suitable for engineering and mathematics courses.",
      seller: "Rahul Sharma",
      images: [
        "https://via.placeholder.com/600x400?text=Calculator+1",
        "https://via.placeholder.com/600x400?text=Calculator+2",
      ],
    },

    {
      _id: "2",
      title: "Laptop",
      price: "₹25000",
      category: "Electronics",
      description:
        "HP laptop with 8GB RAM and SSD storage. Works perfectly and ideal for students.",
      seller: "Aman Singh",
      images: [
        "https://via.placeholder.com/600x400?text=Laptop+1",
        "https://via.placeholder.com/600x400?text=Laptop+2",
      ],
    },

    {
      _id: "3",
      title: "Engineering Graphics Book",
      price: "₹300",
      category: "Books",
      description:
        "Almost new condition. Used for one semester and contains no markings.",
      seller: "Priya Das",
      images: [
        "https://via.placeholder.com/600x400?text=Book+1",
        "https://via.placeholder.com/600x400?text=Book+2",
      ],
    },

    {
      _id: "4",
      title: "Headphones",
      price: "₹1500",
      category: "Electronics",
      description:
        "Wireless Bluetooth headphones with great battery life and clear sound quality.",
      seller: "Sourav Roy",
      images: [
        "https://via.placeholder.com/600x400?text=Headphones+1",
        "https://via.placeholder.com/600x400?text=Headphones+2",
      ],
    },

    {
      _id: "5",
      title: "Cycle",
      price: "₹4000",
      category: "Hostel",
      description:
        "Well-maintained bicycle perfect for commuting around campus.",
      seller: "Ankit Verma",
      images: [
        "https://via.placeholder.com/600x400?text=Cycle+1",
        "https://via.placeholder.com/600x400?text=Cycle+2",
      ],
    },

    {
      _id: "6",
      title: "Notes Bundle",
      price: "₹100",
      category: "Notes",
      description:
        "Complete semester notes covering important topics and previous year questions.",
      seller: "Neha Gupta",
      images: [
        "https://via.placeholder.com/600x400?text=Notes+1",
        "https://via.placeholder.com/600x400?text=Notes+2",
      ],
    },
  ];
  const categories = [
    "All",
    "Books",
    "Electronics",
    "Notes",
    "Stationery",
    "Hostel",
    "Others",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts = Products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Browse Products</h1>
        <div className="mb-6 flex items-center px-4 py-3 border rounded-lg bg-white">
          <FaSearch className="text-gray-400 mr-2" />

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition
        ${
          selectedCategory === category
            ? "bg-blue-500 text-white"
            : "border bg-white hover:bg-gray-100"
        }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Collections;
