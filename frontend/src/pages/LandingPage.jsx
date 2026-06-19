import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaLaptop,
  FaStickyNote,
  FaPencilRuler,
  FaHome,
  FaBoxOpen,
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
  FaBolt,
  FaHeart,
  FaShoppingBag,
} from "react-icons/fa";
import Reveal from "../components/Reveal";

const CATEGORIES = [
  { label: "Books", icon: <FaBookOpen /> },
  { label: "Electronics", icon: <FaLaptop /> },
  { label: "Notes", icon: <FaStickyNote /> },
  { label: "Stationery", icon: <FaPencilRuler /> },
  { label: "Hostel", icon: <FaHome /> },
  { label: "Other", icon: <FaBoxOpen /> },
];

const STEPS = [
  {
    n: "01",
    title: "Register with your college email",
    desc: "Your email domain confirms which campus you belong to — no manual paperwork.",
  },
  {
    n: "02",
    title: "Your dean reviews and approves",
    desc: "A real human at your college confirms you're a real student before you get access.",
  },
  {
    n: "03",
    title: "Browse, list, and chat",
    desc: "Once verified, list an item in under a minute or message a seller directly.",
  },
];

function MockListingCard({ title, price, tag, tilt, top, left, delay }) {
  return (
    <div
      style={{ "--tilt": tilt, top, left, animationDelay: delay }}
      className="absolute w-44 sm:w-48 rounded-2xl bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] border border-slate-100 p-3 animate-float"
    >
      <div className="h-20 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 text-xs">
        {tag}
      </div>
      <p className="text-sm font-semibold text-slate-900 mt-2 truncate">{title}</p>
      <p className="text-indigo-600 font-bold text-sm">₹{price}</p>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased overflow-x-hidden">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-30 bg-white/70 backdrop-blur-md border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">CampusCart</span>
          <nav className="flex items-center gap-6">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700 transition-colors"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-40 pb-28 px-6 max-w-6xl mx-auto">
        {/* gradient blobs */}
        <div className="absolute -top-20 -left-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl animate-blob -z-10" />
        <div className="absolute top-10 right-0 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl animate-blob -z-10" style={{ animationDelay: "3s" }} />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 border border-slate-200 rounded-full px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Verified by your dean — not the internet
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
              The marketplace
              <br />
              made for your{" "}
              <span className="relative inline-block">
                campus
                <svg
                  viewBox="0 0 200 12"
                  className="absolute left-0 -bottom-1 w-full h-3 text-indigo-300"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9 C 60 2, 140 2, 198 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="text-lg text-slate-500 mt-6 max-w-md leading-relaxed">
              No strangers, no scams, no shipping. Just verified students at
              your college, buying and selling textbooks, electronics, and
              hostel essentials directly with each other.
            </p>
            <div className="flex flex-wrap gap-3 mt-10">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3.5 rounded-full font-medium text-sm hover:bg-slate-700 transition-colors"
              >
                Get started
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-7 py-3.5 rounded-full font-medium text-sm border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                I already have an account
              </Link>
            </div>
            <Link
              to="/admin/login"
              className="inline-block text-sm text-slate-400 hover:text-slate-600 transition-colors mt-8"
            >
              Dean / Admin login →
            </Link>
          </div>

          {/* Right: floating bento visual */}
          <div className="relative h-[420px] hidden lg:block">
            <MockListingCard
              title="Engineering Graphics"
              price="300"
              tag="📘 Books"
              tilt="-6deg"
              top="10px"
              left="20px"
              delay="0s"
            />
            <MockListingCard
              title="Scientific Calculator"
              price="500"
              tag="🔢 Stationery"
              tilt="4deg"
              top="120px"
              left="190px"
              delay="0.6s"
            />
            <MockListingCard
              title="HP Laptop, 8GB"
              price="25000"
              tag="💻 Electronics"
              tilt="-3deg"
              top="250px"
              left="40px"
              delay="1.2s"
            />

            <div
              className="absolute top-0 right-2 bg-slate-900 text-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2 animate-float"
              style={{ "--tilt": "2deg", animationDelay: "0.3s" }}
            >
              <FaCheckCircle className="text-emerald-400" />
              <span className="text-xs font-medium">Verified by Dr. Sharma</span>
            </div>

            <div
              className="absolute bottom-4 right-8 bg-white rounded-2xl px-4 py-2.5 shadow-lg border border-slate-100 flex items-center gap-2 animate-float"
              style={{ "--tilt": "-2deg", animationDelay: "0.9s" }}
            >
              <span className="text-xs font-medium text-slate-600">
                💬 "Still available?"
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contrast strip */}
      <Reveal>
        <section className="border-y border-slate-100 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-center">
            <p className="text-slate-400 text-lg line-through">
              Open to anyone with an internet connection
            </p>
            <FaArrowRight className="text-slate-300 hidden sm:block" />
            <p className="text-slate-900 text-lg font-semibold">
              Open only to verified students at your college
            </p>
          </div>
        </section>
      </Reveal>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 mb-3">
            How it works
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-3xl font-bold tracking-tight max-w-xl mb-16">
            Three steps between you and a verified campus marketplace.
          </p>
        </Reveal>

        <div className="relative grid sm:grid-cols-3 gap-12">
          <div className="hidden sm:block absolute top-5 left-0 right-0 h-px bg-slate-200" />
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 120}>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono mb-6 relative z-10">
                  {step.n}
                </div>
                <h3 className="font-semibold text-lg text-slate-900">
                  {step.title}
                </h3>
                <p className="text-slate-500 mt-2 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bento capabilities */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <Reveal>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 mb-3">
            Built differently
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-3xl font-bold tracking-tight max-w-xl mb-12">
            Same browse-and-buy feel. A completely different trust model.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-4">
          <Reveal className="sm:col-span-2 sm:row-span-2">
            <div className="h-full bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between min-h-[280px]">
              <div>
                <FaShieldAlt className="text-2xl text-emerald-400 mb-4" />
                <h3 className="text-xl font-semibold">
                  Dean-verified students only
                </h3>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-xs">
                  Every account is gated by your college email domain and
                  manually approved by your dean.
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-8">
                {["Email domain checked", "Dean approval required", "Marketplace unlocked"].map(
                  (line) => (
                    <div key={line} className="flex items-center gap-2 text-sm text-slate-300">
                      <FaCheckCircle className="text-emerald-400 text-xs" />
                      {line}
                    </div>
                  )
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="sm:col-span-2">
            <div className="h-full bg-slate-50 border border-slate-200 rounded-3xl p-6 min-h-[130px]">
              <h3 className="font-semibold text-slate-900">Chat, not checkout</h3>
              <p className="text-slate-500 text-sm mt-1 mb-4">
                No payment gateway — settle deals directly with the seller.
              </p>
              <div className="flex flex-col gap-2 max-w-xs">
                <div className="self-start bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-3 py-1.5 text-xs text-slate-600">
                  Is the calculator still available?
                </div>
                <div className="self-end bg-slate-900 text-white rounded-2xl rounded-br-sm px-3 py-1.5 text-xs">
                  Yes! Meet at the library?
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="h-full bg-slate-50 border border-slate-200 rounded-3xl p-6 min-h-[130px] flex flex-col justify-between">
              <FaBolt className="text-xl text-amber-500" />
              <div>
                <p className="text-2xl font-bold text-slate-900">&lt;60s</p>
                <p className="text-slate-500 text-sm">to list an item</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="h-full bg-slate-50 border border-slate-200 rounded-3xl p-6 min-h-[130px] flex flex-col justify-between">
              <div className="flex gap-2 text-xl text-rose-500">
                <FaHeart />
                <FaShoppingBag />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Wishlist & Cart</p>
                <p className="text-slate-500 text-sm">Save it, or grab it now.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories marquee */}
      <Reveal>
        <section className="py-16 border-y border-slate-100 overflow-hidden">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-slate-400 mb-8">
            Shop by category
          </p>
          <div className="flex w-max animate-marquee">
            {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((cat, i) => (
              <div
                key={`${cat.label}-${i}`}
                className="flex items-center gap-3 mx-4 px-6 py-3 rounded-full border border-slate-200 bg-white shrink-0"
              >
                <span className="text-indigo-600">{cat.icon}</span>
                <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Closing CTA */}
      <section className="bg-slate-900 text-white">
        <Reveal>
          <div className="max-w-3xl mx-auto px-6 py-28 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Your campus already trades.
              <br />
              Now it has a home.
            </h2>
            <p className="text-slate-400 mt-5 max-w-md mx-auto">
              Register with your college email and get verified by your dean
              in minutes.
            </p>
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-sm mt-10 hover:bg-slate-100 transition-colors"
            >
              Get started for free
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-white font-semibold tracking-tight">
            CampusCart
          </span>
          <p className="text-sm text-slate-500">
            A college project marketplace — no payments, no shipping, just
            students trading with students.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
