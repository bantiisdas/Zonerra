import { Stack } from "expo-router";
import "@/global.css";
import { StatusBar, View } from "react-native";

export default function RootLayout() {
  return (
    <>
      {/* <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack> */}

      <View className="flex-1 bg-background">
        {/* <StatusBar style="light" /> */}
        <StatusBar hidden />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0B0F14" }, // match theme
          }}
        >
          <Stack.Screen name="(tabs)" />
          {/* <Stack.Screen name="(modals)/battle" options={{ presentation: "modal" }} /> */}
        </Stack>
      </View>
    </>
  );
}
