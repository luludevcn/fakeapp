import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import useLocation from '../../../hooks/useLocation';
import useSocket from '../../../hooks/useSocket';
import { Order } from '../../../store/orderStore';

export default function DriverHomePage() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [newOrder, setNewOrder] = useState<Order | null>(null);
  const location = useLocation();
  const { on, sendDriverLocation, acceptOrder } = useSocket('driver123', 'driver');

  useEffect(() => {
    const unsubscribe = on('order:created', (order: Order) => {
      setNewOrder(order);
    });

    return unsubscribe;
  }, [on]);

  useEffect(() => {
    const unsubscribe = on('order:updated', (order: Order) => {
      if (order.driverId === 'driver123') {
        setCurrentOrder(order);
      }
    });

    return unsubscribe;
  }, [on]);

  // 发送司机位置
  useEffect(() => {
    if (isOnline && !location.loading && !location.error) {
      const interval = setInterval(() => {
        sendDriverLocation('driver123', location.latitude, location.longitude);
      }, 5000); // 每 5 秒发送一次位置

      return () => clearInterval(interval);
    }
  }, [isOnline, location.latitude, location.longitude, location.loading, location.error, sendDriverLocation]);

  const handleAcceptOrder = () => {
    // 接受订单
    if (newOrder) {
      acceptOrder(newOrder.id, 'driver123');
      setNewOrder(null);
      router.push('/driver/order' as any);
    }
  };

  const handleStartTrip = () => {
    // 开始行程
  };

  const handleCompleteOrder = () => {
    // 完成订单
  };

  return (
    <ScrollView style={styles.container}>
      {/* 在线状态 */}
      <View style={styles.statusContainer}>
        <View style={styles.statusInfo}>
          <Text style={styles.statusTitle}>在线状态</Text>
          <Text style={[styles.statusText, isOnline ? styles.onlineText : styles.offlineText]}>
            {isOnline ? '在线' : '离线'}
          </Text>
        </View>
        <Switch
          value={isOnline}
          onValueChange={setIsOnline}
          trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
          thumbColor={isOnline ? '#fff' : '#f4f3f4'}
        />
      </View>

      {/* 当前订单 */}
      {currentOrder ? (
        <View style={styles.orderContainer}>
          <Text style={styles.orderTitle}>当前订单</Text>
          <View style={styles.orderInfo}>
            <View style={styles.orderLocation}>
              <Ionicons name="location" size={20} color="#4CAF50" />
              <Text style={styles.locationText}>北京市朝阳区建国路88号</Text>
            </View>
            <Ionicons name="arrow-down" size={20} color="#999" style={styles.arrowIcon} />
            <View style={styles.orderLocation}>
              <Ionicons name="location" size={20} color="#F44336" />
              <Text style={styles.locationText}>北京市海淀区中关村大街1号</Text>
            </View>
          </View>
          <View style={styles.orderActions}>
            <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
              <Text style={styles.secondaryButtonText}>取消订单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]} onPress={handleStartTrip}>
              <Text style={styles.primaryButtonText}>开始行程</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : newOrder ? (
        // 新订单通知
        <View style={styles.newOrderContainer}>
          <Text style={styles.newOrderTitle}>新订单</Text>
          <View style={styles.newOrderInfo}>
            <View style={styles.newOrderLocation}>
              <Ionicons name="location" size={20} color="#4CAF50" />
              <Text style={styles.locationText}>{newOrder.pickup}</Text>
            </View>
            <Ionicons name="arrow-down" size={20} color="#999" style={styles.arrowIcon} />
            <View style={styles.newOrderLocation}>
              <Ionicons name="location" size={20} color="#F44336" />
              <Text style={styles.locationText}>{newOrder.dropoff}</Text>
            </View>
            <Text style={styles.orderPrice}>¥{newOrder.price}</Text>
          </View>
          <View style={styles.newOrderActions}>
            <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={() => setNewOrder(null)}>
              <Text style={styles.secondaryButtonText}>拒绝</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]} onPress={handleAcceptOrder}>
              <Text style={styles.primaryButtonText}>接受</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // 无订单提示
        <View style={styles.noOrderContainer}>
          <Ionicons name="clipboard-outline" size={64} color="#999" />
          <Text style={styles.noOrderText}>暂无新订单</Text>
          <Text style={styles.noOrderSubtext}>保持在线，等待订单</Text>
        </View>
      )}

      {/* 统计信息 */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>今日统计</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>完成订单</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>¥215</Text>
            <Text style={styles.statLabel}>总收入</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>平均评分</Text>
          </View>
        </View>
      </View>

      {/* 功能按钮 */}
      <View style={styles.featuresContainer}>
        <TouchableOpacity style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: '#E3F2FD' }]}>
            <Ionicons name="wallet" size={24} color="#2196F3" />
          </View>
          <Text style={styles.featureText}>我的钱包</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: '#E8F5E8' }]}>
            <Ionicons name="star" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.featureText}>我的评价</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: '#FFF3CD' }]}>
            <Ionicons name="help-circle" size={24} color="#FFC107" />
          </View>
          <Text style={styles.featureText}>帮助中心</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: '#F3E5F5' }]}>
            <Ionicons name="settings" size={24} color="#9C27B0" />
          </View>
          <Text style={styles.featureText}>设置</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineText: {
    color: '#4CAF50',
  },
  offlineText: {
    color: '#999',
  },
  orderContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  orderInfo: {
    marginBottom: 16,
  },
  orderLocation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  arrowIcon: {
    alignSelf: 'center',
    marginVertical: 4,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  newOrderContainer: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  newOrderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 12,
  },
  newOrderInfo: {
    marginBottom: 16,
  },
  newOrderLocation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginTop: 8,
  },
  newOrderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  featureItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#333',
  },
  noOrderContainer: {
    backgroundColor: '#fff',
    padding: 40,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noOrderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  noOrderSubtext: {
    fontSize: 14,
    color: '#999',
  },
});