import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const DatePicker = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startParam = searchParams.get('start');
  const endParam = searchParams.get('end');
  const [startDate, setStartDate] = useState('2024-03-10');
  const [endDate, setEndDate] = useState('2024-03-11');

  const parsedParams = useMemo(() => {
    const parsedStart = normalizeDateParam(startParam);
    const parsedEnd = normalizeDateParam(endParam);
    const hasInvalid =
      (startParam !== null && startParam !== '' && !parsedStart) ||
      (endParam !== null && endParam !== '' && !parsedEnd);
    return { parsedStart, parsedEnd, hasInvalid };
  }, [endParam, startParam]);

  useEffect(() => {
    if (parsedParams.parsedStart) {
      setStartDate(parsedParams.parsedStart);
    }
    if (parsedParams.parsedEnd) {
      setEndDate(parsedParams.parsedEnd);
    }
  }, [parsedParams.parsedEnd, parsedParams.parsedStart]);

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (startDate) {
      params.set('start', startDate);
    }
    if (endDate) {
      params.set('end', endDate);
    }
    navigate(`/games?${params.toString()}`);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-[700px] flex-col justify-center px-6 py-16">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Scroll Down Sports</p>
        <h1 className="text-4xl font-semibold">Pick your spoiler-safe date range</h1>
        <p className="text-slate-400">
          Browse finished games without scores. Highlights scroll like an article. Reveal the final score only when you say so.
        </p>
        {parsedParams.hasInvalid ? (
          <p className="rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-200">
            Invalid dates detected — defaults loaded.
          </p>
        ) : null}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Date range</label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Start date</span>
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-500">End date</span>
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-5 inline-flex items-center rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-950"
          >
            Load games
          </button>
        </div>
      </div>
    </main>
  );
};

export default DatePicker;

const normalizeDateParam = (value: string | null) => {
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return value;
};
