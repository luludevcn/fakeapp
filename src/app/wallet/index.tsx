import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Wallet() {
  const router = useRouter();
  const walletData = {
    balance: 10384.80,
    todayIncome: 328.85,
    thisWeekIncome: 1560.20,
    thisMonthIncome: 5800.00,
  };

  const menuItems = [
    { id: '1', name: '钱包明细', icon: 'list', onPress: () => router.push('/wallet/history') },
    { id: '2', name: '提现', icon: 'cash', onPress: () => router.push('/wallet/withdraw') },
    { id: '3', name: '收入报表', icon: 'bar-chart', onPress: () => router.push('/wallet/report') },
    { id: '4', name: '发票管理', icon: 'document-text', onPress: () => console.log('发票管理') },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">我的钱包</Text>
        <View className="w-10" />
      </View>

      {/* 余额卡片 */}
      <View className="bg-orange-500 mx-4 mt-4 rounded-xl p-5 shadow-lg">
        <Text className="text-white text-sm opacity-80 mb-2">可用余额</Text>
        <Text className="text-white text-3xl font-bold mb-5">¥{walletData.balance.toFixed(2)}</Text>
        <View className="flex-row justify-between">
          <View className="flex-1 items-center">
            <Text className="text-white text-xs opacity-80 mb-1">今日收入</Text>
            <Text className="text-white text-base font-bold">¥{walletData.todayIncome.toFixed(2)}</Text>
          </View>
          <View className="w-px h-10 bg-white/30" />
          <View className="flex-1 items-center">
            <Text className="text-white text-xs opacity-80 mb-1">本周收入</Text>
            <Text className="text-white text-base font-bold">¥{walletData.thisWeekIncome.toFixed(2)}</Text>
          </View>
          <View className="w-px h-10 bg-white/30" />
          <View className="flex-1 items-center">
            <Text className="text-white text-xs opacity-80 mb-1">本月收入</Text>
            <Text className="text-white text-base font-bold">¥{walletData.thisMonthIncome.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* 功能菜单 */}
      <View className="bg-white mx-4 mt-4 rounded-lg overflow-hidden">
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100" onPress={item.onPress}>
            <View className="flex-row items-center">
              <Ionicons name={item.icon as any} size={24} color="#666666" />
              <Text className="text-base text-gray-800 ml-3">{item.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
