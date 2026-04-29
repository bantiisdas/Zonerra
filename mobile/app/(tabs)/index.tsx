// import { View, Text } from "react-native";
// import MapViewComponent from "@/components/MapViewComponent";

// export default function MapScreen() {
//   return (
//     <View className="flex-1 bg-background">
//       <MapViewComponent />

//       <View className="run-button">
//         <Text className="run-button-text">Start Run</Text>
//       </View>
//     </View>
//   );
// }

import { View, Text, TouchableOpacity } from "react-native";
import MapViewComponent from "@/components/MapViewComponent";
import { useRunTracker } from "@/hooks/useRunTracker";

export default function MapScreen() {
  const { isRunning, path, distance, startRun, stopRun } = useRunTracker();

  return (
    <View className="flex-1 bg-background">
      <MapViewComponent path={path} />

      {/* Stats */}
      <View className="stats-container">
        <Text className="stat-text">{(distance / 1000).toFixed(2)} km</Text>
      </View>

      {/* Run Button */}
      <TouchableOpacity
        className="run-button"
        onPress={isRunning ? stopRun : startRun}
      >
        <Text className="run-button-text">
          {isRunning ? "Stop Run" : "Start Run"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
