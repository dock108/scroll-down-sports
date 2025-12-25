const StatsTeaser = () => {
  const statBlocks = Array.from({ length: 4 }, (_, index) => index);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Final Stats</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {statBlocks.map((item) => (
          <div
            key={item}
            className="rounded-xl bg-slate-800/70 p-4 text-center text-slate-400 blur-sm"
          >
            <div className="text-3xl font-semibold">00</div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em]">Placeholder</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsTeaser;
