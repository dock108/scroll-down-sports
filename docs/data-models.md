# Data models

The app uses adapters to normalize data from multiple sources (local JSON for development, API responses for production). This allows the UI to tolerate different field names and data shapes.

## Games (mock JSON: `src/data/games.json`)

Each item represents a finished game.

Required fields (normalized by `MockGameAdapter`):

| Normalized field | Accepted keys                                  | Notes                             |
| ---------------- | ---------------------------------------------- | --------------------------------- |
| `id`             | `id`, `game_id`, `gameId`                      | Required for routing.             |
| `date`           | `date`, `game_date`, `start_time`, `startTime` | ISO-8601 string preferred.        |
| `homeTeam`       | `home_team`, `homeTeam`, `home`                | String abbreviation or full name. |
| `awayTeam`       | `away_team`, `awayTeam`, `away`                | String abbreviation or full name. |

Optional fields:

| Normalized field | Accepted keys                             | Notes                                            |
| ---------------- | ----------------------------------------- | ------------------------------------------------ |
| `venue`          | `venue`, `arena`, `location`              | Displayed in lists and headers.                  |
| `attendance`     | `attendance`, `crowd`, `attendance_total` | Numeric attendance.                              |
| `starters`       | `starters`, `lineups`, `starting_lineups` | Object with team keys and array of player names. |

Date filtering is applied in `MockGameAdapter.getGamesByDateRange`. Invalid or missing dates are treated as always-in-range so the game still appears.

## Games (API: `SportsApiAdapter`)

`SportsApiAdapter` expects summary and detail payloads from the sports API.

Summary fields (`GET /api/admin/sports/games`):

| Field       | Notes                         |
| ----------- | ----------------------------- |
| `id`        | Required for routing.         |
| `game_date` | ISO-8601 string preferred.    |
| `home_team` | Abbreviation or full name.    |
| `away_team` | Abbreviation or full name.    |

Detail fields (`GET /api/admin/sports/games/:id`):

| Field                 | Notes                                      |
| --------------------- | ------------------------------------------ |
| `game.home_score`     | Final score (optional if unavailable).     |
| `game.away_score`     | Final score (optional if unavailable).     |
| `team_stats`          | Array of team stat records.                |
| `player_stats`        | Array of player stat records with `raw_stats`. |

## Timeline posts (mock JSON: `src/data/posts.json`)

Each item represents a highlight post that appears in the replay timeline.

Required fields (normalized by `MockPostAdapter`):

| Normalized field | Accepted keys                        | Notes                             |
| ---------------- | ------------------------------------ | --------------------------------- |
| `gameId`         | `game_id`, `gameId`, `game`          | Must match a game `id`.           |
| `postUrl`        | `post_url`, `tweet_url`, `tweetUrl`, `url` | Used for embeds and fallback IDs. |
| `postedAt`       | `posted_at`, `postedAt`, `timestamp` | ISO-8601 string preferred.        |

Optional fields:

| Normalized field | Accepted keys                    | Notes                           |
| ---------------- | -------------------------------- | ------------------------------- |
| `team`           | `team`, `team_id`, `teamId`      | Displayed as metadata.          |
| `hasVideo`       | `has_video`, `hasVideo`, `video` | Used to adjust embed treatment. |
| `mediaType`      | `media_type`, `mediaType`        | `video`, `image`, or `none`.    |
| `videoUrl`       | `video_url`, `videoUrl`          | Remote video URL (not hosted).  |
| `imageUrl`       | `image_url`, `imageUrl`          | Remote image URL (not hosted).  |
| `sourceHandle`   | `source_handle`, `sourceHandle`  | X handle for attribution.       |
| `tweetText`      | `tweet_text`, `tweetText`, `text`| Caption text for the post.      |

Posts are filtered by `gameId` and sorted by `postedAt` ascending before rendering.

## Game social posts (API-backed)

Links X posts to games. Media URLs are stored but never re-hosted.

| Field           | Type      | Notes                                |
| --------------- | --------- | ------------------------------------ |
| `id`            | UUID      | Primary key                          |
| `game_id`       | FK        | References games table               |
| `team_id`       | String    | Team abbreviation                    |
| `post_url`      | String    | Full X post URL                      |
| `tweet_id`      | String    | Optional original post ID            |
| `posted_at`     | Timestamp | When the post was made               |
| `has_video`     | Boolean   | Optional flag for video content      |
| `media_type`    | String    | `video`, `image`, or `none`          |
| `video_url`     | Text      | Remote video URL (not hosted)        |
| `image_url`     | Text      | Remote image URL (not hosted)        |
| `source_handle` | Text      | X handle for attribution             |
| `tweet_text`    | Text      | Caption text for the post            |

**Not stored:** Media files, engagement metrics.

Accessed via `SocialPostApiAdapter` or `getSocialPostAdapter()`.

See [X Integration](./x-integration.md) for full details on the X embedding strategy.
