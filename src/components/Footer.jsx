import { Link } from "react-router-dom";
import { CONTACT } from "../lib/contact";

const footerLinks = [
  { label: "First Visit", to: "/first-visit" },
  { label: "FAQs", to: "/our-work#faqs" },
  { label: "Workshops", to: "/workshops" },
  { label: "Blog", to: "/blog" },
  { label: "Partners", to: "/partners" },
  { label: "Privacy", to: "/privacy" },
];

const linkStyle = { fontSize: "11px", letterSpacing: "0.04em", textDecoration: "none" };
const linkClass = "font-body font-light text-ink/50 transition-colors duration-200 hover:text-warm";

export default function Footer() {
  return (
    <footer
      className="pb-16 md:pb-0"
      style={{ background: "#F5F0E8", borderTop: "1px solid rgba(28,28,26,0.08)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-6 md:px-14 lg:px-24">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass} style={linkStyle}>
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="font-body font-light text-ink/60" style={{ fontSize: "12px", lineHeight: 1.7 }}>
          If you or someone you know is in crisis, call Tele-MANAS at <a className="underline underline-offset-2" href="tel:14416">14416</a> (free, 24/7)
          or emergency services at <a className="underline underline-offset-2" href="tel:112">112</a>. Selves &amp; Spaces is not an emergency service.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body font-light text-ink/50" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()} Selves & Spaces
          </p>
          <div className="flex gap-6">
            <a href={`mailto:${CONTACT.email}`} className={linkClass} style={linkStyle}>
              {CONTACT.email}
            </a>
            <a href={`tel:${CONTACT.phoneTel}`} className={linkClass} style={linkStyle}>
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
