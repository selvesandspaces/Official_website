import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useDialog } from "../../hooks/useDialog";
import { fetchProducts } from "../../services/shopApi";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ProductCard({ product, index, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex flex-col overflow-hidden cursor-pointer"
      style={{
        background: "#FFFFFF",
        border: `1px solid ${hovered ? "rgba(28,28,26,0.22)" : "rgba(28,28,26,0.08)"}`,
        transition: "border-color 0.3s",
      }}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(product)}
    >
      <div className="relative overflow-hidden" style={{ height: "240px" }}>
        <img loading="lazy" decoding="async"
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{ transition: "transform 0.7s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
        {product.badge && (
          <div
            className="absolute top-4 left-4 font-body uppercase"
            style={{
              fontSize: "8px",
              letterSpacing: "0.3em",
              background: product.accent,
              color: "#F5F0E8",
              padding: "5px 10px",
            }}
          >
            {product.badge}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3
          className="font-display italic mb-1"
          style={{ fontSize: "1.45rem", color: "#1C1C1A", lineHeight: 1.1 }}
        >
          {product.name}
        </h3>
        <p
          className="font-body font-light flex-1 mb-5"
          style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(28,28,26,0.52)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {product.tagline}
        </p>

        <div className="flex items-center justify-between">
          <span
            className="font-body"
            style={{ fontSize: "15px", fontWeight: 600, color: product.accent }}
          >
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span
            className="font-body uppercase"
            style={{
              fontSize: "8.5px",
              letterSpacing: "0.28em",
              padding: "9px 18px",
              background: hovered ? "#2C3B2D" : "transparent",
              color: hovered ? "#F5F0E8" : "#2C3B2D",
              border: "1px solid #2C3B2D",
              transition: "all 0.3s",
            }}
          >
            View →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Accordion({ label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid rgba(28,28,26,0.10)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between font-body uppercase"
        style={{ fontSize: "9px", letterSpacing: "0.40em", color: "#1C1C1A", background: "none", border: "none", cursor: "pointer", padding: "17px 0", textAlign: "left" }}
      >
        <span>{label}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: "20px", lineHeight: 1, color: "rgba(28,28,26,0.35)", display: "block" }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "20px" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const MAX_QTY = 10;

function ProductDetail({ product, cart, onAddToCart, onUpdateQty, onClose }) {
  const dialogRef = useRef(null);
  useDialog(dialogRef);
  const allImages = [...new Set(
    [product.image, ...(product.images ?? [])].filter(Boolean)
  )];

  const [selectedImg, setSelectedImg] = useState(0);
  const inCart = cart[product.id] || 0;
  const cartTotal = Object.values(cart).reduce((a, b) => a + b, 0);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);


  const cur = (product.currency ?? "INR").toUpperCase();
  const currencySymbol = cur === "INR" ? "₹" : cur === "USD" ? "$" : cur;

  const bodyText = { fontSize: "14px", lineHeight: 1.85, color: "rgba(28,28,26,0.62)" };
  const specLabel = { fontSize: "13px", color: "rgba(28,28,26,0.46)" };
  const specValue = { fontSize: "13px", color: "#1C1C1A", fontWeight: 500, textAlign: "right" };
  const rowStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(28,28,26,0.08)" };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      tabIndex={-1}
      className="fixed inset-0 z-[100] font-body flex flex-col"
      style={{ background: "#FFFFFF", color: "#1C1C1A" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top nav — fixed height */}
      <div
        className="flex items-center justify-between px-6 md:px-10 py-4 shrink-0"
        style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(28,28,26,0.08)", zIndex: 10 }}
      >
        <button
          onClick={onClose}
          className="font-body uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.22em", color: "rgba(28,28,26,0.45)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1C1C1A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(28,28,26,0.45)")}
        >
          ← Shop
        </button>
        <p className="font-body uppercase hidden md:block" style={{ fontSize: "9px", letterSpacing: "0.4em", color: "rgba(28,28,26,0.28)" }}>
          Selves &amp; Spaces
        </p>
        {cartTotal > 0 && (
          <button
            onClick={onClose}
            className="font-body uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.22em", color: "#2C3B2D", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C4956A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#2C3B2D")}
          >
            Cart ({cartTotal}) →
          </button>
        )}
      </div>

      {/* Split-pane content: left image | right details, each scrolls independently */}
      <div className="flex-1 overflow-y-auto md:overflow-hidden grid grid-cols-1 md:grid-cols-[3fr_2fr]">

        {/* LEFT — image gallery, scrolls within itself */}
        <div
          className="md:overflow-y-auto flex flex-col gap-3 p-6 md:p-8"
          style={{ background: "#F2EFE9" }}
        >
          {/* Thumbnail strip */}
          {allImages.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  aria-label={`Show image ${i + 1} of ${allImages.length}`}
                  style={{
                    width: "68px", height: "68px", overflow: "hidden", flexShrink: 0, padding: 0,
                    outline: selectedImg === i ? "2px solid #1C1C1A" : "2px solid transparent",
                    outlineOffset: "2px", background: "#E4E0D8", border: "none", cursor: "pointer",
                  }}
                >
                  <img loading="lazy" decoding="async" src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}

          {/* Main image — fills remaining left-column height */}
          <div style={{ flex: 1, minHeight: "400px", background: "#E4E0D8", position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.img loading="lazy" decoding="async"
                key={selectedImg}
                src={allImages[selectedImg] ?? allImages[0]}
                alt={product.name}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT — product details, scrolls independently */}
        <div
          className="md:overflow-y-auto flex flex-col px-6 md:px-10 py-10 pb-16"
          style={{ background: "#FFFFFF", borderLeft: "1px solid rgba(28,28,26,0.08)" }}
        >
          {/* Breadcrumb */}
          <p className="font-body" style={{ fontSize: "12.5px", color: "rgba(28,28,26,0.38)" }}>
            Shop /{" "}
            <span style={{ color: "rgba(28,28,26,0.62)" }}>{product.name}</span>
          </p>

          {/* Name */}
          <h1
            className="font-display italic mt-5"
            style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", color: "#1C1C1A", lineHeight: 1.05 }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <p className="font-body mt-3" style={{ fontSize: "20px", fontWeight: 700, color: "#1C1C1A" }}>
            {currencySymbol}{product.price.toLocaleString("en-IN")}
          </p>

          {/* Description */}
          <p className="font-body font-light mt-4" style={{ ...bodyText, whiteSpace: "pre-line" }}>
            {product.description}
          </p>

          {/* Spec rows */}
          <div className="mt-7" style={{ borderTop: "1px solid rgba(28,28,26,0.08)" }}>
            {Array.isArray(product.tags) && product.tags.length > 0 && (
              <div style={rowStyle}>
                <span style={specLabel}>Tags</span>
                <div className="flex flex-wrap gap-1.5 justify-end" style={{ maxWidth: "65%" }}>
                  {product.tags.map((t, i) => (
                    <span key={i} style={{ fontSize: "11px", padding: "3px 9px", background: "rgba(44,59,45,0.07)", color: "#2C3B2D" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {product.footer_tag && (
              <div style={rowStyle}>
                <span style={specLabel}>For</span>
                <span style={specValue}>{product.footer_tag}</span>
              </div>
            )}
            {product.stock != null && (
              <div style={rowStyle}>
                <span style={specLabel}>Availability</span>
                <span style={{ ...specValue, color: product.stock > 5 ? "#2C3B2D" : "#C4956A" }}>
                  {product.stock > 5 ? "In stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of stock"}
                </span>
              </div>
            )}
          </div>

          {/* Detailed sections as accordions */}
          <div className="mt-2">
            {(product.details ?? []).map((section) => (
              <Accordion key={section.id} label={section.title}>
                {section.subtitle && (
                  <p className="font-body font-light mb-3" style={{ ...bodyText, whiteSpace: "pre-line" }}>{section.subtitle}</p>
                )}
                <p className="font-body font-light" style={{ ...bodyText, whiteSpace: "pre-line" }}>{section.paragraph}</p>
              </Accordion>
            ))}

            {Array.isArray(product.faq) && product.faq.length > 0 && (
              <Accordion label="FAQ">
                <div className="flex flex-col gap-5">
                  {product.faq.map((item, i) => (
                    <div key={i}>
                      <p className="font-body mb-1" style={{ fontSize: "13px", color: "#1C1C1A", fontWeight: 500 }}>
                        {item.question ?? item.title}
                      </p>
                      <p className="font-body font-light" style={bodyText}>{item.answer}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
            )}
          </div>

          {/* Add to cart, or quantity stepper once it is in the cart. Changes apply to the cart immediately. */}
          <div className="mt-8 pt-7" style={{ borderTop: "1px solid rgba(28,28,26,0.09)" }}>
            {inCart === 0 ? (
              <button
                onClick={() => onAddToCart(product.id, 1)}
                className="font-body uppercase w-full"
                style={{ fontSize: "10px", letterSpacing: "0.24em", height: "52px", background: "#1C1C1A", color: "#FFFFFF", border: "none", cursor: "pointer", transition: "background 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#2C3B2D"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#1C1C1A"; }}
              >
                {`Add to cart for ${currencySymbol}${product.price.toLocaleString("en-IN")}`}
              </button>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center shrink-0" style={{ border: "1px solid rgba(28,28,26,0.18)" }}>
                  <button
                    onClick={() => onUpdateQty(product.id, -1)}
                    aria-label={inCart === 1 ? "Remove from cart" : "Decrease quantity"}
                    style={{ width: "52px", height: "52px", fontSize: "20px", background: "none", border: "none", cursor: "pointer", color: "#1C1C1A", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >−</button>
                  <span
                    className="font-body"
                    aria-live="polite"
                    aria-label={`${inCart} in cart`}
                    style={{ width: "48px", height: "52px", fontSize: "15px", color: "#1C1C1A", borderLeft: "1px solid rgba(28,28,26,0.18)", borderRight: "1px solid rgba(28,28,26,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >{inCart}</span>
                  <button
                    onClick={() => onUpdateQty(product.id, 1)}
                    disabled={inCart >= MAX_QTY}
                    aria-label="Increase quantity"
                    style={{ width: "52px", height: "52px", fontSize: "20px", background: "none", border: "none", cursor: inCart >= MAX_QTY ? "default" : "pointer", color: "#1C1C1A", opacity: inCart >= MAX_QTY ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >+</button>
                </div>
                <p className="font-body text-right" style={{ fontSize: "13px", color: "rgba(28,28,26,0.55)" }}>
                  In your cart · {currencySymbol}{(product.price * inCart).toLocaleString("en-IN")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CartFAB({ totalItems, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          onClick={onClick}
          className="fixed font-body"
          style={{
            bottom: "24px",
            right: "24px",
            zIndex: 90,
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: hovered ? "#C4956A" : "#2C3B2D",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(44,59,45,0.38)",
            color: "#F5F0E8",
            transition: "background 0.3s",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          whileHover={{ scale: 1.08 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <span
            className="absolute font-body"
            style={{
              top: "-4px",
              right: "-4px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#C4956A",
              color: "#F5F0E8",
              fontSize: "10px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
              border: "2px solid #F5F0E8",
            }}
          >
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div
      className="flex gap-4 items-start"
      style={{ paddingBottom: "16px", borderBottom: "1px solid rgba(28,28,26,0.08)" }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          overflow: "hidden",
          flexShrink: 0,
          background: "#E8E3DA",
        }}
      >
        <img loading="lazy" decoding="async"
          src={item.image}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p
              className="font-body"
              style={{ fontSize: "13px", fontWeight: 600, color: "#1C1C1A", lineHeight: 1.3 }}
            >
              {item.name}
            </p>
            <p
              className="font-body font-light mt-0.5"
              style={{ fontSize: "12px", color: "rgba(28,28,26,0.44)" }}
            >
              ₹{item.price.toLocaleString("en-IN")} each
            </p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="font-body uppercase shrink-0"
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              color: "rgba(28,28,26,0.30)",
              background: "none",
              border: "none",
              cursor: "pointer",
              paddingTop: "2px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C4956A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(28,28,26,0.30)")}
          >
            Remove
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div
            className="flex items-center"
            style={{ border: "1px solid rgba(28,28,26,0.14)" }}
          >
            <button
              onClick={() => onUpdate(item.id, -1)}
              style={{
                width: "28px",
                height: "28px",
                fontSize: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#1C1C1A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              −
            </button>
            <span
              className="font-body"
              style={{
                width: "28px",
                height: "28px",
                textAlign: "center",
                fontSize: "13px",
                color: "#1C1C1A",
                borderLeft: "1px solid rgba(28,28,26,0.14)",
                borderRight: "1px solid rgba(28,28,26,0.14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.qty}
            </span>
            <button
              onClick={() => onUpdate(item.id, 1)}
              style={{
                width: "28px",
                height: "28px",
                fontSize: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#1C1C1A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              +
            </button>
          </div>

          <span
            className="font-body"
            style={{ fontSize: "14px", fontWeight: 600, color: item.accent }}
          >
            ₹{(item.price * item.qty).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ cart, products, onUpdate, onRemove, onClose, onCheckout }) {
  const [btnHovered, setBtnHovered] = useState(false);

  const lineItems = Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      return product ? { ...product, qty } : null;
    })
    .filter(Boolean);

  const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: 94,
          background: "rgba(17,18,9,0.40)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      <motion.div
        className="fixed top-0 right-0 h-full flex flex-col"
        style={{
          zIndex: 95,
          width: "min(380px, 100vw)",
          background: "#F5F0E8",
          boxShadow: "-8px 0 60px rgba(28,28,26,0.16)",
        }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          style={{
            height: "3px",
            background: "linear-gradient(90deg, #323b10, #C4956A, #6B56A8)",
            flexShrink: 0,
          }}
        />

        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(28,28,26,0.10)", flexShrink: 0 }}
        >
          <div className="flex items-center gap-3">
            <h2
              className="font-display italic"
              style={{ fontSize: "1.55rem", color: "#1C1C1A", lineHeight: 1 }}
            >
              Your Cart
            </h2>
            <span
              className="font-body uppercase"
              style={{
                fontSize: "9.5px",
                letterSpacing: "0.26em",
                color: "rgba(28,28,26,0.38)",
              }}
            >
              {lineItems.length} item{lineItems.length !== 1 ? "s" : ""}
            </span>
          </div>
          <button
            onClick={onClose}
            className="font-body uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "rgba(28,28,26,0.36)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✕ close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4" style={{ minHeight: 0 }}>
          {lineItems.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full gap-4"
              style={{ paddingTop: "60px" }}
            >
              <p
                className="font-display italic"
                style={{
                  fontSize: "1.25rem",
                  color: "rgba(28,28,26,0.38)",
                  textAlign: "center",
                }}
              >
                Your cart is empty.
              </p>
              <p
                className="font-body font-light"
                style={{
                  fontSize: "13px",
                  color: "rgba(28,28,26,0.40)",
                  textAlign: "center",
                }}
              >
                Browse our products and add something you love.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {lineItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdate={onUpdate}
                  onRemove={onRemove}
                />
              ))}
            </div>
          )}
        </div>

        {lineItems.length > 0 && (
          <div
            className="px-6 pb-6 pt-4"
            style={{ borderTop: "1px solid rgba(28,28,26,0.10)", flexShrink: 0 }}
          >
            <div className="flex justify-between items-center mb-1">
              <span
                className="font-body uppercase"
                style={{
                  fontSize: "9.5px",
                  letterSpacing: "0.26em",
                  color: "rgba(28,28,26,0.46)",
                }}
              >
                Subtotal
              </span>
              <span
                className="font-body"
                style={{ fontSize: "15px", fontWeight: 600, color: "#1C1C1A" }}
              >
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <p
              className="font-body font-light mb-5"
              style={{
                fontSize: "11px",
                color: "rgba(28,28,26,0.36)",
                letterSpacing: "0.1em",
              }}
            >
              Free delivery across India
            </p>
            <button
              onClick={onCheckout}
              className="font-body uppercase w-full"
              style={{
                fontSize: "10px",
                letterSpacing: "0.26em",
                padding: "14px 24px",
                background: btnHovered ? "#C4956A" : "#2C3B2D",
                color: "#F5F0E8",
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
            >
              Checkout →
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default function ShopSection() {
  const { cart, totalItems, addToCart, updateQty, removeFromCart, pruneCart } = useCart();
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        pruneCart(data.map((p) => p.id));
        setProductsLoading(false);
      })
      .catch(() => {
        setProductsError(true);
        setProductsLoading(false);
      });
  }, [pruneCart]);

  useEffect(() => {
    const locked = selectedProduct !== null || drawerOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct, drawerOpen]);

  const handleCheckout = () => {
    setDrawerOpen(false);
    navigate("/checkout", { state: { cart, products } });
  };

  const handleProductClick = (product) => {
    setDrawerOpen(false);
    setSelectedProduct(product);
  };

  return (
    <main
      className="font-body"
      style={{ background: "#F5F0E8", minHeight: "100vh", color: "#1C1C1A" }}
    >
      <section className="px-6 md:px-14 lg:px-24 pt-32 pb-14">
        <div className="max-w-6xl mx-auto">
          <motion.p
            className="font-body uppercase mb-4"
            style={{ fontSize: "10px", letterSpacing: "0.44em", color: "#8A9E85" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Selves & Spaces · Shop
          </motion.p>
          <motion.h1
            className="font-display italic"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              color: "#1C1C1A",
              lineHeight: 0.95,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Mindful goods.
          </motion.h1>
          <motion.p
            className="font-body font-light mt-5"
            style={{
              fontSize: "15px",
              lineHeight: 1.85,
              color: "rgba(28,28,26,0.52)",
              maxWidth: "480px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            Each piece in our shop is chosen or made with intention — to bring a little more
            gentleness into your everyday.
          </motion.p>
        </div>
      </section>

      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg, #323b10, #C4956A, #6B56A8)",
        }}
      />

      <section className="px-6 md:px-14 lg:px-24 py-16">
        <div className="max-w-6xl mx-auto">
          {productsLoading ? (
            <p
              className="font-display italic text-center"
              style={{ fontSize: "1.2rem", color: "rgba(28,28,26,0.28)" }}
            >
              Loading products…
            </p>
          ) : productsError ? (
            <p
              className="font-display italic text-center"
              style={{ fontSize: "1.2rem", color: "rgba(196,149,106,0.6)" }}
            >
              Could not load products — please check your connection and try again in a moment.
            </p>
          ) : products.length === 0 ? (
            <p
              className="font-display italic text-center"
              style={{ fontSize: "1.2rem", color: "rgba(28,28,26,0.38)" }}
            >
              Our shop is being restocked — please check back soon.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onOpen={handleProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-6 md:px-14 lg:px-24 pb-28">
        <div className="max-w-6xl mx-auto">
          <p
            className="font-display italic text-center"
            style={{ fontSize: "1.2rem", color: "rgba(28,28,26,0.28)" }}
          >
            All items are dispatched within 3–5 working days.
          </p>
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            cart={cart}
            onAddToCart={addToCart}
            onUpdateQty={updateQty}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>

      <CartFAB totalItems={totalItems} onClick={() => setDrawerOpen(true)} />

      <AnimatePresence>
        {drawerOpen && (
          <CartDrawer
            cart={cart}
            products={products}
            onUpdate={updateQty}
            onRemove={removeFromCart}
            onClose={() => setDrawerOpen(false)}
            onCheckout={handleCheckout}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
