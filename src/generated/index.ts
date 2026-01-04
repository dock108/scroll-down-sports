/**
 * Re-export generated API types for convenience.
 *
 * Usage:
 *   import type { GameSummary, GameDetailResponse, SocialPostEntry } from '@/generated';
 *
 * To regenerate types after spec changes:
 *   npm run generate:types        # from local spec
 *   npm run generate:types:remote # from GitHub
 */

export type { paths, components, operations } from './api-types';

// Convenience exports for commonly used schemas
export type GameSummary = import('./api-types').components['schemas']['GameSummary'];
export type GameListResponse = import('./api-types').components['schemas']['GameListResponse'];
export type GameMeta = import('./api-types').components['schemas']['GameMeta'];
export type GameDetailResponse = import('./api-types').components['schemas']['GameDetailResponse'];

export type TeamStat = import('./api-types').components['schemas']['TeamStat'];
export type PlayerStat = import('./api-types').components['schemas']['PlayerStat'];
export type OddsEntry = import('./api-types').components['schemas']['OddsEntry'];

export type SocialPostEntry = import('./api-types').components['schemas']['SocialPostEntry'];
export type SocialPostResponse = import('./api-types').components['schemas']['SocialPostResponse'];
export type SocialPostListResponse = import('./api-types').components['schemas']['SocialPostListResponse'];
export type MediaType = import('./api-types').components['schemas']['MediaType'];

export type PlayEntry = import('./api-types').components['schemas']['PlayEntry'];
export type PbpEvent = import('./api-types').components['schemas']['PbpEvent'];
export type PbpResponse = import('./api-types').components['schemas']['PbpResponse'];

export type TeamSummary = import('./api-types').components['schemas']['TeamSummary'];
export type TeamDetail = import('./api-types').components['schemas']['TeamDetail'];
export type TeamListResponse = import('./api-types').components['schemas']['TeamListResponse'];

export type ScrapeRunResponse = import('./api-types').components['schemas']['ScrapeRunResponse'];
export type JobResponse = import('./api-types').components['schemas']['JobResponse'];





