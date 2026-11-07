import { supabase } from "../lib/supabase";
import { apiFetch } from "./api";

// The backend stores a customer's name, phone and address in their Supabase user metadata and
// exposes only PATCH /users/me (no GET), so the saved profile is read back from Supabase.
// getUser() asks the server, so it reflects a recent PATCH rather than the cached session.
export async function fetchProfile() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  const { name, phone, address } = data.user.user_metadata ?? {};
  if (!name && !phone && !address) return null;
  return { name: name ?? "", phone: phone ?? "", address: address ?? null };
}

// profile: { name, phone, address: { line1, line2, city, state, postal_code, country } }
export const saveProfile = (profile) => apiFetch("/users/me", { method: "PATCH", body: profile });
