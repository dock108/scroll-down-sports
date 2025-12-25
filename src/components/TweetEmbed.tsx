import { useEffect, useMemo, useState } from 'react';
import '../styles/tweetMask.css';

interface TweetEmbedProps {
  tweetUrl: string;
  hasVideo: boolean;
  spoilersAllowed: boolean;
}

const TweetEmbed = ({ tweetUrl, hasVideo, spoilersAllowed }: TweetEmbedProps) => {
  const [captionRevealed, setCaptionRevealed] = useState(false);

  const maskVisible = useMemo(() => !spoilersAllowed && !captionRevealed, [spoilersAllowed, captionRevealed]);

  useEffect(() => {
    const scriptId = 'twitter-widgets-script';
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!existing) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = 'https://platform.twitter.com/widgets.js';
      document.body.appendChild(script);
      script.addEventListener('load', () => {
        // @ts-expect-error - twitter widgets is a global
        window.twttr?.widgets?.load();
      });
    } else {
      // @ts-expect-error - twitter widgets is a global
      window.twttr?.widgets?.load();
    }
  }, [tweetUrl]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
        <span>{hasVideo ? 'Video Highlight' : 'Moment'}</span>
        <span>Official Team Post</span>
      </div>
      <div className="tweet-shell">
        <blockquote className="twitter-tweet">
          <a href={tweetUrl}></a>
        </blockquote>
        {maskVisible ? (
          <div className="caption-mask">
            <button type="button" onClick={() => setCaptionRevealed(true)}>
              Tap to reveal caption
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TweetEmbed;
