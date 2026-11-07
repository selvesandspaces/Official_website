import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchProducts, fetchMyOrders, startCheckout, verifyPayment, simulatePayment } from "../../services/shopApi";
import { supabase } from "../../lib/supabase";
import { fetchProfile, saveProfile } from "../../services/profileApi";
import { errorMessage, ApiError } from "../../services/api";
import { openRazorpay, PaymentCancelled } from "../../lib/razorpay";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { CONTACT } from "../../lib/contact";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const DRAFT_KEY = "ss_checkout_draft";
const COUNTRY = "India";
const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
};

// Delivery details survive the detour through /login so the customer doesn't retype them.
const loadDraft = () => {
  try {
    return { ...EMPTY_FORM, ...JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "{}") };
  } catch {
    return EMPTY_FORM;
  }
};
const saveDraft = (form) => {
  try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(form)); } catch { /* storage unavailable */ }
};
const clearDraft = () => {
  try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* storage unavailable */ }
};

// The saved profile (PATCH /users/me) and the form map onto each other like this.
const formFromDetails = (name, phone, address) => {
  const [first = "", ...rest] = (name ?? "").split(" ");
  return {
    firstName: first,
    lastName: rest.join(" "),
    phone: phone ?? "",
    address1: address?.line1 ?? "",
    address2: address?.line2 ?? "",
    city: address?.city ?? "",
    state: address?.state ?? "",
    pincode: address?.postal_code ?? "",
  };
};

const profileFromForm = (f) => ({
  name: [f.firstName, f.lastName].map((v) => v.trim()).filter(Boolean).join(" "),
  phone: f.phone.trim(),
  address: {
    line1: f.address1.trim(),
    line2: f.address2.trim(),
    city: f.city.trim(),
    state: f.state.trim(),
    postal_code: f.pincode.trim(),
    country: COUNTRY,
  },
});

