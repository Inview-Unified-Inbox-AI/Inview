"use server";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "shop" | "phone" | "channels" | "sells" | "link", string>>;
  values?: Record<string, string | string[]>;
};

const SELLS = ["Clothing", "Jewellery", "Accessories", "Other"];
const CHANNELS = ["Instagram", "WhatsApp", "Messenger", "Other"];

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
  if (!shop) errors.shop = "Enter your shop name.";
  if (!/^\d{9}$/.test(phone.replace(/^0/, "")))
    errors.phone = "Enter a valid Sri Lankan number, for example 77 123 4567.";
  if (!channels.length || !channels.every((c) => CHANNELS.includes(c)))
    errors.channels = "Choose at least one.";
  if (!SELLS.includes(sells)) errors.sells = "Choose what you sell.";
  if (link) {
    try {
      const url = new URL(/^https?:\/\//i.test(link) ? link : `https://${link}`);
      if (!url.hostname.includes(".")) throw new Error("bad host");
    } catch {
      errors.link = "Enter a valid link, or leave this blank.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  // TODO: persist the signup (Supabase table, sheet or email) and add rate
  // limiting. Until a destination is chosen the signup is validated only.
  return { status: "success" };
}
