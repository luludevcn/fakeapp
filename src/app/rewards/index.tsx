import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Reward {
  id: string;
  title: string;
  description: string;
  amount: number;
  type: 'cash' | 'coupon' | 'points';
  status: 'completed' | 'pending' | 'expired';
  startDate: string;
  endDate: string;
  progress: number;
  target: number;
  icon: string;
}

export default function Rewards() {
  const router = useRouter();
  const { user } = useAppStore();

  // 模拟奖励列表
  const rewards: Reward[] = [
    {
      id: '1',
      title: '新人奖励',
      description: '完成新手任务即可获得',
      amount: 200,
      type: 'cash',
      status: 'completed',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      progress: 5,
      target: 5,
      icon: '🎁'
    },
    {
      id: '2',
      title: '冲单奖',
      description: '本月完成 30 单可获得现金奖励',
      amount: 500,
      type: 'cash',
      status: 'pending',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      progress: 18,
      target: 30,
      icon: '💰'
    },
    {
      id: '3',
      title: '好评奖',
      description: '获得 10 个五星好评',
      amount: 100,
      type: 'cash',
      status: 'pending',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      progress: 6,
      target: 10,
      icon: '⭐'
    },
    {
      id: '4',
      title: '早晚高峰奖',
      description: '高峰时段完成订单额外奖励',
      amount: 50,
      type: 'cash',
      status: 'pending',
      startDate: '2024-01-15',
      endDate: '2024-01-21',
      progress: 3,
      target: 10,
      icon: '⏰'
    },
    {
      id: '5',
      title: '优惠券包',
      description: '完成指定任务获得优惠券',
      amount: 100,
      type: 'coupon',
      status: 'expired',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      progress: 0,
      target: 5,
      icon: '🎫'
    }
  ];

  const getRewardStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'expired':
        return '#9E9E9E';
      default:
        return '#666666';
    }
  };

  const getRewardStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'pending':
        return '进行中';
      case 'expired':
        return '已过期';
      default:
        return '';
    }
  };

  const getTotalRewards = () => {
    const completed = rewards.filter(r => r.status === 'completed');
    return completed.reduce((sum, r) => sum + r.amount, 0);
  };

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>奖励中心</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 统计卡片 */}
        <View style={styles.statsCard}>
          <View style={styles.statsContent}>
            <Text style={styles.statsLabel}>累计获得奖励</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>¥</Text>
              <Text style={styles.totalAmount}>{getTotalRewards()}</Text>
            </View>
            <Text style={styles.statsTip}>已完成 {rewards.filter(r => r.status === 'completed').length} 个任务</Text>
          </View>
          <Image
            source={{ uri: 'https://picsum.photos/200/200' }}
            style={styles.statsImage}
          />
        </View>

        {/* 奖励分类 */}
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryItem}>
            <Ionicons name="cash-outline" size={24} color="#FF6B00" />
            <Text style={[styles.categoryText, styles.categoryTextActive]}>现金奖励</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}>
            <Ionicons name="ticket-outline" size={24} color="#666666" />
            <Text style={styles.categoryText}>优惠券</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}>
            <Ionicons name="star-outline" size={24} color="#666666" />
            <Text style={styles.categoryText}>积分</Text>
          </TouchableOpacity>
        </View>

        {/* 奖励列表 */}
        <View style={styles.rewardsList}>
          {rewards.map((reward) => (
            <TouchableOpacity key={reward.id} style={styles.rewardCard}>
              <View style={styles.rewardHeader}>
                <View style={styles.rewardIcon}>
                  <Text style={styles.rewardEmoji}>{reward.icon}</Text>
                </View>
                <View style={styles.rewardInfo}>
                  <Text style={styles.rewardTitle}>{reward.title}</Text>
                  <Text style={styles.rewardDescription}>{reward.description}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getRewardStatusColor(reward.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getRewardStatusColor(reward.status) }]}>
                    {getRewardStatusText(reward.status)}
                  </Text>
                </View>
              </View>

              <View style={styles.rewardProgress}>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressText}>{reward.progress}/{reward.target}</Text>
                  <Text style={styles.progressLabel}>进度</Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(reward.progress / reward.target) * 100}%`,
                        backgroundColor: getRewardStatusColor(reward.status)
                      }
                    ]}
                  />
                </View>
              </View>

              <View style={styles.rewardFooter}>
                <View style={styles.rewardAmount}>
                  <Text style={styles.amountLabel}>奖励金额</Text>
                  <Text style={styles.amountValue}>¥{reward.amount}</Text>
                </View>
                <View style={styles.rewardTime}>
                  <Text style={styles.timeLabel}>有效期至</Text>
                  <Text style={styles.timeValue}>{reward.endDate}</Text>
                </View>
                {reward.status === 'completed' && (
                  <TouchableOpacity style={styles.withdrawButton}>
                    <Text style={styles.withdrawButtonText}>提现</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  content: {
    flex: 1,
  },
  statsCard: {
    margin: 16,
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsContent: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  currencySymbol: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 8,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statsTip: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  statsImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginLeft: 16,
  },
  categories: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  categoryTextActive: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  rewardsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  rewardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rewardEmoji: {
    fontSize: 24,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 12,
    color: '#999999',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  rewardProgress: {
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  progressLabel: {
    fontSize: 12,
    color: '#999999',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  rewardAmount: {
    flexDirection: 'column',
  },
  amountLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
  },
  rewardTime: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 12,
    color: '#666666',
  },
  withdrawButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 12,
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});