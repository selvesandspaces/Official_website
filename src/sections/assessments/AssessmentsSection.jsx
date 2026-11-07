import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const wrap = { maxWidth: "1220px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" };

const STEPS = [
  {
    n: "01",
    title: "Consultation",
    body: "We begin with a conversation to understand your symptoms. This helps us identify which assessment is right for you.",
  },
  {
    n: "02",
    title: "Assessment Sessions",
    body: "Assessments span two to three sessions, each running between 30 and 60 minutes — paced to suit your needs.",
  },
  {
    n: "03",
    title: "Your Report",
    body: "Once complete, a detailed report is prepared and sent to you, offering clarity on your results.",
  },
  {
    n: "04",
    title: "Report Discussion",
    body: "We close with a dedicated 30-minute session to walk through the findings together and answer your questions.",
  },
];

export default function AssessmentsSection() {
  return (
    <div className="font-body" style={{ background: "#1E0F07", color: "#F5F0E8" }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden flex flex-col justify-center"
        style={{ minHeight: "78vh" }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: GRAIN, backgroundSize: "200px", opacity: 0.18, mixBlendMode: "overlay" }}
        />
        {/* Top-right cream glow */}
        <div
          className="absolute pointer-events-none"
          style={{ top: "-100px", right: "-80px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,240,232,0.07) 0%, transparent 65%)" }}
        />
        {/* Bottom-left warm glow */}
        <div
          className="absolute pointer-events-none"
          style={{ bottom: "-80px", left: "-60px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,149,106,0.14) 0%, transparent 65%)" }}
        />

        <motion.div
          className="relative z-10 pt-36 pb-20"
          style={wrap}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p
            className="font-body uppercase mb-10"
            style={{ fontSize: "10px", letterSpacing: "0.48em", color: "rgba(196,149,106,0.80)" }}
            variants={fadeUp}
          >
            Selves &amp; Spaces · Assessments
          </motion.p>

          <motion.h1
            className="font-display"
            style={{
              fontSize: "clamp(3.4rem, 9vw, 8.5rem)",
              lineHeight: 0.88,
              letterSpacing: "0.03em",
              color: "#F5F0E8",
              maxWidth: "780px",
            }}
            variants={fadeUp}
          >
            Understanding
            <span className="block italic" style={{ color: "#C4956A" }}>
              Your Mind.
            </span>
          </motion.h1>

          <motion.p
            className="font-body font-light mt-10"
            style={{ fontSize: "18px", lineHeight: 2, color: "rgba(245,240,232,0.55)", maxWidth: "540px" }}
            variants={fadeUp}
          >
            Simple, structured tools that help you make sense of what you're experiencing — and find the language for it.
          </motion.p>

          <motion.div
            className="mt-16 flex flex-col items-start gap-3"
            variants={fadeUp}
          >
            <span className="font-body uppercase" style={{ fontSize: "10px", letterSpacing: "0.32em", color: "rgba(245,240,232,0.24)" }}>
              Scroll to explore
            </span>
            <div
              className="w-px animate-bounce"
              style={{ height: "44px", background: "linear-gradient(180deg, rgba(196,149,106,0.50), transparent)" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── WHAT IS IT? ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#F5F0E8", color: "#1C1C1A" }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: GRAIN, backgroundSize: "180px", opacity: 0.10, mixBlendMode: "multiply" }}
        />

        <div className="relative z-10 py-24 md:py-36" style={wrap}>
          <motion.div
            className="grid md:grid-cols-2 gap-12 md:gap-20 items-start"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Left — pull quote */}
            <motion.div variants={fadeUp}>
              <p className="font-body uppercase mb-8" style={{ fontSize: "10px", letterSpacing: "0.44em", color: "#8A9E85" }}>
                What is a Psychometric Assessment?
              </p>
              <h2
                className="font-display italic leading-[1.12]"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", color: "#1E0F07" }}
              >
                "Put a label to what you're going through — and find relief in that clarity."
              </h2>
              <div style={{ marginTop: "2.5rem", height: "2px", width: "56px", background: "#C4956A" }} />
            </motion.div>

            {/* Right — body */}
            <motion.div className="flex flex-col gap-6 pt-2 md:pt-16" variants={fadeUp}>
              {[
                "Assessments are simple psychological tools that help you understand your symptoms better. They are a great way to put a label to what you are going through — and for many, this clarity is deeply relieving.",
                "A label is not a limitation. It is a starting point: a way to understand what is happening and to know that what you feel has a name, a shape, and a path forward.",
              ].map((text, i) => (
                <p
                  key={i}
                  className="font-body font-light"
                  style={{ fontSize: "17px", lineHeight: 2, color: "rgba(28,28,26,0.68)" }}
                >
                  {text}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHEN DO WE ASSESS? ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#2A1208" }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: GRAIN, backgroundSize: "200px", opacity: 0.20, mixBlendMode: "overlay" }}
        />
        {/* Warm right glow */}
        <div
          className="absolute pointer-events-none"
          style={{ top: "50%", right: "-100px", transform: "translateY(-50%)", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,149,106,0.13) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 py-24 md:py-36" style={wrap}>
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.p
              className="font-body uppercase mb-8"
              style={{ fontSize: "10px", letterSpacing: "0.48em", color: "rgba(196,149,106,0.72)" }}
              variants={fadeUp}
            >
              When Do We Do Assessments?
            </motion.p>

            <motion.div
              style={{ height: "1px", background: "rgba(245,240,232,0.10)", marginBottom: "2.5rem" }}
              variants={fadeUp}
            />

            <motion.h2
              className="font-display italic"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", color: "#F5F0E8", lineHeight: 1.18 }}
              variants={fadeUp}
            >
              Assessments are generally recommended by your therapist or healthcare provider — to make sense of the symptoms.
            </motion.h2>

            <motion.div
              style={{ height: "1px", background: "rgba(245,240,232,0.10)", margin: "2.5rem 0" }}
              variants={fadeUp}
            />

            <motion.p
              className="font-body font-light"
              style={{ fontSize: "17px", lineHeight: 2, color: "rgba(245,240,232,0.54)" }}
              variants={fadeUp}
            >
              When you come in for assessments, we take utmost care in getting the right assessment for you. Every step is guided, considered, and tailored — because accuracy matters and so does your comfort.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── OUR FLOW ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#F5F0E8", color: "#1C1C1A" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: GRAIN, backgroundSize: "180px", opacity: 0.09, mixBlendMode: "multiply" }}
        />

        <div className="relative z-10 py-24 md:py-36" style={wrap}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div className="mb-14 md:mb-20" variants={fadeUp}>
              <p className="font-body uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.44em", color: "#8A9E85" }}>
                The Process
              </p>
              <h2
                className="font-display"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", lineHeight: 0.90, color: "#1E0F07" }}
              >
                Our Flow
                <span className="block italic" style={{ color: "#C4956A" }}>
                  step by step.
                </span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
              {STEPS.map((step) => (
                <motion.div
                  key={step.n}
                  variants={fadeUp}
                  className="flex flex-col"
                  style={{
                    background: "#EDE8DF",
                    borderTop: "3px solid #C4956A",
                    padding: "2rem 1.75rem 2.25rem",
                  }}
                >
                  <span
                    className="font-display italic mb-5"
                    style={{ fontSize: "3rem", lineHeight: 1, color: "rgba(196,149,106,0.35)" }}
                  >
                    {step.n}
                  </span>
                  <h3
                    className="font-body uppercase mb-4"
                    style={{ fontSize: "11px", letterSpacing: "0.28em", color: "#1E0F07" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-body font-light flex-1"
                    style={{ fontSize: "15.5px", lineHeight: 1.9, color: "rgba(28,28,26,0.62)" }}
                  >
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#1E0F07" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: GRAIN, backgroundSize: "200px", opacity: 0.18, mixBlendMode: "overlay" }}
        />
        <div
          className="absolute pointer-events-none"
          style={{ top: "-80px", right: "-60px", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,149,106,0.13) 0%, transparent 65%)" }}
        />
        <div
          className="absolute pointer-events-none"
          style={{ bottom: "-60px", left: "-80px", width: "440px", height: "440px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,240,232,0.05) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 py-28 md:py-40 text-center" style={wrap}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.p
              className="font-body uppercase mb-8"
              style={{ fontSize: "10px", letterSpacing: "0.48em", color: "rgba(196,149,106,0.70)" }}
              variants={fadeUp}
            >
              Ready to begin?
            </motion.p>

            <motion.h2
              className="font-display italic mx-auto"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)", lineHeight: 1.08, color: "#F5F0E8", maxWidth: "720px" }}
              variants={fadeUp}
            >
              Clarity is the first step toward care.
            </motion.h2>

            <motion.div
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={fadeUp}
            >
              <Link
                to="/contact"
                className="font-body uppercase transition-colors duration-300"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  padding: "15px 36px",
                  background: "#C4956A",
                  color: "#1E0F07",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F0E8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#C4956A")}
              >
                Book a Consultation
              </Link>
              <Link
                to="/what-we-offer"
                className="font-body uppercase transition-colors duration-300"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  padding: "15px 36px",
                  border: "1px solid rgba(245,240,232,0.18)",
                  color: "rgba(245,240,232,0.68)",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(196,149,106,0.60)"; e.currentTarget.style.color = "#C4956A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,240,232,0.18)"; e.currentTarget.style.color = "rgba(245,240,232,0.68)"; }}
              >
                What We Offer
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
