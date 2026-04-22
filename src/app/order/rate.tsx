import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function OrderRate() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders, rateOrder } = useAppStore();
  const [order, setOrder] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 查找订单
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
      // 提交评价
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
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>评价订单</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 订单信息 */}
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>订单号：#{order.id}</Text>
        <Text style={styles.orderRoute}>{order.from} → {order.to}</Text>
      </View>

      {/* 评分 */}
      <View style={styles.ratingSection}>
        <Text style={styles.ratingTitle}>服务评分</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={styles.starButton}
            >
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={40}
                color={star <= rating ? '#FFD700' : '#CCCCCC'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.ratingText}>
          {rating === 5 && '非常满意'}
          {rating === 4 && '满意'}
          {rating === 3 && '一般'}
          {rating === 2 && '不满意'}
          {rating === 1 && '非常不满意'}
        </Text>
      </View>

      {/* 评价内容 */}
      <View style={styles.commentSection}>
        <Text style={styles.commentTitle}>评价内容</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="请输入您的评价..."
          placeholderTextColor="#999999"
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
        />
      </View>

      {/* 快速评价标签 */}
      <View style={styles.tagsSection}>
        <Text style={styles.tagsTitle}>快速评价</Text>
        <View style={styles.tagsContainer}>
          {['服务态度好', '驾驶技术佳', '准时到达', '货物完好', '路线规划合理'].map((tag) => (
            <TouchableOpacity
              key={tag}
              style={styles.tag}
              onPress={() => setComment(comment ? `${comment} ${tag}` : tag)}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 提交按钮 */}
      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>{loading ? '提交中...' : '提交评价'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  placeholder: {
    width: 40,
  },
  orderInfo: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
  },
  orderId: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  orderRoute: {
    fontSize: 16,
    color: '#333333',
  },
  ratingSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  starButton: {
    padding: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  commentSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333333',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  tagsSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
  },
  tagsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#666666',
  },
  submitButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 32,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});