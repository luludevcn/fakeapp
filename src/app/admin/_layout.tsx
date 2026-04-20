import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="dashboard" 
        options={{ 
          headerTitle: '后台管理',
        }} 
      />
      <Stack.Screen 
        name="users" 
        options={{ 
          headerTitle: '用户管理',
        }} 
      />
      <Stack.Screen 
        name="drivers" 
        options={{ 
          headerTitle: '司机管理',
        }} 
      />
      <Stack.Screen 
        name="orders" 
        options={{ 
          headerTitle: '订单管理',
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          headerTitle: '系统设置',
        }} 
      />
    </Stack>
  );
}