# Spoiler controls

Spoilers are hidden by default in the catchup view. The final score and stat tables are revealed only after the reader scrolls through the highlight timeline.

## Key behaviors

- **Spoilers hidden by default**: `FinalStats` receives a `revealed={false}` state until the scroll trigger fires.
- **Scroll gating**: `GameCatchup` places an invisible marker below the final highlight and watches it with an `IntersectionObserver`.
- **Auto reveal**: When the marker enters the viewport, the page toggles `statsRevealed` and `FinalStats` animates into view.
- **Pre-game isolation**: Pre-game tweets appear before the timeline in a collapsible section.
- **Collapsible quarters**: Each quarter is collapsed by default so users control how much they reveal.

## Caption spoiler filtering

The `XHighlight` component filters score-like patterns from tweet captions:

```typescript
const SCORE_PATTERN = /\b\d{2,3}\s*-\s*\d{2,3}\b/;
```

When a score pattern is detected, the caption is truncated before the score.

## Implementation pointers

- Scroll gating is implemented in `src/pages/GameCatchup.tsx` via `statsRevealTriggerRef` and a `useEffect` that creates the `IntersectionObserver`.
- `FinalStats` handles the reveal animation and uses `aria-hidden` to keep spoilers out of the accessibility tree until unlocked.
- Pre-game classification is done by taking the first 20% of posts chronologically in `CatchupApiAdapter`.
- `CollapsibleSection` wraps pre-game and each quarter with expand/collapse controls.

## Page structure (spoiler-safe order)

```
[ Game Header - No score ]
[ 🏟️ Pre-Game (expanded by default) ]
[ 🏀 1st Quarter (collapsed by default) ]
[ 🏀 2nd Quarter (collapsed by default) ]
[ 🏀 3rd Quarter (collapsed by default) ]
[ 🏀 4th Quarter (collapsed by default) ]
[ Timeline Divider ]
[ Scroll Trigger (invisible) ]
[ FinalStats - Reveals on scroll ]
  ├── Player Stats
  ├── Team Stats
  └── Final Score
[ 🏆 Post-Game (collapsed, may contain spoilers) ]
```
