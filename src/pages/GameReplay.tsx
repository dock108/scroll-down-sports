import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import GameHeader from '../components/GameHeader';
import TweetEmbed from '../components/TweetEmbed';
import TimelineDivider from '../components/TimelineDivider';
import StatsTeaser from '../components/StatsTeaser';
import RevealScoreButton from '../components/RevealScoreButton';
import FinalStats from '../components/FinalStats';
import useSpoilerState from '../hooks/useSpoilerState';
import games from '../data/games.json';
import posts from '../data/posts.json';

const DWELL_TIME_MS = 1400;
const VELOCITY_THRESHOLD = 0.7;
const END_BUFFER_PX = 240;

const GameReplay = () => {
  const { gameId } = useParams();
  const { spoilersAllowed, revealSpoilers } = useSpoilerState();
  const [canReveal, setCanReveal] = useState(false);
  const lastScrollY = useRef<number | null>(null);
  const lastScrollTime = useRef<number | null>(null);
  const dwellTimer = useRef<number | null>(null);

  const game = games.find((item) => item.id === gameId);

  const timelinePosts = useMemo(() => {
    return posts
      .filter((post) => post.game_id === gameId)
      .sort((a, b) => {
        if (a.has_video === b.has_video) {
          return new Date(a.posted_at).getTime() - new Date(b.posted_at).getTime();
        }
        return a.has_video ? -1 : 1;
      });
  }, [gameId]);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentY = window.scrollY;
      const lastY = lastScrollY.current;
      const lastTime = lastScrollTime.current;

      if (lastY !== null && lastTime !== null) {
        const deltaY = Math.abs(currentY - lastY);
        const deltaT = Math.max(now - lastTime, 1);
        const velocity = deltaY / deltaT;
        const nearEnd = window.innerHeight + window.scrollY >= document.body.scrollHeight - END_BUFFER_PX;

        if (velocity < VELOCITY_THRESHOLD && nearEnd) {
          if (!dwellTimer.current) {
            dwellTimer.current = window.setTimeout(() => {
              setCanReveal(true);
              dwellTimer.current = null;
            }, DWELL_TIME_MS);
          }
        } else {
          setCanReveal(false);
          if (dwellTimer.current) {
            window.clearTimeout(dwellTimer.current);
            dwellTimer.current = null;
          }
        }
      }

      lastScrollY.current = currentY;
      lastScrollTime.current = now;
    };

    const handleOrientationChange = () => {
      setCanReveal(false);
      if (dwellTimer.current) {
        window.clearTimeout(dwellTimer.current);
        dwellTimer.current = null;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('orientationchange', handleOrientationChange);
      if (dwellTimer.current) {
        window.clearTimeout(dwellTimer.current);
        dwellTimer.current = null;
      }
    };
  }, []);

  if (!game) {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
        <p className="text-slate-300">Game not found.</p>
        <Link className="mt-4 inline-flex text-emerald-300" to="/games">
          Back to games
        </Link>
      </main>
    );
  }

  const dateLabel = new Date(game.date).toLocaleString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <main className="mx-auto min-h-screen max-w-3xl space-y-12 px-6 py-12">
      <Link className="text-xs uppercase tracking-[0.3em] text-slate-500" to="/games">
        Back to games
      </Link>
      <GameHeader
        awayTeam={game.away_team}
        homeTeam={game.home_team}
        venue={game.venue}
        dateLabel={dateLabel}
      />
      <section className="space-y-10">
        {timelinePosts.map((post) => (
          <TweetEmbed
            key={post.tweet_url}
            tweetUrl={post.tweet_url}
            hasVideo={post.has_video}
            spoilersAllowed={spoilersAllowed}
          />
        ))}
      </section>
      <TimelineDivider />
      <section className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Final stats are hidden until you reveal the score
        </p>
        {spoilersAllowed ? (
          <FinalStats homeTeam={game.home_team} awayTeam={game.away_team} attendance={game.attendance} />
        ) : (
          <StatsTeaser />
        )}
      </section>
      {!spoilersAllowed ? (
        <RevealScoreButton enabled={canReveal} onReveal={revealSpoilers} />
      ) : null}
    </main>
  );
};

export default GameReplay;
