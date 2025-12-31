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

const getEventTypeLabel = (eventType: string): string => {
  const typeMap: Record<string, string> = {
    shot: 'Shot',
    made_shot: 'Made Shot',
    missed_shot: 'Missed Shot',
    rebound: 'Rebound',
    assist: 'Assist',
    turnover: 'Turnover',
    steal: 'Steal',
    block: 'Block',
    foul: 'Foul',
    free_throw: 'Free Throw',
    timeout: 'Timeout',
    substitution: 'Substitution',
    jump_ball: 'Jump Ball',
    period_start: 'Period Start',
    period_end: 'Period End',
    game_end: 'Game End',
    highlight: 'Highlight',
  };
  return typeMap[eventType.toLowerCase()] || eventType;
};

const getEventTypeIcon = (eventType: string): string => {
  const iconMap: Record<string, string> = {
    shot: '🏀',
    made_shot: '✅',
    missed_shot: '❌',
    rebound: '🔄',
    assist: '👋',
    turnover: '↩️',
    steal: '🔥',
    block: '🛡️',
    foul: '⚠️',
    free_throw: '🎯',
    timeout: '⏸️',
    substitution: '🔁',
    jump_ball: '⬆️',
    period_start: '▶️',
    period_end: '⏹️',
    game_end: '🏁',
    highlight: '⭐',
  };
  return iconMap[eventType.toLowerCase()] || '•';
};

export const PbpEventRow = ({ event, showScore = false }: PbpEventRowProps) => {
  const timeLabel = formatGameClock(event.gameClock, event.period);
  const typeLabel = getEventTypeLabel(event.eventType);
  const icon = getEventTypeIcon(event.eventType);

  return (
    <div className="pbp-event">
      <div className="pbp-event__time">
        {timeLabel && <span className="pbp-event__clock">{timeLabel}</span>}
      </div>
      <div className="pbp-event__content">
        <div className="pbp-event__header">
          <span className="pbp-event__icon" aria-hidden="true">
            {icon}
          </span>
          <span className="pbp-event__type">{typeLabel}</span>
          {event.team && <span className="pbp-event__team">{event.team}</span>}
        </div>
        <p className="pbp-event__description">
          {event.playerName && (
            <span className="pbp-event__player">{event.playerName}: </span>
          )}
          {event.description}
        </p>
        {showScore && event.homeScore !== undefined && event.awayScore !== undefined && (
          <div className="pbp-event__score">
            Score: {event.awayScore} - {event.homeScore}
          </div>
        )}
      </div>
    </div>
  );
};

