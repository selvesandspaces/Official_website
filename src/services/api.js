import { supabase } from "../lib/supabase";

// Backend base URL. Set VITE_API_URL in production; the localhost fallback is dev-only.
export const API_URL =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:8000" : "");

export class ApiError extends Error {
  constructor(status, detail) {
    super(typeof detail === "string" ? detail : "Request failed");
    this.status = status;
    this.detail = detail;
  }
}

// FastAPI returns `detail` as a string, or a list of {loc, msg} for validation errors.
export function errorMessage(err, fallback = "Something went wrong. Please try again.") {
  if (err instanceof ApiError) {
    if (err.status === 429) return "Too many attempts right now. Please try again in a little while.";
    if (err.status === 502) return "We couldn’t reach our payment partner. Please try again.";
    if (Array.isArray(err.detail)) return err.detail.map((d) => d.msg).filter(Boolean).join(" ") || fallback;
    if (typeof err.detail === "string" && err.detail) return err.detail;
  }
  return fallback;
}

async function accessToken() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

// JSON request; attaches the Supabase access token when signed in. Retries once after a
// silent token refresh on 401, as the backend guide recommends.
export async function apiFetch(path, { method = "GET", body, retried = false } = {}) {
  if (!API_URL) throw new ApiError(0, "API URL is not configured");
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const token = await accessToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (res.status === 401 && token && !retried && supabase) {
    const { data } = await supabase.auth.refreshSession();
    if (data.session) return apiFetch(path, { method, body, retried: true });
    await supabase.auth.signOut();
  }
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new ApiError(res.status, payload.detail);
  }
  return res.status === 204 ? null : res.json();
}

// payload: { firstName, lastName, email, message }
export const submitContact = (payload) => apiFetch("/contact", { method: "POST", body: payload });
