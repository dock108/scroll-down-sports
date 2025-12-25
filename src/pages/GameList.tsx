import { Link, useLocation } from 'react-router-dom';
import games from '../data/games.json';

const GameList = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const range = query.get('range');

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Games</p>
        <h1 className="text-3xl font-semibold">Choose a game to replay</h1>
        {range ? <p className="text-slate-400">Showing games for {range}</p> : null}
      </div>
      <div className="mt-8 grid gap-4">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/games/${game.id}`}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-slate-600"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  {new Date(game.date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <h2 className="mt-2 text-xl font-semibold">
                  {game.away_team} at {game.home_team}
                </h2>
              </div>
              <div className="text-sm text-slate-400">{game.venue}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default GameList;
