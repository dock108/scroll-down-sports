interface GameHeaderProps {
  awayTeam: string;
  homeTeam: string;
  venue: string;
  dateLabel: string;
}

const GameHeader = ({ awayTeam, homeTeam, venue, dateLabel }: GameHeaderProps) => {
  return (
    <header className="space-y-2 border-b border-slate-800 pb-6">
      <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Game Replay</p>
      <h1 className="text-3xl font-semibold">{awayTeam} at {homeTeam}</h1>
      <div className="text-sm text-slate-400">
        <p>{dateLabel}</p>
        <p>{venue}</p>
      </div>
    </header>
  );
};

export default GameHeader;
