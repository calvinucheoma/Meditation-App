import TimerProvider from "@/context/TimerContext";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

// This prevents the splash screen from auto hiding until all the font assets are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  if (!fontsLoaded && !error) return null;

  return (
    <TimerProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="meditate/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modal)/adjust-meditation-duration"
          options={{
            headerShown: false,
            presentation:
              Platform.OS === "android" ? "fullScreenModal" : "modal",
          }}
        />
      </Stack>
    </TimerProvider>
    // <Slot />
    // This component acts the same as the 'children' prop in react web applications
  );
}
