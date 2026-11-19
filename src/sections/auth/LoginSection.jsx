import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const inputClass =
  "font-body font-light w-full rounded-lg bg-[#EDEAE4] px-4 py-3.5 text-[13.5px] text-ink outline-none transition-all duration-200 focus:bg-[#FDFCF9] focus:ring-2 focus:ring-green-deep/30";

export default function LoginSection() {
  const { configured, session, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from ?? "/shop";

  const [mode, setMode] = useState("signin"); // signin | signup
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) navigate(from, { replace: true });
  }, [session, from, navigate]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError("Enter a valid email address.");
    if (form.password.length < 6) return setError("Your password needs at least 6 characters.");

    setBusy(true);
    const email = form.email.trim().toLowerCase();
    const { data, error: authError } =
      mode === "signin" ? await signIn(email, form.password) : await signUp(email, form.password);
    setBusy(false);

    if (authError) return setError(authError.message);
    // When email confirmation is switched on, sign-up returns no session until the link is clicked.
    if (mode === "signup" && !data.session) {
      setNotice("Check your email to confirm your account, then sign in.");
      setMode("signin");
    }
  };

  const isSignIn = mode === "signin";

  return (
    <main className="min-h-screen bg-cream px-6 pb-24 pt-36 text-ink">
      <div className="mx-auto max-w-md">
        <p className="font-body mb-4 text-[10px] uppercase tracking-[0.44em] text-sage">Selves &amp; Spaces · Account</p>
        <h1 className="font-display mb-3 text-5xl italic leading-[0.95]">{isSignIn ? "Sign in." : "Create account."}</h1>
        <p className="font-body mb-10 text-[14px] font-light leading-relaxed text-ink/60">
          {location.state?.from === "/checkout"
            ? "Sign in to continue to checkout. Your bag is saved, and any details from your earlier orders will be filled in for you."
            : "Sign in to place orders and see your order history."}
        </p>

        {!configured ? (
          <p role="alert" className="font-body text-[13px] text-[#9B4A32]">
            Sign-in isn&rsquo;t available right now. Please try again later.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
            <div>
              <label htmlFor="auth-email" className="sr-only">Email address</label>
              <input
                id="auth-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="sr-only">Password</label>
              <input
                id="auth-password"
                name="password"
                type="password"
                autoComplete={isSignIn ? "current-password" : "new-password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div role="alert" aria-live="polite">
              {error && <p className="font-body text-[12.5px] text-[#9B4A32]">{error}</p>}
              {notice && <p className="font-body text-[12.5px] text-green-deep">{notice}</p>}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="font-body mt-1 w-full bg-green-deep px-6 py-4 text-[10.5px] uppercase tracking-[0.28em] text-cream transition-colors duration-300 hover:bg-warm disabled:opacity-60"
            >
              {busy ? "Please wait…" : isSignIn ? "Sign in" : "Create account"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode(isSignIn ? "signup" : "signin");
                setError("");
                setNotice("");
              }}
              className="font-body mt-2 text-[12.5px] text-ink/60 underline underline-offset-4 hover:text-ink"
            >
              {isSignIn ? "New here? Create an account" : "Already have an account? Sign in"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
