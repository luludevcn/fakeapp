import { useAppStore } from "@/store/useAppStore";
import { initPushNotification } from "@/utils/notification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpoGaodeMapModule from "expo-gaode-map";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const { user } = useAppStore();

  useEffect(() => {
    const checkPrivacyAgreement = async () => {
      try {
        // 检查用户是否已经同意隐私协议
        const privacyAgreed = await AsyncStorage.getItem('privacy_agreed');
        if (!privacyAgreed) {
          // 如果未同意，导航到隐私协议页面
          router.replace('/auth/privacy');
        } else {
          // 如果已同意，初始化高德地图隐私配置
          const privacyStatus = ExpoGaodeMapModule.getPrivacyStatus();
          if (!privacyStatus.isReady) {
            ExpoGaodeMapModule.setPrivacyConfig({
              hasShow: true,
              hasContainsPrivacy: true,
              hasAgree: true,
              privacyVersion: '2026-04-23'
            });
          }

          // 初始化推送通知
          await initPushNotification();

          // 如果未登录，导航到登录页面
          if (!user) {
            router.replace('/auth/login');
          }
        }
      } catch (error) {
        console.error('检查隐私协议状态失败:', error);
        // 发生错误时，默认导航到隐私协议页面
        router.replace('/auth/privacy');
      }
    };

    checkPrivacyAgreement();
  }, [user]);

  return (<>
    <SafeAreaProvider>
      <StatusBar style={"dark"} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth/privacy" options={{ headerShown: false }} />
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
        <Stack.Screen name="order/complaint" options={{ headerShown: false }} />
        <Stack.Screen name="navigation/index" options={{ headerShown: false }} />
        <Stack.Screen name="customer-service/index" options={{ headerShown: false }} />
        <Stack.Screen name="messages/index" options={{ headerShown: false }} />
        <Stack.Screen name="settings/index" options={{ headerShown: false }} />
        <Stack.Screen name="settings/faq" options={{ headerShown: false }} />
        <Stack.Screen name="settings/payment" options={{ headerShown: false }} />
        <Stack.Screen name="settings/privacy" options={{ headerShown: false }} />
        <Stack.Screen name="bidding/index" options={{ headerShown: false }} />
        <Stack.Screen name="rewards/index" options={{ headerShown: false }} />
        <Stack.Screen name="ordercode/index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  </>
  )
}
