interface RevealScoreButtonProps {
  onReveal: () => void;
}

const RevealScoreButton = ({ onReveal }: RevealScoreButtonProps) => {
  return (
    <div className="sticky bottom-6 z-20 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={onReveal}
        aria-label="Reveal final score"
        className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
      >
        Reveal Final Score
      </button>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
        Scrolling won’t reveal the score — click when ready.
      </p>
    </div>
  );
};

export default RevealScoreButton;
