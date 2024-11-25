import { Stack } from "expo-router";
import { Slot } from "expo-router"; 
import { useFonts } from "expo-font";
import { useEffect } from "react";

import GlobalProvider from '../context/GlobalProvider'

// Import your global CSS file
import "/Users/leo/Developer/React_Native/my-002-app/global.css";

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf")
  })

  return (
  <GlobalProvider>
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
  </Stack>
  </GlobalProvider>
  )
}

export default RootLayout
