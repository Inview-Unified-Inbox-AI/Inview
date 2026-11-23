"use client";

import { useActionState } from "react";
import { Input } from "@repo/ui/components/input";
import { cn } from "@repo/ui/lib/utils";
import { joinWaitlist, type WaitlistState } from "@/app/waitlist-action";
import BG from "@/public/landing-page-mockup/bg-5.jpg";
import Image from "next/image";
const CHANNELS = ["Instagram", "WhatsApp", "Messenger", "Other"];
const SELLS = ["Clothing", "Jewellery", "Accessories", "Other"];

const initial: WaitlistState = { status: "idle" };

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && (
          <span className="font-normal text-muted-foreground"> (optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = "h-11 bg-white text-base";

const WaitlistSection = () => {
  const [state, action, pending] = useActionState(joinWaitlist, initial);
  const e = state.errors ?? {};
  const v = (state.values ?? {}) as Record<string, string | string[]>;
  const str = (k: string) => (typeof v[k] === "string" ? (v[k] as string) : "");
  const checked = Array.isArray(v.channels) ? v.channels : [];

  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-heading"
      className="mx-3 my-20 scroll-mt-20 sm:mx-5 md:my-32"
    >
      <div className="relative isolate mx-auto grid max-w-6xl gap-10 overflow-hidden rounded-2xl bg-primary p-3 md:grid-cols-2 md:gap-16 md:p-4">
        <Image
          src={BG}
          alt=""
          fill
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="-z-10 object-cover"
        />
        <div className="text-white z-1 px-5 py-12 sm:px-10 md:py-16">
          <h2
            id="waitlist-heading"
            className="text-3xl leading-tight font-semibold tracking-tight text-balance md:text-5xl"
          >
            Try Inview with your shop.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-pretty md:text-lg">
            Tell us what you sell and where customers message you. We’ll contact
            you when we’re inviting shops like yours into early access.
          </p>
        </div>

        <div className="rounded-xl z-1 bg-white/90 backdrop-blur-lg shadow-2xl shadow-muted-foreground/10 p-6 text-neutral-900 md:p-8">
          {state.status === "success" ? (
            <div role="status" className="py-8 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-100 text-xl text-emerald-700">
                ✓
              </span>
              <p className="mt-4 text-lg font-semibold">
                You’re on the waitlist.
              </p>
              <p className="mt-2 text-neutral-600">
                We’ll message you on WhatsApp when we’re inviting shops like
                yours.
              </p>
            </div>
          ) : (
            <form action={action} noValidate className="space-y-4">
              {state.status === "error" && !state.errors && (
                <p role="alert" className="text-sm text-destructive">
                  {state.message ??
                    "We couldn’t submit your signup. Please try again."}
                </p>
              )}

              {/* Honeypot */}
              <div className="hidden" aria-hidden>
                <label>
                  Company
                  <input name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <Field id="name" label="Your name" error={e.name}>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  defaultValue={str("name")}
                  aria-invalid={!!e.name}
                  aria-describedby={e.name ? "name-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <Field id="shop" label="Shop name" error={e.shop}>
                <Input
                  id="shop"
                  name="shop"
                  autoComplete="organization"
                  defaultValue={str("shop")}
                  aria-invalid={!!e.shop}
                  aria-describedby={e.shop ? "shop-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <Field id="phone" label="WhatsApp number" error={e.phone}>
                <div className="flex gap-2">
                  <span
                    aria-hidden
                    className="grid h-11 place-items-center rounded-lg border border-input bg-neutral-50 px-3 text-sm font-medium"
                  >
                    +94
                  </span>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="77 123 4567"
                    defaultValue={str("phone")}
                    aria-invalid={!!e.phone}
                    aria-describedby={e.phone ? "phone-error" : undefined}
                    className={inputClass}
                  />
                </div>
              </Field>

              <fieldset
                aria-describedby={e.channels ? "channels-error" : undefined}
              >
                <legend className="text-sm font-medium">
                  Where do customers message you?
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {CHANNELS.map((c) => (
                    <label key={c} className="cursor-pointer">
                      <input
                        type="checkbox"
                        name="channels"
                        value={c}
                        defaultChecked={checked.includes(c)}
                        className="peer sr-only"
                      />
                      <span className="inline-flex rounded-full border border-input px-4 py-2 text-sm peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:font-medium peer-checked:text-primary peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
                        {c}
                      </span>
                    </label>
                  ))}
                </div>
                {e.channels && (
                  <p
                    id="channels-error"
                    className="mt-1.5 text-sm text-destructive"
                  >
                    {e.channels}
                  </p>
                )}
              </fieldset>

              <fieldset aria-describedby={e.sells ? "sells-error" : undefined}>
                <legend className="text-sm font-medium">
                  What do you sell?
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SELLS.map((s) => (
                    <label key={s} className="cursor-pointer">
                      <input
                        type="radio"
                        name="sells"
                        value={s}
                        defaultChecked={str("sells") === s}
                        className="peer sr-only"
                      />
                      <span className="inline-flex rounded-full border border-input px-4 py-2 text-sm peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:font-medium peer-checked:text-primary peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
                {e.sells && (
                  <p
                    id="sells-error"
                    className="mt-1.5 text-sm text-destructive"
                  >
                    {e.sells}
                  </p>
                )}
              </fieldset>

              <Field id="link" label="Shop link" optional error={e.link}>
                <Input
                  id="link"
                  name="link"
                  type="url"
                  inputMode="url"
                  placeholder="Instagram, Facebook or website link"
                  defaultValue={str("link")}
                  aria-invalid={!!e.link}
                  aria-describedby={e.link ? "link-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <button
                type="submit"
                disabled={pending}
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors outline-none hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60",
                )}
              >
                {pending ? "Submitting…" : "Join the waitlist"}
              </button>

              <p className="text-xs leading-relaxed text-neutral-500">
                We’ll use your WhatsApp number to contact you about Inview early
                access. See our{" "}
                <a className="underline" href="/privacy">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
