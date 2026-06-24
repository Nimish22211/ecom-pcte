const Loader = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[300px] items-center justify-center"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-primary-700 border-t-transparent"
        aria-hidden="true"
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
