export interface GameSummary {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  venue?: string;
  attendance?: number;
}

export type StatValue = string | number | null | undefined;

export type StatRecord = Record<string, StatValue>;

export interface TeamStat {
  team: string;
  is_home: boolean;
  stats: StatRecord;
}

export interface PlayerStat {
  team: string;
  player_name: string;
  points?: number;
  rebounds?: number;
  assists?: number;
  raw_stats: StatRecord;
}

export interface GameDetails extends GameSummary {
  starters?: Record<string, string[]>;
  homeScore?: number;
  awayScore?: number;
  teamStats?: TeamStat[];
  playerStats?: PlayerStat[];
}

export interface GameAdapter {
  getGamesByDateRange(start: Date, end: Date): Promise<GameSummary[]>;
  getGameById(id: string): Promise<GameDetails | null>;
}
