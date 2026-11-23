"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@repo/ui/lib/utils";
import { Send, SendHorizonal } from "lucide-react";
import Image from "next/image";

/* A high-fidelity, self-playing Unified Inbox for the hero.
   Layout: nav rail · chat list (every channel) · conversation · lead details.
   A scripted cursor opens a chat, AI extracts the lead, drafts a reply, the
   seller sends it, adds a follow-up by voice, approves an AI follow-up and
   confirms the order. The script loops while the screen is on screen. */

const W = 1180; // design size, scaled to fit the hero
const H = 640;

type Channel = "Instagram" | "WhatsApp" | "Messenger";
type LabelName = "Sales enquiry" | "Order" | "Support" | "Likely spam";

const CHANNEL_DOT: Record<Channel, string> = {
  Instagram: "bg-pink-500",
  WhatsApp: "bg-emerald-500",
  Messenger: "bg-sky-500",
};

const LABEL_STYLE: Record<LabelName, string> = {
  "Sales enquiry": "bg-primary/10 text-primary ring-primary/20",
  Order: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Support: "bg-amber-50 text-amber-700 ring-amber-200",
  "Likely spam": "bg-rose-50 text-rose-700 ring-rose-200",
};

const OTHERS: {
  name: string;
  ch: Channel;
  preview: string;
  time: string;
  label: LabelName;
}[] = [
  {
    name: "Nuwan",
    ch: "WhatsApp",
    preview: "Can I pay COD for two items?",
    time: "8m",
    label: "Order",
  },
  {
    name: "Priya",
    ch: "Messenger",
    preview: "Is the blue one still in stock?",
    time: "21m",
    label: "Sales enquiry",
  },
  {
    name: "Kamal",
    ch: "WhatsApp",
    preview: "The zip broke on my last order",
    time: "1h",
    label: "Support",
  },
  {
    name: "+94 77 123 4567",
    ch: "Instagram",
    preview: "Win a free phone, click here",
    time: "2h",
    label: "Likely spam",
  },
  {
    name: "Dilini",
    ch: "Messenger",
    preview: "Do you deliver to Galle?",
    time: "3h",
    label: "Sales enquiry",
  },
];

type Msg = { id: number; from: "buyer" | "you" | "auto"; text: string };
type FollowUp = {
  id: number;
  text: string;
  kind: "waiting" | "voice" | "done";
};

const LEAD_FIELDS = [
  ["Name", "Afthah"],
  ["Channel", "Instagram"],
  ["Product", "Black dress"],
  ["Size", "M"],
  ["Payment", "COD · Kandy"],
] as const;

const STAGES = ["New lead", "Following up", "Confirmed"] as const;

const INITIAL = {
  rowVisible: false, // Afthah's row has arrived
  selected: false,
  labelled: 0, // how many of OTHERS have been labelled
  AfthahLabelled: false,
  msgs: [] as Msg[],
  extracted: 0,
  score: false,
  composer: "idle" as "idle" | "generating" | "typing" | "voice" | "auto",
  draft: "",
  transcript: "",
  followUps: [] as FollowUp[],
  toast: null as string | null,
  stage: 0,
  confirmed: false,
};
type State = typeof INITIAL;

const FINAL: State = {
  ...INITIAL,
  rowVisible: true,
  selected: true,
  labelled: OTHERS.length,
  AfthahLabelled: true,
  msgs: [
    {
      id: 1,
      from: "buyer",
      text: "Is the black dress available in M? Can I pay cash on delivery in Kandy?",
    },
    {
      id: 2,
      from: "you",
      text: "Hi Afthah! Checking black, M and COD for you now.",
    },
    {
      id: 3,
      from: "auto",
      text: "Just checking in. The black dress in M is in stock. Shall I confirm your order?",
    },
    { id: 4, from: "buyer", text: "I’ll take it!" },
  ],
  extracted: LEAD_FIELDS.length,
  score: true,
  followUps: [
    { id: 1, text: "Stock check promised", kind: "done" },
    { id: 2, text: "Confirm stock · 4:30 pm", kind: "voice" },
  ],
  stage: 2,
  confirmed: true,
};

