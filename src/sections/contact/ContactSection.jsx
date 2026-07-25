import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <section
      className="min-h-screen relative overflow-hidden"
      style={{ background: "#F5F0E8" }}
    >
      {/* Purple ambient glow — top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-12%",
          right: "-8%",
          width: "650px",
          height: "650px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(90,74,138,0.13) 0%, transparent 68%)",
        }}
      />
      {/* Softer glow — bottom left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "0%",
          left: "-6%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(114,96,176,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 lg:px-16 pt-32 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ══ LEFT COLUMN ══ */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow */}
            <motion.div className="inline-flex items-center gap-2 mb-7" variants={fadeUp}>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "#6B56A8" }}
              />
              <p
                className="font-body uppercase"
                style={{ fontSize: "10px", letterSpacing: "0.38em", color: "#6B56A8" }}
              >
                Selves & Spaces
              </p>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="font-display leading-[0.88] mb-6"
              style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: "#1C1C1A" }}
              variants={fadeUp}
            >
              Contact
              <br />
              <em className="italic" style={{ color: "#6B56A8" }}>
                us.
              </em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="font-body font-light leading-relaxed mb-10"
              style={{
                fontSize: "15px",
                color: "rgba(28,28,26,0.52)",
                lineHeight: 1.85,
                maxWidth: "420px",
              }}
              variants={fadeUp}
            >
              You are welcome to visit us in person or reach out online. We
              will respond with care and confidentiality.
            </motion.p>

            {/* Map */}
            <motion.div
              className="relative overflow-hidden"
              style={{
                height: "340px",
                borderRadius: "20px",
                boxShadow:
                  "0 20px 60px rgba(107,86,168,0.14), 0 4px 16px rgba(28,28,26,0.06)",
              }}
              variants={fadeUp}
            >
              <iframe
                title="Selves and Spaces location"
                src="https://www.google.com/maps?q=Selves+and+Spaces+by+Kanaga+Lakshmi+Chennai&output=embed"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Location badge */}
              <div
                className="absolute bottom-4 left-4 z-20 flex items-center gap-2 backdrop-blur-md px-4 py-2.5"
                style={{
                  background: "rgba(245,240,232,0.94)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(107,86,168,0.14)",
                }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "#6B56A8" }}
                >
                  <svg
                    className="w-2.5 h-2.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F5F0E8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                </div>
                <p
                  className="font-body"
                  style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#1C1C1A" }}
                >
                  Adyar, Chennai — Tamil Nadu
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ══ RIGHT COLUMN ══ */}
          <motion.div
            className="flex flex-col gap-5 lg:pt-12"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* ── Visit Us Card ── */}
            <motion.div
              className="p-7"
              style={{
                background: "rgba(255,255,255,0.68)",
                backdropFilter: "blur(14px)",
                borderRadius: "20px",
                border: "1px solid rgba(107,86,168,0.18)",
                boxShadow: "0 8px 40px rgba(107,86,168,0.08)",
              }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0"
                  style={{ background: "rgba(107,86,168,0.10)" }}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B56A8"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                </div>
                <h3
                  className="font-body"
                  style={{ fontSize: "15px", fontWeight: 600, color: "#1C1C1A" }}
                >
                  Visit us
                </h3>
              </div>

              <p
                className="font-body font-light leading-relaxed mb-3"
                style={{ fontSize: "13.5px", color: "rgba(28,28,26,0.60)" }}
              >
                Selves & Spaces, 7/22, Gandhi Nagar 1st Main Rd
                <br />
                Kasturba Nagar, Adyar, Chennai, Tamil Nadu 600020.
              </p>

              <p
                className="font-body"
                style={{ fontSize: "13.5px", color: "rgba(28,28,26,0.60)" }}
              >
                Mobile:{" "}
                <a
                  href="tel:+919677175894"
                  style={{ color: "#6B56A8", fontWeight: 500 }}
                  className="hover:opacity-70 transition-opacity duration-200"
                >
                  +91 96771 75894
                </a>
              </p>

              <div
                className="mt-5 pt-5 flex gap-6"
                style={{ borderTop: "1px solid rgba(107,86,168,0.14)" }}
              >
                <div>
                  <p
                    className="font-body uppercase mb-1"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      color: "rgba(28,28,26,0.38)",
                    }}
                  >
                    Weekdays
                  </p>
                  <p className="font-body" style={{ fontSize: "13px", color: "#1C1C1A" }}>
                    Sun – Fri, 10am – 6pm
                  </p>
                </div>
                <div
                  className="w-px self-stretch"
                  style={{ background: "rgba(107,86,168,0.14)" }}
                />
                <div>
                  <p
                    className="font-body uppercase mb-1"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      color: "rgba(28,28,26,0.38)",
                    }}
                  >
                    Saturday
                  </p>
                  <p className="font-body" style={{ fontSize: "13px", color: "#1C1C1A" }}>
                    10am – 2pm
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Reach Out Form ── */}
            <motion.div
              className="p-7"
              style={{
                background: "rgba(255,255,255,0.68)",
                backdropFilter: "blur(14px)",
                borderRadius: "20px",
                border: "1px solid rgba(107,86,168,0.18)",
                boxShadow: "0 8px 40px rgba(107,86,168,0.08)",
              }}
              variants={fadeUp}
            >
              <h3
                className="font-body mb-6"
                style={{ fontSize: "15px", fontWeight: 600, color: "#1C1C1A" }}
              >
                Reach out to us
              </h3>

              <form className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  {["firstName", "lastName"].map((field) => (
                    <input
                      key={field}
                      type="text"
                      name={field}
                      placeholder={field === "firstName" ? "First name" : "Last name"}
                      value={formData[field]}
                      onChange={handleChange}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      className="font-body font-light w-full outline-none transition-all duration-200"
                      style={{
                        fontSize: "13.5px",
                        color: "#1C1C1A",
                        background: focused === field ? "#fff" : "#F0EBF6",
                        border: `1px solid ${focused === field ? "rgba(107,86,168,0.45)" : "transparent"}`,
                        borderRadius: "12px",
                        padding: "13px 16px",
                        boxShadow: focused === field
                          ? "0 0 0 3px rgba(107,86,168,0.08)"
                          : "none",
                      }}
                    />
                  ))}
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="font-body font-light w-full outline-none transition-all duration-200"
                  style={{
                    fontSize: "13.5px",
                    color: "#1C1C1A",
                    background: focused === "email" ? "#fff" : "#F0EBF6",
                    border: `1px solid ${focused === "email" ? "rgba(107,86,168,0.45)" : "transparent"}`,
                    borderRadius: "12px",
                    padding: "13px 16px",
                    boxShadow: focused === "email"
                      ? "0 0 0 3px rgba(107,86,168,0.08)"
                      : "none",
                  }}
                />

                <textarea
                  name="message"
                  placeholder="Briefly tell us what brings you here"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="font-body font-light w-full outline-none resize-none transition-all duration-200"
                  style={{
                    fontSize: "13.5px",
                    color: "#1C1C1A",
                    background: focused === "message" ? "#fff" : "#F0EBF6",
                    border: `1px solid ${focused === "message" ? "rgba(107,86,168,0.45)" : "transparent"}`,
                    borderRadius: "12px",
                    padding: "13px 16px",
                    boxShadow: focused === "message"
                      ? "0 0 0 3px rgba(107,86,168,0.08)"
                      : "none",
                  }}
                />

                <button
                  type="button"
                  className="font-body uppercase w-full transition-all duration-300"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    background: "#6B56A8",
                    color: "#F5F0E8",
                    borderRadius: "12px",
                    padding: "15px 24px",
                    marginTop: "4px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#8A72C4")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#6B56A8")}
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* ── WhatsApp CTA ── */}
            <motion.a
              href="https://wa.me/919677175894"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full transition-all duration-300"
              style={{
                background: "#6B56A8",
                borderRadius: "16px",
                padding: "18px 24px",
                color: "#F5F0E8",
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(107,86,168,0.25)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#8A72C4")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#6B56A8")}
              variants={fadeUp}
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span
                className="font-body"
                style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.03em" }}
              >
                Chat with us on WhatsApp
              </span>
            </motion.a>

            {/* ── Social row ── */}
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-1 pt-1"
              variants={fadeUp}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-body uppercase"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.24em",
                    color: "rgba(28,28,26,0.38)",
                  }}
                >
                  Find us on
                </span>
                {[
                  {
                    label: "Instagram",
                    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                  },
                  {
                    label: "LinkedIn",
                    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    className="flex items-center justify-center transition-all duration-300"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "1px solid rgba(107,86,168,0.22)",
                      color: "rgba(28,28,26,0.45)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#6B56A8";
                      e.currentTarget.style.color = "#6B56A8";
                      e.currentTarget.style.background = "rgba(107,86,168,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(107,86,168,0.22)";
                      e.currentTarget.style.color = "rgba(28,28,26,0.45)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>

              <a
                href="mailto:selvesandspaces@gmail.com"
                className="font-body font-light transition-opacity duration-200 hover:opacity-60"
                style={{ fontSize: "12px", color: "rgba(28,28,26,0.42)" }}
              >
                selvesandspaces@gmail.com
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <motion.div
          className="mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(107,86,168,0.15)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="font-display italic text-center md:text-left"
            style={{ fontSize: "1.35rem", color: "rgba(28,28,26,0.28)" }}
          >
            A first conversation can be simple.
          </p>
          <p
            className="font-body font-light"
            style={{ fontSize: "11px", color: "rgba(28,28,26,0.32)", letterSpacing: "0.06em" }}
          >
            © 2025 Selves & Spaces. Chennai, Tamil Nadu.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
