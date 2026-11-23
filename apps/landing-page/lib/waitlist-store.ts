import { createClient } from "@supabase/supabase-js";

/* Where waitlist signups go. Server-only: imported from the "use server"
   action, and it reads secrets that must never reach the browser.

   1. Supabase is the source of truth (table public.waitlist_signups).
   2. A spreadsheet row is appended afterwards through a webhook (Google Sheets
      via Apps Script, or Excel Online via Power Automate: both accept the same
      JSON). A sheet failure never fails the signup. */

export type Signup = {
  name: string;
  shop: string;
  /** E.164, e.g. +94771234567 */
  phone: string;
  channels: string[];
  sells: string;
  link: string | null;
};

export type SaveResult =
  | { ok: true; duplicate: boolean }
  | { ok: false; reason: "not-configured" | "error" };

function admin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function appendToSheet(signup: Signup, createdAt: string) {
  const url = process.env.WAITLIST_SHEET_WEBHOOK_URL;
  if (!url) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: process.env.WAITLIST_SHEET_TOKEN ?? "",
        createdAt,
        name: signup.name,
        shop: signup.shop,
        phone: signup.phone,
        channels: signup.channels.join(", "),
        sells: signup.sells,
        link: signup.link ?? "",
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok)
      console.error("[waitlist] sheet webhook responded", res.status);
  } catch (err) {
    console.error("[waitlist] sheet webhook failed", err);
  }
}

export async function saveSignup(signup: Signup): Promise<SaveResult> {
  const db = admin();
  if (!db) {
    console.error(
      "[waitlist] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set; signup not saved.",
    );
    return { ok: false, reason: "not-configured" };
  }

  const { data, error } = await db
    .from("waitlist_signups")
    .insert({ ...signup, source: "landing-page" })
    .select("created_at")
    .single();

  if (error) {
    // 23505 = unique violation: this number is already on the list.
    if (error.code === "23505") return { ok: true, duplicate: true };
    console.error("[waitlist] insert failed", error);
    return { ok: false, reason: "error" };
  }

  await appendToSheet(signup, data.created_at);
  return { ok: true, duplicate: false };
}
