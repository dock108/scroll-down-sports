interface RevealScoreButtonProps {
  enabled: boolean;
  onReveal: () => void;
}

const RevealScoreButton = ({ enabled, onReveal }: RevealScoreButtonProps) => {
  return (
    <div className="sticky bottom-6 z-20 flex justify-center">
      <button
        type="button"
        onClick={onReveal}
        disabled={!enabled}
        className={
          enabled
            ? 'rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30'
            : 'rounded-full bg-slate-700 px-6 py-3 text-sm font-semibold text-slate-300'
        }
      >
        {enabled ? 'Reveal Final Score' : 'Hold at end to unlock'}
      </button>
    </div>
  );
};

export default RevealScoreButton;
