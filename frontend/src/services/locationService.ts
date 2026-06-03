import axios from "axios";
import type { OsrmRouteResponse, Place, RouteProfile } from "../types/location";

const API_BASE = "http://127.0.0.1:8000/locations";

export async function searchLocations(query: string): Promise<Place[]> {
  if (!query.trim()) {
    return [];
  }

  const response = await axios.get<Place[]>(`${API_BASE}/search`, {
    params: { q: query },
  });

  return response.data;
}

export async function getRoute(
  source: Pick<Place, "latitude" | "longitude">,
  destination: Pick<Place, "latitude" | "longitude">,
  profile: RouteProfile = "driving",
): Promise<OsrmRouteResponse> {
  const response = await axios.post<OsrmRouteResponse>(`${API_BASE}/route`, {
    source: {
      latitude: source.latitude,
      longitude: source.longitude,
    },
    destination: {
      latitude: destination.latitude,
      longitude: destination.longitude,
    },
    profile,
  });

  return response.data;
}
