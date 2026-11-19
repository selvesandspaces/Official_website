import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="font-body mb-4 text-[10px] uppercase tracking-[0.3em] text-sage">404</p>
      <h1 className="font-display mb-6 text-4xl italic text-ink md:text-5xl">
        This page couldn&rsquo;t be found
      </h1>
      <p className="font-body mb-10 max-w-md text-[15px] font-light leading-relaxed text-ink/60">
        The page may have moved. You can head back home or get in touch and we&rsquo;ll help you find what you need.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="font-body border border-ink/15 bg-green-deep px-6 py-4 text-[10px] uppercase tracking-[0.24em] text-cream transition-colors duration-300 hover:bg-warm hover:text-ink"
        >
          Back to home
        </Link>
        <Link
          to="/contact"
          className="font-body border border-ink/15 px-6 py-4 text-[10px] uppercase tracking-[0.24em] text-ink/70 transition-colors duration-300 hover:text-ink"
        >
          Contact us
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
