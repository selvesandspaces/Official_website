import { motion } from "framer-motion";

function ScriptDivider({ text, light = false }) {
  return (
    <div className="flex items-center gap-4 md:gap-8 py-3">
      <div
        className="flex-1 hidden md:block"
        style={{
          height: "1px",
          background: light ? "rgba(245,240,232,0.18)" : "rgba(28,28,26,0.14)",
        }}
      />
      <span
        className="min-w-0 px-3 text-center leading-snug"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
          color: light ? "#F5F0E8" : "#1C1C1A",
          letterSpacing: "0.01em",
        }}
      >
        {text}
      </span>
      <div
        className="flex-1 hidden md:block"
        style={{
          height: "1px",
          background: light ? "rgba(245,240,232,0.18)" : "rgba(28,28,26,0.14)",
        }}
      />
    </div>
  );
}

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

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
  show: { transition: { staggerChildren: 0.12 } },
};

const policyVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FirstVisitSection() {
  return (
    <main
      className="font-body overflow-x-hidden"
      style={{ background: "#F5F0E8", color: "#1C1C1A" }}
    >
      {/* ══ HERO ══ */}
      <section
        className="relative overflow-hidden flex items-center justify-center"
        style={{ minHeight: "100vh" }}
      >
        <img loading="lazy" decoding="async"
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80"
          alt="Forest path"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.54) 45%, rgba(0,0,0,0.76) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.16]"
          style={{ backgroundImage: GRAIN, backgroundSize: "180px" }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-120px",
            right: "-80px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(196,149,106,0.18) 0%, transparent 65%)",
          }}
        />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center px-6 md:px-14 pt-36 pb-32"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p
            className="font-body uppercase mb-8"
            style={{
              fontSize: "10px",
              letterSpacing: "0.48em",
              color: "rgba(138,158,133,0.88)",
            }}
            variants={fadeUp}
          >
            Selves & Spaces · Your first visit
          </motion.p>
          <motion.h1
            className="font-display uppercase mb-10"
            style={{
              fontSize: "clamp(3.2rem, 9vw, 8rem)",
              color: "#F5F0E8",
              letterSpacing: "0.06em",
              lineHeight: 0.86,
            }}
            variants={fadeUp}
          >
            You are a<br />
            <em
              className="italic"
              style={{ color: "#C4956A", letterSpacing: "0.02em" }}
            >
              human first.
            </em>
          </motion.h1>
          <motion.p
            className="font-body font-light mx-auto mt-10"
            style={{
              fontSize: "19px",
              color: "rgba(245,240,232,0.58)",
              lineHeight: 2.0,
              maxWidth: "580px",
            }}
            variants={fadeUp}
          >
            Before diagnosis, before role, before any label the world has given
            you — you are a person. That is where we start.
          </motion.p>

          <motion.div
            className="mt-16 flex flex-col items-center gap-3"
            variants={fadeUp}
          >
            <span
              className="font-body uppercase"
              style={{
                fontSize: "10px",
                letterSpacing: "0.32em",
                color: "rgba(245,240,232,0.28)",
              }}
            >
              Read on
            </span>
            <div
              className="w-px animate-bounce"
              style={{
                height: "40px",
                background:
                  "linear-gradient(180deg, rgba(245,240,232,0.30), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Olive stripe */}
      <div
        style={{
          height: "4px",
          background:
            "linear-gradient(90deg, #323b10, #C4956A, #6B56A8, #323b10)",
        }}
      />

      {/* ══ TAKING YOUR FIRST STEP ══ */}
      <section
        className="px-6 md:px-14 lg:px-24 py-20 md:py-32"
        style={{ background: "#F5F0E8" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <ScriptDivider text="Say hello to the parts of yourself you haven't met yet." />
          </motion.div>

          <div className="mt-16 md:mt-20 grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-16 items-center">
            {/* Image */}
            <motion.div
              className="relative overflow-hidden"
              style={{ borderRadius: "2px" }}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img loading="lazy" decoding="async"
                src="ecosystem.jpeg"
                alt="Mental health ecosystem"
                className="w-full object-cover"
                style={{ height: "380px" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(107,86,168,0.12) 0%, transparent 55%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-4"
                style={{
                  background: "rgba(0,0,0,0.38)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <p
                  className="font-body font-light italic text-center"
                  style={{ fontSize: "13px", color: "rgba(245,240,232,0.72)" }}
                >
                  Finding stillness, one step at a time.
                </p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className="flex flex-col gap-7"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.p
                className="font-body uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.36em",
                  color: "#8A9E85",
                }}
                variants={fadeUp}
              >
                Taking your first step to mental health
              </motion.p>
              {[
                "Taking the first step towards your mental health is a courageous move. The World Health Organisation defines health as “a state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity.” Mental health is integral to that — not a luxury or a last resort.",
                'Many of our clients ask, "Why can\'t I handle stress the way my parents did?" or "When I was growing up, this wasn\'t the norm." The truth is, emotions have always been a part of us. As humans, we developed logical thinking and learned to suppress our emotions — but they were always there.',
                "Haven't we seen our grandparents anxiously worrying? Haven't we witnessed our parents experiencing sleeplessness, irritation, and agitation? As children, didn't we feel sadness, anger, shame, and fear? All of these experiences reveal that the elephant in the room was our mental health.",
                "Now that you're here, why not give us a call and meet with us? Therapy isn't just about addressing your problems — it's also about discovering parts of yourself you haven't yet met, all within the safest and most non-judgemental space possible.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  className="font-body font-light"
                  style={{
                    fontSize: "17px",
                    lineHeight: 2.0,
                    color: "rgba(28,28,26,0.74)",
                  }}
                  variants={fadeUp}
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ THE YOUNG PERSON ══ */}
      <section
        className="relative overflow-hidden px-6 md:px-14 lg:px-24 py-20 md:py-32"
        style={{ background: "#111209" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.16]"
          style={{ backgroundImage: GRAIN, backgroundSize: "180px" }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-100px",
            right: "-80px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(196,149,106,0.11) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-80px",
            left: "-100px",
            width: "440px",
            height: "440px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(107,86,168,0.08) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            className="mb-16 md:mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <ScriptDivider
              text="The young person (Child and adolescent)"
              light
            />
          </motion.div>

          <div className="grid md:grid-cols-[1.25fr_1fr] gap-12 md:gap-20 items-center">
            {/* Text */}
            <motion.div
              className="flex flex-col gap-7"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.p
                className="font-body uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.32em",
                  color: "#8A9E85",
                }}
                variants={fadeUp}
              >
                Why a young person's mental health should be taken seriously
              </motion.p>
              {[
                "Now that we are here, let us talk about the young person's mental health. We all know childhood plays such a crucial role in one's mental health. If you are looking at this, you are probably a parent or a caregiver of a young person and you are wondering what is happening to their mental health.",
                "They have probably started the conversation about emotions, their mental health, or you are seeing them struggle. Witnessing their struggle and building mental health conversations can be hard. At Selves and Spaces we aim to create a space for the conversation to begin — with the young person, and with you.",
                "Our therapists work in play-informed, age-appropriate ways that meet children and adolescents exactly where they are. We also offer parent guidance sessions — because healing in young people rarely happens in isolation.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  className="font-body font-light"
                  style={{
                    fontSize: "17px",
                    lineHeight: 2.0,
                    color: "rgba(245,240,232,0.70)",
                  }}
                  variants={fadeUp}
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            {/* Butterfly illustration */}
            <motion.div
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="flex items-center justify-center overflow-hidden"
                style={{
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  border: "1px solid rgba(245,240,232,0.10)",
                  background: "rgba(245,240,232,0.03)",
                  flexShrink: 0,
                }}
              >
                <img loading="lazy" decoding="async"
                  src="butterfly.jpeg"
                  alt="Butterfly"
                  className="w-full h-full object-contain object-center"
                  style={{ mixBlendMode: "luminosity", opacity: 0.82 }}
                />
              </div>
              <p
                className="font-display italic text-center"
                style={{
                  fontSize: "1.35rem",
                  color: "rgba(245,240,232,0.30)",
                  maxWidth: "240px",
                  lineHeight: 1.7,
                }}
              >
                Every child deserves a space to be heard.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ POLICY & GUIDELINES ══ */}
      <section
        className="px-6 md:px-14 lg:px-24 py-20 md:py-32"
        style={{ background: "#F5F0E8" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <ScriptDivider text="Our policy and guidelines." />
          </motion.div>

          <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-x-16 gap-y-12 md:gap-x-20 md:gap-y-14">
            {[
              {
                title: "Confidentiality",
                accent: "#323b10",
                body: "You have the absolute right to the confidentiality of your therapy. We cannot and will not tell anyone else what you have told us, or even that you are in therapy with us without your prior written permission — unless the situation is an emergency. Any kind of social interaction outside the clinic will be avoided to protect your privacy.",
              },
              {
                title: "Emergency",
                accent: "#C4956A",
                body: "If there is good reason to believe that you will harm another person or yourself, concerned authorities will be informed. This is the only exception to our confidentiality commitment, and it exists to ensure your safety and the safety of others.",
              },
              {
                title: "Record Keeping",
                accent: "#6B56A8",
                body: "We keep brief records, noting only that you have been here, what interventions happened in session, and the topics that were discussed. These records are kept securely and in accordance with professional guidelines.",
              },
              {
                title: "Cancellation Policy",
                accent: "#8A9E85",
                body: "Please note that a session fee will be charged for cancellations. We appreciate as much notice as possible so we can offer the time to someone else who may need it.",
              },
              {
                title: "No judgement, ever",
                accent: "#C4956A",
                body: "You will not be pathologised, labelled, or told how to feel. Our work begins with curiosity and stays there. Whatever you bring is welcome — every part of you has a place here.",
              },
              {
                title: "Your pace, always",
                accent: "#323b10",
                body: "There is no fixed timeline, no homework you didn't agree to, and no pressure to reach a destination. Therapy moves at the pace that is right for you.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={policyVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <span
                    style={{
                      width: "28px",
                      height: "2px",
                      background: item.accent,
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <h3
                    className="font-body uppercase tracking-[0.20em]"
                    style={{ fontSize: "13px", color: item.accent }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p
                  className="font-body font-light"
                  style={{
                    fontSize: "17px",
                    color: "rgba(28,28,26,0.66)",
                    lineHeight: 2.0,
                  }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
