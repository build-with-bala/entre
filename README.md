# CampusGraph (entre)

Comprehensive documentation for the CampusGraph Next.js application in this repository.

This README describes how to run the project locally, the architecture and important files, AI/Genkit integration notes, testing and verification steps, and troubleshooting tips.

## Project summary

CampusGraph is a campus query resolution platform built with Next.js (App Router), TypeScript and Tailwind CSS. It provides a simple local-auth demo, dashboards for different roles, a query lifecycle model, and an integrated chatbot powered by Genkit / Google AI (developer mode).

Key features
- Local, stubbed authentication (demo password: `XXX`).
- Role-based dashboards and query timeline simulation (data seeded in `src/data`).
- In-app ChatBot component which calls AI flows in `src/ai/flows`.
- Modular UI primitives under `src/components/ui` and reusable components under `src/components`.

## Quick start (developer)

Prerequisites
- Node.js 18+ (recommended). zsh is used in examples.
- A valid Google AI credential if you want to run the AI flows against real models (optional for UI dev).

Install dependencies

```bash
cd /Users/root1/Desktop/EDU/2.Code/entre
npm install
```

Run development server

```bash
# default dev (uses turbopack in package.json)
npm run dev

# If you see turbopack issues, try without turbopack by running:
# NODE_OPTIONS= -- next dev -p 9002
```

Genkit / AI local dev (optional)

Genkit is included for local AI developer flows. To run the Genkit dev runner for AI flows:

```bash
# Run genkit entry for AI dev
npm run genkit:dev

# Watch mode
npm run genkit:watch
```

Build and run production (smoke)

```bash
npm run build
npm run start
```

Typecheck and lint

```bash
npm run typecheck
npm run lint
```

## Environment variables

The repository currently ships with local/demo behavior for most features. If you intend to enable real AI backends or Firebase, set the appropriate environment variables when running the server.

Suggested env vars (inferred from project dependencies and `src/ai`):
- `GOOGLE_API_KEY` — API key or credential used by `@genkit-ai/googleai` if you connect to Google AI.
- `NEXT_PUBLIC_API_BASE` — optional, if you wire a backend API later.

Note: The auth in `src/context/AppContext.tsx` is a client-side stub using `localStorage` and a fixed password `XXX`. There is no production authentication in the current code.

## Important files & structure

- `src/app/` — Next.js App Router pages and layout:
	- `page.tsx` — home page (hero, features)
	- `login/page.tsx` — demo login UI (hint: password `XXX`)
	- `dashboard/page.tsx` — entry dashboard routing to role dashboards
	- `query/[id]/page.tsx` — query detail view
- `src/context/AppContext.tsx` — central client-side app state: users, queries, login/logout, add/update query. Authentication is stubbed.
- `src/components/ChatBot.tsx` — UI wrapper for the chatbot; calls `chat` flow in `src/ai/flows/chat-flow.ts`.
- `src/ai/` — AI integration:
	- `genkit.ts` — genkit configuration (calls `googleAI()` plugin)
	- `dev.ts` — genkit dev loader for local flow registration
	- `flows/` — contains `chat-flow.ts` and `suggest-resolvers.ts` flows used by the app
- `src/data/` — seed data for `users`, `queries`, and `roles` used by the demo AppContext
- `src/components/ui/` — UI primitives and Radix wrappers used across the app

## How the pieces work together

- On load, `AppProvider` initializes state from `src/data/*` and looks for a stored `currentUser` in `localStorage`.
- `Login` selects a user from seeded users and uses the demo password `XXX` to sign in (client-only). Successful login stores `currentUser` in `localStorage` and navigates to `/dashboard`.
- The `ChatBot` component is visible only for signed-in users and uses `chat` flow (`src/ai/flows/chat-flow.ts`). Locally it will attempt to call Genkit runtime if you run `npm run genkit:dev` and provide valid AI creds.
- Queries are client-side objects stored in `AppContext.queries`. `addQuery` assigns to a matching CR when possible and appends `resolutionTrail` steps.

## Testing/Manual verification checklist

1. Start the dev server: `npm run dev`.
2. Open the site at http://localhost:9002.
3. Click Get Started and sign in via `Login` by selecting a seeded user and using password `XXX`.
4. Verify dashboard pages render for different roles (Admin/CR/Student/Club). These are demo pages and fetch data from `AppContext`.
5. Submit a query using the query form (`src/components/QuerySubmissionForm.tsx`) and verify the new query appears in the timeline (`QueryTimeline.tsx`).
6. Open the ChatBot (bottom-right) and try a suggestion. If Genkit dev server is not running, the ChatBot will show a friendly error message.

## Development notes & gotchas

- Next.js version: this repo pins `next` to `15.3.3` in `package.json`. If you upgrade, ensure the App Router conventions and Tailwind config stay compatible.
- The repo uses `genkit` and `@genkit-ai/googleai`. Running Genkit flows against a real model requires credentials and possibly additional configuration; run `npm run genkit:dev` before interacting with AI flows.
- `AppContext` is client-only and relies on `localStorage`. If you plan to add server-side auth, move sensitive logic to server routes.
- UI code is built with Tailwind CSS and Radix primitives. If components look unstyled, ensure Tailwind is configured and `src/app/globals.css` is loaded by the layout.

## Troubleshooting

- If `npm run dev` fails with Turbopack errors, try running without turbopack or upgrade `next`/node. Example fallback: `npm run dev` without extra flags or run `next dev -p 9002`.
- If the ChatBot returns runtime errors like module-not-found for `genkit` plugin calls, confirm `npm install` succeeded and run `npm run genkit:dev` in a separate terminal.
- If typescript errors block builds, run `npm run typecheck` and fix the reported files or toggle `typescript.ignoreBuildErrors` in `next.config.ts` (currently set to `true` for convenience).

## Maintenance & next steps (suggested)

- Replace client-side stub auth with a server-side auth provider (Firebase Auth, NextAuth, or custom API).
- Persist queries and users to a real backend (Firestore / Postgres) and secure endpoints.
- Add unit/integration tests for `AppContext` and key components (`Login`, `QuerySubmissionForm`, `ChatBot`).
- Harden AI usage: add server-side API proxy, rate limiting, and secrets management.

## Scripts summary

- `npm run dev` — Start Next dev server (turbopack by default on port 9002).
- `npm run genkit:dev` — Start Genkit dev runner for `src/ai/dev.ts`.
- `npm run genkit:watch` — Genkit watch mode.
- `npm run build` — Build production bundle.
- `npm run start` — Start production server after build.
- `npm run lint` — Run ESLint.
- `npm run typecheck` — Run TypeScript type check.

## Contact / contribution

If you want help implementing production auth, backend persistence, or AI safety/hardening, open an issue or contact the repository owner.

---

Requirements coverage (todo mapping):
- Docs & README (id:7): Done — this file.
- Audit & run dev (id:1): In-progress — dependencies installed; dev server not yet run in this session.
- Other todos: not-started (see repo TODO list).

