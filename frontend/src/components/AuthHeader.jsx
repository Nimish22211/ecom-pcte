import { Link } from "react-router-dom";

function AuthHeader() {
  return (
    <header className="absolute top-0 inset-x-0 z-10 px-6 sm:px-8 h-16 flex items-center">
      <Link
        to="/"
        className="text-lg font-bold tracking-[-0.02em] text-ink-primary focus-visible:outline-none"
      >
        CampusCart
      </Link>
    </header>
  );
}

export default AuthHeader;
