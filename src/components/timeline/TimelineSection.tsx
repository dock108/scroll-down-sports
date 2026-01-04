import { ExpandableMomentCard } from './ExpandableMomentCard';
import { TimelineEntry } from '../../adapters/CatchupAdapter';

interface TimelineSectionProps {
  entry: TimelineEntry;
  showPbpScore?: boolean;
  index: number;
}

/**
 * Renders a single timeline section:
 * 1. Highlights (social posts) ABOVE the event
 * 2. PBP event row below
 *
 * This ordering ensures the user sees the exciting content first,
 * then gets the play-by-play context.
 */
export const TimelineSection = ({ entry, showPbpScore = false, index }: TimelineSectionProps) => (
  <div className="timeline-section">
    <ExpandableMomentCard entry={entry} index={index} showPbpScore={showPbpScore} />
  </div>
);
