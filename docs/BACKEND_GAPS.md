# Backend gaps found while building the frontend

Ordered by how much they block or complicate the frontend. Reviewed against SalonConnect_SAAS (branch dev-nive).

## Blocking pages that already exist as placeholders
1. Marketplace and public salon pages (`/api/v1/public/**`): the home, salon list, salon page and booking flow run on `src/mocks/marketplaceApi.ts`.
2. Catalogue, staff, scheduling, booking modules: the salon-admin pages Calendar, Appointments, Beauticians, Services and Schedule are placeholders. `/account/appointments` shows sample data.
3. Platform admin: no bootstrap user and no `/api/v1/platform/**`, so nobody can approve a salon and `/platform/*` is a placeholder.
4. Password reset and email verification (FR-IAM-003/004): `/forgot-password` shows a notice. Flags live in `src/config/features.ts`.

## Make the frontend simpler or safer
5. **Refresh-token grace window.** Rotation with reuse detection logs the user out everywhere if two requests refresh at once. The client single-flights refreshes (and uses Web Locks across tabs), but a 10 to 30 second grace window for the just-rotated token would remove the risk.
6. **`GET /me` memberships need the salon name and status** (or add `GET /me/salon-businesses`). Today the salon switcher makes one request per salon.
7. **Require `Idempotency-Key`** on create endpoints. The frontend always sends one, but a missing key currently creates duplicates.
8. **Update endpoints** for salon business and branch (PATCH, with `If-Match`), plus branch publish. Settings and Branches are read-only or add-only today.
9. **Registration fields the journeys expect:** photos (uploads), opening hours, location picker data.
10. **Rate limiting on auth endpoints** (FR-IAM-008).
11. Return `EMAIL_ALREADY_REGISTERED` on the unique-constraint race instead of a generic conflict.
12. Move the refresh token to an httpOnly cookie when ready (needs SameSite and CORS credentials), so it is no longer readable by page scripts.
