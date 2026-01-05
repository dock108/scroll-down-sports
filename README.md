# Scroll Down Sports

Scroll Down Sports is a game catch-up experience for fans who missed the live action. Instead of jumping straight to the final score, users move through the game at their own pace—context first, key moments next, outcome last.

## What it does

- **Helps fans catch up**: Browse finished games and review what happened in sequence
- **Context before outcome**: Pre-game storylines and build-up set the stage
- **Key moments in order**: Play-by-play and social highlights unfold chronologically
- **User-controlled pacing**: Collapsible sections let readers expand what they want, when they want
- **Outcome at the end**: Final score and stats appear after scrolling through the timeline

## What it doesn't do

This UI **consumes data**—it does not manage or edit it. Game data, play-by-play events, and social posts all come from the backend API. The frontend's job is presentation and pacing.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Docker + nginx (production)

## How the UI is structured

The catch-up experience is built around timelines and moments:

```
[ Game Header ]           ← Teams, date, venue (no score yet)
[ Pre-Game Section ]      ← Build-up posts and context
[ 1st Quarter ]           ← Play-by-play + highlights
[ 2nd Quarter ]           ← Play-by-play + highlights
[ 3rd Quarter ]           ← Play-by-play + highlights
[ 4th Quarter ]           ← Play-by-play + highlights
[ Timeline Divider ]      ← End of chronological content
[ Stats + Final Score ]   ← Revealed after scrolling through
```

Each section is collapsible. Pre-game opens by default; quarters start collapsed so users control how much they reveal at once.

## Local setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`). Ensure the sports admin API is running at `http://localhost:8000`.

### Environment variables

| Variable           | Purpose                                                         |
| ------------------ | --------------------------------------------------------------- |
| `VITE_API_URL`     | Base URL for sports API (default: `http://localhost:8000`)      |
| `VITE_APP_VERSION` | Commit hash/version string displayed in the UI footer + status. |

## Deployment

```bash
docker compose -f docker-compose.local.yml up --build
```

```bash
docker compose -f docker-compose.prod.yml up -d
```

## Documentation

Additional documentation lives in [`docs/README.md`](docs/README.md).
