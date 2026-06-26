function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-shimmer rounded-card bg-[length:200%_100%] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] ${className}`}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
