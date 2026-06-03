export type Place = {
  name: string;
  latitude: number;
  longitude: number;
};

export type RouteProfile = "driving" | "walking" | "cycling";

export type RouteMeta = {
  distance: number;
  duration: number;
};

export type OsrmRouteResponse = {
  code: string;
  message?: string;
  routes?: Array<{
    distance: number;
    duration: number;
    geometry: {
      type: "LineString";
      coordinates: [number, number][];
    };
  }>;
};
