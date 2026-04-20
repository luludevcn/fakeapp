import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

// 自定义主题
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#4CAF50",
    secondary: "#2196F3",
    accent: "#FF6B00",
    error: "#F44336",
    warning: "#FFC107",
    info: "#00BCD4",
    success: "#4CAF50",
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="user/_layout" options={{ headerShown: false }} />
        <Stack.Screen name="driver/_layout" options={{ headerShown: false }} />
        <Stack.Screen name="admin/_layout" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
