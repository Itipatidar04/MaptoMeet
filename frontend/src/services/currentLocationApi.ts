//to render current location on map
import type { CurrentLocation } from "./geolocationService";

export async function sendCurrentLocation(location: CurrentLocation) {
  await fetch("http://127.0.0.1:8000/current_location/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(location),
  });
}
//so in this i'm stuck here to syncronize my phone gps coordinates
//with my laptop. as it is a complex task and will require qr generation for user to
//grant permission for location access.
//so i'm leaving this thing here. and will resolve this after getting a domain.
