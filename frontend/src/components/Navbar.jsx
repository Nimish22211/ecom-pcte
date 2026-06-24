import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkBase =
  "text-sm font-medium text-slate-600 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md px-1 py-0.5";
const linkActive = "text-primary-700";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
    >
      {children}
    </NavLink>
  );
}

function useCloseOnOutside(open, setOpen) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, setOpen]);

  return ref;
}

function Navbar({ type }) {
  const [studentMenu, setStudentMenu] = useState(false);
  const [deanMenu, setDeanMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const studentMenuRef = useCloseOnOutside(studentMenu, setStudentMenu);
  const deanMenuRef = useCloseOnOutside(deanMenu, setDeanMenu);

  const handleLogout = async () => {
    await logout();
    navigate(type === "dean" ? "/admin/login" : "/login");
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="rounded-md text-lg font-bold text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          CampusCart
        </Link>

        {type === "guest" && (
          <div className="flex items-center gap-5">
            <NavItem to="/login">Login</NavItem>
            <Link
              to="/register"
              className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white shadow-card transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Register
            </Link>
          </div>
        )}

        {type === "student" && (
          <>
            <div className="hidden items-center gap-6 md:flex">
              <NavItem to="/browse">Browse</NavItem>
              <NavItem to="/sell">Sell</NavItem>
              <NavItem to="/my-listings">My Listings</NavItem>
              <NavItem to="/cart">Cart</NavItem>
              <NavItem to="/wishlist">Wishlist</NavItem>
              <NavItem to="/chat">Chat</NavItem>
            </div>

            <button
              type="button"
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            <div className="relative hidden md:block" ref={studentMenuRef}>
              <button
                type="button"
                onClick={() => setStudentMenu((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={studentMenu}
                className="flex items-center gap-1 rounded-md px-1 py-0.5 text-sm font-medium text-slate-600 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Student
                <svg
                  className={`h-4 w-4 transition-transform ${studentMenu ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {studentMenu && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-popover"
                >
                  <Link
                    to="/sold"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setStudentMenu(false)}
                  >
                    Sold Dashboard
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {mobileOpen && (
              <div className="absolute inset-x-0 top-full border-b border-slate-200 bg-white shadow-card md:hidden">
                <div className="flex flex-col gap-1 px-4 py-3">
                  <NavItem to="/browse">Browse</NavItem>
                  <NavItem to="/sell">Sell</NavItem>
                  <NavItem to="/my-listings">My Listings</NavItem>
                  <NavItem to="/cart">Cart</NavItem>
                  <NavItem to="/wishlist">Wishlist</NavItem>
                  <NavItem to="/chat">Chat</NavItem>
                  <NavItem to="/sold">Sold Dashboard</NavItem>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md px-1 py-1.5 text-left text-sm font-medium text-slate-600 hover:text-primary-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {type === "dean" && (
          <div className="flex items-center gap-6">
            <NavItem to="/admin/dashboard">Dashboard</NavItem>
            <NavItem to="/admin/students">Students</NavItem>

            <div className="relative" ref={deanMenuRef}>
              <button
                type="button"
                onClick={() => setDeanMenu((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={deanMenu}
                className="flex items-center gap-1 rounded-md px-1 py-0.5 text-sm font-medium text-slate-600 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Dean
                <svg
                  className={`h-4 w-4 transition-transform ${deanMenu ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {deanMenu && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-popover"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
