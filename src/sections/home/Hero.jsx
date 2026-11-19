import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/Hero.jpeg"
          fetchPriority="high"
          alt="sanctuary space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1C1C1A]/40" />
      </div>

      {/* Hero content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/logo.jpeg"
              alt="selves and space logo"
              className="w-50 h-50 rounded-full mb-5"
            />
          </motion.div>

          <motion.h1
            className="font-body font-light tracking-[0.08em] text-[#F5F0E8] text-5xl md:text-7xl leading-[1.1] mb-2 md:mb-3"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            By Kanaga Lakshmi
          </motion.h1>

          <motion.h3
            className="font-display italic text-cream text-2xl md:text-3xl leading-[1.3] mb-4 md:mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Towards Integrated Wellness.
          </motion.h3>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.56,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              to="/contact"
              className="font-body text-xs tracking-[0.2em] uppercase bg-green-deep text-cream px-8 py-4 hover:bg-warm transition-colors duration-300"
            >
              Book a Session
            </Link>
            <Link
              to="/first-visit"
              className="font-body text-xs tracking-[0.2em] uppercase text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors duration-300 underline underline-offset-4"
            >
              What to expect on your first visit
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint — hidden on mobile */}
        <motion.div
          className="hidden md:flex absolute bottom-10 right-16 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <span className="font-body text-[#F5F0E8]/50 text-xs tracking-[0.2em] uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-[#F5F0E8]/30" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
