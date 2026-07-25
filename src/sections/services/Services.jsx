import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Individual Psychotherapy",
    tagline: "A space that is entirely yours.",
    desc: "Our individual therapy sessions are rooted in understanding your individual patterns and needs. It focuses on exploring personal thoughts, emotions, and behaviors to address specific mental health concerns. It enables a supportive and confidential environment, where you can explore your coping strategies, unhealthy relationship patterns that can foster emotional healing. Over time, it can help individuals lead a more balanced and fulfilling life.",
    accent: "#C4956A",
  },
  {
    id: 2,
    title: "Group Therapy",
    tagline: "Healing in the presence of others.",
    desc: "Relational group therapy focuses on interpersonal dynamics within a group setting, where members explore their relationships with others. It encourages participants to share experiences, emotions, and challenges, fostering connection and mutual understanding. By observing and interacting with others, individuals gain insight into their own relational patterns and behaviors. The group serves as a supportive environment for practicing new ways of relating. This collective process promotes healing, self-awareness, and healthier relationships outside the therapy space.",
    accent: "#D8A879",
  },
  {
    id: 3,
    title: "Support Group",
    tagline: "Community in shared experience.",
    desc: "A support group provides a safe space for individuals facing similar challenges to come together and share their experiences. It fosters a sense of community, reducing feelings of isolation by connecting members who understand each other's struggles. Through mutual support, participants offer encouragement, coping strategies, and emotional comfort. The group is typically facilitated by a professional or peer leader, ensuring a structured and supportive environment. Support groups help individuals feel empowered and less alone in their journey towards healing.",
    accent: "#C4956A",
  },
  {
    id: 4,
    title: "Parent Sessions",
    tagline: "Supporting the whole family.",
    desc: "The goal of a parent session in therapy is to support and enable the young person in their therapeutic journey. Parents often come into these sessions with their own anxieties and concerns about their child's struggles, which can sometimes stem from feelings of helplessness or uncertainty about how to best support their child. These sessions provide a space for parents to express their worries, gain a better understanding of the young person's challenges, and learn strategies to contribute positively to the therapy process. By addressing their own emotions and concerns, parents can become more effective in fostering a nurturing, understanding environment at home. Ultimately, parent sessions aim to align the efforts of both the parents and the therapist, creating a more cohesive support system for the young person.",
    accent: "#E8B88A",
  },
  {
    id: 5,
    title: "Diagnosis & Assessment",
    tagline: "Understanding through clarity.",
    href: "/assessments",
    desc: "Diagnosis and assessment in psychology are critical processes used to understand an individual's mental health and behavioral functioning. Assessment involves gathering information through various tools, such as clinical interviews, psychological tests, observations, and self-reports, to evaluate cognitive, emotional, and behavioral patterns. This comprehensive process helps identify underlying issues, strengths, and areas for growth. Diagnosis refers to the formal identification of a mental health disorder based on criteria from diagnostic manuals like the DSM-5 or ICD-11. It involves interpreting assessment data to match symptoms with recognized psychological conditions. The purpose is to provide clarity on the individual's condition, guiding effective treatment planning and interventions for improved mental well-being.",
    accent: "#D8A879",
  },
  {
    id: 6,
    title: "Child & Adolescent Therapy",
    tagline: "Meeting young people where they are.",
    desc: "Children and adolescents psychotherapy focuses on exploring unconscious emotions, thoughts, and early experiences that influence current behavior and relationships. This therapy helps young people understand the underlying emotional conflicts that may be driving their distress or problematic behaviors. Through play, talk, and creative activities, therapists create a safe environment for self-expression. The goal is to foster emotional insight, develop coping mechanisms, and promote healthier relationships. Over time, the therapy aims to enhance emotional growth, self-awareness, and resilience in children and adolescents.",
    accent: "#C4956A",
  },
  {
    id: 7,
    title: "Corporate Training",
    tagline: "Wellbeing in the workplace.",
    href: "/our work",
    desc: "This training aims to equip you with essential knowledge and strategies to promote mental well-being in the workplace. By understanding and supporting mental health, we can create a more productive, compassionate, and resilient work environment. This training content is designed to be informative, practical, and supportive in promoting mental health awareness and well-being within corporate settings. Adjusted and customised to fit the specific needs and culture of your organisation.",
    accent: "#E8B88A",
  },
];

