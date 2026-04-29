import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  time: string;
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 328.85,
    description: '订单收入',
    time: '10:30',
    date: '2026-04-21',
  },
  {
    id: '2',
    type: 'expense',
    amount: 50,
    description: '提现',
    time: '09:15',
    date: '2026-04-21',
  },
  {
    id: '3',
    type: 'income',
    amount: 74.40,
    description: '订单收入',
    time: '18:45',
    date: '2026-04-20',
  },
  {
    id: '4',
    type: 'income',
    amount: 150.00,
    description: '奖励金',
    time: '14:20',
    date: '2026-04-20',
  },
  {
    id: '5',
    type: 'expense',
    amount: 100,
    description: '提现',
    time: '11:00',
    date: '2026-04-19',
  },
];

export default function WalletHistory() {
  const router = useRouter();
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [selectedDate, setSelectedDate] = useState('全部');

  const dates = ['全部', '2026-04-21', '2026-04-20', '2026-04-19'];

  const filteredTransactions = selectedDate === '全部' 
    ? transactions 
    : transactions.filter(t => t.date === selectedDate);

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">钱包明细</Text>
        <View className="w-10" />
      </View>

      {/* 日期筛选 */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        className="bg-white py-3 px-4 border-b border-gray-200"
      >
        {dates.map((date) => (
          <TouchableOpacity
            key={date}
            className={`px-4 py-2 mr-3 rounded-full ${selectedDate === date ? 'bg-orange-500' : 'bg-gray-100'}`}
            onPress={() => setSelectedDate(date)}
          >
            <Text className={`text-sm ${selectedDate === date ? 'text-white font-bold' : 'text-gray-600'}`}>
              {date === '全部' ? '全部' : date.replace('-', '/').substring(5)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 交易列表 */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between bg-white px-4 py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className={`w-10 h-10 rounded-full justify-center items-center mr-3 ${item.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}>
                <Ionicons 
                  name={item.type === 'income' ? 'arrow-down' : 'arrow-up'} 
                  size={20} 
                  color="#FFFFFF" 
                />
              </View>
              <View>
                <Text className="text-base text-gray-800 mb-1">{item.description}</Text>
                <Text className="text-sm text-gray-400">{item.time} {item.date}</Text>
              </View>
            </View>
            <Text className={`text-base font-bold ${item.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
              {item.type === 'income' ? '+' : '-'}{item.amount.toFixed(2)}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="document-text-outline" size={64} color="#CCCCCC" />
            <Text className="text-base text-gray-400 mt-4">暂无交易记录</Text>
          </View>
        }
      />
    </View>
  );
}
