import { Stack } from "expo-router";
import { Slot } from "expo-router"; 
import { useFonts } from "expo-font";

// Import your global CSS file
import "/Users/leo/Developer/React_Native/my-002-app/global.css";

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf")
  })

  return (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>
  )
}

export default RootLayout
