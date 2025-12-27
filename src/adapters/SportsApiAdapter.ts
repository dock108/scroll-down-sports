import { GameAdapter, GameSummary, GameDetails } from './GameAdapter';

export class ApiConnectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiConnectionError';
  }
}

const API_BASE = import.meta.env.VITE_SPORTS_API_URL || 'http://localhost:8000';

export class SportsApiAdapter implements GameAdapter {
  async getGamesByDateRange(start: Date, end: Date): Promise<GameSummary[]> {
    const params = new URLSearchParams();

    if (start && !isNaN(start.getTime())) {
      params.append('startDate', start.toISOString().split('T')[0]);
    }
    if (end && !isNaN(end.getTime())) {
      params.append('endDate', end.toISOString().split('T')[0]);
    }
    params.append('limit', '100');

    const data = await this.fetchJson(`${API_BASE}/api/admin/sports/games?${params}`);
    return data.games.map(this.mapGameSummary);
  }

  async getGameById(id: string): Promise<GameDetails | null> {
    const data = await this.fetchJson(`${API_BASE}/api/admin/sports/games/${id}`);
    return this.mapGameDetails(data);
  }

  private async fetchJson(url: string): Promise<any> {
    let response: Response;

    try {
      response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      throw new ApiConnectionError(
        'Unable to connect to sports data API. Is the server running?'
      );
    }

    if (!response.ok) {
      throw new ApiConnectionError(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private mapGameSummary(game: any): GameSummary {
    return {
      id: String(game.id),
      date: game.game_date,
      homeTeam: game.home_team,
      awayTeam: game.away_team,
      venue: undefined,
    };
  }

  private mapGameDetails(data: any): GameDetails {
    const game = data.game;
    return {
      id: String(game.id),
      date: game.game_date,
      homeTeam: game.home_team,
      awayTeam: game.away_team,
      venue: undefined,
      homeScore: game.home_score,
      awayScore: game.away_score,
      teamStats: data.team_stats,
      playerStats: data.player_stats,
    };
  }
}

