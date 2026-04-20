import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Order {
  id: string;
  status: 'pending' | 'accepted' | 'enroute' | 'completed' | 'cancelled';
  pickup: string;
  dropoff: string;
  price: number;
  createdAt: string;
  customerName: string;
}

export default function DriverOrderPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '20260419123456',
      status: 'enroute',
      pickup: '北京市朝阳区建国路88号',
      dropoff: '北京市海淀区中关村大街1号',
      price: 85,
      createdAt: '2026-04-19 10:00',
      customerName: '张三',
    },
    {
      id: '20260418987654',
      status: 'completed',
      pickup: '北京市海淀区中关村大街1号',
      dropoff: '北京市朝阳区建国路88号',
      price: 78,
      createdAt: '2026-04-18 15:30',
      customerName: '李四',
    },
    {
      id: '20260417654321',
      status: 'completed',
      pickup: '北京市朝阳区三里屯',
      dropoff: '北京市海淀区五道口',
      price: 68,
      createdAt: '2026-04-17 09:15',
      customerName: '王五',
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');

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

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return order.status === 'pending';
    if (activeTab === 'ongoing') return order.status === 'accepted' || order.status === 'enroute';
    if (activeTab === 'completed') return order.status === 'completed';
    if (activeTab === 'cancelled') return order.status === 'cancelled';
    return true;
  });

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity style={styles.orderItem}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>订单号: {item.id}</Text>
        <Text style={[styles.orderStatus, { color: getStatusColor(item.status) }]}>
          {getStatusText(item.status)}
        </Text>
      </View>
      <View style={styles.orderContent}>
        <View style={styles.customerInfo}>
          <Ionicons name="person" size={16} color="#666" />
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <View style={styles.locationItem}>
          <View style={[styles.locationDot, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.locationText}>{item.pickup}</Text>
        </View>
        <View style={styles.locationLine} />
        <View style={styles.locationItem}>
          <View style={[styles.locationDot, { backgroundColor: '#F44336' }]} />
          <Text style={styles.locationText}>{item.dropoff}</Text>
        </View>
      </View>
      <View style={styles.orderFooter}>
        <Text style={styles.orderTime}>{item.createdAt}</Text>
        <Text style={styles.orderPrice}>¥{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 标签栏 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]} 
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>全部</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'pending' && styles.activeTab]} 
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>待接单</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]} 
          onPress={() => setActiveTab('ongoing')}
        >
          <Text style={[styles.tabText, activeTab === 'ongoing' && styles.activeTabText]}>进行中</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]} 
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>已完成</Text>
        </TouchableOpacity>
      </View>

      {/* 订单列表 */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 14,
    color: '#666',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  orderContent: {
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerName: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
    marginRight: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  locationLine: {
    width: 2,
    height: 16,
    backgroundColor: '#e0e0e0',
    marginLeft: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  orderTime: {
    fontSize: 12,
    color: '#999',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});