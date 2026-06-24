import { useNavigate } from "react-router-dom";

function ProductCard({ product, children }) {
  const navigate = useNavigate();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/400x300"}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm">
            {product.category}
          </span>
        )}
        {product.status === "sold" && (
          <span className="absolute right-3 top-3 rounded-full bg-slate-900/90 px-2.5 py-1 text-xs font-semibold text-white">
            Sold
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <h2 className="line-clamp-1 text-base font-semibold text-slate-900">{product.title}</h2>
        <p className="text-lg font-bold text-primary-700">₹{product.price}</p>

        <button
          type="button"
          onClick={() => navigate(`/student/product/${product._id}`)}
          className="mt-3 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          View Details
        </button>
        {children}
      </div>
    </div>
  );
}

export default ProductCard;
