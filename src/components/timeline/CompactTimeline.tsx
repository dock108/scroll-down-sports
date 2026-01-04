interface CompactTimelineMoment {
  id: string;
  title: string;
  description?: string;
  periodLabel?: string;
  timeLabel?: string;
  tag?: string;
}

interface CompactTimelineProps {
  moments: CompactTimelineMoment[];
}

const buildMetaLabel = (moment: CompactTimelineMoment) => {
  const parts = [moment.periodLabel, moment.timeLabel, moment.tag].filter(Boolean);
  return parts.join(' • ');
};

export const CompactTimeline = ({ moments }: CompactTimelineProps) => {
  if (moments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-500">
        No timeline moments available yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {moments.map((moment, index) => {
        const metaLabel = buildMetaLabel(moment);
        return (
          <div
            key={moment.id}
            className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm sm:px-6"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 via-blue-300 to-transparent" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
                  <span>Chapter {index + 1}</span>
                  {metaLabel && <span className="text-gray-300">|</span>}
                  {metaLabel && <span className="text-gray-400">{metaLabel}</span>}
                </div>
                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                  {moment.title}
                </h3>
                {moment.description && (
                  <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                    {moment.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export type { CompactTimelineMoment };
