import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Who We Are", href: "/our team" },
  { label: "What We Do", href: "/what we offer" },
  { label: "School Mental Health", href: "/school-mental-health" },
  { label: "Partners", href: "/partners" },
  { label: "Assessments", href: "/assessments" },
  { label: "Resources", href: "/our work" },
  { label: "Gallery", href: "/gallery" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl">
      <div className="bg-[#F5F0E8] flex items-center justify-between px-6 md:px-10 py-4 shadow-sm rounded-2xl">
        {/* Logo */}
        <Link
          to="/"
          className="font-body text-[#1C1C1A] text-sm tracking-[0.2em] uppercase shrink-0"
        >
          Selves{" "}
          <span className="font-cursive normal-case" style={{ fontSize: "1.4em", lineHeight: 1, letterSpacing: 0 }}>&</span>{" "}
          Spaces
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="font-body text-[#1C1C1A]/60 text-[10px] tracking-[0.1em] uppercase hover:text-[#1C1C1A] transition-colors duration-300 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden md:block font-body text-[9px] tracking-[0.12em] uppercase bg-[#2C3B2D] text-[#F5F0E8] px-4 py-2.5 hover:bg-[#C4956A] transition-colors duration-300 whitespace-nowrap"
          >
            Book a Session
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-px bg-[#1C1C1A] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-[#1C1C1A] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-[#1C1C1A] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-[500px]" : "max-h-0"}`}
      >
        <div className="bg-[#F5F0E8] flex flex-col items-start px-6 py-2 gap-1 border-t border-[#1C1C1A]/10">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="font-display italic text-[#1C1C1A] text-2xl py-2 hover:text-[#C4956A] transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-3 mb-4 font-body text-xs tracking-[0.2em] uppercase bg-[#2C3B2D] text-[#F5F0E8] px-6 py-3"
            onClick={() => setMenuOpen(false)}
          >
            Book a Session
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
