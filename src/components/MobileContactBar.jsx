import { Link, useLocation } from "react-router-dom";
import { CONTACT, whatsappUrl } from "../lib/contact";

// Routes where a floating bar would cover form inputs or payment steps.
const HIDDEN_ON = ["/contact", "/checkout", "/login", "/order-confirmation"];

const itemClass =
  "font-body flex flex-1 items-center justify-center py-4 text-[10px] uppercase tracking-[0.2em]";

export default function MobileContactBar() {
  const { pathname } = useLocation();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink/10 bg-cream md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={`tel:${CONTACT.phoneTel}`} className={`${itemClass} text-ink/70`}>
        Call
      </a>
      <a
        href={whatsappUrl("Hi, I'd like to know more about Selves & Spaces.")}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemClass} border-x border-ink/10 text-ink/70`}
      >
        WhatsApp
      </a>
      <Link to="/contact" className={`${itemClass} bg-green-deep text-cream`}>
        Book
      </Link>
    </div>
  );
}
