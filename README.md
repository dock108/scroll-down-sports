# Scroll Down Sports

Scroll Down Sports is a spoiler-safe sports highlight viewer. Fans choose a date range, browse finished games without scores, and scroll through highlights before revealing the final score and stats.

This codebase is intentionally simple — the UI must remain predictable and readable while we experiment with flows.

## Project purpose

The goal is to provide a spoiler-safe game replay experience. Users can catch up on games they missed without accidentally seeing the final score before they're ready.

## What works today

- **Spoiler-safe browsing** with score reveal gated by scrolling behavior.
- **Date range filtering** for finished games.
- **Full play-by-play timeline** with all PBP events from the database.
- **Social posts woven into timeline** — distributed proportionally across PBP events.
- **Pre-game section** — First 20% of posts appear before the timeline.
- **Collapsible quarters** — Each period is collapsed by default for easy navigation.
- **Custom X/Twitter embeds** for highlights with images and text.
- **Player and team stats** revealed after scrolling through the timeline.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Docker + nginx (production)

## Quick start

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

Ensure the sports admin API is running at `http://localhost:8000`.

## Environment variables

| Variable           | Purpose                                                         |
| ------------------ | --------------------------------------------------------------- |
| `VITE_API_URL`     | Base URL for sports API (default: `http://localhost:8000`)      |
| `VITE_APP_VERSION` | Commit hash/version string displayed in the UI footer + status. |

## Scripts

```bash
npm run dev          # Start the Vite dev server
npm run build        # Build for production
npm run preview      # Preview the production build
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

## App routes

| Route                                    | Description         |
| ---------------------------------------- | ------------------- |
| `/`                                      | Date range picker   |
| `/games?start=YYYY-MM-DD&end=YYYY-MM-DD` | Filtered game list  |
| `/game/:gameId`                          | Spoiler-safe replay |
| `/status`                                | Health/status page  |

## Docker deployment

### Local development container

```bash
docker compose -f docker-compose.local.yml up --build
```

Access at `http://localhost:5173`.

### Production container

```bash
docker compose -f docker-compose.prod.yml up -d
```

## Page layout

```
[ Game Header (teams, date, venue) ]
[ 🏟️ Pre-Game (expanded by default) ]
[ 🏀 1st Quarter (collapsed) ]
[ 🏀 2nd Quarter (collapsed) ]
[ 🏀 3rd Quarter (collapsed) ]
[ 🏀 4th Quarter (collapsed) ]
[ Timeline Divider ]
[ Player Stats + Team Stats + Final Score ]
[ 🏆 Post-Game (collapsed) ]
```

## Roadmap

1. ✅ Wire adapters to the real sports + social APIs.
2. ✅ Add play-by-play + social matching with spoiler-safe reveal.
3. Improve social post matching with accurate game start times.
4. Add post-game section (last 20% of posts).
5. QA validation on real games.

## Documentation

Additional documentation lives in `docs/`:

- `docs/DEVELOPING.md` — local development notes.
- `docs/architecture.md` — component and routing overview.
- `docs/data-models.md` — API response schemas.
- `docs/spoiler-controls.md` — spoiler-reveal behavior details.
- `docs/x-integration.md` — X/Twitter embedding strategy.
