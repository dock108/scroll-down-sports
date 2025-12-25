import { useMemo, useState } from 'react';

interface FinalStatsProps {
  homeTeam: string;
  awayTeam: string;
  attendance: number;
  revealed: boolean;
}

const FinalStats = ({ homeTeam, awayTeam, attendance, revealed }: FinalStatsProps) => {
  const [sortOrder, setSortOrder] = useState<'default' | 'high-low' | 'alpha'>('default');
  const stats = useMemo(
    () => [
      { label: `${awayTeam} Final`, value: '108' },
      { label: `${homeTeam} Final`, value: '112' },
      { label: 'Attendance', value: attendance.toLocaleString() },
      { label: 'Duration', value: '2:21' },
    ],
    [attendance, awayTeam, homeTeam],
  );

  const sortedStats = useMemo(() => {
    if (sortOrder === 'default') {
      return stats;
    }

    const normalizeValue = (value: string) => {
      const numeric = Number(value.replace(/[^0-9.]/g, ''));
      if (Number.isNaN(numeric)) {
        return 0;
      }
      return numeric;
    };

    return [...stats].sort((a, b) => {
      if (sortOrder === 'alpha') {
        return a.label.localeCompare(b.label);
      }
      return normalizeValue(b.value) - normalizeValue(a.value);
    });
  }, [sortOrder, stats]);

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-emerald-500/10 transition-all duration-500 ${
        revealed
          ? 'max-h-[1200px] translate-y-0 border border-emerald-500/30 p-6 opacity-100'
          : 'max-h-0 translate-y-4 border border-transparent p-0 opacity-0'
      }`}
      aria-hidden={!revealed}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Final Score + Stats</p>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-200/80">
            <span>Sort</span>
            <button
              type="button"
              onClick={() => setSortOrder('default')}
              aria-pressed={sortOrder === 'default'}
              className={`rounded-full border px-3 py-1 ${
                sortOrder === 'default'
                  ? 'border-emerald-200 text-emerald-100'
                  : 'border-emerald-400/40 text-emerald-200/70'
              }`}
            >
              Default
            </button>
            <button
              type="button"
              onClick={() => setSortOrder('high-low')}
              aria-pressed={sortOrder === 'high-low'}
              className={`rounded-full border px-3 py-1 ${
                sortOrder === 'high-low'
                  ? 'border-emerald-200 text-emerald-100'
                  : 'border-emerald-400/40 text-emerald-200/70'
              }`}
            >
              High-Low
            </button>
            <button
              type="button"
              onClick={() => setSortOrder('alpha')}
              aria-pressed={sortOrder === 'alpha'}
              className={`rounded-full border px-3 py-1 ${
                sortOrder === 'alpha'
                  ? 'border-emerald-200 text-emerald-100'
                  : 'border-emerald-400/40 text-emerald-200/70'
              }`}
            >
              A-Z
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-400/30 bg-slate-950/40 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">Final score</p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
            <div className="text-3xl font-semibold text-emerald-100">{awayTeam}</div>
            <div className="text-5xl font-semibold text-emerald-200">108</div>
          </div>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
            <div className="text-3xl font-semibold text-emerald-100">{homeTeam}</div>
            <div className="text-5xl font-semibold text-emerald-200">112</div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {sortedStats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-slate-950/60 p-4 text-center">
            <div className="text-3xl font-semibold text-emerald-200">{stat.value}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-emerald-100/70">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinalStats;
