import { TimelineEntry } from '../../adapters/CatchupAdapter';
import { XHighlight } from '../embeds/XHighlight';
import { PbpEventRow } from './PbpEventRow';

interface TimelineSectionProps {
  entry: TimelineEntry;
  showPbpScore?: boolean;
}

/**
 * Renders a single timeline section:
 * 1. Highlights (social posts) ABOVE the event
 * 2. PBP event row below
 *
 * This ordering ensures the user sees the exciting content first,
 * then gets the play-by-play context.
 */
export const TimelineSection = ({ entry, showPbpScore = false }: TimelineSectionProps) => {
  const hasHighlights = entry.highlights.length > 0;
  const hasPbpContent = entry.event.description || entry.event.eventType !== 'highlight';

  return (
    <div className="timeline-section">
      {/* Render highlights ABOVE the PBP event */}
      {hasHighlights && (
        <div className="timeline-section__highlights">
          {entry.highlights.map((highlight) => (
            <XHighlight key={highlight.id} post={highlight} />
          ))}
        </div>
      )}

      {/* Render PBP event */}
      {hasPbpContent && (
        <div className="timeline-section__event">
          <PbpEventRow event={entry.event} showScore={showPbpScore} />
        </div>
      )}
    </div>
  );
};

