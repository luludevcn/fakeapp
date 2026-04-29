import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function IncomeReport() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const incomeData = {
    day: {
      total: 328.85,
      orders: 2,
      average: 164.43,
      trend: '+15%',
    },
    week: {
      total: 1560.20,
      orders: 8,
      average: 195.03,
      trend: '+8%',
    },
    month: {
      total: 5800.00,
      orders: 32,
      average: 181.25,
      trend: '+12%',
    },
    year: {
      total: 68000.00,
      orders: 380,
      average: 178.95,
      trend: '+20%',
    },
  };

  const periods = [
    { id: 'day', label: '今日' },
    { id: 'week', label: '本周' },
    { id: 'month', label: '本月' },
    { id: 'year', label: '本年' },
  ];

  const currentData = incomeData[selectedPeriod as keyof typeof incomeData];

  return (
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">收入报表</Text>
        <View className="w-10" />
      </View>

      {/* 时间选择器 */}
      <View className="flex-row bg-white py-3 px-4 border-b border-gray-200">
        {periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            className={`flex-1 py-2 items-center ${selectedPeriod === period.id ? 'border-b-2 border-orange-500' : ''}`}
            onPress={() => setSelectedPeriod(period.id)}
          >
            <Text className={`text-sm ${selectedPeriod === period.id ? 'text-orange-500 font-bold' : 'text-gray-600'}`}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 收入概览 */}
      <View className="bg-white mx-4 mt-4 rounded-lg p-5 shadow">
        <Text className="text-sm text-gray-600 mb-3">收入概览</Text>
        <Text className="text-3xl font-bold text-gray-800 mb-5">¥{currentData.total.toFixed(2)}</Text>
        <View className="flex-row justify-between">
          <View className="flex-1 items-center">
            <Text className="text-xs text-gray-400 mb-1">订单数</Text>
            <Text className="text-base font-bold text-gray-800">{currentData.orders}单</Text>
          </View>
          <View className="w-px h-10 bg-gray-200" />
          <View className="flex-1 items-center">
            <Text className="text-xs text-gray-400 mb-1">平均收入</Text>
            <Text className="text-base font-bold text-gray-800">¥{currentData.average.toFixed(2)}</Text>
          </View>
          <View className="w-px h-10 bg-gray-200" />
          <View className="flex-1 items-center">
            <Text className="text-xs text-gray-400 mb-1">同比增长</Text>
            <Text className={`text-base font-bold ${currentData.trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
              {currentData.trend}
            </Text>
          </View>
        </View>
      </View>

      {/* 收入趋势图 */}
      <View className="bg-white mx-4 mt-4 rounded-lg p-5">
        <Text className="text-base font-bold text-gray-800 mb-4">收入趋势</Text>
        <View className="h-[200px] justify-center items-center bg-gray-50 rounded-lg">
          <Ionicons name="bar-chart" size={80} color="#CCCCCC" />
          <Text className="text-sm text-gray-400 mt-2">收入趋势图表</Text>
        </View>
      </View>

      {/* 订单类型分析 */}
      <View className="bg-white mx-4 mt-4 mb-4 rounded-lg p-5">
        <Text className="text-base font-bold text-gray-800 mb-4">订单类型分析</Text>
        <View className="flex-row items-center mb-3">
          <Text className="w-20 text-sm text-gray-600">实时订单</Text>
          <View className="flex-1 h-2 bg-gray-100 rounded-full mx-3">
            <View className="h-full bg-orange-500 rounded-full" style={{ width: '70%' }} />
          </View>
          <Text className="w-10 text-sm text-gray-800 text-right">70%</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="w-20 text-sm text-gray-600">预约订单</Text>
          <View className="flex-1 h-2 bg-gray-100 rounded-full mx-3">
            <View className="h-full bg-orange-500 rounded-full" style={{ width: '30%' }} />
          </View>
          <Text className="w-10 text-sm text-gray-800 text-right">30%</Text>
        </View>
      </View>
    </ScrollView>
  );
}