export default function CheckoutSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart, pruneCart } = useCart();
  const { loading: authLoading, session, user } = useAuth();
  // Products arrive via router state from the shop, but a refresh or direct visit loses that, so refetch.
  const [products, setProducts] = useState(location.state?.products ?? null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (products) return;
    let cancelled = false;
    fetchProducts()
      .then((list) => { if (!cancelled) setProducts(list); })
      .catch(() => { if (!cancelled) setLoadError(true); });
    return () => { cancelled = true; };
  }, [products]);

  // Forget cart entries for products that no longer exist.
  useEffect(() => {
    if (products) pruneCart(products.map((p) => p.id));
  }, [products, pruneCart]);

  const [form, setForm] = useState(loadDraft);
  const [focused, setFocused] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [stage, setStage] = useState(""); // "" | "starting" | "paying" | "confirming"
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    clearDraft();
  }, []);

  // Reuse the details from this customer's latest order instead of asking again. Only fills
  // fields that are still empty, so a restored draft or anything already typed wins.
  // The profile as last saved (or loaded), serialised, so we only PATCH when something changed.
  const savedProfileKey = useRef(null);
  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    // Prefer the saved profile; customers who ordered before profiles existed fall back to their
    // latest order, and get a profile saved on their next order.
    Promise.all([fetchProfile().catch(() => null), fetchMyOrders(1).catch(() => [])]).then(([profile, [last]]) => {
      if (cancelled) return;
      const saved = profile
        ? formFromDetails(profile.name, profile.phone, profile.address)
        : last
          ? formFromDetails(last.customer.name, last.customer.phone, last.shipping_address)
          : null;
      if (!saved) return;
      if (profile) savedProfileKey.current = JSON.stringify(profileFromForm(saved));
      // Only fill fields that are still empty, so a restored draft or anything typed wins.
      setForm((prev) => Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, v || saved[k] || ""])));
    });
    return () => { cancelled = true; };
  }, [userId]);

  // The last checkout started for this exact cart and details. If the customer closes the payment
  // window and presses Place Order again, we reopen it instead of creating another Razorpay order.
  const pendingCheckout = useRef(null);

  // Default the email to the signed-in account's until the customer types another.
  const email = form.email || user?.email || "";

  const cartIsEmpty = Object.keys(cart).length === 0;
  const lineItems = products
    ? Object.entries(cart)
        .map(([id, qty]) => {
          const product = products.find((p) => String(p.id) === id);
          return product ? { ...product, qty } : null;
        })
        .filter(Boolean)
    : [];

  // Checkout needs an account: ask guests to sign in first, then return here with the bag intact.
  if (!cartIsEmpty && !authLoading && !session) {
    return <Navigate to="/login" replace state={{ from: "/checkout" }} />;
  }

  if (cartIsEmpty || !products || lineItems.length === 0 || authLoading) {
    const message = cartIsEmpty || (products && !authLoading && lineItems.length === 0)
      ? "Nothing in your cart."
      : loadError
        ? "We couldn\u2019t load your cart. Please try again."
        : "Loading your cart\u2026";
    return (
      <div
        className="font-body"
        style={{
          minHeight: "100vh",
          background: "#F5F0E8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <p
          className="font-display italic"
          style={{ fontSize: "1.6rem", color: "rgba(28,28,26,0.38)" }}
        >
          {message}
        </p>
        <Link
          to="/shop"
          className="font-body uppercase"
          style={{
            fontSize: "10px",
            letterSpacing: "0.26em",
            color: "#2C3B2D",
            textDecoration: "none",
          }}
        >
          ← Browse the shop
        </Link>
      </div>
    );
  }

  const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    const phone = form.phone.trim();
    const phoneDigits = phone.replace(/\D/g, "");
    if (!form.firstName.trim()) newErrors.firstName = "Enter your first name.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) newErrors.email = "Enter a valid email address.";
    if (!/^\+?[0-9][0-9 -]{5,18}[0-9]$/.test(phone) || phoneDigits.length < 10 || phoneDigits.length > 13) {
      newErrors.phone = "Enter a valid phone number (10 digits).";
    }
    if (!form.address1.trim()) newErrors.address1 = "Enter your address.";
    if (!form.city.trim()) newErrors.city = "Enter your city.";
    if (!form.state.trim()) newErrors.state = "Enter your state.";
    if (!/^\d{6}$/.test(form.pincode.trim())) newErrors.pincode = "Enter a 6-digit PIN code.";
    return newErrors;
  };

  // Place order: sign in first, then start checkout, pay, and verify. No order exists
  // until the server has verified the payment.
  const handleSubmit = async () => {
    if (submitting || authLoading) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitError("");

    if (!session) {
      saveDraft(form);
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    setSubmitting(true);
    setStage("starting");
    let payment = null;
    let step = "profile";
    try {
      // Save changed details to the account first, so they are filled in next time.
      const profile = profileFromForm(form);
      const profileKey = JSON.stringify(profile);
      if (profileKey !== savedProfileKey.current) {
        setStage("saving");
        await saveProfile(profile);
        savedProfileKey.current = profileKey;
      }
      step = "checkout";
      setStage("starting");

      const request = {
        customer: {
          name: [form.firstName, form.lastName].map((v) => v.trim()).filter(Boolean).join(" "),
          email: email.trim(),
          phone: form.phone.trim(),
        },
        shippingAddress: {
          line1: form.address1.trim(),
          line2: form.address2.trim() || null,
          city: form.city.trim(),
          state: form.state.trim(),
          postal_code: form.pincode.trim(),
          country: COUNTRY,
        },
        items: lineItems.map((item) => ({ product_id: item.id, quantity: item.qty })),
      };
      const requestKey = JSON.stringify(request);
      if (pendingCheckout.current?.key !== requestKey) {
        pendingCheckout.current = { key: requestKey, checkout: await startCheckout(request) };
      }
      const { checkout } = pendingCheckout.current;

      // A payment that already succeeded but wasn't confirmed is re-verified, never paid twice.
      payment = pendingCheckout.current.payment ?? null;
      if (!payment) {
        setStage("paying");
        // Backend dummy mode can't open the real popup; its simulator is only usable in development.
        payment =
          checkout.razorpay_key_id === "rzp_test_dummy" && import.meta.env.DEV
            ? await simulatePayment(checkout.razorpay_order_id)
            : await openRazorpay(checkout);
        pendingCheckout.current.payment = payment;
      }

      setStage("confirming");
      const order = await verifyPayment(payment);
      pendingCheckout.current = null;
      clearCart();
      navigate(`/order-confirmation/${order.id}`, { replace: true, state: { order } });
    } catch (err) {
      if (import.meta.env.DEV) console.error("Place order failed:", err);
      if (err instanceof PaymentCancelled) {
        setSubmitError("Payment cancelled. You haven\u2019t been charged, and your bag is saved.");
      } else if (err instanceof ApiError && err.status === 401) {
        // Only go back to sign-in if the session is really gone. If it's still there, the server
        // rejected a token we hold, and bouncing to /login would hide that.
        const { data } = (await supabase?.auth.getSession()) ?? { data: {} };
        if (!data.session) {
          saveDraft(form);
          navigate("/login", { state: { from: "/checkout" } });
          return;
        }
        setSubmitError(
          `The server couldn\u2019t verify your sign-in${import.meta.env.DEV ? ` (${err.detail})` : ""}. Please sign out, sign in again, and retry.`
        );
      } else if (step === "profile") {
        setSubmitError(errorMessage(err, "We couldn\u2019t save your details. Please try again."));
      } else if (payment) {
        // Paid but couldn't confirm: the server still creates the order from Razorpay's webhook.
        setSubmitError(
          "Your payment went through, but we couldn\u2019t confirm your order just now. Please don\u2019t pay again. Check your orders shortly, or contact us if it doesn\u2019t appear."
        );
      } else {
        setSubmitError(errorMessage(err, "We couldn\u2019t start your payment. Please try again."));
      }
      setSubmitting(false);
      setStage("");
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    fontSize: "13.5px",
    color: "#1C1C1A",
    background: errors[field]
      ? "rgba(196,149,106,0.10)"
      : focused === field
        ? "#FDFCF9"
        : "#EDEAE4",
    border: `1px solid ${
      errors[field]
        ? "rgba(196,149,106,0.50)"
        : focused === field
          ? "rgba(44,59,45,0.35)"
          : "transparent"
    }`,
    borderRadius: "8px",
    padding: "13px 16px",
    outline: "none",
    fontFamily: "inherit",
    transition: "all 0.2s",
    display: "block",
  });

  return (
    <main
      className="font-body"
      style={{ background: "#F5F0E8", minHeight: "100vh", color: "#1C1C1A" }}
    >
      <section className="px-6 md:px-14 lg:px-24 pt-32 pb-10">
        <div className="max-w-6xl mx-auto">
          <motion.p
            className="font-body uppercase mb-4"
            style={{ fontSize: "10px", letterSpacing: "0.44em", color: "#8A9E85" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Selves & Spaces · Checkout
          </motion.p>
          <motion.h1
            className="font-display italic"
            style={{
              fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
              color: "#1C1C1A",
              lineHeight: 0.95,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Checkout.
          </motion.h1>
        </div>
      </section>

      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg, #323b10, #C4956A, #6B56A8)",
        }}
      />

      <section className="px-6 md:px-14 lg:px-24 py-14 pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-12 lg:gap-16 items-start">

            {/* ── Left: Form ── */}
            <motion.div variants={stagger} initial="hidden" animate="show">

              {/* 01 — Your Details */}
              <motion.div variants={fadeUp} className="mb-10">
                <p
                  className="font-body uppercase mb-5"
                  style={{ fontSize: "9.5px", letterSpacing: "0.40em", color: "#8A9E85" }}
                >
                  01 — Your Details
                </p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="First name *"
                    aria-label="First name"
                    value={form.firstName}
                    onChange={handleChange}
                    onFocus={() => setFocused("firstName")}
                    onBlur={() => setFocused(null)}
                    className="font-body font-light"
                    style={inputStyle("firstName")}
                  />
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Last name"
                    aria-label="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                    onFocus={() => setFocused("lastName")}
                    onBlur={() => setFocused(null)}
                    className="font-body font-light"
                    style={inputStyle("lastName")}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="Email address *"
                    aria-label="Email address"
                    value={email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className="font-body font-light"
                    style={inputStyle("email")}
                  />
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Phone number *"
                    aria-label="Phone number"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    className="font-body font-light"
                    style={inputStyle("phone")}
                  />
                </div>
              </motion.div>

              {/* 02 — Delivery Address */}
              <motion.div variants={fadeUp} className="mb-10">
                <p
                  className="font-body uppercase mb-5"
                  style={{ fontSize: "9.5px", letterSpacing: "0.40em", color: "#8A9E85" }}
                >
                  02 — Delivery Address
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    name="address1"
                    autoComplete="address-line1"
                    placeholder="Address line 1 *"
                    aria-label="Address line 1"
                    value={form.address1}
                    onChange={handleChange}
                    onFocus={() => setFocused("address1")}
                    onBlur={() => setFocused(null)}
                    className="font-body font-light"
                    style={inputStyle("address1")}
                  />
                  <input
                    type="text"
                    name="address2"
                    autoComplete="address-line2"
                    placeholder="Address line 2 (optional)"
                    aria-label="Address line 2 (optional)"
                    value={form.address2}
                    onChange={handleChange}
                    onFocus={() => setFocused("address2")}
                    onBlur={() => setFocused(null)}
                    className="font-body font-light"
                    style={inputStyle("address2")}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="city"
                    autoComplete="address-level2"
                      placeholder="City *"
                      aria-label="City"
                      value={form.city}
                      onChange={handleChange}
                      onFocus={() => setFocused("city")}
                      onBlur={() => setFocused(null)}
                      className="font-body font-light"
                      style={inputStyle("city")}
                    />
                    <input
                      type="text"
                      name="state"
                      autoComplete="address-level1"
                      placeholder="State *"
                      aria-label="State"
                      value={form.state}
                      onChange={handleChange}
                      onFocus={() => setFocused("state")}
                      onBlur={() => setFocused(null)}
                      className="font-body font-light"
                      style={inputStyle("state")}
                    />
                    <input
                      type="text"
                      name="pincode"
                    autoComplete="postal-code"
                    inputMode="numeric"
                      placeholder="PIN code *"
                      aria-label="PIN code"
                      value={form.pincode}
                      onChange={handleChange}
                      onFocus={() => setFocused("pincode")}
                      onBlur={() => setFocused(null)}
                      className="font-body font-light"
                      style={inputStyle("pincode")}
                      maxLength={6}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p
                  className="font-body font-light italic mb-4"
                  style={{ fontSize: "11.5px", color: "rgba(28,28,26,0.40)", lineHeight: 1.6 }}
                >
                  {session
                    ? `Signed in as ${user?.email}. You\u2019ll pay securely with Razorpay.`
                    : "You\u2019ll be asked to sign in or create an account, then pay securely with Razorpay."}{" "}For questions about delivery or returns, write to {CONTACT.email} or call {CONTACT.phoneDisplay}.
                </p>
                <div role="alert" aria-live="polite">
                  {Object.values(errors).filter(Boolean).map((msg) => (
                    <p key={msg} className="font-body mb-1" style={{ fontSize: "12.5px", color: "#9B4A32" }}>{msg}</p>
                  ))}
                  {submitError && (
                    <p className="font-body mb-3" style={{ fontSize: "12.5px", color: "#9B4A32", lineHeight: 1.6 }}>{submitError}</p>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || authLoading}
                  className="font-body uppercase w-full"
                  style={{
                    fontSize: "10.5px",
                    letterSpacing: "0.28em",
                    padding: "16px 24px",
                    background: submitting ? "#8A9E85" : "#2C3B2D",
                    color: "#F5F0E8",
                    border: "none",
                    cursor: submitting ? "default" : "pointer",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) e.currentTarget.style.background = "#C4956A";
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting) e.currentTarget.style.background = "#2C3B2D";
                  }}
                >
                  {stage === "saving"
                    ? "Saving your details…"
                    : stage === "starting"
                    ? "Preparing payment…"
                    : stage === "paying"
                      ? "Waiting for payment…"
                      : stage === "confirming"
                        ? "Confirming your order…"
                        : "Place Order →"}
                </button>
              </motion.div>
            </motion.div>

            {/* ── Right: Order Summary ── */}
            <motion.div
              className="lg:sticky"
              style={{ top: "100px" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(28,28,26,0.09)",
                  padding: "28px",
                }}
              >
                <p
                  className="font-body uppercase mb-5"
                  style={{ fontSize: "9.5px", letterSpacing: "0.40em", color: "#8A9E85" }}
                >
                  Order Summary
                </p>

                <div className="flex flex-col gap-3 mb-5">
                  {lineItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-3">
                      <div style={{ flex: 1 }}>
                        <p
                          className="font-body"
                          style={{ fontSize: "13px", color: "#1C1C1A", lineHeight: 1.3 }}
                        >
                          {item.name}
                        </p>
                        <p
                          className="font-body font-light"
                          style={{ fontSize: "11.5px", color: "rgba(28,28,26,0.42)" }}
                        >
                          Qty {item.qty}
                        </p>
                      </div>
                      <p
                        className="font-body"
                        style={{
                          fontSize: "13px",
                          color: "#1C1C1A",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    height: "1px",
                    background: "rgba(28,28,26,0.10)",
                    marginBottom: "16px",
                  }}
                />

                <div className="flex justify-between mb-2">
                  <span
                    className="font-body font-light"
                    style={{ fontSize: "13px", color: "rgba(28,28,26,0.54)" }}
                  >
                    Subtotal
                  </span>
                  <span className="font-body" style={{ fontSize: "13px", color: "#1C1C1A" }}>
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between mb-5">
                  <span
                    className="font-body font-light"
                    style={{ fontSize: "13px", color: "rgba(28,28,26,0.54)" }}
                  >
                    Shipping
                  </span>
                  <span className="font-body" style={{ fontSize: "13px", color: "#8A9E85" }}>
                    Free
                  </span>
                </div>

                <div
                  style={{
                    height: "1px",
                    background: "rgba(28,28,26,0.10)",
                    marginBottom: "16px",
                  }}
                />

                <div className="flex justify-between items-center">
                  <span
                    className="font-body uppercase"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.22em",
                      color: "#1C1C1A",
                      fontWeight: 600,
                    }}
                  >
                    Total
                  </span>
                  <span
                    className="font-body"
                    style={{ fontSize: "20px", fontWeight: 700, color: "#1C1C1A" }}
                  >
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="mt-4 px-1">
                <Link
                  to="/shop"
                  className="font-body uppercase"
                  style={{
                    fontSize: "9.5px",
                    letterSpacing: "0.22em",
                    color: "rgba(28,28,26,0.40)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#2C3B2D")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(28,28,26,0.40)")
                  }
                >
                  ← Edit cart
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
