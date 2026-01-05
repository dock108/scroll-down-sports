# Developing Scroll Down Sports

## Conceptual overview

Scroll Down Sports is built around a single promise: **context first, outcome last**. Users pick a finished game, scroll through a timeline of play-by-play events and highlights, and only then see the final score and stats. The UI is intentionally calm and predictable so the pacing flow is easy to trust and easy to extend.

## Local development

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (typically `http://localhost:5173`).

### Prerequisites

- Node.js 20+
- Sports admin API running at `http://localhost:8000`

### Environment

Set `VITE_API_URL` to the sports admin API base. The UI always fetches from the live API.

### Scripts

```bash
npm run dev          # Start the Vite dev server
npm run build        # Build for production
npm run preview      # Preview the production build
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

## How X highlights are handled

- `src/components/embeds/XHighlight.tsx` renders custom highlight cards with native media elements.
- Media URLs are remote and never re-hosted; captions link back to the original X post.
- The component reserves layout space with a fixed aspect ratio, lazy-loads media on scroll, and clamps long captions with a "Show more" toggle.

## Pacing philosophy

- The timeline stays chronological so the scroll mirrors the game narrative.
- The reveal for final stats is gated by an `IntersectionObserver` trigger after the last highlight.
- Final scores appear at the end of the stats block to preserve the "context before outcome" promise.

## Data flow

1. `CatchupApiAdapter` fetches from `/api/admin/sports/games/:id`
2. Response is mapped to `CatchupResponse` with:
   - Pre-game posts (first 20% chronologically)
   - Timeline entries (PBP events with distributed social posts)
   - Player and team stats
   - Final score details
3. `GameCatchup` renders collapsible sections for pre-game and each quarter
4. Stats are hidden until user scrolls past the timeline

## Key files

| File                                             | Purpose                              |
| ------------------------------------------------ | ------------------------------------ |
| `src/pages/GameCatchup.tsx`                      | Main catchup page with paced reveal  |
| `src/adapters/CatchupAdapter.ts`                 | Data fetching and mapping            |
| `src/components/embeds/XHighlight.tsx`           | Social post card                     |
| `src/components/timeline/CollapsibleSection.tsx` | Expandable section wrapper           |
| `src/components/timeline/TimelineSection.tsx`    | PBP event + highlights               |
