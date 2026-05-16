import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

function MapView() {
  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: 75.8577,
        latitude: 22.7196,
        zoom: 11,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
    />
  );
}

export default MapView;
