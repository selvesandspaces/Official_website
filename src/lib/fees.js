// Razorpay's domestic fee (2%) plus 18% GST on that fee = 2.36% of what the customer pays. The fee is
// grossed up so that after Razorpay takes its cut of the total, the shop keeps the subtotal. This only
// previews the figure; the backend (app/orders/service.py) adds the same fee to the amount charged.
export const PLATFORM_FEE_PERCENT = 2.36;

// Whole paise to avoid float drift, rounded half up like the server.
export const platformFee = (subtotal) => {
  const base = Math.round(subtotal * 100);
  return (Math.round(base / (1 - PLATFORM_FEE_PERCENT / 100)) - base) / 100;
};

export const formatINR = (n) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
