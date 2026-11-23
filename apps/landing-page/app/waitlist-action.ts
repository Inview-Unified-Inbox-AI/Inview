"use server";

import { headers } from "next/headers";
import { saveSignup } from "@/lib/waitlist-store";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<
    Record<"name" | "shop" | "phone" | "channels" | "sells" | "link", string>
  >;
  values?: Record<string, string | string[]>;
};

const SELLS = ["Clothing", "Jewellery", "Accessories", "Other"];
const CHANNELS = ["Instagram", "WhatsApp", "Messenger", "Other"];

// Must match the check constraints in supabase/migrations/*_waitlist_signups.sql
const MAX_NAME = 120;
const MAX_SHOP = 120;
const MAX_LINK = 300;

/* Light per-IP rate limit. In-memory, so it is per server instance (good enough
   to stop a loop hammering the form; put a shared store such as Upstash or
   Vercel KV behind it if abuse becomes real). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  // Honeypot: real users never fill this hidden field.
  if (String(formData.get("company") ?? "") !== "") {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const shop = String(formData.get("shop") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").replace(/[\s-]/g, "");
  const link = String(formData.get("link") ?? "").trim();
  const sells = String(formData.get("sells") ?? "");
  const channels = formData.getAll("channels").map(String);

  const values = { name, shop, phone, link, sells, channels };
  const errors: NonNullable<WaitlistState["errors"]> = {};

  if (!name) errors.name = "Enter your name.";
  else if (name.length > MAX_NAME) errors.name = `Keep your name under ${MAX_NAME} characters.`;
  if (!shop) errors.shop = "Enter your shop name.";
  else if (shop.length > MAX_SHOP)
    errors.shop = `Keep your shop name under ${MAX_SHOP} characters.`;
  if (!/^\d{9}$/.test(phone.replace(/^0/, "")))
    errors.phone = "Enter a valid Sri Lankan number, for example 77 123 4567.";
  if (!channels.length || !channels.every((c) => CHANNELS.includes(c)))
    errors.channels = "Choose at least one.";
  if (!SELLS.includes(sells)) errors.sells = "Choose what you sell.";
  if (link.length > MAX_LINK) {
    errors.link = `Keep the link under ${MAX_LINK} characters.`;
  } else if (link) {
    try {
      const url = new URL(
        /^https?:\/\//i.test(link) ? link : `https://${link}`,
      );
      if (!url.hostname.includes(".")) throw new Error("bad host");
    } catch {
      errors.link = "Enter a valid link, or leave this blank.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "Too many attempts. Please wait a few minutes and try again.",
      values,
    };
  }

  // Store as E.164 (+94771234567); the unique index on it blocks duplicates.
  const e164 = `+94${phone.replace(/^0/, "")}`;
  const result = await saveSignup({
    name,
    shop,
    phone: e164,
    channels,
    sells,
    link: link || null,
  });

  if (!result.ok) {
    return {
      status: "error",
      message: "We couldn’t submit your signup. Please try again.",
      values,
    };
  }

  // A repeat signup with the same number is treated as success, without
  // revealing whether the number was already on the list.
  return { status: "success" };
}
