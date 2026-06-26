import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";

const linkBase =
  "relative text-sm font-medium text-ink-secondary transition-colors hover:text-ink-primary after:absolute after:-bottom-1.5 after:left-1/2 after:h-px after:w-full after:-translate-x-1/2 after:scale-x-0 after:bg-ink-primary after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:outline-none rounded-sm px-1 py-0.5";
const linkActive = "text-ink-primary after:scale-x-100";

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

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function Navbar({ type }) {
  const [studentMenu, setStudentMenu] = useState(false);
  const [deanMenu, setDeanMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const scrolled = useScrolled();

  const studentMenuRef = useCloseOnOutside(studentMenu, setStudentMenu);
  const deanMenuRef = useCloseOnOutside(deanMenu, setDeanMenu);

  const handleLogout = async () => {
    await logout();
    navigate(type === "dean" ? "/admin/login" : "/login");
  };

  return (
    <nav
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? "border-b border-border bg-white/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="rounded-sm text-lg font-bold tracking-[-0.02em] text-ink-primary focus-visible:outline-none"
        >
          CampusCart
        </Link>

        {type === "guest" && (
          <div className="flex items-center gap-5">
            <NavItem to="/login">Login</NavItem>
            <Link
              to="/register"
              className="h-10 rounded-full bg-accent px-5 text-sm font-medium leading-10 text-accent-fg shadow-[0_2px_10px_rgba(0,0,0,0.18)] transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:-translate-y-px"
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
              className="rounded-full p-2 text-ink-secondary transition-colors hover:bg-[#F0F0F0] focus-visible:outline-none md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
            </button>

            <div className="relative hidden md:block" ref={studentMenuRef}>
              <button
                type="button"
                onClick={() => setStudentMenu((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={studentMenu}
                className="flex items-center gap-1 rounded-sm px-1 py-0.5 text-sm font-medium text-ink-secondary transition-colors hover:text-ink-primary focus-visible:outline-none"
              >
                Student
                <IconChevronDown
                  size={16}
                  className={`transition-transform ${studentMenu ? "rotate-180" : ""}`}
                />
              </button>

              {studentMenu && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-44 overflow-hidden rounded-card border border-border bg-white shadow-dropdown"
                >
                  <Link
                    to="/sold"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-ink-primary hover:bg-[#F5F5F5]"
                    onClick={() => setStudentMenu(false)}
                  >
                    Sold Dashboard
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-ink-primary hover:bg-[#F5F5F5]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {mobileOpen && (
              <div className="absolute inset-x-0 top-full border-b border-border bg-white shadow-card md:hidden">
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
                    className="rounded-sm px-1 py-1.5 text-left text-sm font-medium text-ink-secondary hover:text-ink-primary"
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
                className="flex items-center gap-1 rounded-sm px-1 py-0.5 text-sm font-medium text-ink-secondary transition-colors hover:text-ink-primary focus-visible:outline-none"
              >
                Dean
                <IconChevronDown
                  size={16}
                  className={`transition-transform ${deanMenu ? "rotate-180" : ""}`}
                />
              </button>

              {deanMenu && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-44 overflow-hidden rounded-card border border-border bg-white shadow-dropdown"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-ink-primary hover:bg-[#F5F5F5]"
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
