import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function OrderRate() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders, rateOrder } = useAppStore();
  const [order, setOrder] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const foundOrder = orders.find(o => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      Alert.alert('错误', '订单不存在');
      router.back();
    }
  }, [id, orders]);

  const handleSubmit = () => {
    if (!order) return;

    setLoading(true);
    try {
      rateOrder(order.id, rating, comment);
      setTimeout(() => {
        setLoading(false);
        Alert.alert('成功', '评价提交成功');
        router.back();
      }, 1000);
    } catch (error) {
      setLoading(false);
      Alert.alert('错误', '评价提交失败，请重试');
    }
  };

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-base text-gray-600">加载中...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      {/* 头部 */}
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">评价订单</Text>
        <View className="w-10" />
      </View>

      {/* 订单信息 */}
      <View className="bg-white p-4 mb-4">
        <Text className="text-sm text-gray-600 mb-2">订单号：#{order.id}</Text>
        <Text className="text-base text-gray-800">{order.from} → {order.to}</Text>
      </View>

      {/* 评分 */}
      <View className="bg-white p-4 mb-4">
        <Text className="text-base font-bold text-gray-800 mb-4">服务评分</Text>
        <View className="flex-row justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              className="p-2"
              onPress={() => setRating(star)}
            >
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={40}
                color={star <= rating ? '#FFD700' : '#CCCCCC'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text className="text-base text-gray-800 text-center">
          {rating === 5 && '非常满意'}
          {rating === 4 && '满意'}
          {rating === 3 && '一般'}
          {rating === 2 && '不满意'}
          {rating === 1 && '非常不满意'}
        </Text>
      </View>

      {/* 评价内容 */}
      <View className="bg-white p-4 mb-4">
        <Text className="text-base font-bold text-gray-800 mb-3">评价内容</Text>
        <TextInput
          className="border border-gray-200 rounded-lg p-3 text-sm text-gray-800 min-h-[100px]"
          placeholder="请输入您的评价..."
          placeholderTextColor="#999999"
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
        />
      </View>

      {/* 快速评价标签 */}
      <View className="bg-white p-4 mb-4">
        <Text className="text-base font-bold text-gray-800 mb-3">快速评价</Text>
        <View className="flex-row flex-wrap">
          {['服务态度好', '驾驶技术佳', '准时到达', '货物完好', '路线规划合理'].map((tag) => (
            <TouchableOpacity
              key={tag}
              className="bg-gray-100 py-2 px-4 rounded-full mr-2 mb-2"
              onPress={() => setComment(comment ? `${comment} ${tag}` : tag)}
            >
              <Text className="text-sm text-gray-600">{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 提交按钮 */}
      <TouchableOpacity
        className={`py-4 rounded-lg items-center mx-4 mb-8 ${loading ? 'bg-gray-400' : 'bg-orange-500'}`}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text className="text-white text-base font-bold">{loading ? '提交中...' : '提交评价'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
