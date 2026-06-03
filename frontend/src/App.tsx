import { useState } from "react";
import DetailsPanel from "./components/DetailsPanel.tsx";
import MapView from "./components/MapView.tsx";
import SearchPanel from "./components/SearchPanel.tsx";
import type { Place, RouteMeta } from "./types/location";

function App() {
  const [source, setSource] = useState<Place | null>(null);
  const [destination, setDestination] = useState<Place | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<
    [number, number][] | null
  >(null);
  const [routeMeta, setRouteMeta] = useState<RouteMeta | null>(null);

  const handleRouteReady = (
    sourcePlace: Place,
    destinationPlace: Place,
    coordinates: [number, number][],
    meta: RouteMeta,
  ) => {
    setSource(sourcePlace);
    setDestination(destinationPlace);
    setRouteCoordinates(coordinates);
    setRouteMeta(meta);
  };

  const handleRouteClear = () => {
    setRouteCoordinates(null);
    setRouteMeta(null);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0">
        <MapView
          source={source}
          destination={destination}
          routeCoordinates={routeCoordinates}
        />
      </div>

      <aside className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex max-h-[50vh] flex-col md:inset-x-auto md:bottom-auto md:left-6 md:top-6 md:max-h-none md:w-full md:max-w-[400px]">
        <div className="pointer-events-auto flex min-h-0 flex-col overflow-hidden rounded-t-modal border border-border bg-surface shadow-panel md:rounded-card">
          <div className="hidden border-b border-border px-6 py-4 md:block">
            <h1 className="text-xl font-bold tracking-tight">MapToMeet</h1>
            <p className="mt-1 text-sm font-normal text-text-secondary">
              Location intelligence for meetups
            </p>
          </div>
          <div className="min-h-0 overflow-y-auto p-4 md:p-6">
            <SearchPanel
              onRouteReady={handleRouteReady}
              onRouteClear={handleRouteClear}
            />
          </div>
        </div>
      </aside>

      {routeMeta && source && destination && (
        <DetailsPanel
          source={source}
          destination={destination}
          routeMeta={routeMeta}
        />
      )}
    </div>
  );
}

export default App;