const heroMarkers = [
  { label: "Relational", className: "left-[10%] top-[34%] bg-warm text-ink" },
  {
    label: "Psychodynamic",
    className: "right-[10%] top-[30%] bg-cream text-ink",
  },
  {
    label: "Body-Sessions",
    className: "right-[16%] bottom-[21%] bg-sage text-ink",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ServiceModal({ service, onClose }) {
  if (!service) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        style={{
          background: "rgba(17,18,9,0.65)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="relative w-full overflow-hidden"
          style={{
            maxWidth: "480px",
            background: "#F5F0E8",
            boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
          }}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              height: "3px",
              background: "linear-gradient(90deg, #323b10, #C4956A, #6B56A8)",
            }}
          />
          <div style={{ padding: "44px 32px 40px" }} className="md:px-10">
            <button
              onClick={onClose}
              className="absolute font-body"
              style={{
                top: "18px",
                right: "20px",
                fontSize: "10px",
                letterSpacing: "0.22em",
                color: "rgba(28,28,26,0.36)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              ✕ close
            </button>
            <h2
              className="font-display italic mb-6"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                color: "#1C1C1A",
                lineHeight: 1.05,
              }}
            >
              {service.title}
            </h2>
            <div
              style={{
                height: "1px",
                background: "rgba(28,28,26,0.10)",
                marginBottom: "22px",
              }}
            />
            <p
              className="font-body font-light mb-10"
              style={{
                fontSize: "15.5px",
                lineHeight: 1.9,
                color: "rgba(28,28,26,0.62)",
              }}
            >
              {service.desc}
            </p>
            <a
              href="/contact"
              className="font-body uppercase inline-block text-center transition-opacity duration-200"
              style={{
                fontSize: "10px",
                letterSpacing: "0.24em",
                padding: "13px 28px",
                background: service.accent,
                color: "#F5F0E8",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Book a Session →
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ServicesSection() {
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="bg-[#2C3B2D] text-cream">
      {/* ── HERO ── */}
      <div className="relative overflow-hidden px-5 pt-28 md:px-12 md:pt-32 lg:px-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 16%, rgba(138,158,133,0.18), transparent 38%), linear-gradient(180deg, #243224 0%, #344A35 55%, #2C3B2D 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(196,149,106,0.12) 60%, rgba(245,240,232,0.06) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,240,232,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 60%, transparent 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col">
          <div className="flex items-center justify-center py-12 md:py-16">
            <div className="relative w-full max-w-5xl py-12 text-center md:py-14">
              <div className="absolute inset-x-12 top-6 hidden h-px bg-cream/10 md:block" />
              <div className="absolute inset-x-12 bottom-6 hidden h-px bg-cream/10 md:block" />
              <div className="absolute inset-y-6 left-12 hidden w-px bg-cream/10 md:block" />
              <div className="absolute inset-y-6 right-12 hidden w-px bg-cream/10 md:block" />
              {[
                "left-11 top-5",
                "right-11 top-5",
                "bottom-5 left-11",
                "bottom-5 right-11",
              ].map((p) => (
                <span
                  key={p}
                  className={`absolute hidden h-2 w-2 bg-warm/70 md:block ${p}`}
                />
              ))}
              {heroMarkers.map((marker) => (
                <span
                  key={marker.label}
                  className={`font-body absolute hidden px-4 py-2 text-[10px] uppercase tracking-[0.18em] shadow-[0_12px_30px_rgba(0,0,0,0.15)] md:inline-flex ${marker.className}`}
                >
                  {marker.label}
                </span>
              ))}
              <motion.p
                className="font-body mb-8 text-[10px] uppercase tracking-[0.42em] text-sage"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Therapy for selves, relationships, and the body
              </motion.p>
              <motion.h1
                className="font-display mx-auto max-w-4xl text-[clamp(3.8rem,9vw,7.9rem)] leading-[0.82] tracking-normal"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Spaces
                <span className="block italic text-warm">that hold you</span>
              </motion.h1>
              <motion.p
                className="font-body mx-auto mt-8 max-w-xl text-sm font-light leading-8 text-cream/60 md:text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.22 }}
              >
                Thoughtful Care Line: "Because healing happens through
                connection."
              </motion.p>
              <motion.div
                className="mt-9 flex justify-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.34 }}
              >
                <a
                  href="#services-list"
                  className="font-body inline-flex items-center gap-3 border border-cream/15 bg-cream/5 px-6 py-4 text-[10px] uppercase tracking-[0.26em] text-cream transition-colors duration-300 hover:border-warm hover:bg-warm hover:text-ink"
                >
                  <span className="flex h-7 w-7 items-center justify-center bg-warm text-ink">
                    ↓
                  </span>
                  Explore
                </a>
              </motion.div>
            </div>
          </div>

          <div className="grid gap-5 border-t border-cream/10 pb-10 pt-7 md:grid-cols-[1fr_auto] md:items-center">
            <p className="font-display max-w-2xl text-2xl italic leading-snug text-cream/70 md:text-3xl">
              Begin with the part of life asking for more space.
            </p>
            <div className="font-body flex gap-3 text-[10px] uppercase tracking-[0.24em] text-cream/40">
              <span>01</span>
              <span className="h-px w-16 self-center bg-cream/20" />
              <span>Care pathways</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SERVICES GRID ── */}
      <div
        id="services-list"
        className="relative overflow-hidden bg-[#F5F0E8] px-5 py-20 text-ink md:px-12 md:py-28 lg:px-16"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(44,59,45,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(44,59,45,0.10) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <svg
          className="absolute -right-24 top-20 h-[420px] w-[420px] opacity-[0.08]"
          viewBox="0 0 420 420"
          aria-hidden="true"
        >
          <path
            d="M218 15c87-10 178 46 190 143 13 105-65 218-171 241C132 422 27 354 15 248 3 143 78 31 180 18c15-2 25-1 38-3Z"
            fill="#2C3B2D"
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-body mb-5 text-[10px] uppercase tracking-[0.36em] text-sage">
                Our services
              </p>
              <h2 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.82]">
                What can
                <span className="block italic text-green-deep">
                  you expect?
                </span>
              </h2>
            </motion.div>
            <motion.a
              href="/contact"
              className="font-body inline-flex w-fit items-center gap-3 border border-ink/15 bg-green-deep px-6 py-4 text-[10px] uppercase tracking-[0.24em] text-cream transition-colors duration-300 hover:bg-warm hover:text-ink"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="flex h-7 w-7 items-center justify-center bg-warm text-ink">
                →
              </span>
              Start here
            </motion.a>
          </div>

          {/* Cards */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                className="group relative min-h-[260px] overflow-hidden border border-[#C4956A]/15 p-6 text-cream shadow-[0_18px_60px_rgba(30,15,7,0.18)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ borderRadius: "8px", background: "#1E0F07" }}
                onClick={() =>
                  service.href ? navigate(service.href) : setModal(service)
                }
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                <div
                  className="absolute inset-x-0 bottom-0 h-28 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${service.accent}55 100%)`,
                  }}
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-body text-[10px] uppercase tracking-[0.22em] text-cream/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-3xl leading-[0.95] text-cream md:text-4xl xl:text-[2rem]">
                      {service.title}
                    </h3>
                    <p
                      className="font-display mt-3 text-lg italic leading-tight"
                      style={{ color: service.accent }}
                    >
                      {service.tagline}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span
                      className="font-body text-[10px] uppercase tracking-[0.20em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: service.accent }}
                    >
                      Learn more →
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <ServiceModal service={modal} onClose={() => setModal(null)} />
    </section>
  );
}
