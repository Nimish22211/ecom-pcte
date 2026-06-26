import { useNavigate } from "react-router-dom";
import { IconStarFilled } from "@tabler/icons-react";

function ProductCard({ product, children }) {
  const navigate = useNavigate();
  const isSold = product.status === "sold";

  return (
    <div
      className="group flex flex-col transition-transform duration-300 ease-out hover:-translate-y-1.5"
      onClick={() => navigate(`/student/product/${product._id}`)}
    >
      <div className="relative aspect-square cursor-pointer overflow-hidden rounded-[28px] bg-[#F5F5F5] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow duration-300 group-hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.18)]">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/400x400"}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        {product.category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-ink-primary shadow-sm backdrop-blur-md">
            {product.category}
          </span>
        )}
        {isSold && (
          <span className="absolute right-3 top-3 rounded-full bg-[#0A0A0A]/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-white shadow-sm">
            Sold
          </span>
        )}

        {!isSold && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/student/product/${product._id}`);
            }}
            className="absolute bottom-3.5 left-1/2 h-10 -translate-x-1/2 translate-y-3 rounded-full bg-white px-6 text-[13px] font-medium text-ink-primary opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            Quick View
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 pt-3.5 px-0.5">
        <h2 className="line-clamp-1 text-[15px] font-medium text-ink-primary">{product.title}</h2>
        {product.category && (
          <p className="text-[12px] uppercase tracking-[0.04em] text-ink-muted">{product.category}</p>
        )}
        <div className="flex items-center justify-between pt-0.5">
          <p className="text-[16px] font-semibold text-ink-primary">₹{product.price}</p>
          <span className="flex items-center gap-1 text-[12px] text-ink-muted">
            <IconStarFilled size={12} className="text-amber-400" />
            4.8
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default ProductCard;
