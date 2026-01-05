# Product overview

## Purpose

Scroll Down Sports is a game catch-up experience for fans who couldn't watch live. It lets users review finished games in sequence—context first, key moments next, outcome last—so they can follow what happened at their own pace.

For deeper intent and principles, see [`project-intent.md`](project-intent.md).

## Current capabilities

- **Sequential game review**: Scroll through the timeline to experience the game chronologically
- **Date range filtering**: Browse finished games by date
- **Full play-by-play**: All PBP events from the database, organized by quarter
- **Social highlights**: Posts from team accounts woven into the timeline
- **Pre-game section**: First 20% of posts appear before the timeline for context
- **Collapsible sections**: Quarters expand on demand so users control their pace
- **Custom X embeds**: Social highlight cards with images and text
- **Stats at the end**: Player and team stats appear after scrolling through the timeline

## Score and data context

- **Outcome at the end**: Final scores are shown after users scroll through the full timeline
- **Not predictions**: Scores represent completed game results, not forecasts or betting guidance
- **Pregame context**: Content shown before the timeline is for context, not outcome hints
- **Live data integration**: The UI fetches from the backend API; no mock data

## Roadmap

1. Improve social post matching with accurate game start times.
2. Add post-game section (last 20% of posts).
3. QA validation on real games.
