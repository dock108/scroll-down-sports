interface GameOverviewProps {
  homeTeam: string;
  awayTeam: string;
  // Future: Add summary, key highlights, top video
}

export const GameOverview = ({ homeTeam, awayTeam }: GameOverviewProps) => {
  return (
    <section id="overview" className="game-overview">
      <h2 className="section-header">Overview</h2>
      <p className="game-overview__summary">
        {awayTeam} visited {homeTeam} in this matchup. Full game summary coming soon.
      </p>
      <ul className="game-overview__highlights">
        <li>Key moments and highlights will appear here</li>
        <li>Top performers and standout plays</li>
        <li>Game-changing moments and turning points</li>
      </ul>
      {/* TODO: Add top highlight video when available */}
    </section>
  );
};