export default function HeroInboxApp() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [visible, setVisible] = useState(false);
  const [s, setS] = useState<State>(INITIAL);
  const [cursor, setCursor] = useState({
    x: W - 120,
    y: H + 40,
    down: false,
    shown: false,
  });
  const reduce = useRef(false);

  // Fit the fixed-size design to the available width.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const fit = () => setScale(wrap.clientWidth / W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Only run the script while the screen is on screen.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(!!e?.isIntersecting),
      {
        threshold: 0.15,
      },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    reduce.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce.current) setS(FINAL);
  }, []);

  useEffect(() => {
    if (!visible || reduce.current) return;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        timers.push(setTimeout(res, ms));
      });
    const patch = (p: Partial<State>) =>
      alive && setS((prev) => ({ ...prev, ...p }));
    const push = <K extends "msgs" | "followUps">(
      key: K,
      item: State[K][number],
    ) =>
      alive &&
      setS((prev) => ({ ...prev, [key]: [...prev[key], item] as State[K] }));
    const typeInto = (key: "draft" | "transcript", text: string, ms: number) =>
      new Promise<void>((res) => {
        let i = 0;
        const id = setInterval(() => {
          i++;
          patch({ [key]: text.slice(0, i) } as Partial<State>);
          if (i >= text.length || !alive) {
            clearInterval(id);
            res();
          }
        }, ms);
        intervals.push(id);
      });
    const toast = async (text: string, ms = 1800) => {
      patch({ toast: text });
      await sleep(ms);
      patch({ toast: null });
    };

    const moveTo = async (sel: string) => {
      const app = appRef.current;
      const el = app?.querySelector<HTMLElement>(`[data-c="${sel}"]`);
      if (!app || !el) return;
      const ar = app.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const k = ar.width / W || 1;
      setCursor((c) => ({
        ...c,
        shown: true,
        x: (r.left - ar.left) / k + Math.min(r.width / k / 2, 60),
        y: (r.top - ar.top) / k + r.height / k / 2,
      }));
      await sleep(900);
    };
    const click = async () => {
      setCursor((c) => ({ ...c, down: true }));
      await sleep(160);
      setCursor((c) => ({ ...c, down: false }));
      await sleep(250);
    };

    const play = async () => {
      while (alive) {
        setS(INITIAL);
        setCursor({ x: W - 140, y: H + 30, down: false, shown: false });
        await sleep(600);

        // 1 · AI labels the chats from every channel
        for (let i = 1; i <= OTHERS.length && alive; i++) {
          patch({ labelled: i });
          await sleep(320);
        }
        await sleep(500);

        // 2 · a new Instagram DM arrives
        patch({ rowVisible: true });
        await sleep(1100);

        // 3 · open it; AI reads the chat and fills in the lead
        await moveTo("row-Afthah");
        await click();
        patch({
          selected: true,
          msgs: [
            {
              id: 1,
              from: "buyer",
              text: "Is the black dress available in M? Can I pay cash on delivery in Kandy?",
            },
          ],
        });
        await sleep(500);
        patch({ AfthahLabelled: true });
        for (let i = 1; i <= LEAD_FIELDS.length && alive; i++) {
          patch({ extracted: i });
          await sleep(380);
        }
        patch({ score: true });
        await sleep(700);

        // 4 · AI drafts the reply
        await moveTo("ai-draft");
        await click();
        patch({ composer: "generating" });
        await sleep(1100);
        patch({ composer: "typing" });
        await typeInto(
          "draft",
          "Hi Afthah! Checking black, M and COD for you now.",
          28,
        );
        await sleep(500);

        // 5 · send; the promise becomes a follow-up
        await moveTo("send");
        await click();
        push("msgs", {
          id: 2,
          from: "you",
          text: "Hi Afthah! Checking black, M and COD for you now.",
        });
        patch({ composer: "idle", draft: "", stage: 1 });
        await sleep(500);
        push("followUps", {
          id: 1,
          text: "Stock check promised",
          kind: "waiting",
        });
        await sleep(1300);

        // 6 · add a reminder by voice
        await moveTo("mic");
        await click();
        patch({ composer: "voice", transcript: "" });
        await typeInto(
          "transcript",
          "Remind me to confirm stock by four thirty",
          38,
        );
        await sleep(600);
        patch({ composer: "idle", transcript: "" });
        push("followUps", {
          id: 2,
          text: "Confirm stock · 4:30 pm",
          kind: "voice",
        });
        await toast("✦ Follow-up added by voice");
        await sleep(600);

        // 7 · AI writes an automatic follow-up; the seller approves it
        patch({ composer: "auto" });
        await toast("✦ AI follow-up ready", 1500);
        await moveTo("approve");
        await click();
        push("msgs", {
          id: 3,
          from: "auto",
          text: "Just checking in. The black dress in M is in stock. Shall I confirm your order?",
        });
        patch({ composer: "idle" });
        patch({
          followUps: [
            { id: 1, text: "Stock check promised", kind: "done" },
            { id: 2, text: "Confirm stock · 4:30 pm", kind: "voice" },
          ],
        });
        await sleep(1400);

        // 8 · buyer says yes; confirm the order
        push("msgs", { id: 4, from: "buyer", text: "I’ll take it!" });
        patch({ stage: 2 });
        await sleep(1000);
        await moveTo("confirm");
        await click();
        patch({ confirmed: true });
        await toast("✓ Order confirmed", 1800);
        await sleep(3200);
      }
    };
    play();

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [visible]);

  const AfthahBubble = (m: Msg) => (
    <div
      key={m.id}
      className={cn(
        "animate-[hero-in_.45s_ease-out_both]",
        m.from === "buyer" ? "flex justify-start" : "flex justify-end",
      )}
    >
      <div className="max-w-[78%]">
        {m.from === "auto" && (
          <p className="mb-1 text-right text-[10px] font-medium text-primary">
            ✦ AI follow-up · approved
          </p>
        )}
        <p
          className={cn(
            "px-3.5 py-2.5 text-[13px] leading-relaxed",
            m.from === "buyer"
              ? "rounded-2xl rounded-tl-sm bg-neutral-100 text-neutral-700"
              : "rounded-2xl rounded-tr-sm bg-primary text-white",
          )}
        >
          {m.text}
        </p>
      </div>
    </div>
  );

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full overflow-hidden"
      style={{ height: scale ? H * scale : undefined }}
    >
      <style>{`
        @keyframes hero-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes hero-shimmer { 0% { background-position: -200px 0; } 100% { background-position: 200px 0; } }
        @keyframes hero-wave { 0%,100% { transform: scaleY(.25); } 50% { transform: scaleY(1); } }
        @keyframes hero-ripple { from { transform: scale(.4); opacity: .55; } to { transform: scale(2.2); opacity: 0; } }
        .hero-shimmer { background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%); background-size: 400px 100%; animation: hero-shimmer 1.2s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .hero-shimmer { animation: none; } }
      `}</style>

      <div
        ref={appRef}
        aria-hidden
        className={cn(
          "absolute left-0 top-0 grid origin-top-left select-none grid-cols-[56px_290px_1fr_270px] overflow-hidden rounded-t-xl bg-white text-left text-neutral-800 shadow-2xl ring-1 ring-black/5 transition-opacity duration-500",
          scale ? "opacity-100" : "opacity-0",
        )}
        style={{ width: W, height: H, transform: `scale(${scale || 1})` }}
      >
        {/* Rail */}
        <div className="flex flex-col items-center gap-3 border-r border-neutral-100 bg-neutral-50 py-4">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-white">
            i
          </span>
          {[
            "M3 6h18M3 12h18M3 18h12",
            "M12 6v6l4 2M12 21a9 9 0 100-18 9 9 0 000 18z",
            "M4 20V10M10 20V4M16 20v-8M22 20H2",
            "M12 15a3 3 0 100-6 3 3 0 000 6zM19 12h2M3 12h2M12 3v2M12 19v2",
          ].map((d, i) => (
            <span
              key={i}
              className={cn(
                "grid size-9 place-items-center rounded-lg",
                i === 0 ? "bg-primary/10 text-primary" : "text-neutral-400",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4 fill-none stroke-current stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={d} />
              </svg>
            </span>
          ))}
        </div>

        {/* Chat list */}
        <div className="flex min-h-0 flex-col border-r border-neutral-100">
          <div className="px-4 pb-3 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold">Unified Inbox</p>
              <span className="text-[11px] text-neutral-400">All channels</span>
            </div>
            <div className="mt-3 flex gap-1.5">
              {(["All", "Instagram", "WhatsApp", "Messenger"] as const).map(
                (c, i) => (
                  <span
                    key={c}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
                      i === 0
                        ? "bg-neutral-900 text-white ring-neutral-900"
                        : "bg-white text-neutral-600 ring-neutral-200",
                    )}
                  >
                    {i > 0 && (
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          CHANNEL_DOT[c as Channel],
                        )}
                      />
                    )}
                    {c === "All" && "All"}
                    {c === "Instagram" && (
                      <Image
                        src={
                          "https://img.icons8.com/fluency/96/instagram-new.png"
                        }
                        alt="Instagram"
                        width={100}
                        height={100}
                        className="w-5"
                      />
                    )}
                    {c === "Messenger" && (
                      <Image
                        src={
                          "https://img.icons8.com/fluency/96/facebook-messenger--v2.png"
                        }
                        alt="Instagram"
                        width={100}
                        height={100}
                        className="w-5"
                      />
                    )}
                    {c === "WhatsApp" && (
                      <Image
                        src={
                          "https://img.icons8.com/office/40/whatsapp--v1.png"
                        }
                        alt="Instagram"
                        width={100}
                        height={100}
                        className="w-5"
                      />
                    )}
                  </span>
                ),
              )}
            </div>
          </div>
          <ul className="min-h-0 flex-1 overflow-hidden">
            {s.rowVisible && (
              <li
                data-c="row-Afthah"
                className={cn(
                  "flex animate-[hero-in_.45s_ease-out_both] items-center gap-3 border-l-2 px-4 py-3 transition-colors",
                  s.selected
                    ? "border-primary bg-primary/[0.07]"
                    : "border-transparent bg-primary/[0.03]",
                )}
              >
                <span className="relative">
                  <span className="grid size-9 place-items-center rounded-full bg-pink-100 text-sm font-semibold text-pink-700">
                    A
                  </span>
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-white",
                      CHANNEL_DOT.Instagram,
                    )}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-semibold">Afthah</p>
                    <span className="text-[10px] text-neutral-400">now</span>
                  </div>
                  <p className="truncate text-xs text-neutral-500">
                    {s.confirmed
                      ? "Order confirmed"
                      : s.msgs.length > 2
                        ? "I’ll take it!"
                        : "Is the black dress available in M?"}
                  </p>
                  <div className="mt-1 h-5">
                    {s.AfthahLabelled ? (
                      <span
                        className={cn(
                          "animate-[hero-in_.4s_ease-out_both] rounded-sm px-2 py-1 shadow-sm shadow-muted-foreground/10 text-[13px] font-medium ring-0",
                          LABEL_STYLE[s.confirmed ? "Order" : "Sales enquiry"],
                        )}
                      >
                        {s.confirmed ? "Order" : "Sales enquiry"}
                      </span>
                    ) : (
                      <span className="hero-shimmer inline-block h-4 w-16 rounded-full" />
                    )}
                  </div>
                </div>
                {!s.selected && (
                  <span className="size-2 rounded-full bg-primary" />
                )}
              </li>
            )}
            {OTHERS.map((c, i) => (
              <li
                key={c.name}
                className="flex items-center gap-3 border-l-2 border-transparent px-4 py-3"
              >
                <span className="relative">
                  <span className="grid size-9 place-items-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-600">
                    {c.name[0] === "+" ? "?" : c.name[0]}
                  </span>
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-white",
                      CHANNEL_DOT[c.ch],
                    )}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-[13px] font-semibold">
                      {c.name}
                    </p>
                    <span className="text-[10px] text-neutral-400">
                      {c.time}
                    </span>
                  </div>
                  <p className="truncate text-xs text-neutral-500">
                    {c.preview}
                  </p>
                  <div className="mt-1 h-5">
                    {i < s.labelled ? (
                      <span
                        className={cn(
                          "animate-[hero-in_.4s_ease-out_both] rounded-sm px-2 py-1 shadow-sm shadow-muted-foreground/10 text-[13px] font-medium ring-0",
                          LABEL_STYLE[c.label],
                        )}
                      >
                        {c.label}
                      </span>
                    ) : (
                      <span className="hero-shimmer inline-block h-4 w-16 rounded-full" />
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Conversation */}
        <div className="relative flex min-h-0 flex-col">
          <div className="flex items-center gap-3 border-b border-neutral-100 px-5 py-3.5">
            <span className="grid size-9 place-items-center rounded-full bg-pink-100 text-sm font-semibold text-pink-700">
              A
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">Afthah</p>
              <p className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                <Image
                  src={"https://img.icons8.com/fluency/96/instagram-new.png"}
                  alt="Instagram"
                  width={100}
                  height={100}
                  className="w-5"
                />
                Instagram
              </p>
            </div>
            {s.selected && (
              <span className="animate-[hero-in_.4s_ease-out_both] rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                ✦ AI summary ready
              </span>
            )}
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-5 py-4">
            {!s.selected && (
              <p className="m-auto text-sm text-neutral-400">
                Select a conversation
              </p>
            )}
            {s.msgs.map(AfthahBubble)}
          </div>

          {/* Composer */}
          <div className="border-t border-neutral-100 p-4">
            {s.composer === "auto" && (
              <div className="mb-3 animate-[hero-in_.45s_ease-out_both] rounded-xl bg-primary/[0.06] p-3.5 ring-1 ring-primary/15">
                <p className="text-[11px] font-semibold text-primary">
                  ✦ AI follow-up · created automatically
                </p>
                <p className="mt-1.5 text-[13px] text-neutral-700">
                  Just checking in. The black dress in M is in stock. Shall I
                  confirm your order?
                </p>
                <div className="mt-3 flex gap-2">
                  <span
                    data-c="approve"
                    className="rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm"
                  >
                    Approve &amp; send
                  </span>
                  <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
                    Edit
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-end gap-2.5">
              <div className="min-h-[3.25rem] flex-1 rounded-md bg-neutral-50 px-3.5 py-3 text-[13px] ring-1 ring-muted-foreground/10 shadow-md shadow-muted-foreground/5">
                {s.composer === "generating" ? (
                  <div className="space-y-2">
                    <span className="hero-shimmer block h-3 w-4/5 rounded" />
                    <span className="hero-shimmer block h-3 w-2/5 rounded" />
                  </div>
                ) : s.composer === "voice" ? (
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 items-center gap-[3px]">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <span
                          key={i}
                          style={{
                            height: `${40 + ((i * 37) % 60)}%`,
                            animation: `hero-wave ${0.7 + (i % 4) * 0.12}s ease-in-out ${i * -0.08}s infinite`,
                          }}
                          className="w-[3px] origin-center rounded-full bg-primary"
                        />
                      ))}
                    </span>
                    <span className="text-neutral-700">
                      {s.transcript || "Listening…"}
                    </span>
                  </div>
                ) : s.draft ? (
                  <span className="text-neutral-700">{s.draft}</span>
                ) : (
                  <span className="text-neutral-400">Write a reply…</span>
                )}
              </div>
              <span
                data-c="ai-draft"
                className="flex h-[3.25rem] items-center gap-1.5 rounded-sm bg-white px-3.5 text-xs font-semibold text-primary ring-1 ring-primary/30"
              >
                ✦ AI draft
              </span>
              <span
                data-c="mic"
                className={cn(
                  "grid h-13 w-13 place-items-center rounded-full ring-1 transition-colors",
                  s.composer === "voice"
                    ? "bg-primary text-white ring-primary"
                    : "bg-white text-neutral-600 ring-neutral-200",
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 fill-none stroke-current stroke-2"
                  strokeLinecap="round"
                >
                  <rect x="9" y="3" width="6" height="11" rx="3" />
                  <path d="M5 11a7 7 0 0014 0M12 18v3" />
                </svg>
              </span>
              <span
                data-c="send"
                className={cn(
                  "grid h-13 w-13 place-items-center rounded-full  text-sm font-semibold transition-colors",
                  s.composer === "typing"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-400",
                )}
              >
                <SendHorizonal className="size-5" />
              </span>
            </div>
          </div>

          {/* Toast */}
          <div
            className={cn(
              "pointer-events-none absolute right-4 top-16 rounded-full bg-neutral-900 px-3.5 py-2 text-xs font-medium text-white shadow-lg transition-all duration-300",
              s.toast
                ? "translate-y-0 opacity-100"
                : "-translate-y-2 opacity-0",
            )}
          >
            {s.toast ?? " "}
          </div>
        </div>

        {/* Lead details */}
        <div className="flex min-h-0 flex-col gap-4 overflow-hidden border-l border-neutral-100 bg-neutral-50/60 p-4">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Lead details
              </p>
              {s.score && (
                <span className="animate-[hero-in_.4s_ease-out_both] rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  Hot · 92
                </span>
              )}
            </div>
            <dl className="mt-3 space-y-2.5">
              {LEAD_FIELDS.map(([k, v], i) => (
                <div
                  key={k}
                  className="flex items-center justify-between gap-3 text-[12px]"
                >
                  <dt className="text-neutral-500">{k}</dt>
                  <dd className="font-semibold">
                    {i < s.extracted ? (
                      <span className="animate-[hero-in_.4s_ease-out_both]">
                        {v}
                      </span>
                    ) : (
                      <span className="hero-shimmer inline-block h-3.5 w-16 rounded" />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Follow-ups
            </p>
            <ul className="mt-2.5 space-y-2">
              {s.followUps.length === 0 && (
                <li className="rounded-md bg-white px-3 py-2.5 text-[11px] text-neutral-400 ring-1 ring-muted-foreground/5 shadow-md shadow-muted-foreground/5">
                  Nothing promised yet
                </li>
              )}
              {s.followUps.map((f) => (
                <li
                  key={f.id}
                  className="animate-[hero-in_.45s_ease-out_both] rounded-md bg-white px-3 py-2.5  ring-1 ring-muted-foreground/5 shadow-md shadow-muted-foreground/5"
                >
                  <p className="text-[12px] font-semibold">{f.text}</p>
                  <p
                    className={cn(
                      "mt-1 flex items-center gap-1.5 text-[10px] font-medium",
                      f.kind === "waiting" && "text-amber-700",
                      f.kind === "voice" && "text-primary",
                      f.kind === "done" && "text-emerald-700",
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        f.kind === "waiting" && "bg-amber-500",
                        f.kind === "voice" && "bg-primary",
                        f.kind === "done" && "bg-emerald-500",
                      )}
                    />
                    {f.kind === "waiting" && "Waiting on us"}
                    {f.kind === "voice" && "✦ Added by voice"}
                    {f.kind === "done" && "Done"}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Stage
            </p>
            <ol className="mt-2.5 flex gap-1">
              {STAGES.map((t, i) => (
                <li key={t} className="flex-1">
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-colors duration-500",
                      i <= s.stage
                        ? s.confirmed && i === 2
                          ? "bg-emerald-500"
                          : "bg-primary"
                        : "bg-neutral-200",
                    )}
                  />
                  <span className="mt-1 block text-[10px] text-neutral-500">
                    {t}
                  </span>
                </li>
              ))}
            </ol>
            <span
              data-c="confirm"
              className={cn(
                "mt-3 grid h-10 place-items-center rounded-lg text-xs font-semibold transition-colors duration-300",
                s.confirmed
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-neutral-700 ring-1 ring-neutral-200",
              )}
            >
              {s.confirmed ? "✓ Order confirmed" : "Mark order confirmed"}
            </span>
          </div>
        </div>

        {/* Cursor */}
        <div
          className={cn(
            "pointer-events-none absolute left-0 top-0 z-20 transition-[transform,opacity] duration-[850ms] ease-[cubic-bezier(.4,0,.2,1)]",
            cursor.shown ? "opacity-100" : "opacity-0",
          )}
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
        >
          {cursor.down && (
            <span className="absolute -left-3 -top-3 size-6 animate-[hero-ripple_.5s_ease-out_both] rounded-full bg-primary/50" />
          )}
          <svg
            viewBox="0 0 24 24"
            className={cn(
              "size-6 drop-shadow-md transition-transform duration-150",
              cursor.down && "scale-90",
            )}
          >
            <path
              d="M5 3l14 8-6 1.5L10 19z"
              fill="#111"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
