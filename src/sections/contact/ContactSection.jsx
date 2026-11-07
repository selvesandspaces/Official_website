import { useState } from "react";
import { motion } from "framer-motion";
import { submitContact } from "../../services/api";
import { CONTACT, whatsappUrl } from "../../lib/contact";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
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
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!formData.firstName.trim()) next.firstName = "Please enter your first name.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) next.email = "Please enter a valid email address.";
    if (formData.message.trim().length < 10) next.message = "Please tell us a little about what brings you here.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    try {
      await submitContact({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      setStatus("sent");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleWhatsApp = () => {
    const { firstName, lastName, email, message } = formData;
    const text = [
      `Hi, I'm ${[firstName, lastName].filter(Boolean).join(" ") || "reaching out"}.`,
      email ? `Email: ${email}` : "",
      message ? `\n${message}` : "",
    ].filter(Boolean).join("\n");
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  };

  const fieldStyle = (name) => ({
    fontSize: "13.5px",
    color: "#1C1C1A",
    background: focused === name ? "#fff" : "#F0EBF6",
    border: `1px solid ${errors[name] ? "#B4483C" : focused === name ? "rgba(107,86,168,0.45)" : "transparent"}`,
    borderRadius: "12px",
    padding: "13px 16px",
    boxShadow: focused === name ? "0 0 0 3px rgba(107,86,168,0.12)" : "none",
  });

  const fieldProps = (name) => ({
    name,
    id: `contact-${name}`,
    value: formData[name],
    onChange: handleChange,
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    style: fieldStyle(name),
  });

  const fieldError = (name) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} role="alert" className="font-body mt-1.5 px-1" style={{ fontSize: "12px", color: "#B4483C" }}>
        {errors[name]}
      </p>
    ) : null;

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
          <motion.div variants={stagger} initial="hidden" animate="show">
            {/* Eyebrow */}
            <motion.div
              className="inline-flex items-center gap-2 mb-7"
              variants={fadeUp}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "#6B56A8" }}
              />
              <p
                className="font-body uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.38em",
                  color: "#6B56A8",
                }}
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
              You are welcome to visit us in person or reach out online. We will
              respond with care and confidentiality.
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
                  className="font-body font-light"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: "#1C1C1A",
                  }}
                >
                  Adyar, Chennai — Tamil Nadu
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ══ RIGHT COLUMN ══ */}
          <motion.div
            className="flex flex-col gap-5"
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
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#1C1C1A",
                  }}
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
                className="font-body font-light"
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

              <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-firstName" className="sr-only">First name</label>
                    <input
                      type="text"
                      autoComplete="given-name"
                      placeholder="First name"
                      className="font-body font-light w-full outline-none transition-all duration-200"
                      {...fieldProps("firstName")}
                    />
                    {fieldError("firstName")}
                  </div>
                  <div>
                    <label htmlFor="contact-lastName" className="sr-only">Last name</label>
                    <input
                      type="text"
                      autoComplete="family-name"
                      placeholder="Last name"
                      className="font-body font-light w-full outline-none transition-all duration-200"
                      {...fieldProps("lastName")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    className="font-body font-light w-full outline-none transition-all duration-200"
                    {...fieldProps("email")}
                  />
                  {fieldError("email")}
                </div>

                <div>
                  <label htmlFor="contact-message" className="sr-only">What brings you here</label>
                  <textarea
                    rows={4}
                    placeholder="Briefly tell us what brings you here"
                    className="font-body font-light w-full outline-none resize-none transition-all duration-200"
                    {...fieldProps("message")}
                  />
                  {fieldError("message")}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="font-body uppercase w-full transition-all duration-300 disabled:opacity-60"
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
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>

                <div aria-live="polite">
                  {status === "sent" && (
                    <p className="font-body px-1" style={{ fontSize: "13px", color: "#2C3B2D" }}>
                      Thank you — your message has been received. Our team will reach out to schedule your first session.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="font-body px-1" style={{ fontSize: "13px", color: "#B4483C" }}>
                      We couldn&rsquo;t send your message just now. Please try again, or reach us on WhatsApp or at {CONTACT.phoneDisplay}.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="font-body w-full transition-colors duration-300"
                  style={{
                    fontSize: "12px",
                    color: "#6B56A8",
                    border: "1px solid rgba(107,86,168,0.28)",
                    borderRadius: "12px",
                    padding: "13px 24px",
                  }}
                >
                  Prefer WhatsApp? Message us there instead
                </button>
              </form>
            </motion.div>

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
                    href: "https://www.instagram.com/selvesandspaces/",
                    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
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
                      e.currentTarget.style.background =
                        "rgba(107,86,168,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(107,86,168,0.22)";
                      e.currentTarget.style.color = "rgba(28,28,26,0.45)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
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
            style={{
              fontSize: "11px",
              color: "rgba(28,28,26,0.32)",
              letterSpacing: "0.06em",
            }}
          >
            © 2025 Selves & Spaces. Chennai, Tamil Nadu.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
