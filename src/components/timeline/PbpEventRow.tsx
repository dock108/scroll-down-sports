import { PbpEvent } from '../../adapters/PbpAdapter';

interface PbpEventRowProps {
  event: PbpEvent;
  showScore?: boolean;
}

const formatGameClock = (gameClock: string, period: number): string => {
  if (!gameClock && !period) return '';
  const periodLabel = period > 4 ? `OT${period - 4}` : `Q${period}`;
  if (!gameClock) return periodLabel;
  return `${periodLabel} ${gameClock}`;
};

// Only show labels for notable event types, hide generic "play" labels
const getEventTypeLabel = (eventType: string): string | null => {
  const lower = eventType.toLowerCase();
  // Skip generic play types
  if (lower === 'play' || lower === 'event' || lower === '') return null;
  
  const typeMap: Record<string, string> = {
    shot: 'Shot',
    made_shot: 'Made',
    missed_shot: 'Miss',
    rebound: 'Reb',
    assist: 'Ast',
    turnover: 'TO',
    steal: 'Stl',
    block: 'Blk',
    foul: 'Foul',
    free_throw: 'FT',
    timeout: 'Timeout',
    substitution: 'Sub',
    jump_ball: 'Jump',
    period_start: 'Start',
    period_end: 'End',
    game_end: 'Final',
    highlight: '⭐',
  };
  return typeMap[lower] || null;
};


export const PbpEventRow = ({ event, showScore = false }: PbpEventRowProps) => {
  const timeLabel = formatGameClock(event.gameClock, event.period);
  const typeLabel = getEventTypeLabel(event.eventType);

  return (
    <div className="pbp-event">
      <div className="pbp-event__time">
        {timeLabel && <span className="pbp-event__clock">{timeLabel}</span>}
      </div>
      <div className="pbp-event__content">
        {/* Only show header row if we have a type label or team */}
        {(typeLabel || event.team) && (
          <span className="pbp-event__header">
            {typeLabel && <span className="pbp-event__type">{typeLabel}</span>}
            {event.team && <span className="pbp-event__team">{event.team}</span>}
          </span>
        )}
        <span className="pbp-event__description">{event.description}</span>
        {showScore && event.homeScore !== undefined && event.awayScore !== undefined && (
          <span className="pbp-event__score">
            {event.awayScore}-{event.homeScore}
          </span>
        )}
      </div>
    </div>
  );
};

