import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function Settings() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      '退出登录',
      '确定要退出登录吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          style: 'destructive',
          onPress: () => {
            setUser(null);
            router.replace('/auth/login' as any);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleAbout = () => {
    Alert.alert('关于', '快狗打车司机端 v1.0.0\n\n为司机提供便捷的接单和管理功能');
  };

  const handlePrivacy = () => {
    Alert.alert('隐私政策', '我们重视您的隐私，所有数据都会被严格保护');
  };

  const handleTerms = () => {
    Alert.alert('用户协议', '使用本应用即表示您同意我们的用户协议');
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* 头部 */}
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">设置</Text>
        <View className="w-10" />
      </View>

      {/* 设置选项 */}
      <View className="mt-4">
        <Text className="text-sm text-gray-400 px-4 mb-2">通知设置</Text>
        <View className="flex-row items-center justify-between bg-white px-4 py-3.5 border-b border-gray-100">
          <Text className="text-base text-gray-800">推送通知</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View className="mt-4">
        <Text className="text-sm text-gray-400 px-4 mb-2">隐私设置</Text>
        <View className="flex-row items-center justify-between bg-white px-4 py-3.5 border-b border-gray-100">
          <Text className="text-base text-gray-800">位置服务</Text>
          <Switch
            value={location}
            onValueChange={setLocation}
            trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
            thumbColor="#FFFFFF"
          />
        </View>
        <TouchableOpacity className="flex-row items-center justify-between bg-white px-4 py-3.5 border-b border-gray-100" onPress={() => router.push('/settings/privacy' as any)}>
          <Text className="text-base text-gray-800">隐私设置详情</Text>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Text className="text-sm text-gray-400 px-4 mb-2">支付设置</Text>
        <TouchableOpacity className="flex-row items-center justify-between bg-white px-4 py-3.5 border-b border-gray-100" onPress={() => router.push('/settings/payment' as any)}>
          <Text className="text-base text-gray-800">默认支付方式</Text>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Text className="text-sm text-gray-400 px-4 mb-2">外观设置</Text>
        <View className="flex-row items-center justify-between bg-white px-4 py-3.5 border-b border-gray-100">
          <Text className="text-base text-gray-800">深色模式</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View className="mt-4">
        <Text className="text-sm text-gray-400 px-4 mb-2">账户设置</Text>
        <TouchableOpacity className="flex-row items-center justify-between bg-white px-4 py-3.5 border-b border-gray-100" onPress={handlePrivacy}>
          <Text className="text-base text-gray-800">隐私政策</Text>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-between bg-white px-4 py-3.5 border-b border-gray-100" onPress={handleTerms}>
          <Text className="text-base text-gray-800">用户协议</Text>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-between bg-white px-4 py-3.5 border-b border-gray-100" onPress={handleAbout}>
          <Text className="text-base text-gray-800">关于我们</Text>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-between bg-white px-4 py-3.5" onPress={() => router.push('/settings/faq')}>
          <Text className="text-base text-gray-800">常见问题</Text>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
      </View>

      {/* 退出登录按钮 */}
      <TouchableOpacity className="mt-8 mx-4 bg-white py-3.5 rounded-lg items-center border border-red-500" onPress={handleLogout}>
        <Text className="text-base text-red-500 font-bold">退出登录</Text>
      </TouchableOpacity>
    </View>
  );
}
