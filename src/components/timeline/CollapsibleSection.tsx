import { useState, type ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  icon?: string;
  count?: number;
  defaultExpanded?: boolean;
  children: ReactNode;
}

export const CollapsibleSection = ({
  title,
  icon,
  count,
  defaultExpanded = false,
  children,
}: CollapsibleSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section className="collapsible-section">
      <button
        type="button"
        className="collapsible-section__header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="collapsible-section__title">
          {icon && (
            <span className="collapsible-section__icon" aria-hidden="true">
              {icon}
            </span>
          )}
          <h2>{title}</h2>
          {typeof count === 'number' && (
            <span className="collapsible-section__count">({count})</span>
          )}
        </div>
        <span className={`collapsible-section__chevron ${isExpanded ? 'collapsible-section__chevron--open' : ''}`}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="collapsible-section__content">
          {children}
        </div>
      )}
    </section>
  );
};

