import { GameAdapter } from './GameAdapter';
import { MockGameAdapter } from './GameAdapter';
import { SportsApiAdapter, ApiConnectionError } from './SportsApiAdapter';

export function getGameAdapter(): GameAdapter {
  const apiUrl = import.meta.env.VITE_SPORTS_API_URL;
  if (apiUrl) {
    return new SportsApiAdapter();
  }
  return new MockGameAdapter();
}

export { ApiConnectionError };

