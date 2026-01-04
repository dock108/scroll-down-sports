interface GameHeaderProps {
  awayTeam: string;
  homeTeam: string;
  venue: string;
  dateLabel: string;
  compactMode: boolean;
  onCompactModeChange: (value: boolean) => void;
}

export const GameHeader = ({
  awayTeam,
  homeTeam,
  venue,
  dateLabel,
  compactMode,
  onCompactModeChange,
}: GameHeaderProps) => {
  return (
    <header className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          {awayTeam} at {homeTeam}
        </h1>
        <label className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gray-500">
          <span>Compact</span>
          <span className="relative inline-flex">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={compactMode}
              onChange={(event) => onCompactModeChange(event.target.checked)}
              aria-label="Enable compact mode"
            />
            <span className="h-6 w-11 rounded-full border border-gray-200 bg-gray-100 transition-colors peer-checked:bg-gray-900/10" />
            <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
          </span>
        </label>
      </div>
      <p className="text-sm text-gray-600">
        {dateLabel} — {venue}
      </p>
      <hr className="border-gray-100" />
    </header>
  );
};
