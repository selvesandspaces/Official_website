import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WORKSHOPS_TEASER = [
  { title: "Understanding Anxiety", tag: "Self-awareness", accent: "#C4956A" },
  { title: "Parenting Through Big Emotions", tag: "Parenting", accent: "#6B56A8" },
  { title: "Grief & Loss: A Circle of Sharing", tag: "Grief", accent: "#8A9E85" },
];

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "You can reach us by phone at +91 96771 75894, via WhatsApp, or by emailing us at selvesandspaces@gmail.com. Once we receive your enquiry, a member of our team will reach out to schedule your first session.",
  },
  {
    q: "Do you provide online/offline sessions?",
    a: "Yes. We offer both in-person sessions at our Adyar, Chennai space and secure video sessions for those who prefer the comfort of their own environment.",
  },
  {
    q: "What is the frequency of my sessions?",
    a: "Sessions are typically held once a week, though this may vary based on your needs and what your therapist recommends. Together, you and your therapist will decide on a schedule that works best for you.",
  },
  {
    q: "What is an emergency?",
    a: "An emergency refers to a situation where there is immediate risk of harm to yourself or someone else. In such cases, please contact emergency services or a crisis helpline such as iCall (+91 9152987821). Our clinic does not provide crisis support between sessions.",
  },
  {
    q: "How do I know I need therapy?",
    a: "There is no single indicator. If you find yourself struggling with emotions, relationships, stress, or simply feeling stuck — these are valid reasons to reach out. You don't need to be in crisis to benefit from therapy.",
  },
  {
    q: "What can I expect in the first session?",
    a: "The first session is conversational, unhurried, and focused on making you feel comfortable. There is no pressure to share anything before you are ready. Your therapist will ask some questions to understand your concerns and what you are hoping for.",
  },
  {
    q: "How do I know I have reached my goal in therapy?",
    a: "This is something you and your therapist will explore together over time. Progress is often gradual — you may notice shifts in how you respond to situations, your relationships, or your relationship with yourself. Goals are revisited regularly throughout the process.",
  },
  {
    q: "What is your methodology of work?",
    a: "Our approach is relational and systems-oriented. We draw from a range of therapeutic modalities including Psychodynamic, Transactional Analysis, Somatic Experiencing, Cognitive Behavioural, and Acceptance-based approaches — tailored to each individual's needs.",
  },
  {
    q: "How do you work with children and adolescents?",
    a: "We begin with an initial assessment of the child and a parent consultation to understand the presenting concerns. Sessions with children use play-based and age-appropriate methods. We maintain regular contact with parents through dedicated parent sessions to support the process at home.",
  },
  {
    q: "What do I do if my child refuses to see a therapist?",
    a: "This is not uncommon. We can begin with a parent consultation to understand the situation and offer guidance. Sometimes starting with a parent session helps build trust and creates an opening for the child to engage when they feel ready.",
  },
  {
    q: "What do we discuss in the parent's session?",
    a: "Parent sessions focus on helping you understand your child's emotional world and exploring your own anxieties and concerns as a caregiver. We will discuss strategies to support your child's therapeutic journey at home and align your efforts with those of the therapist.",
  },
];

const navLinks = [
  { label: "Workshops", href: "/workshops" },
  { label: "Therapist Supervision", href: "#therapist-supervision" },
  { label: "Mental Health Forum", href: "#mental-health-forum" },
  { label: "Blogs", href: "/blog" },
  { label: "Play Sessions", href: "#play-sessions" },
];

const panelVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function OurWorkSection() {
  const [openFaq, setOpenFaq] = useState(null);
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <section
      className="relative min-h-screen pt-28 pb-10 px-5 md:px-8 lg:px-10 overflow-hidden"
      style={{ background: "#2C3B2D" }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.28]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-120px",
          right: "-80px",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,149,106,0.14) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-60px",
          left: "-100px",
          width: "460px",
          height: "460px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(138,158,133,0.12) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(135deg, rgba(245,240,232,0.8) 0px, rgba(245,240,232,0.8) 1px, transparent 1px, transparent 48px)",
        }}
      />

      <div className="relative z-10 max-w-[1380px] mx-auto flex flex-col gap-2.5">

        {/* ══ MOBILE LAYOUT (below md) ══ */}
        <div className="flex flex-col gap-2.5 md:hidden">
          {/* Panel A — Brand intro */}
          <motion.div
            className="relative flex flex-col justify-between p-8 overflow-hidden"
            style={{ background: "#F5F0E8", minHeight: "320px" }}
            custom={0}
            variants={panelVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span
              className="absolute -bottom-4 -right-3 font-display italic leading-none select-none pointer-events-none"
              style={{ fontSize: "8rem", color: "rgba(44,59,45,0.05)" }}
            >
              03
            </span>
            <div className="relative z-10">
              <p className="font-body uppercase mb-8" style={{ fontSize: "9px", letterSpacing: "0.38em", color: "#8A9E85" }}>
                Selves & Spaces
              </p>
              <h1 className="font-display leading-[0.86]" style={{ fontSize: "clamp(3rem, 10vw, 5rem)", color: "#1C1C1A" }}>
                Our
                <br />
                <em className="italic" style={{ color: "#2C3B2D" }}>Resources.</em>
              </h1>
            </div>
            <div className="relative z-10 flex flex-col mt-6">
              {navLinks.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center justify-between py-3.5"
                    style={{ borderBottom: "1px solid rgba(28,28,26,0.08)" }}
                  >
                    <span className="font-body text-sm" style={{ color: "rgba(28,28,26,0.48)" }}>{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "#C4956A" }}>→</span>
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="group flex items-center justify-between py-3.5"
                    style={{ borderBottom: "1px solid rgba(28,28,26,0.08)" }}
                  >
                    <span className="font-body text-sm" style={{ color: "rgba(28,28,26,0.48)" }}>{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "#C4956A" }}>→</span>
                  </Link>
                )
              )}
            </div>
            <div className="relative z-10 mt-6">
              <p className="font-body mb-1" style={{ fontSize: "10px", color: "rgba(28,28,26,0.30)" }}>+91 96771 75894</p>
              <p className="font-body" style={{ fontSize: "10px", color: "rgba(28,28,26,0.30)" }}>selvesandspaces@gmail.com</p>
            </div>
          </motion.div>

          {/* Panel B — Workshops */}
          <motion.div custom={1} variants={panelVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Link to="/workshops" className="relative overflow-hidden block" style={{ height: "260px", background: "#323b10", textDecoration: "none" }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(196,149,106,0.18) 0%, transparent 60%)" }} />
              <div className="absolute inset-0 pointer-events-none opacity-[0.10]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px" }} />
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <span className="font-body tracking-[0.07em]" style={{ color: "#F5F0E8", fontSize: "15px" }}>Workshops</span>
                <span style={{ color: "rgba(245,240,232,0.5)", fontSize: "16px" }}>→</span>
              </div>
              <div className="absolute left-6 right-6" style={{ top: "60px" }}>
                {WORKSHOPS_TEASER.map((w, i) => (
                  <div key={i} style={{ borderBottom: "1px solid rgba(245,240,232,0.08)", padding: "10px 0" }}>
                    <p className="font-display italic" style={{ fontSize: "1.15rem", color: "#F5F0E8", lineHeight: 1.2 }}>{w.title}</p>
                    <p className="font-body uppercase" style={{ fontSize: "9px", letterSpacing: "0.22em", color: w.accent, marginTop: "4px" }}>{w.tag}</p>
                  </div>
                ))}
              </div>
            </Link>
          </motion.div>

          {/* Panel C — Mental Health Forum */}
          <motion.div custom={2} variants={panelVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div id="mental-health-forum" className="relative overflow-hidden group block" style={{ height: "200px", background: "#6B56A8" }}>
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.18)" }} />
              <div className="absolute top-5 left-6 right-6 flex items-center justify-between">
                <span className="font-body tracking-[0.07em]" style={{ color: "#F5F0E8", fontSize: "14px" }}>Mental Health Forum</span>
              </div>
              <div className="absolute bottom-5 left-6">
                <p className="font-body font-light" style={{ fontSize: "11px", color: "rgba(245,240,232,0.52)", lineHeight: 1.7 }}>
                  For Women Leaders · Coming soon
                </p>
              </div>
            </div>
          </motion.div>

          {/* Panel D — Blogs */}
          <motion.div custom={3} variants={panelVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Link
              to="/blog"
              className="relative group flex flex-col justify-between p-7 overflow-hidden block"
              style={{ background: "#C4956A", minHeight: "180px", textDecoration: "none" }}
            >
              <div className="flex items-start justify-between">
                <span className="font-body tracking-[0.07em]" style={{ color: "#F5F0E8", fontSize: "14px" }}>Blogs</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: "rgba(245,240,232,0.75)", fontSize: "18px" }}>→</span>
              </div>
              <div>
                <p className="font-display italic leading-snug mb-2" style={{ fontSize: "1.45rem", color: "#F5F0E8" }}>
                  Insights &<br />reflections
                </p>
                <p className="font-body font-light" style={{ fontSize: "11px", color: "rgba(245,240,232,0.65)", lineHeight: 1.7 }}>
                  Articles on mental health, relationships, and the work of healing.
                </p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ══ DESKTOP BENTO GRID (md+) ══ */}
        <div
          className="hidden md:grid gap-2.5"
          style={{
            gridTemplateColumns: "0.82fr 1.38fr 0.9fr",
            gridTemplateRows: "290px 240px",
          }}
        >
          {/* Panel A — Brand intro */}
          <motion.div
            className="relative flex flex-col justify-between p-10 overflow-hidden"
            style={{ gridRow: "1 / 3", background: "#F5F0E8" }}
            custom={0}
            variants={panelVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span
              className="absolute -bottom-4 -right-3 font-display italic leading-none select-none pointer-events-none"
              style={{ fontSize: "11rem", color: "rgba(44,59,45,0.05)" }}
            >
              03
            </span>
            <div className="relative z-10">
              <p className="font-body uppercase mb-12" style={{ fontSize: "9px", letterSpacing: "0.38em", color: "#8A9E85" }}>
                Selves & Spaces
              </p>
              <h1 className="font-display leading-[0.86]" style={{ fontSize: "clamp(3rem, 4vw, 5rem)", color: "#1C1C1A" }}>
                Our
                <br />
                <em className="italic" style={{ color: "#2C3B2D" }}>Resources.</em>
              </h1>
            </div>
            <div className="relative z-10 flex flex-col my-6">
              {navLinks.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center justify-between py-3.5"
                    style={{ borderBottom: "1px solid rgba(28,28,26,0.08)" }}
                  >
                    <span
                      className="font-body text-sm transition-colors duration-200"
                      style={{ color: "rgba(28,28,26,0.48)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#1C1C1A")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(28,28,26,0.48)")}
                    >
                      {item.label}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "#C4956A" }}>→</span>
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="group flex items-center justify-between py-3.5 transition-colors duration-200"
                    style={{ borderBottom: "1px solid rgba(28,28,26,0.08)" }}
                  >
                    <span
                      className="font-body text-sm"
                      style={{ color: "rgba(28,28,26,0.48)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#1C1C1A")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(28,28,26,0.48)")}
                    >
                      {item.label}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "#C4956A" }}>→</span>
                  </Link>
                )
              )}
            </div>
            <div className="relative z-10">
              <p className="font-body mb-1" style={{ fontSize: "10px", color: "rgba(28,28,26,0.30)" }}>+91 96771 75894</p>
              <p className="font-body" style={{ fontSize: "10px", color: "rgba(28,28,26,0.30)" }}>selvesandspaces@gmail.com</p>
            </div>
          </motion.div>

          {/* Panel B — Workshops */}
          <motion.div
            style={{ gridRow: "1 / 3" }}
            custom={1}
            variants={panelVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link to="/workshops" className="relative overflow-hidden w-full h-full flex flex-col" style={{ background: "#323b10", textDecoration: "none", display: "flex" }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(196,149,106,0.18) 0%, transparent 55%)" }} />
              <div className="absolute inset-0 pointer-events-none opacity-[0.12]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px" }} />
              <div className="relative z-10 flex flex-col h-full p-7">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-body tracking-[0.07em]" style={{ color: "#F5F0E8", fontSize: "15px" }}>Workshops</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: "rgba(245,240,232,0.5)", fontSize: "18px" }}>→</span>
                </div>
                <h2 className="font-display italic mb-8" style={{ fontSize: "clamp(2rem, 2.8vw, 3rem)", color: "#F5F0E8", lineHeight: 1.05 }}>
                  Upcoming<br />workshops.
                </h2>
                <div className="flex flex-col flex-1">
                  {WORKSHOPS_TEASER.map((w, i) => (
                    <div key={i} className="flex flex-col justify-center py-5" style={{ borderBottom: "1px solid rgba(245,240,232,0.09)", flex: 1 }}>
                      <p className="font-body uppercase mb-2" style={{ fontSize: "9px", letterSpacing: "0.28em", color: w.accent }}>{w.tag}</p>
                      <p className="font-display italic" style={{ fontSize: "1.4rem", color: "#F5F0E8", lineHeight: 1.2 }}>{w.title}</p>
                    </div>
                  ))}
                </div>
                <p className="font-body uppercase mt-6" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(245,240,232,0.38)" }}>
                  View all workshops →
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Panel C — Mental Health Forum */}
          <motion.div
            style={{ gridColumn: "3", gridRow: "1" }}
            custom={2}
            variants={panelVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div id="mental-health-forum" className="relative overflow-hidden w-full h-full" style={{ background: "#6B56A8" }}>
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.20)" }} />
              <div className="absolute top-5 left-6 right-6">
                <span className="font-body tracking-[0.07em]" style={{ color: "#F5F0E8", fontSize: "14px" }}>Mental Health Forum</span>
                <p className="font-body mt-1" style={{ fontSize: "10px", color: "rgba(245,240,232,0.50)", letterSpacing: "0.12em" }}>For Women Leaders</p>
              </div>
              <div className="absolute bottom-5 left-6">
                <p className="font-display italic" style={{ fontSize: "1.2rem", color: "rgba(245,240,232,0.38)" }}>Coming soon</p>
              </div>
            </div>
          </motion.div>

          {/* Panel D — Blogs */}
          <motion.div
            style={{ gridColumn: "3", gridRow: "2" }}
            custom={3}
            variants={panelVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link
              to="/blog"
              className="relative group flex flex-col justify-between p-7 overflow-hidden w-full h-full"
              style={{ background: "#C4956A", textDecoration: "none", display: "flex" }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: "120px",
                }}
              />
              <div className="relative z-10 flex items-start justify-between">
                <span className="font-body tracking-[0.07em]" style={{ color: "#F5F0E8", fontSize: "14px" }}>Blogs</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: "rgba(245,240,232,0.75)", fontSize: "18px" }}>→</span>
              </div>
              <div className="relative z-10">
                <p className="font-display italic leading-snug mb-2" style={{ fontSize: "1.45rem", color: "#F5F0E8" }}>
                  Insights &<br />reflections
                </p>
                <p className="font-body font-light" style={{ fontSize: "11px", color: "rgba(245,240,232,0.65)", lineHeight: 1.7 }}>
                  Articles on mental health, relationships, and the work of healing.
                </p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ══ FAQ PANEL — shared for all screen sizes ══ */}
        <motion.div
          id="faqs"
          className="relative overflow-hidden"
          style={{ background: "#F5F0E8" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.35]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(44,59,45,0.18) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <button
            className="relative z-10 w-full flex items-stretch text-left"
            onClick={() => setFaqOpen(!faqOpen)}
          >
            <div
              className="shrink-0 hidden sm:flex items-center justify-center px-8 md:px-10 py-8"
              style={{ borderRight: "1px solid rgba(28,28,26,0.07)" }}
            >
              <span
                className="font-display italic leading-none select-none"
                style={{ fontSize: "clamp(3.2rem, 5vw, 5.5rem)", color: "rgba(28,28,26,0.07)" }}
              >
                04
              </span>
            </div>

            <div className="flex-1 flex items-center justify-between px-6 md:px-10 py-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                <p
                  className="font-body uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.38em", color: "#8A9E85" }}
                >
                  FAQs
                </p>
                <h2
                  className="font-display leading-none"
                  style={{ fontSize: "clamp(1.6rem, 3.2vw, 3.2rem)", color: "#1C1C1A" }}
                >
                  Questions
                  <em className="italic ml-2" style={{ color: "#C4956A" }}>answered.</em>
                </h2>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span
                  className="font-body hidden md:block"
                  style={{ fontSize: "11px", color: "rgba(28,28,26,0.35)", letterSpacing: "0.06em" }}
                >
                  {faqs.length} questions
                </span>
                <span
                  className="flex items-center justify-center transition-all duration-500"
                  style={{
                    width: "36px",
                    height: "36px",
                    border: `1px solid ${faqOpen ? "#C4956A" : "rgba(28,28,26,0.15)"}`,
                    color: faqOpen ? "#C4956A" : "rgba(28,28,26,0.4)",
                    fontSize: "22px",
                    transform: faqOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </div>
            </div>
          </button>

          <div
            className="relative z-10 overflow-hidden transition-all duration-500"
            style={{ maxHeight: faqOpen ? "2000px" : "0px" }}
          >
            <div className="mx-6 md:mx-10" style={{ height: "1px", background: "rgba(28,28,26,0.09)" }} />

            <div className="px-6 md:px-10 pb-12 pt-2">
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: "1px solid rgba(28,28,26,0.07)" }}>
                  <button
                    className="w-full flex items-center justify-between py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span
                      className="font-body pr-6 md:pr-10 transition-colors duration-200"
                      style={{
                        fontSize: "14px",
                        color: openFaq === i ? "#1C1C1A" : "rgba(28,28,26,0.65)",
                        fontWeight: openFaq === i ? 500 : 400,
                      }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className="shrink-0 flex items-center justify-center transition-all duration-300"
                      style={{
                        width: "26px",
                        height: "26px",
                        border: `1px solid ${openFaq === i ? "#C4956A" : "rgba(28,28,26,0.14)"}`,
                        color: openFaq === i ? "#C4956A" : "rgba(28,28,26,0.35)",
                        fontSize: "17px",
                        transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: openFaq === i ? "200px" : "0px",
                      opacity: openFaq === i ? 1 : 0,
                    }}
                  >
                    <p
                      className="font-body font-light pb-6 pr-6 md:pr-20"
                      style={{
                        fontSize: "13.5px",
                        color: "rgba(28,28,26,0.56)",
                        lineHeight: 1.9,
                        maxWidth: "700px",
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
