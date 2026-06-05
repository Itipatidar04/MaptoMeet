import type { Place, RouteMeta } from "../types/location";

type DetailsPanelProps = {
  source: Place;
  destination: Place;
  routeMeta: RouteMeta;
};

function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${Math.round(meters)} m`;
}

function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return `${hours} h ${remaining} min`;
}

function DetailsPanel({ source, destination, routeMeta }: DetailsPanelProps) {
  return (
    <aside className="pointer-events-none absolute right-4 top-24 z-20 hidden w-80 lg:block xl:right-6">
      <div className="pointer-events-auto rounded-card border border-border bg-card p-5 shadow-panel transition-opacity duration-200">
        <h2 className="text-sm font-medium text-text-secondary">Route</h2>
        <div className="mt-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-text-secondary">From</p>
            <p className="mt-1 text-sm font-normal text-text-primary">
              {source.name}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary">To</p>
            <p className="mt-1 text-sm font-normal text-text-primary">
              {destination.name}
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-input border border-border bg-surface px-4 py-3">
          <span className="text-sm font-medium text-primary">
            {formatDistance(routeMeta.distance)}
          </span>
          <span className="h-1 w-1 rounded-full bg-border" aria-hidden />
          <span className="text-sm font-medium text-text-primary">
            {formatDuration(routeMeta.duration)}
          </span>
        </div>
      </div>
    </aside>
  );
}

export default DetailsPanel;
