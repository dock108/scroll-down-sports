interface FinalStatsProps {
  homeTeam: string;
  awayTeam: string;
  attendance: number;
}

const FinalStats = ({ homeTeam, awayTeam, attendance }: FinalStatsProps) => {
  const stats = [
    { label: `${awayTeam} Final`, value: '108' },
    { label: `${homeTeam} Final`, value: '112' },
    { label: 'Attendance', value: attendance.toLocaleString() },
    { label: 'Duration', value: '2:21' },
  ];

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Final Score + Stats</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
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
