-- Landing-page waitlist signups.
--
-- Rows are written only by the landing page's server action using the
-- service-role key, so row level security is enabled with NO policies and the
-- public roles get no privileges: nobody can read or write this table through
-- the anon / authenticated API keys.

create table public.waitlist_signups (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 120),
  shop       text not null check (char_length(shop) between 1 and 120),
  -- E.164, e.g. +94771234567. Unique so the same number can't sign up twice.
  phone      text not null unique check (phone ~ '^\+94[0-9]{9}$'),
  channels   text[] not null check (
    cardinality(channels) > 0
    and channels <@ array['Instagram', 'WhatsApp', 'Messenger', 'Other']
  ),
  sells      text not null check (sells in ('Clothing', 'Jewellery', 'Accessories', 'Other')),
  link       text check (link is null or char_length(link) <= 300),
  source     text not null default 'landing-page'
);

comment on table public.waitlist_signups is
  'Early-access waitlist signups from the landing page (service-role writes only).';

alter table public.waitlist_signups enable row level security;

revoke all on table public.waitlist_signups from anon, authenticated;

create index waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);
