# Contributing to Inview

Welcome! This guide explains **everything** from the very beginning. You do not need to know anything about our setup before reading it. If a word is new to you, look it up in the [word list](#12-word-list) at the bottom.

**Contents**

1. [The big picture](#1-the-big-picture)
2. [One-time setup on your computer](#2-one-time-setup-on-your-computer)
3. [Your daily routine](#3-your-daily-routine)
4. [Changing the database (migrations)](#4-changing-the-database-migrations)
5. [Opening a Pull Request](#5-opening-a-pull-request)
6. [The robots that check your work](#6-the-robots-that-check-your-work)
7. [How code reaches the real website](#7-how-code-reaches-the-real-website-owner-only)
8. [Rules we never break](#8-rules-we-never-break)
9. [When something goes wrong](#9-when-something-goes-wrong)
10. [One-time setup for the owner](#10-one-time-setup-for-the-owner)
11. [Project map](#11-project-map)
12. [Word list](#12-word-list)

---

## 1. The big picture

Think of building a house.

- Your **own computer** is your private workshop. You can make a mess and nobody is hurt.
- **Staging** is a show house. It looks and works like the real thing, but no real customers live in it. We use it to check that everything works together.
- **Production** is the real house where real customers live. We are extra careful here.

```
 Your computer          Staging                 Production
 (Local)         --->   (test website)   --->   (real website)
 Docker + Supabase      branch: main            branch: production
 on your laptop         database: Staging_DB    database: Production_DB
```

| Place          | Website lives on                      | Database           | Git branch   |
| -------------- | ------------------------------------- | ------------------ | ------------ |
| **Local**      | your laptop (`localhost`)             | Supabase in Docker | your branch  |
| **Staging**    | Vercel project "Staging"              | `Staging_DB`       | `main`       |
| **Production** | Vercel project "Production"           | `Production_DB`    | `production` |

### The journey of one change

```
 1. You make a branch            feature/login-page
 2. You write code + test it     on your laptop
 3. You push your branch         git push
 4. You open a Pull Request      into main
 5. Robots check it              (CI + CodeRabbit)
 6. The owner reviews it         and clicks Merge
 7. Staging updates by itself    (website + Staging_DB)
 8. The owner tests on Staging
 9. The owner opens a Pull Request   main  ->  production
10. The owner approves the DB change, then merges
11. The real website updates     (website + Production_DB)
```

**You only do steps 1 to 5.** The owner does the rest.

---

## 2. One-time setup on your computer

Do this once. It takes about 30 minutes.

### 2.1 Install these programs

| Program            | What it is for                          | Where to get it                                |
| ------------------ | --------------------------------------- | ---------------------------------------------- |
| **Git**            | Saves versions of our code              | https://git-scm.com                            |
| **Node.js 24+**    | Runs our website code                   | https://nodejs.org (choose version 24 or newer) |
| **Docker Desktop** | Runs the practice database on your PC   | https://www.docker.com/products/docker-desktop |
| **VS Code** (or any editor) | Where you write code           | https://code.visualstudio.com                  |

After installing, open **Docker Desktop** and leave it running. Check everything with these commands (each should print a version number):

```bash
git --version
node --version
docker --version
```

If `node --version` says lower than 24, install a newer Node.

### 2.2 Get the code

```bash
git clone https://github.com/Inview-Unified-Inbox-AI/Inview.git
cd Inview
npm install
```

`npm install` downloads all the tools the project needs. It can take a few minutes.

### 2.3 Start your practice database

Make sure Docker Desktop is running, then:

```bash
npm run db:start
```

The first time, this downloads a lot of files, so be patient. When it finishes it prints some web addresses. The important one is **Studio**, a website where you can look at your practice database (usually http://127.0.0.1:54323).

To see those addresses again any time: `npm run db:status`.

### 2.4 Start the website

```bash
npm run dev
```

This starts all the apps (`product`, `landing-page`, `docs`). Open the address it prints, for example http://localhost:3000.

**You are ready.**

---

## 3. Your daily routine

### Step 1. Start from the newest `main`

```bash
git checkout main
git pull
```

### Step 2. Make your own branch

A **branch** is your own copy of the code where you can work without disturbing anyone. Never work directly on `main` or `production`.

Name it like this: `type/short-description`, in small letters with dashes.

| Type        | Use it for                  | Example                  |
| ----------- | --------------------------- | ------------------------ |
| `feature/`  | something new               | `feature/inbox-filters`  |
| `fix/`      | repairing a bug             | `fix/login-button`       |
| `docs/`     | writing or fixing docs      | `docs/setup-guide`       |
| `chore/`    | boring maintenance          | `chore/update-packages`  |

```bash
git checkout -b feature/inbox-filters
```

### Step 3. Write your code and test it on your laptop

Run `npm run dev` and try it in the browser. Before you push, run the same checks the robots will run:

```bash
npm run lint         # finds messy code
npm run check-types  # finds type mistakes
npm run build        # makes sure the app can be built
```

All three must finish with no errors.

### Step 4. Save your work with a commit

A **commit** is a saved snapshot with a short message. Make small commits often.

```bash
git add .
git commit -m "feat: add filters to the inbox"
```

Start the message with one of these words, then a colon:

| Word        | Meaning                    |
| ----------- | -------------------------- |
| `feat:`     | a new feature              |
| `fix:`      | a bug fix                  |
| `docs:`     | documentation only         |
| `chore:`    | maintenance                |
| `refactor:` | tidy code, same behaviour  |
| `db:`       | database migration         |

### Step 5. Send your branch to GitHub

```bash
git push -u origin feature/inbox-filters
```

(The `-u` is only needed the first time for a new branch. After that, `git push` is enough.)

Now go to [Opening a Pull Request](#5-opening-a-pull-request).

### Keeping your branch fresh

If other people merged things while you worked, bring their changes into your branch:

```bash
git checkout main
git pull
git checkout feature/inbox-filters
git merge main
```

If Git says there is a **conflict**, it means two people changed the same lines. Open the file, look for the `<<<<<<<` marks, choose what the final text should be, delete the marks, then run `git add .` and `git commit`. Not sure? Ask in the group chat. Do not guess.

---

## 4. Changing the database (migrations)

> **Read this part carefully. It is the most important part of the guide.**

### 4.1 What is a migration?

A **migration** is a small SQL file that describes **one change** to the database, like "add a table called `messages`". Every file is a step in a staircase. When all the steps are run in order, you get the finished database.

Because the steps are saved in our code, **everyone gets the same database**: your laptop, Staging and Production.

Migrations live here:

```
supabase/migrations/
   20261103101500_create_messages_table.sql
   20261105144200_add_read_flag_to_messages.sql
```

The number at the start is the date and time. It makes sure the steps always run in the right order.

### 4.2 How to make a migration

**1. Create the file** (do not create it by hand):

```bash
npm run db:new create_messages_table
```

This makes a new, empty file in `supabase/migrations/`.

**2. Write your SQL inside it.** Example:

```sql
create table public.messages (
  id         uuid primary key default gen_random_uuid(),
  body       text not null,
  created_at timestamptz not null default now()
);

-- ALWAYS turn on Row Level Security for new tables (see 4.4)
alter table public.messages enable row level security;

create policy "Signed-in users can read messages"
  on public.messages for select
  to authenticated
  using (true);
```

**3. Try it on your laptop:**

```bash
npm run db:reset
```

This wipes your practice database and replays every migration from the very beginning, plus the fake data in `supabase/seed.sql`. If it finishes without red errors, your migration works. Do this every time. It is cheap and safe, because it is only your laptop.

**4. Check for common mistakes:**

```bash
npm run db:lint
```

**5. Commit the file** along with your code and push, like any other change.

### 4.3 The five golden rules of migrations

1. **Never change a migration that is already merged into `main`.** It has already run on other databases and will not run again. If you made a mistake, write a **new** migration that fixes it.
2. **Never change the database by clicking in the Supabase website** (the dashboard) for Staging or Production. If it is not in a migration file, it does not exist for the team and will be lost or cause trouble.
3. **Never push to Staging or Production yourself.** You do not have the passwords on purpose. Robots do it for us after review.
4. **Make changes that do not break the old code.** For a short time the new database and the old website run together (and the other way round). So:
   - Adding a table or column: safe.
   - Renaming or deleting a column: **do it in two steps**. First release code that stops using the column. Later, in a separate pull request, remove the column.
   - Adding a `not null` column? Give it a `default`, or old rows and old code will break.
5. **Only use fake data** in `supabase/seed.sql`. Never real emails, passwords or customer data.

### 4.4 Row Level Security (RLS), in simple words

By default, anyone with our public key could read a table. **RLS is a lock on each table.** With the lock on, nobody can read or change a row unless a **policy** (a rule you write) says they may.

**Every new table needs `enable row level security` and at least one policy.** CodeRabbit and the lint check will warn you if you forget.

### 4.5 Two people made migrations at the same time

That is normal and fine. Both files have different timestamps, so they sort into a line. If the robots say a migration is out of order, run `git merge main` (see [Keeping your branch fresh](#keeping-your-branch-fresh)), rename your file with a newer timestamp using `npm run db:new`, move your SQL into it, delete the old one, and push again.

---

## 5. Opening a Pull Request

A **Pull Request (PR)** says: "I finished something. Please check it and add it to `main`."

1. Push your branch (Step 5 above).
2. Go to https://github.com/Inview-Unified-Inbox-AI/Inview. A yellow bar says **Compare & pull request**. Click it.
3. Make sure the PR goes **into `main`** (not `production`).
4. Give it a clear title, like `feat: add filters to the inbox`.
5. Fill in the form that appears. It asks simple questions: what changed, why, how you tested.
6. Click **Create pull request**.

Then wait for the robots (next section). If something is red, click **Details**, read the error, fix it on your laptop, commit and push again. The PR updates by itself.

The owner will review. They may ask for changes. Fix them the same way: edit, commit, push. When the owner is happy, they click **Merge**. You do not merge your own PR.

**Tip:** small PRs get reviewed faster. One idea per PR.

---

## 6. The robots that check your work

### 6.1 CI (Continuous Integration)

CI means a computer on GitHub automatically checks your work on every PR. It runs these jobs:

| Job (what you see on GitHub)           | What it checks                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| **Lint, types and build**              | Code is tidy, has no type errors, and builds.                                   |
| **Supabase migrations (local check)**  | Starts a fresh practice database and replays **all** migrations from zero.      |

Green tick = good. Red cross = fix it. **A PR with a red cross cannot be merged.**

### 6.2 CodeRabbit

CodeRabbit is an AI reviewer. A minute or two after you open a PR, it writes a summary and leaves comments on lines it worries about. For SQL it is extra picky (dangerous deletes, missing RLS, and so on).

- Read its comments. They are often right.
- It is a helper, not the boss. If a comment is wrong, reply and explain, or ignore it.
- You can ask it questions by writing a comment that starts with `@coderabbitai`.

### 6.3 What happens after a merge into `main`

When the owner merges your PR:

1. **Vercel Staging** builds the new website automatically.
2. The workflow **"Supabase - migrate Staging"** applies your new migrations to `Staging_DB`.

Nobody has to do anything by hand.

---

## 7. How code reaches the real website (owner only)

Contributors can skip this section, but it is good to know.

1. Test everything on Staging.
2. Open a PR **from `main` into `production`**.
3. Three things start:
   - CI checks again.
   - **"Dry run on Production DB"** runs by itself. It only *shows* which migrations would be applied. It changes nothing.
   - **"Apply to Production DB"** stops and waits. GitHub shows a **Review deployments** button.
4. Read the dry-run output. If you are happy, click **Review deployments**, tick `production`, and click **Approve and deploy**. The migrations are now applied to `Production_DB`.
5. When "Apply to Production DB" is green, click **Merge**. Vercel Production builds the new website. The database is already ready for it.
6. After the merge, **"Verify Production is up to date"** runs. If it is red, a migration was missed: see [section 9](#9-when-something-goes-wrong).

**Why migrate first, then merge?** Vercel starts building the moment you merge, and nothing makes it wait for the database. So the database must already be ready before the merge. This is also why every migration must work with both the old and the new code (golden rule 4).

**When there are no database changes:** "Apply to Production DB" still runs (it just finds nothing to do). You still approve it. It keeps the process the same every time.

### Urgent bug on the real website (hotfix)

Do not skip the process. A fast version of it is still safe:

1. Make a `fix/` branch from `main`, fix, open a PR into `main`, and get it merged.
2. Check Staging for one minute.
3. Immediately open the `main -> production` PR.

### Going back after a bad release

- **Website:** in Vercel, open the Production project, find the last good deployment, and use **Promote to Production** / **Instant Rollback**.
- **Database:** never edit old migrations. Write a **new** migration that undoes the change, and release it the normal way. For emergencies, Supabase can restore a backup (paid plans). Ask the owner.

---

## 8. Rules we never break

1. Never commit directly to `main` or `production`. They are locked anyway.
2. Never push passwords, API keys or tokens. Not even "just for a second". Put secrets in a file named `.env.local` (it is ignored by Git). If you leak one by accident, **tell the owner immediately** so it can be replaced. Deleting the commit is not enough, because this repository is **public** and anyone can copy it.
3. Never use the Supabase `service_role` key in browser code. It is a master key. The `anon` / publishable key is the only one the browser may see.
4. Never edit a merged migration. Add a new one.
5. Never change Staging or Production databases by hand.
6. Never merge your own PR.
7. Never use `git push --force` on a shared branch.
8. Ask when you are unsure. A question takes one minute. A mistake in production can take days.

---

## 9. When something goes wrong

**`npm run db:start` fails or hangs**
Open Docker Desktop and wait until it says "running". Try again. If it still fails: `npm run db:stop`, then `npm run db:start`.

**`npm run db:reset` shows an SQL error**
Read the error. It names the file and the line. Fix the SQL, then run it again. It is safe to repeat as many times as needed.

**Port is already in use**
Something else is using the port. Stop the other program, or run `npm run db:stop` and try again.

**CI: "Lint, types and build" is red**
Click **Details**, find the red line, and run the same command on your laptop (`npm run lint`, `npm run check-types` or `npm run build`). Fix, commit, push.

**CI: "Supabase migrations (local check)" is red**
Run `npm run db:reset` on your laptop. You will see the same error. Often it is a missing semicolon, a table used before it is created, or two migrations clashing (see 4.5).

**"Apply to Production DB" is red (owner)**
Nothing was changed if the failing statement was inside a transaction (each migration runs in one). Read the log, fix the problem with a **new** commit on `main`, wait for Staging, and re-run the production PR checks. Do not merge until it is green.

**"Verify Production is up to date" is red (owner)**
Migrations are waiting that were not applied before the merge. Go to **Actions -> Supabase - migrate Production -> Run workflow** on the `production` branch, approve it, then check the website.

**I committed on `main` by mistake**
Do not push. Ask for help in the group chat. It is easy to fix if nothing was pushed.

**I pushed a secret**
Tell the owner now. The secret must be replaced (rotated) in Supabase, Vercel or wherever it came from.

---

## 10. One-time setup for the owner

The code for all this is in the repository. The **settings** below live on GitHub, Supabase, Vercel and CodeRabbit and cannot be saved in code. Do them once.

### 10.1 Supabase (two projects)

1. Create two projects: `Staging_DB` and `Production_DB`.
2. For each, write down:
   - **Project ref**: the code in the project URL, `https://supabase.com/dashboard/project/<ref>`.
   - **Database password**: set when creating the project (reset it in *Project Settings -> Database* if lost).
3. Create one **access token** at https://supabase.com/dashboard/account/tokens. Use a token from an account that can access both projects.
4. Production should be on a plan with **backups** (and ideally point-in-time recovery) before real users arrive. Free projects have no backups and pause when idle.

### 10.2 GitHub Environments (secrets and approvals)

Repo **Settings -> Environments -> New environment**. Create three:

| Environment          | Required reviewer          | Secrets (**secret**)                              | Variable          |
| -------------------- | -------------------------- | ------------------------------------------------- | ----------------- |
| `staging`            | none                       | `SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD`   | `SUPABASE_PROJECT_REF` = Staging ref |
| `production-preview` | none                       | same names, **Production** values                 | `SUPABASE_PROJECT_REF` = Production ref |
| `production`         | **you** (tick "Required reviewers") | same names, **Production** values          | `SUPABASE_PROJECT_REF` = Production ref |

Notes:

- `production-preview` exists only so the harmless dry run does not need a click. `production` is where the approval gate is.
- **Lock both `production` and `production-preview` to the `production` branch:** in each environment, under *Deployment branches and tags*, choose *Selected branches and tags* and add `production`. Without this, anyone with write access could run an edited copy of the workflow from their own branch and read the production password.
- The production workflow uses `pull_request_target`, so GitHub always runs the copy that is on the `production` branch, never a copy edited inside a PR. It only copies the PR's `.sql` migration files in as plain text (see `.github/actions/pr-migrations`). **The workflow file must already be on the `production` branch before it can run**: create the `production` branch from `main` after this is merged.
- Changes to anything in `.github/` are security-sensitive. Review them with extra care.
- Leave **"Prevent self-review"** unticked for `production`, since you are the only reviewer (otherwise you could never approve your own PR's deployment).
- Never print secrets in a workflow. The workflows in this repo do not.

### 10.3 GitHub branch rulesets

Repo **Settings -> Rules -> Rulesets -> New branch ruleset**.

**Ruleset "Protect main"** (target: `main`)

- Require a pull request before merging, with **1 approval**
- Dismiss stale approvals when new commits are pushed
- Require status checks to pass: `Lint, types and build` and `Supabase migrations (local check)` (add them after they have run once)
- Require branches to be up to date before merging
- Block force pushes, and restrict deletions

**Ruleset "Protect production"** (target: `production`)

- Same as above, plus these required checks: `Dry run on Production DB` and `Apply to Production DB`
- Making "Apply" required means nobody can merge until the migrations were applied and you approved.
- Restrict who can push to **only you** (the owner).

Optionally add a second trusted person as an admin, so work is never blocked when you are away.

### 10.4 Vercel (two projects per app)

For each app (`product`, `landing-page`, `docs`):

| Project           | Production Branch | Environment variables                          |
| ----------------- | ----------------- | ---------------------------------------------- |
| `<app>-staging`   | `main`            | Supabase URL and keys from **Staging_DB**      |
| `<app>-production`| `production`      | Supabase URL and keys from **Production_DB**   |

- *Settings -> Git -> Production Branch* decides which branch counts as "production" for that project.
- *Root Directory* = `apps/<app>`. Keep "Include source files outside of the Root Directory" ON (this is a monorepo).
- Never put the staging keys in the production project, or the other way round.
- Check the Vercel plan: the free Hobby plan is for personal, non-commercial use and does not support team collaboration. You will likely need Pro.

### 10.5 CodeRabbit

1. Install the CodeRabbit GitHub App on the organization, for this repository.
2. The settings are already in `.coderabbit.yaml`. It is free for public repositories.
3. Keep your own approval required. Do not make CodeRabbit a required check.

### 10.6 Other free security switches

Repo **Settings -> Code security**: turn on **Dependabot alerts**, **Dependabot security updates**, **Secret scanning** and **Push protection** (all free for public repositories). `.github/dependabot.yml` already creates weekly update PRs.

### 10.7 Collaborators and CODEOWNERS (optional)

Give the other four people **Write** access (not Admin). If you want GitHub to ask you automatically for review, add a `.github/CODEOWNERS` file such as `* @your-github-username` and tick "Require review from Code Owners" in the ruleset.

---

## 11. Project map

```
Inview/
|-- apps/
|   |-- product/          the main app            (Next.js)
|   |-- landing-page/     the public website      (Next.js)
|   `-- docs/             documentation site      (Next.js)
|-- packages/
|   |-- ui/               shared buttons and components
|   |-- eslint-config/    shared lint rules
|   `-- typescript-config/shared TypeScript settings
|-- supabase/
|   |-- config.toml       settings for the local database
|   |-- migrations/       THE DATABASE STAIRCASE (SQL files)
|   `-- seed.sql          fake data for your laptop
|-- .github/
|   |-- workflows/        the robots (CI and migrations)
|   |-- pull_request_template.md
|   `-- dependabot.yml
|-- .coderabbit.yaml      CodeRabbit settings
`-- CONTRIBUTING.md       this file
```

Handy commands (run from the project's top folder):

| Command                       | What it does                                      |
| ----------------------------- | ------------------------------------------------- |
| `npm install`                 | Download the project's tools                      |
| `npm run dev`                 | Start the apps on your laptop                     |
| `npm run lint`                | Check for messy code                              |
| `npm run check-types`         | Check for type mistakes                           |
| `npm run build`               | Build everything like a real release              |
| `npm run db:start`            | Start the practice database (Docker must run)    |
| `npm run db:stop`             | Stop it                                           |
| `npm run db:status`           | Show its web addresses                            |
| `npm run db:new <name>`       | Create a new, empty migration file                |
| `npm run db:reset`            | Wipe the practice DB and replay all migrations    |
| `npm run db:lint`             | Look for common database mistakes                 |

---

## 12. Word list

| Word               | Simple meaning                                                                     |
| ------------------ | ---------------------------------------------------------------------------------- |
| **Repository (repo)** | The project's folder, stored on GitHub, with its whole history.                |
| **Monorepo**       | One repo holding several apps and shared packages.                                 |
| **Git**            | The tool that saves versions of our code.                                          |
| **GitHub**         | The website where our repo lives and where we review work.                         |
| **Branch**         | A separate copy of the code where you can work safely.                             |
| **Commit**         | A saved snapshot of your changes, with a message.                                  |
| **Push**           | Send your commits from your laptop to GitHub.                                      |
| **Pull**           | Download new commits from GitHub to your laptop.                                   |
| **Pull Request (PR)** | A request: "please check my branch and add it to another branch".              |
| **Merge**          | Combine one branch into another.                                                   |
| **Conflict**       | Two people changed the same lines; a human must choose.                            |
| **Local**          | Running on your own computer.                                                      |
| **Staging**        | The test copy of the website and database.                                         |
| **Production**     | The real website and database that customers use.                                  |
| **Docker**         | A program that runs small, isolated computers. We use it to run the practice database. |
| **Supabase**       | The service that gives us our database, logins and storage.                        |
| **Database**       | Where the app's information is stored, in tables.                                  |
| **SQL**            | The language used to talk to a database.                                           |
| **Migration**      | A SQL file that makes one saved change to the database.                            |
| **Seed**           | Fake starter data for your laptop.                                                 |
| **RLS (Row Level Security)** | A lock on a table: nobody gets in unless a policy allows it.           |
| **CI**             | A robot on GitHub that automatically checks every PR.                              |
| **Workflow**       | One robot's instructions, saved in `.github/workflows/`.                           |
| **Environment (GitHub)** | A named place with its own secrets and optional approval button.             |
| **Secret**         | A password or key. Never put it in code.                                           |
| **Vercel**         | The service that hosts our websites.                                               |
| **Deploy**         | Publish a new version of the website.                                              |
| **Rollback**       | Go back to the previous working version.                                           |
| **Hotfix**         | A quick fix for a serious problem on the real website.                             |
| **CodeRabbit**     | An AI that reviews PRs and leaves comments.                                        |
| **Lint**           | A tool that finds messy or suspicious code.                                        |
| **Turborepo**      | The tool that runs tasks across all apps in the monorepo quickly.                  |
