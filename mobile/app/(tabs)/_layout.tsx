import { Tabs } from "expo-router";
import { View } from "react-native";
import { Map, Play, Grid3X3, User } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#121821",
          borderTopColor: "#1F2937",
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#00E5A8",
        tabBarInactiveTintColor: "#9AA4B2",
      }}
    >
      {/* 🗺️ Map */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <Map color={color} size={24} />,
        }}
      />

      {/* ▶️ Run */}
      <Tabs.Screen
        name="run"
        options={{
          title: "Run",
          tabBarIcon: ({ color }) => <Play color={color} size={24} />,
        }}
      />

      {/* 🎁 Zones */}
      <Tabs.Screen
        name="zones"
        options={{
          title: "Zones",
          tabBarIcon: ({ color }) => <Grid3X3 color={color} size={24} />,
        }}
      />

      {/* 👤 Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
