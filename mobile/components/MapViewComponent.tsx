// import React, { useEffect, useRef, useState } from "react";
// import MapView, { Region } from "react-native-maps";
// import { StyleSheet, View, Text } from "react-native";
// import * as Location from "expo-location";

// export default function MapViewComponent() {
//   const mapRef = useRef<MapView | null>(null);

//   const [region, setRegion] = useState<Region | null>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

//   useEffect(() => {
//     async function startTracking() {
//       const { status } = await Location.requestForegroundPermissionsAsync();

//       if (status !== "granted") {
//         setErrorMsg("Permission denied");
//         return;
//       }

//       const sub = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           distanceInterval: 5,
//         },
//         (loc) => {
//           const newRegion: Region = {
//             latitude: loc.coords.latitude,
//             longitude: loc.coords.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           };

//           setRegion(newRegion);

//           mapRef.current?.animateToRegion(newRegion);
//         },
//       );

//       subscriptionRef.current = sub;
//     }

//     startTracking();

//     // 🔥 CLEANUP (VERY IMPORTANT)
//     return () => {
//       subscriptionRef.current?.remove();
//     };
//   }, []);

//   if (errorMsg) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: "red" }}>{errorMsg}</Text>
//       </View>
//     );
//   }

//   if (!region) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: "white" }}>Getting location...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         showsUserLocation
//         initialRegion={region}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { width: "100%", height: "100%" },
//   center: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#0B0F14",
//   },
// });

import React, { useEffect, useRef, useState } from "react";
import MapView, { Polyline, Region } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";

type Props = {
  path: { latitude: number; longitude: number }[];
};

export default function MAPView({ path }: Props) {
  const mapRef = useRef<MapView | null>(null);
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    async function init() {
      const loc = await Location.getCurrentPositionAsync({});

      const newRegion = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(newRegion);
    }

    init();
  }, []);

  if (!region) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "white" }}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        initialRegion={region}
      >
        {/* 🔥 PATH */}
        <Polyline coordinates={path} strokeWidth={4} strokeColor="#00E5A8" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B0F14",
  },
});
