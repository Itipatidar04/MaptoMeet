import { useEffect, useMemo, useRef } from "react";
import Map, { Layer, Marker, Source, type MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Place } from "../types/location";

type MapViewProps = {
  source: Place | null;
  destination: Place | null;
  routeCoordinates: [number, number][] | null;
};

const DEFAULT_VIEW = {
  longitude: 75.8577,
  latitude: 22.7196,
  zoom: 11,
};

function MapView({ source, destination, routeCoordinates }: MapViewProps) {
  const mapRef = useRef<MapRef | null>(null);

  const routeGeoJson = useMemo(() => {
    if (!routeCoordinates?.length) {
      return null;
    }

    return {
      type: "Feature" as const,
      properties: {},
      geometry: {
        type: "LineString" as const,
        coordinates: routeCoordinates,
      },
    };
  }, [routeCoordinates]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) {
      return;
    }

    if (routeCoordinates && routeCoordinates.length > 1) {
      const lons = routeCoordinates.map(([lon]) => lon);
      const lats = routeCoordinates.map(([, lat]) => lat);

      map.fitBounds(
        [
          [Math.min(...lons), Math.min(...lats)],
          [Math.max(...lons), Math.max(...lats)],
        ],
        { padding: 80, duration: 250 },
      );
      return;
    }

    if (source && destination) {
      map.fitBounds(
        [
          [source.longitude, source.latitude],
          [destination.longitude, destination.latitude],
        ],
        { padding: 100, duration: 200 },
      );
    }
  }, [routeCoordinates, source, destination]);

  const handleZoomIn = () => {
    mapRef.current?.getMap().zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.getMap().zoomOut();
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute right-5 top-5 z-10 flex flex-col gap-2">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-button border border-border bg-card text-xl font-bold text-text-primary shadow-panel transition-opacity duration-200 hover:opacity-90"
          onClick={handleZoomIn}
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-button border border-border bg-card text-xl font-bold text-text-primary shadow-panel transition-opacity duration-200 hover:opacity-90"
          onClick={handleZoomOut}
          aria-label="Zoom out"
        >
          −
        </button>
      </div>

      <Map
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        initialViewState={DEFAULT_VIEW}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        {source && (
          <Marker
            longitude={source.longitude}
            latitude={source.latitude}
            anchor="center"
          >
            <div
              className="h-[18px] w-[18px] rounded-full border-[3px] border-white bg-success shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
              title="Source"
            />
          </Marker>
        )}

        {destination && (
          <Marker
            longitude={destination.longitude}
            latitude={destination.latitude}
            anchor="center"
          >
            <div
              className="h-[18px] w-[18px] rounded-full border-[3px] border-white bg-danger shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
              title="Destination"
            />
          </Marker>
        )}

        {routeGeoJson && (
          <Source id="route" type="geojson" data={routeGeoJson}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                "line-color": "#3b82f6",
                "line-width": 5,
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
}

export default MapView;
