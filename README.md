# Glamora Web

Customer-facing frontend for Glamora, a salon and beauty parlour booking platform.
React 18 · Vite · Tailwind CSS 3 · GSAP 3 · React Router 6. Black and white theme, mobile first.

## Run

```bash
cp .env.example .env     # VITE_API_BASE_URL=http://localhost:8080
npm install
npm run dev              # http://localhost:5173 (the API's default CORS origin)
npm run typecheck
npm run build
```

Start the SalonConnect API first for login, registration and salon setup (`docker compose up -d`, then
`mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=local` on Windows, or `./mvnw spring-boot:run -Dspring-boot.run.profiles=local`
on macOS/Linux; see the backend README). Without it, the public marketplace still works because it runs on mocks.

## What is real and what is mocked

| Area | Source |
|---|---|
| Register, log in, log out, session restore, `/me` | **Real API** |
| List your salon (account, business, branch), salon dashboard, branches, settings | **Real API** |
| Marketplace, salon pages, booking flow, my appointments | Mock (`src/mocks/marketplaceApi.ts`) until the backend modules ship |
| Salon calendar, appointments, beauticians, services, schedule, beautician and platform areas | Placeholder pages that say what they are waiting for |

See `docs/BACKEND_GAPS.md` for what the backend still needs.

## Routes

| Path | Who | Page |
|---|---|---|
| `/` `/salons` `/salons/:id` `/salons/:id/book` | everyone | Public site and booking |
| `/login` `/register` `/forgot-password` | everyone | Auth |
| `/register-salon` | everyone | Salon registration wizard (saves a draft) |
| `/account` `/account/appointments` | signed in | Profile and appointments |
| `/salon-admin/*` | salon members, menu filtered by role | Dashboard, branches, settings and placeholders |
| `/beautician/*` | STAFF members | Placeholders |
| `/platform/*` | platform staff | Placeholders |

## Structure

```
src/
  api/        Typed API client: fetch wrapper, token refresh, error parsing, DTO types, endpoints
  app/        App shell and the route table (every area is lazy-loaded)
  pages/      Thin route components
  features/   auth, account, salon-registration, salon-admin, platform, home, salons, booking
  components/ ui (Button, Form, Img...), layout (public site), portal (staff shell), motion
  mocks/      Fake marketplace API, replaced module by module as the backend ships
  hooks/ lib/ data/ config/ types/ styles/
```

## API client notes

- Access token lives in memory; the refresh token in localStorage (see gap 12 in `docs/BACKEND_GAPS.md`).
- Refreshes never run in parallel: one shared promise per tab and the Web Locks API across tabs, because the API revokes every session if a rotated refresh token is reused.
- A 401 with `INVALID_TOKEN` triggers one refresh and one retry. If the refresh is rejected the session ends and the UI returns to logged-out.
- Errors are RFC 9457 problem details. `ApiError` carries `code`, `fieldErrors` and `correlationId`; forms put field errors on the matching inputs.
- Every create call sends an `Idempotency-Key`. The salon wizard keeps the same key across retries.
- `npm run gen:api` generates `src/api/schema.d.ts` from the running API's OpenAPI document; migrate `src/api/types.ts` to it over time.

## Images and video

All photos come from `src/data/media.js` (Unsplash ids) through `src/lib/media.js` and the `<Img>` component
(responsive `srcset`, lazy loading, fallback if an image fails). For launch, swap in your own photography by
changing `lib/media.js`. For a hero video, drop a short muted MP4 in `public/videos/` and set `heroMedia.video`
in `src/data/media.js`; it is skipped for reduced-motion and Data Saver visitors.

## Animation (GSAP)

- `useGsap(setup, deps)` runs animations inside `gsap.matchMedia`, scoped to a ref, only when the visitor has **not** requested reduced motion, and reverts on unmount.
- `lib/gsap.js` holds core GSAP; `lib/scrollTrigger.js` registers ScrollTrigger and is imported only by features that need it.
- Motion is used sparingly: the hero sequence, the scroll-scrubbed steps rail, stat counters and booking step transitions.

## Performance

- Route-level code splitting; the home page's below-the-fold sections load after the hero paints.
- Vendor chunks (`react`, `gsap`) split for long-term caching.
- Fonts use `display=swap` with preconnect. Photos use `srcset`, lazy loading and `decoding=async`; only the hero image loads eagerly.
- The marquee is pure CSS.

## Connecting the remaining modules

Replace the functions in `src/services/api.js` (`getSalons`, `getSalon`, `getServices`, `getStylists`, `getSlots`, `createBooking`) with real HTTP calls. Availability should be computed server-side; `lib/slots.js` is only a mock.

## Next steps

Auth and "my bookings", salon-owner dashboard, i18n (Sinhala/Tamil), real images via a CDN, tests (Vitest + Testing Library), ESLint/Prettier.
