import { useRef, useState } from "react";
import * as Location from "expo-location";

type Coord = {
  latitude: number;
  longitude: number;
};

export function useRunTracker() {
  const [isRunning, setIsRunning] = useState(false);
  const [path, setPath] = useState<Coord[]>([]);
  const [distance, setDistance] = useState(0);

  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const visitedTiles = useRef<Set<string>>(new Set());

  const TILE_SIZE = 0.001;

  function getTileId(lat: number, lng: number) {
    const x = Math.floor(lat / TILE_SIZE);
    const y = Math.floor(lng / TILE_SIZE);
    return `${x}_${y}`;
  }

  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3;
    const toRad = (x: number) => (x * Math.PI) / 180;

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  function handleLocation(coords: Location.LocationObjectCoords) {
    const point = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };

    setPath((prev) => {
      const last = prev[prev.length - 1];

      if (last) {
        const d = getDistance(
          last.latitude,
          last.longitude,
          point.latitude,
          point.longitude,
        );

        // ignore GPS noise
        if (d < 3) return prev;

        setDistance((prevDist) => prevDist + d);
      }

      return [...prev, point];
    });

    // 🔥 TILE CAPTURE
    const tileId = getTileId(point.latitude, point.longitude);

    if (!visitedTiles.current.has(tileId)) {
      visitedTiles.current.add(tileId);
      console.log("Captured tile:", tileId);
    }
  }

  async function startRun() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied");
      return;
    }

    setIsRunning(true);
    setPath([]);
    setDistance(0);
    visitedTiles.current.clear();

    const sub = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 5,
      },
      (loc) => {
        handleLocation(loc.coords);
      },
    );

    subscriptionRef.current = sub;
  }

  function stopRun() {
    subscriptionRef.current?.remove();
    setIsRunning(false);
  }

  return {
    isRunning,
    path,
    distance,
    startRun,
    stopRun,
  };
}
