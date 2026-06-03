import MapView from "./components/MapView.tsx";
import SearchPanel from "./components/SearchPanel.tsx";
import type { CurrentLocation } from "./services/geolocationService.ts";
import { getCurrentLocation } from "./services/geolocationService.ts";
import { useState, useEffect } from "react";

function App() {
  //creating state
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocation | null>(null);

  //useEffect for handeling side effects after render
  useEffect(() => {
    async function fetchLocation() {
      try {
        const location = await getCurrentLocation();
        setCurrentLocation(location);
      } catch (error) {
        console.error("Failed to get current location:", error);
      }
    }

    fetchLocation();
  }, []); //[] run once when component mounts

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="ax-w-7xl mx-auto w-full">
        {/*Input Section*/}
        <SearchPanel />
      </div>

      <div className="w-full h-[600px] rounded-2xl overflow-hidden mt-20">
        <MapView currentLocation={currentLocation} />
      </div>
    </div>
  );
}

export default App;
