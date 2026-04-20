import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function DriverLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'driver/home') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'driver/order') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'driver/profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'driver/settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'car';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          headerTitle: '司机工作台',
          title: '工作台'
        }} 
      />
      <Tabs.Screen 
        name="order" 
        options={{ 
          headerTitle: '订单管理',
          title: '订单'
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          headerTitle: '个人中心',
          title: '我的'
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{ 
          headerTitle: '设置',
          title: '设置'
        }} 
      />
    </Tabs>
  );
}