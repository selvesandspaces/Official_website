import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const HomeAbout = () => {
  return (
    <section className="bg-[#F5F0E8] px-4 md:px-10 py-20 md:py-28" id="AboutUs">
      <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden bg-[#612A1A] grid grid-cols-1 md:grid-cols-3">
        {/* Left — image */}
        <motion.div
          className="relative h-72 md:h-auto min-h-[400px]"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=900&q=80"
            alt="therapy space"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[#2C3B2D]/30" />
        </motion.div>

        {/* Right — content */}
        <div className="flex flex-col justify-between p-8 md:p-14 col-span-2">
          <motion.h2
            className="font-display italic text-[#F5F0E8] text-3xl tracking-wide md:text-4xl lg:text-5xl leading-[1.2] mb-10 md:mb-7 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            INCLUSIVE <span className="font-body font-normal italic">&</span> ACCESSIBLE MENTAL HEALTHCARE
          </motion.h2>

          <div className="w-full h-px bg-[#F5F0E8]/15 mb-10" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h3 className="font-display text-white text-2xl mb-3 text-justify">
              Selves and Spaces is a mental healthcare clinic founded with a deep commitment to providing accessible, inclusive, and high-quality mental health support. Our mission is to create environments that foster healing, safety, and growth, where every individual feels seen, heard, and valued. We believe in the power of relational spaces where connection, understanding, and acceptance are not just encouraged but embedded in the way we interact with each other. At Selves and Spaces, we strive to build communities that go beyond therapy, where the sense of safety and acceptance we cultivate within our clinic extends into the broader world. Our aim is to empower individuals to carry this sense of "okay-ness" into their personal lives and the shared spaces they engage with, helping to create a ripple effect of healing, resilience, and support in the communities around us.
            </h3>
          </motion.div>
        </div>
      </div>

      {/* Contact info strip */}
      <motion.div
        className="max-w-6xl mx-auto mt-6 rounded-2xl bg-[#EDE8DF] px-8 md:px-14 py-8 hover:shadow-lg transition-shadow duration-300"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="group rounded-xl p-3 -m-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white/50">
            <p className="font-body text-[#8A9E85] text-[10px] tracking-[0.2em] uppercase mb-2 group-hover:text-[#C4956A] transition-colors duration-300">Find Us</p>
            <p className="font-display italic text-[#1C1C1A] text-xl leading-snug">Adyar, Chennai</p>
            <p className="font-body text-[#1C1C1A]/60 text-sm mt-1">Tamil Nadu, India</p>
          </div>
          <div className="group rounded-xl p-3 -m-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white/50">
            <p className="font-body text-[#8A9E85] text-[10px] tracking-[0.2em] uppercase mb-2 group-hover:text-[#C4956A] transition-colors duration-300">Call Us</p>
            <a
              href="tel:+919876543210"
              className="font-display italic text-[#1C1C1A] text-xl group-hover:text-[#C4956A] transition-colors duration-300"
            >
              +91 98765 43210
            </a>
          </div>
          <div className="group rounded-xl p-3 -m-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white/50">
            <p className="font-body text-[#8A9E85] text-[10px] tracking-[0.2em] uppercase mb-2 group-hover:text-[#C4956A] transition-colors duration-300">Email</p>
            <a
              href="mailto:selvesandspaces@gmail.com"
              className="font-display italic text-[#1C1C1A] text-xl group-hover:text-[#C4956A] transition-colors duration-300 break-all"
            >
              selvesandspaces@gmail.com
            </a>
          </div>
          <div className="group rounded-xl p-3 -m-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white/50">
            <p className="font-body text-[#8A9E85] text-[10px] tracking-[0.2em] uppercase mb-2 group-hover:text-[#C4956A] transition-colors duration-300">Hours</p>
            <p className="font-display italic text-[#1C1C1A] text-xl leading-snug">Mon – Sat</p>
            <p className="font-body text-[#1C1C1A]/60 text-sm mt-1">9:00 AM – 7:00 PM</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#1C1C1A]/10 flex items-center justify-between">
          <p className="font-body text-[#1C1C1A]/40 text-sm italic">A first conversation can be simple.</p>
          <Link
            to="/contact"
            className="font-body text-xs tracking-[0.15em] uppercase text-[#2C3B2D] hover:text-[#C4956A] transition-colors duration-300 underline underline-offset-4"
          >
            Book a Session →
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeAbout;
