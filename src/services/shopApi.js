import { apiFetch } from "./api";

const firstParagraph = (text) => (text ?? "").split("\n").find((l) => l.trim()) ?? "";

// Maps the backend ProductOut ({ id, title, amount, description, images[], details[] })
// to the shape the shop UI renders. `amount` is a string with 2 decimals; Number() is for display only,
// the server prices the order.
function mapProduct(p) {
  const images = [...p.images].sort((a, b) => a.position - b.position).map((i) => i.url);
  return {
    id: p.id,
    name: p.title,
    price: Number(p.amount),
    currency: "INR",
    tagline: firstParagraph(p.description),
    description: p.description,
    image: images[0] ?? "",
    images,
    details: [...p.details].sort((a, b) => a.position - b.position),
    accent: "#C4956A",
  };
}

export async function fetchProducts() {
  const raw = await apiFetch("/products?limit=100");
  return raw.map(mapProduct);
}

// customer: { name, email?, phone }  shippingAddress: { line1, line2?, city, state?, postal_code, country }
// items: [{ product_id, quantity }]. No prices are sent; the server prices the cart.
// No order exists after this call; it only prepares the payment.
export const startCheckout = ({ customer, shippingAddress, items }) =>
  apiFetch("/checkout", {
    method: "POST",
    body: { customer, shipping_address: shippingAddress, items },
  });

// payment: { razorpay_order_id, razorpay_payment_id, razorpay_signature } -> the finished order.
// Safe to call more than once; the server never creates duplicates.
export const verifyPayment = (payment) => apiFetch("/checkout/verify", { method: "POST", body: payment });

// Dev only: the backend's RAZORPAY_MODE=dummy can't open the real popup, so it signs a fake payment.
export const simulatePayment = (razorpayOrderId) =>
  apiFetch("/dev/razorpay/simulate-payment", { method: "POST", body: { razorpay_order_id: razorpayOrderId } });

export const fetchOrder = (orderId) => apiFetch(`/orders/${orderId}`);

// The signed-in customer's own orders, newest first. The backend has no customer/address-book
// table (details are snapshotted per order), so the latest order is the source for prefilling.
export const fetchMyOrders = (limit = 1, offset = 0) => apiFetch(`/orders?limit=${limit}&offset=${offset}`);
