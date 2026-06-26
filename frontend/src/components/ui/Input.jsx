import { forwardRef } from "react";

const Input = forwardRef(function Input({ className = "", ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`h-11 w-full rounded-[20px] border border-[#E5E5E5] bg-white px-5 text-sm text-[#0A0A0A] placeholder:text-[#A1A1A1] outline-none shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 focus:border-[#0A0A0A] focus:shadow-[0_4px_16px_rgba(0,0,0,0.08)] ${className}`}
      {...props}
    />
  );
});

export default Input;
