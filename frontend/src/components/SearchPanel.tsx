import axios from "axios";
import { useEffect, useRef, useState } from "react";
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

type ActiveField = "source" | "destination" | null;

function splitPlaceName(name: string): { title: string; subtitle: string | null } {
  const parts = name.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) {
    return { title: name, subtitle: null };
  }
  return {
    title: parts[0],
    subtitle: parts.slice(1).join(", "),
  };
}

function SearchPanel({ onRouteReady, onRouteClear }: SearchPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeField, setActiveField] = useState<ActiveField>(null);
  const [sourceQuery, setSourceQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState<Place[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<Place[]>(
    [],
  );
  const [selectedSource, setSelectedSource] = useState<Place | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Place | null>(
    null,
  );
  const [profile, setProfile] = useState<RouteProfile>("driving");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sourceInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveField(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      sourceInputRef.current?.focus();
      setActiveField("source");
    }, 50);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!sourceQuery.trim() || activeField !== "source") {
      setSourceSuggestions([]);
      return;
    }
    if (selectedSource && sourceQuery === selectedSource.name) {
      setSourceSuggestions([]);
      return;
    }

    const timer = window.setTimeout(async () => {
      const results = await searchLocations(sourceQuery);
      setSourceSuggestions(results);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [sourceQuery, selectedSource, activeField]);

  useEffect(() => {
    if (!destinationQuery.trim() || activeField !== "destination") {
      setDestinationSuggestions([]);
      return;
    }
    if (selectedDestination && destinationQuery === selectedDestination.name) {
      setDestinationSuggestions([]);
      return;
    }

    const timer = window.setTimeout(async () => {
      const results = await searchLocations(destinationQuery);
      setDestinationSuggestions(results);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [destinationQuery, selectedDestination, activeField]);

  const openPanel = () => {
    setIsOpen(true);
    setError(null);
  };

  const closePanel = () => {
    setIsOpen(false);
    setActiveField(null);
    setSourceSuggestions([]);
    setDestinationSuggestions([]);
  };

  const clearRouteState = () => {
    onRouteClear();
    setError(null);
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSourceQuery(value);
    setSelectedSource(null);
    setActiveField("source");
    clearRouteState();
  };

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setDestinationQuery(value);
    setSelectedDestination(null);
    setActiveField("destination");
    clearRouteState();
  };

  const handleSourceSelect = (place: Place) => {
    setSourceQuery(place.name);
    setSelectedSource(place);
    setSourceSuggestions([]);
    setActiveField("destination");
    clearRouteState();
    destinationInputRef.current?.focus();
  };

  const handleDestinationSelect = (place: Place) => {
    setDestinationQuery(place.name);
    setSelectedDestination(place);
    setDestinationSuggestions([]);
    setActiveField(null);
    clearRouteState();
  };

  const handleSubmit = async () => {
    if (!selectedSource || !selectedDestination) {
      setError("Select both source and destination from the suggestions.");
      return;
    }

    setLoading(true);
    setError(null);
    onRouteClear();

    try {
      const data = await getRoute(selectedSource, selectedDestination, profile);

      if (data.code !== "Ok" || !data.routes?.length) {
        throw new Error(
          data.message ?? "Could not find a route between these points.",
        );
      }

      const route = data.routes[0];
      onRouteReady(
        selectedSource,
        selectedDestination,
        route.geometry.coordinates,
        {
          distance: route.distance,
          duration: route.duration,
        },
      );
      closePanel();
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

  const triggerLabel = (() => {
    if (selectedSource && selectedDestination) {
      const from = splitPlaceName(selectedSource.name).title;
      const to = splitPlaceName(selectedDestination.name).title;
      return `${from} → ${to}`;
    }
    if (selectedSource) {
      return `${splitPlaceName(selectedSource.name).title} → Choose destination`;
    }
    return "Where are you meeting?";
  })();

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 cursor-default bg-background/65 backdrop-blur-[2px]"
          onClick={closePanel}
          aria-label="Close route search"
        />
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center px-4 pt-4 sm:pt-6">
        <div className="pointer-events-auto w-full max-w-[520px]">
          {!isOpen ? (
          <button
            type="button"
            onClick={openPanel}
            className="flex w-full items-center gap-3 rounded-modal border border-border bg-surface px-5 py-4 text-left shadow-panel transition-colors duration-200 hover:border-primary/40"
            aria-label="Open route search"
            aria-expanded={false}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-input bg-card text-primary"
              aria-hidden
            >
              <SearchIcon />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium text-text-secondary">
                Plan your route
              </span>
              <span className="mt-0.5 block truncate text-base font-normal text-text-primary">
                {triggerLabel}
              </span>
            </span>
            <span className="shrink-0 text-text-secondary" aria-hidden>
              <ChevronDownIcon />
            </span>
          </button>
        ) : (
            <div
              ref={cardRef}
              className="relative overflow-visible rounded-modal border border-border bg-surface shadow-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Route search"
              aria-expanded={true}
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h2 className="text-lg font-bold text-text-primary">
                    Plan your route
                  </h2>
                  <p className="mt-0.5 text-sm text-text-secondary">
                    Pick a start point and destination
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closePanel}
                  className="flex h-9 w-9 items-center justify-center rounded-input text-text-secondary transition-colors duration-200 hover:bg-card hover:text-text-primary"
                  aria-label="Close"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="space-y-3 px-6 py-5">
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
                      ref={sourceInputRef}
                      id="source-input"
                      placeholder="Search starting location"
                      className="w-full rounded-input border border-border bg-card py-3.5 pl-10 pr-4 text-base font-normal text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                      value={sourceQuery}
                      onChange={handleSourceChange}
                      onFocus={() => setActiveField("source")}
                      autoComplete="off"
                      disabled={loading}
                    />
                    {activeField === "source" && (
                      <SuggestionsList
                        suggestions={sourceSuggestions}
                        onSelect={handleSourceSelect}
                      />
                    )}
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
                      ref={destinationInputRef}
                      id="destination-input"
                      placeholder="Search destination"
                      className="w-full rounded-input border border-border bg-card py-3.5 pl-10 pr-4 text-base font-normal text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                      value={destinationQuery}
                      onChange={handleDestinationChange}
                      onFocus={() => setActiveField("destination")}
                      autoComplete="off"
                      disabled={loading}
                    />
                    {activeField === "destination" && (
                      <SuggestionsList
                        suggestions={destinationSuggestions}
                        onSelect={handleDestinationSelect}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-4">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs font-medium text-text-secondary"
                    htmlFor="profile-select"
                  >
                    Travel mode
                  </label>
                  <select
                    id="profile-select"
                    className="min-w-[140px] cursor-pointer rounded-button border border-border bg-card px-4 py-2.5 text-sm font-normal text-text-primary transition-colors duration-200 hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                    value={profile}
                    onChange={(e) =>
                      setProfile(e.target.value as RouteProfile)
                    }
                    disabled={loading}
                  >
                    <option value="driving">Driving</option>
                    <option value="walking">Walking</option>
                    <option value="cycling">Cycling</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="rounded-button bg-primary px-8 py-3 text-sm font-medium text-text-primary transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                >
                  {loading ? "Finding route…" : "Show route"}
                </button>
              </div>

              {error && (
                <div className="border-t border-border px-6 pb-5">
                  <p
                    className="rounded-input border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
                    role="alert"
                  >
                    {error}
                  </p>
                </div>
              )}
            </div>
        )}
        </div>
      </div>
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default SearchPanel;
