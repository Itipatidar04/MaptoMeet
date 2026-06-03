import axios from "axios";
import { useEffect, useState } from "react";
import SuggestionsList from "./SuggestionsList";
import { getRoute, searchLocations } from "../services/locationService";
import type { Place, RouteMeta, RouteProfile } from "../types/location";

const SEARCH_DEBOUNCE_MS = 300;

type SearchPanelProps = {
  onRouteReady: (
    source: Place,
    destination: Place,
    coordinates: [number, number][],
    meta: RouteMeta,
  ) => void;
  onRouteClear: () => void;
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

function SearchPanel({ onRouteReady, onRouteClear }: SearchPanelProps) {
  const [sourceQuery, setSourceQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState<Place[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    Place[]
  >([]);
  const [selectedSource, setSelectedSource] = useState<Place | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Place | null>(
    null,
  );
  const [profile, setProfile] = useState<RouteProfile>("driving");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileRouteMeta, setMobileRouteMeta] = useState<RouteMeta | null>(
    null,
  );

  useEffect(() => {
    if (!sourceQuery.trim()) {
      setSourceSuggestions([]);
      return;
    }
    if (selectedSource && sourceQuery === selectedSource.name) {
      return;
    }

    const timer = window.setTimeout(async () => {
      const results = await searchLocations(sourceQuery);
      setSourceSuggestions(results);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [sourceQuery, selectedSource]);

  useEffect(() => {
    if (!destinationQuery.trim()) {
      setDestinationSuggestions([]);
      return;
    }
    if (selectedDestination && destinationQuery === selectedDestination.name) {
      return;
    }

    const timer = window.setTimeout(async () => {
      const results = await searchLocations(destinationQuery);
      setDestinationSuggestions(results);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [destinationQuery, selectedDestination]);

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSourceQuery(value);
    setSelectedSource(null);
    onRouteClear();
    setError(null);
    setMobileRouteMeta(null);
  };

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setDestinationQuery(value);
    setSelectedDestination(null);
    onRouteClear();
    setError(null);
    setMobileRouteMeta(null);
  };

  const handleSourceSelect = (place: Place) => {
    setSourceQuery(place.name);
    setSelectedSource(place);
    setSourceSuggestions([]);
    onRouteClear();
    setError(null);
    setMobileRouteMeta(null);
  };

  const handleDestinationSelect = (place: Place) => {
    setDestinationQuery(place.name);
    setSelectedDestination(place);
    setDestinationSuggestions([]);
    onRouteClear();
    setError(null);
    setMobileRouteMeta(null);
  };

  const handleSubmit = async () => {
    if (!selectedSource || !selectedDestination) {
      setError("Select both source and destination from the suggestions.");
      return;
    }

    setLoading(true);
    setError(null);
    onRouteClear();
    setMobileRouteMeta(null);

    try {
      const data = await getRoute(selectedSource, selectedDestination, profile);

      if (data.code !== "Ok" || !data.routes?.length) {
        throw new Error(
          data.message ?? "Could not find a route between these points.",
        );
      }

      const route = data.routes[0];
      const meta = {
        distance: route.distance,
        duration: route.duration,
      };
      setMobileRouteMeta(meta);
      onRouteReady(
        selectedSource,
        selectedDestination,
        route.geometry.coordinates,
        meta,
      );
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.detail
          ? String(err.response.data.detail)
          : err instanceof Error
            ? err.message
            : "Failed to fetch route.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit =
    Boolean(selectedSource && selectedDestination) && !loading;

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-medium text-text-secondary"
            htmlFor="source-input"
          >
            From
          </label>
          <div className="relative">
            <span
              className="pointer-events-none absolute left-4 top-1/2 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-success shadow-[0_0_0_3px_rgba(34,197,94,0.25)]"
              aria-hidden
            />
            <input
              id="source-input"
              placeholder="Search starting location"
              className="w-full rounded-input border border-border bg-card py-3 pl-10 pr-4 text-sm font-normal text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
              value={sourceQuery}
              onChange={handleSourceChange}
              autoComplete="off"
              disabled={loading}
            />
            <SuggestionsList
              suggestions={sourceSuggestions}
              onSelect={handleSourceSelect}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-medium text-text-secondary"
            htmlFor="destination-input"
          >
            To
          </label>
          <div className="relative">
            <span
              className="pointer-events-none absolute left-4 top-1/2 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-danger shadow-[0_0_0_3px_rgba(239,68,68,0.25)]"
              aria-hidden
            />
            <input
              id="destination-input"
              placeholder="Search destination"
              className="w-full rounded-input border border-border bg-card py-3 pl-10 pr-4 text-sm font-normal text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
              value={destinationQuery}
              onChange={handleDestinationChange}
              autoComplete="off"
              disabled={loading}
            />
            <SuggestionsList
              suggestions={destinationSuggestions}
              onSelect={handleDestinationSelect}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-medium text-text-secondary"
            htmlFor="profile-select"
          >
            Mode
          </label>
          <select
            id="profile-select"
            className="cursor-pointer rounded-button border border-border bg-transparent px-3 py-2 text-sm font-normal text-text-primary transition-colors duration-200 hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
            value={profile}
            onChange={(e) => setProfile(e.target.value as RouteProfile)}
            disabled={loading}
          >
            <option value="driving">Driving</option>
            <option value="walking">Walking</option>
            <option value="cycling">Cycling</option>
          </select>
        </div>

        <button
          type="button"
          className="rounded-button bg-primary px-7 py-3 text-sm font-medium text-text-primary transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          {loading ? "Finding route…" : "Show route"}
        </button>
      </div>

      {error && (
        <p
          className="rounded-input border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      )}

      {mobileRouteMeta && !error && (
        <div className="flex items-center justify-center gap-3 rounded-input border border-border bg-card px-4 py-3 lg:hidden">
          <span className="text-sm font-medium text-primary">
            {formatDistance(mobileRouteMeta.distance)}
          </span>
          <span className="h-1 w-1 rounded-full bg-border" aria-hidden />
          <span className="text-sm font-medium text-text-primary">
            {formatDuration(mobileRouteMeta.duration)}
          </span>
        </div>
      )}
    </section>
  );
}

export default SearchPanel;
