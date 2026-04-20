import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF6B00",
        tabBarInactiveTintColor: "#8E8E93",
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerTintColor: "#000000",
        tabBarStyle: { 
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E5E5EA",
          paddingBottom: 5,
          paddingTop: 5
        },
        tabBarLabelStyle: {
          fontSize: 12
        }
      }}
    >
      <Tabs.Screen name="home" options={{
        title: '首页', tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color}></Ionicons>
        )
      }} />
      <Tabs.Screen name="order" options={{
        title: '接单', tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'car' : 'car-outline'} size={24} color={color}></Ionicons>
        )
      }} />
      <Tabs.Screen name="message" options={{
        title: '消息', tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'chatbubble' : 'chatbubble-outline'} size={24} color={color}></Ionicons>
        )
      }} />
      <Tabs.Screen name="profile" options={{
        title: '我的', tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color}></Ionicons>
        )
      }} />
    </Tabs>
  )
}
