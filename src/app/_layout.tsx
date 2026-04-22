import { useAppStore } from "@/store/useAppStore";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export default function RootLayout() {
  const { user } = useAppStore();

  useEffect(() => {
    // 这里可以添加身份验证逻辑
    // 如果用户未登录，可以重定向到登录页面
    // if (!user) {
    //   router.replace('/auth/login');
    // }
  }, [user]);

  return (<>
    <StatusBar style={"dark"} />
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/verify" options={{ headerShown: false }} />
      <Stack.Screen name="vehicle/index" options={{ headerShown: false }} />
      <Stack.Screen name="vehicle/add" options={{ headerShown: false }} />
      <Stack.Screen name="wallet/index" options={{ headerShown: false }} />
      <Stack.Screen name="wallet/history" options={{ headerShown: false }} />
      <Stack.Screen name="wallet/withdraw" options={{ headerShown: false }} />
      <Stack.Screen name="wallet/report" options={{ headerShown: false }} />
      <Stack.Screen name="order/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="order/rate" options={{ headerShown: false }} />
      <Stack.Screen name="navigation/index" options={{ headerShown: false }} />
      <Stack.Screen name="customer-service/index" options={{ headerShown: false }} />
      <Stack.Screen name="messages/index" options={{ headerShown: false }} />
      <Stack.Screen name="settings/index" options={{ headerShown: false }} />
      <Stack.Screen name="settings/faq" options={{ headerShown: false }} />
    </Stack>
  </>
  )
}
