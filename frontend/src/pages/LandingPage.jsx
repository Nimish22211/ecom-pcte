import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IconArrowRight,
  IconStarFilled,
  IconShieldCheck,
  IconMessageCircle,
  IconBolt,
  IconChevronDown,
  IconCheck,
  IconBook,
  IconDeviceLaptop,
  IconArmchair,
} from "@tabler/icons-react";
import Reveal from "../components/Reveal";

const TRUST_ITEMS = [
  "Dean-verified students only",
  "Zero shipping, zero scams",
  "12,000+ campus deals closed",
  "Chat directly with sellers",
  "Free to list, free to browse",
];

const CATEGORIES = [
  {
    label: "Textbooks & Notes",
    icon: <IconBook size={22} />,
  },
  {
    label: "Electronics",
    icon: <IconDeviceLaptop size={22} />,
  },
  {
    label: "Hostel Essentials",
    icon: <IconArmchair size={22} />,
  },
];

const BESTSELLERS = [
  { title: "Engineering Graphics, 4th Ed.", category: "Books", price: 300, rating: 4.9, reviews: 41 },
  { title: "Casio FX-991ES Calculator", category: "Stationery", price: 500, rating: 4.8, reviews: 76 },
  { title: "HP Pavilion, 8GB RAM", category: "Electronics", price: 25000, rating: 4.7, reviews: 18 },
  { title: "Study Table Lamp", category: "Hostel", price: 350, rating: 4.9, reviews: 23 },
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

const REVIEWS = [
  {
    name: "Ananya R.",
    text: "Sold my old calculator in two days, no haggling with strangers off campus. The dean verification actually makes it feel safe.",
  },
  {
    name: "Kabir M.",
    text: "Found a barely-used drafter set for a third of the bookstore price. Chatted with the seller, met at the canteen, done.",
  },
  {
    name: "Priya S.",
    text: "Listing took less than a minute. Way better than posting in five different WhatsApp groups and hoping someone replies.",
  },
];

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function LandingPage() {
  const scrolled = useScrolled();

  return (
    <div className="min-h-screen bg-bg font-sans text-ink-primary antialiased overflow-x-hidden">
      {/* Nav */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
          scrolled ? "border-b border-border bg-white/95 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold tracking-[-0.02em] text-ink-primary">CampusCart</span>
          <nav className="flex items-center gap-6">
            <Link
              to="/login"
              className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="h-10 flex items-center text-sm font-medium bg-accent text-accent-fg px-4 rounded-full hover:bg-accent-hover transition-colors"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center px-6 pt-24 pb-16 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[60%_40%] gap-16 items-center w-full">
          {/* Left: copy */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block h-3.5 w-0.5 bg-ink-primary" aria-hidden="true" />
              <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-secondary">
                Dean-verified marketplace
              </span>
            </div>
            <h1 className="text-[40px] sm:text-display font-bold tracking-[-0.03em] leading-[1.05]">
              The marketplace
              <br />
              made for your
              <br />
              <span className="font-normal italic">own campus.</span>
            </h1>
            <p className="text-[18px] text-ink-secondary mt-6 max-w-[440px] leading-[1.6]">
              No strangers, no scams, no shipping. Just verified students at your
              college, buying and selling textbooks, electronics, and hostel
              essentials directly with each other.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-10">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 h-11 bg-accent text-accent-fg px-6 rounded-full font-medium text-sm hover:bg-accent-hover transition-colors"
              >
                Shop Now
                <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center h-11 px-6 rounded-full font-medium text-sm text-ink-primary hover:bg-[#F0F0F0] transition-colors"
              >
                I already have an account
              </Link>
            </div>

            <div className="flex items-center gap-3 mt-10">
              <div className="flex -space-x-2">
                {["AR", "KM", "PS", "SJ", "RV"].map((initials) => (
                  <span
                    key={initials}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#E5E5E5] text-[10px] font-semibold text-ink-secondary"
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <p className="text-sm text-ink-secondary">
                Trusted by 12,000+ students{" "}
                <span className="inline-flex items-center gap-0.5 font-medium text-ink-primary">
                  4.9 <IconStarFilled size={12} className="text-amber-400" />
                </span>
              </p>
            </div>

            <Link
              to="/admin/login"
              className="inline-block text-sm text-ink-muted hover:text-ink-secondary transition-colors mt-8"
            >
              Dean / Admin login →
            </Link>
          </div>

          {/* Right: image card */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/5] rounded-[28px] bg-[#F5F5F5] overflow-hidden flex items-center justify-center">
              <IconDeviceLaptop size={96} className="text-[#CBCBCB]" />

              <div
                className="absolute top-4 right-4 flex items-center gap-1.5 rounded-pill bg-success/10 px-3 py-1.5 text-[12px] font-medium text-success"
                style={{ animation: "fade-up 0.5s ease-out 0.1s both" }}
              >
                <IconCheck size={14} />
                In Stock
              </div>

              <div
                className="absolute bottom-4 left-4 right-4 rounded-[28px] bg-white p-4 shadow-card flex items-center justify-between"
                style={{ animation: "fade-up 0.5s ease-out 0.3s both" }}
              >
                <div>
                  <p className="text-sm font-medium text-ink-primary">HP Pavilion, 8GB RAM</p>
                  <p className="text-sm font-semibold text-ink-primary mt-0.5">₹25,000</p>
                </div>
                <span className="flex h-9 px-3 items-center rounded-pill bg-accent text-accent-fg text-[13px] font-medium">
                  Add
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-2 text-ink-muted">
          <span className="text-[11px] tracking-[0.04em]">Scroll to explore</span>
          <IconChevronDown size={16} className="animate-chevron-pulse" />
        </div>
      </section>

      {/* Trust marquee band */}
      <section className="bg-[#0A0A0A] overflow-hidden py-3.5">
        <div className="group flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center text-white">
              <span className="text-[13px] font-medium tracking-[0.04em] whitespace-nowrap px-4">
                {item}
              </span>
              <span className="text-[#404040]">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <Reveal className="text-center">
          <h2 className="text-h2 font-semibold tracking-[-0.015em]">Shop by Category</h2>
          <p className="text-ink-secondary mt-2">Whatever you need this semester, someone on campus is selling it.</p>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 80}>
              <Link
                to="/login"
                className="group relative block aspect-[3/4] overflow-hidden rounded-[28px] bg-[#F0F0F0]"
              >
                <div className="absolute inset-0 flex items-center justify-center text-[#CBCBCB] transition-transform duration-300 group-hover:scale-105">
                  <div className="scale-[3.2]">{cat.icon}</div>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3.5 bg-white/85 backdrop-blur-sm">
                  <span className="text-[16px] font-semibold text-ink-primary">{cat.label}</span>
                  <IconArrowRight size={18} className="text-ink-primary" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <Reveal className="flex items-end justify-between mb-10">
          <h2 className="text-h2 font-semibold tracking-[-0.015em]">Recently Listed</h2>
          <Link to="/login" className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors">
            View All →
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {BESTSELLERS.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="group">
                <div className="relative aspect-square rounded-[28px] bg-[#F5F5F5] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-[#CBCBCB] transition-transform duration-[400ms] group-hover:scale-[1.04]">
                    <IconBook size={48} />
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-3 left-1/2 h-[38px] -translate-x-1/2 translate-y-2 rounded-pill bg-white px-5 text-[13px] font-medium text-ink-primary opacity-0 shadow-card transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Quick View
                  </button>
                </div>
                <div className="pt-3">
                  <h3 className="line-clamp-1 text-[15px] font-medium text-ink-primary">{item.title}</h3>
                  <p className="text-[12px] uppercase tracking-[0.04em] text-ink-muted mt-0.5">{item.category}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[16px] font-semibold text-ink-primary">₹{item.price.toLocaleString()}</p>
                    <span className="flex items-center gap-1 text-[12px] text-ink-muted">
                      <IconStarFilled size={12} className="text-amber-400" />
                      {item.rating} <span>({item.reviews})</span>
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-12">
          {[
            { icon: <IconShieldCheck size={28} />, title: "Dean-verified accounts", desc: "Every account is gated by your college email and approved by a real dean before access opens up." },
            { icon: <IconMessageCircle size={28} />, title: "Chat, not checkout", desc: "Message sellers directly and settle the deal in person. No payment gateway, no middleman fees." },
            { icon: <IconBolt size={28} />, title: "List in under 60 seconds", desc: "Snap a photo, set a price, pick a category. Your listing is live before your next class starts." },
          ].map((item) => (
            <Reveal key={item.title}>
              <div className="text-ink-primary">{item.icon}</div>
              <h3 className="text-[16px] font-semibold text-ink-primary mt-4">{item.title}</h3>
              <p className="text-[13px] text-ink-secondary leading-[1.6] mt-2">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Editorial / Story */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
          <Reveal>
            <div className="aspect-[4/5] rounded-[28px] bg-[#F0F0F0] flex items-center justify-center text-[#CBCBCB]">
              <IconShieldCheck size={120} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-ink-muted">
              Why we built this
            </span>
            <h2 className="text-[36px] font-bold tracking-[-0.015em] leading-[1.1] max-w-[380px] mt-3">
              Your campus already trades. It just didn't have a home.
            </h2>
            <p className="text-[15px] text-ink-secondary leading-[1.8] max-w-[440px] mt-5">
              Every semester, the same secondhand textbooks and calculators get
              passed around in scattered WhatsApp groups and noticeboards.
              CampusCart puts all of it in one place — restricted to people who
              actually go to your college, verified by someone who actually
              works there.
            </p>
            <div className="flex items-center gap-6 mt-8">
              <Link
                to="/register"
                className="inline-flex items-center h-11 px-6 rounded-full font-medium text-sm bg-accent text-accent-fg hover:bg-accent-hover transition-colors"
              >
                Get started
              </Link>
              <Link to="/login" className="text-sm font-medium text-ink-primary underline underline-offset-4">
                Learn our story →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-border">
        <Reveal>
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-secondary mb-3">
            How it works
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-h2 font-bold tracking-[-0.015em] max-w-xl mb-16">
            Three steps between you and a verified campus marketplace.
          </p>
        </Reveal>

        <div className="relative grid sm:grid-cols-3 gap-12">
          <div className="hidden sm:block absolute top-5 left-0 right-0 h-px bg-border" />
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-accent text-accent-fg flex items-center justify-center text-xs font-mono mb-6 relative z-10">
                  {step.n}
                </div>
                <h3 className="font-semibold text-[16px] text-ink-primary">{step.title}</h3>
                <p className="text-ink-secondary mt-2 leading-relaxed text-[13px]">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Social proof / reviews */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center">
            <h2 className="text-h2 font-semibold tracking-[-0.015em]">What students say</h2>
            <p className="text-[15px] text-ink-secondary mt-2">
              <span className="text-amber-400">★★★★★</span> 4.9 out of 5{" "}
              <span className="text-ink-muted">(2,140 reviews)</span>
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {REVIEWS.map((review, i) => (
              <Reveal key={review.name} delay={i * 100}>
                <div className="rounded-[28px] bg-white border border-border p-6 shadow-card h-full flex flex-col">
                  <div className="flex text-amber-400 gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <IconStarFilled key={idx} size={14} />
                    ))}
                  </div>
                  <p className="text-[14px] leading-[1.7] italic text-ink-primary line-clamp-3 flex-1">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-[13px] font-medium text-ink-primary">{review.name}</span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-success">
                      <IconCheck size={12} /> Verified buyer
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#0A0A0A] text-white">
        <Reveal>
          <div className="max-w-[500px] mx-auto px-6 py-28 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-white/50">
              Get started
            </span>
            <h2 className="text-[32px] font-bold tracking-[-0.02em] mt-3">
              Your campus already trades. Now it has a home.
            </h2>
            <p className="text-[14px] text-white/60 mt-4">
              Register with your college email and get verified by your dean in
              minutes.
            </p>
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 bg-white text-ink-primary px-7 h-11 rounded-full font-medium text-sm mt-8 hover:bg-white/90 transition-colors"
            >
              Get started for free
              <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-[12px] text-white/40 mt-4">No spam. Just a dean checking you're real.</p>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-4 gap-10">
          <div>
            <span className="text-white font-bold tracking-[-0.02em]">CampusCart</span>
            <p className="text-[14px] text-white/50 mt-3 leading-[1.6] max-w-[200px]">
              A campus marketplace — no payments, no shipping, just verified students trading with students.
            </p>
          </div>
          <div>
            <h4 className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/40 mb-4">Get Started</h4>
            <ul className="flex flex-col gap-2.5 text-[14px] text-white/60">
              <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/40 mb-4">Categories</h4>
            <ul className="flex flex-col gap-2.5 text-[14px] text-white/60">
              <li>Textbooks & Notes</li>
              <li>Electronics</li>
              <li>Hostel Essentials</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/40 mb-4">For Colleges</h4>
            <ul className="flex flex-col gap-2.5 text-[14px] text-white/60">
              <li><Link to="/admin/login" className="hover:text-white transition-colors">Dean / Admin login</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-6 border-t border-white/10 flex items-center justify-between">
          <span className="text-[13px] text-white/40">© 2026 CampusCart</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
