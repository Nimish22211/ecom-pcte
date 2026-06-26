const VARIANTS = {
  default: "bg-[#F0F0F0] text-[#0A0A0A]",
  success: "bg-[#16A34A]/10 text-[#16A34A]",
  warning: "bg-[#0A0A0A]/5 text-[#0A0A0A]",
  new: "bg-[#0A0A0A] text-white",
};

function Badge({ variant = "default", className = "", children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
