# VIATSA Travel — Phase 1A report

## Active catalog

Adventures: **Perla del Sur** (2 days / 1 night), **Vuelta a la Isla** (6 days / 5 nights), and **Entre Cascadas y Palmeras** (2 days / 1 night).

## Changes

- Renamed the active south adventure to **Perla del Sur**; legacy `/aventuras/sur-profundo/` forwards to it.
- Deactivated from active presentation: Sur Profundo (legacy identity), Caribe Salvaje, Plan Relax, Siente la Dominicanidad, and Bayahíbe: mar, cuevas y esencia caribeña.
- Added `data/catalog.js` as the public catalog and contact configuration source of truth. Active adventure listing reads only from it.
- Rebuilt the Adventures listing around active catalog data, canonical route links and direct availability requests (not the tailor-made form).
- Added canonical routes for the three active adventures.
- Removed unfinished visible photo placeholder from the home route section.

## Files modified / added

- `data/catalog.js`
- `aventuras.html`
- `aventuras/perla-del-sur/index.html`
- `aventuras/vuelta-a-la-isla/index.html`
- `aventuras/entre-cascadas-y-palmeras/index.html`
- `aventuras/sur-profundo/index.html`
- `aventuras/perla-del-sur/style.css`
- `product-detail.js`
- `AUDIT_REQUIRES_BUSINESS_CONFIRMATION.md`

## Verification

- Static JavaScript syntax checks completed for the catalog, product-detail and shared-site scripts.
- Catalog validation passed: exactly three active adventures, with the required slugs and durations; no archived adventure or removed Bayahíbe experience is returned by the active catalog.
- `npm run lint`: not runnable in this workspace because the Next.js development dependencies are not installed (`eslint` unavailable).
- `npm run typecheck`: not runnable for the same reason (`tsc` unavailable).
- `npm test`: no test script is defined.
- `npm run build`: not runnable because the separate, non-deployed Next.js source has no installed dependencies (`next` unavailable).
- The deployed site is the static `preview` directory; no build step is required for its catalog changes.
- The active adventure presentation is sourced exclusively from `data/catalog.js`; Bayahíbe and old adventures are not returned by the active catalog.

## Unresolved information

See `AUDIT_REQUIRES_BUSINESS_CONFIRMATION.md`.
