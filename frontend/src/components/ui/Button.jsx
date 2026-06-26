const VARIANTS = {
  primary:
    "bg-[#0A0A0A] text-white shadow-[0_2px_10px_rgba(0,0,0,0.18)] hover:bg-[#1A1A1A] hover:shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:-translate-y-px",
  secondary:
    "bg-white text-[#0A0A0A] border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:border-[#0A0A0A] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-px",
  ghost: "bg-transparent text-[#0A0A0A] hover:bg-[#F2F2F2]",
  destructive:
    "bg-[#DC2626] text-white shadow-[0_2px_10px_rgba(220,38,38,0.25)] hover:bg-[#b91c1c] hover:shadow-[0_8px_24px_rgba(220,38,38,0.3)] hover:-translate-y-px",
};

function Button({ variant = "primary", className = "", children, ...props }) {
  return (
    <button
      className={`inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-medium tracking-[0.01em] transition-all duration-200 active:scale-[0.97] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:-translate-y-0 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
