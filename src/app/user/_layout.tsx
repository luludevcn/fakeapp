import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function UserLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'user/home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'user/order') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'user/message') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'user/profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'home';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          headerTitle: '快狗打车',
          title: '首页'
        }} 
      />
      <Tabs.Screen 
        name="order" 
        options={{ 
          headerTitle: '我的订单',
          title: '订单'
        }} 
      />
      <Tabs.Screen 
        name="message" 
        options={{ 
          headerTitle: '消息',
          title: '消息'
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          headerTitle: '我的',
          title: '我的'
        }} 
      />
    </Tabs>
  );
}