This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Waitlist storage

The waitlist form (`components/WaitlistSection.tsx`) submits to the server
action in `app/waitlist-action.ts`, which validates the signup, rate-limits by
IP, then calls `lib/waitlist-store.ts`:

1. **Supabase** is the source of truth: a row in `public.waitlist_signups`
   (phone is stored as `+94…` and is unique, so repeat signups are ignored).
2. A **spreadsheet row** is appended through a webhook. A sheet failure never
   fails the signup.

### Set up Supabase

```bash
npm run db:start        # local stack; prints the API URL and service_role key
npm run db:reset        # applies supabase/migrations (creates waitlist_signups)
```

For a hosted project, link it and push the migration instead
(`npx supabase link`, then `npx supabase db push`).

Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY`. The service-role key is server-only; never expose
it with a `NEXT_PUBLIC_` prefix. The table has row level security on with no
policies, so the public API keys cannot read or write it.

### Set up the spreadsheet

**Google Sheets:** open a sheet, then Extensions → Apps Script, paste this,
set `SECRET`, and Deploy → New deployment → Web app (execute as you, access
"Anyone"). Put the web app URL in `WAITLIST_SHEET_WEBHOOK_URL` and the same
secret in `WAITLIST_SHEET_TOKEN`.

```js
const SECRET = "change-me"; // same value as WAITLIST_SHEET_TOKEN

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.token !== SECRET)
    return ContentService.createTextOutput("forbidden");

  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName("Waitlist") || ss.insertSheet("Waitlist");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Signed up",
      "Name",
      "Shop",
      "WhatsApp",
      "Channels",
      "Sells",
      "Link",
    ]);
  }
  // Every user-supplied value is stored as literal text. The leading ' stops
  // Sheets treating =, +, -, @ values as formulas (and keeps +94… as text).
  sheet.appendRow([
    data.createdAt,
    asText(data.name),
    asText(data.shop),
    asText(data.phone),
    asText(data.channels),
    asText(data.sells),
    asText(data.link),
  ]);
  return ContentService.createTextOutput("ok");
}

function asText(value) {
  if (value === null || value === undefined) return "";
  const text = Array.isArray(value) ? value.join(", ") : String(value);
  return "'" + text;
}
```

**Excel (Microsoft 365):** create a Power Automate flow with the trigger "When
an HTTP request is received" and an "Add a row into a table" action on an Excel
table, mapping `createdAt`, `name`, `shop`, `phone`, `channels`, `sells` and
`link`. Use its URL as `WAITLIST_SHEET_WEBHOOK_URL`. The payload is the same
JSON, including `token`, which the flow can check with a Condition.
