import { useState } from 'react';
import { Link } from 'react-router-dom';

const DatePicker = () => {
  const [range, setRange] = useState('2024-03-10 to 2024-03-11');

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Scroll Down Sports</p>
        <h1 className="text-4xl font-semibold">Pick your spoiler-safe date range</h1>
        <p className="text-slate-400">
          Browse finished games without scores. Highlights scroll like an article. Reveal the final score only when you say so.
        </p>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Date range</label>
          <input
            type="text"
            value={range}
            onChange={(event) => setRange(event.target.value)}
            className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
          />
          <Link
            to={`/games?range=${encodeURIComponent(range)}`}
            className="mt-4 inline-flex items-center rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-950"
          >
            Browse games
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DatePicker;
