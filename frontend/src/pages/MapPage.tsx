import { useState } from "react";
import DetailsPanel from "../components/DetailsPanel.tsx";
import MapView from "../components/MapView.tsx";
import SearchPanel from "../components/SearchPanel.tsx";
import type { Place, RouteMeta } from "../types/location";

function MapPage() {
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

      <SearchPanel
        onRouteReady={handleRouteReady}
        onRouteClear={handleRouteClear}
      />

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

export default MapPage;
