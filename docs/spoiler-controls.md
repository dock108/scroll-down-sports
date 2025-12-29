# Spoiler controls

Spoilers are hidden by default in the replay view. The final score and stat tables are revealed only after the reader scrolls through the highlight timeline.

## Key behaviors

- **Spoilers hidden by default**: `FinalStats` receives a `revealed={false}` state until the scroll trigger fires.
- **Scroll gating**: `GameReplay` places an invisible marker below the final highlight and watches it with an `IntersectionObserver`.
- **Auto reveal**: When the marker enters the viewport, the replay toggles `statsRevealed` and `FinalStats` animates into view.

## Implementation pointers

- Scroll gating is implemented in `src/pages/GameReplay.tsx` via `statsRevealTriggerRef` and a `useEffect` that creates the `IntersectionObserver`.
- `FinalStats` handles the reveal animation and uses `aria-hidden` to keep spoilers out of the accessibility tree until unlocked.
