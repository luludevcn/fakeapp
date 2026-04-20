import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminDashboardPage() {
  const stats = [
    {
      title: '总用户数',
      value: '12,580',
      icon: 'people',
      color: '#2196F3',
    },
    {
      title: '总司机数',
      value: '3,240',
      icon: 'car',
      color: '#4CAF50',
    },
    {
      title: '今日订单',
      value: '1,280',
      icon: 'document-text',
      color: '#FF6B00',
    },
    {
      title: '总交易额',
      value: '¥128,500',
      icon: 'cash',
      color: '#9C27B0',
    },
  ];

  const recentOrders = [
    {
      id: '20260419123456',
      customer: '张三',
      driver: '张师傅',
      status: 'completed',
      price: 85,
      time: '2026-04-19 10:00',
    },
    {
      id: '20260419123457',
      customer: '李四',
      driver: '李师傅',
      status: 'enroute',
      price: 68,
      time: '2026-04-19 09:30',
    },
    {
      id: '20260419123458',
      customer: '王五',
      driver: '王师傅',
      status: 'pending',
      price: 55,
      time: '2026-04-19 09:15',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FFC107';
      case 'accepted':
        return '#2196F3';
      case 'enroute':
        return '#4CAF50';
      case 'completed':
        return '#9C27B0';
      case 'cancelled':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待接单';
      case 'accepted':
        return '已接单';
      case 'enroute':
        return '运输中';
      case 'completed':
        return '已完成';
      case 'cancelled':
        return '已取消';
      default:
        return '未知状态';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 统计卡片 */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <TouchableOpacity key={index} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <Ionicons name={stat.icon as any} size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 最近订单 */}
      <View style={styles.ordersContainer}>
        <Text style={styles.sectionTitle}>最近订单</Text>
        {recentOrders.map((order, index) => (
          <View key={index} style={styles.orderItem}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderId}>订单号: {order.id}</Text>
              <Text style={[styles.orderStatus, { color: getStatusColor(order.status) }]}>
                {getStatusText(order.status)}
              </Text>
            </View>
            <View style={styles.orderDetails}>
              <Text style={styles.orderCustomer}>客户: {order.customer}</Text>
              <Text style={styles.orderDriver}>司机: {order.driver}</Text>
              <Text style={styles.orderTime}>时间: {order.time}</Text>
            </View>
            <Text style={styles.orderPrice}>¥{order.price}</Text>
          </View>
        ))}
      </View>

      {/* 系统状态 */}
      <View style={styles.statusContainer}>
        <Text style={styles.sectionTitle}>系统状态</Text>
        <View style={styles.statusItem}>
          <Ionicons name="server" size={20} color="#4CAF50" />
          <Text style={styles.statusText}>服务器运行正常</Text>
        </View>
        <View style={styles.statusItem}>
          <Ionicons name="layers" size={20} color="#4CAF50" />
          <Text style={styles.statusText}>数据库连接正常</Text>
        </View>
        <View style={styles.statusItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.statusText}>云服务正常</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginRight: '4%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
  },
  ordersContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 14,
    color: '#666',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  orderDetails: {
    marginBottom: 8,
  },
  orderCustomer: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  orderDriver: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  orderTime: {
    fontSize: 12,
    color: '#999',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
});