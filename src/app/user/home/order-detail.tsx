import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function OrderDetailPage() {
  const [orderStatus, setOrderStatus] = useState('pending'); // pending, accepted, enroute, completed

  const order = {
    id: '20260419123456',
    driver: {
      name: '张师傅',
      phone: '138****8888',
      rating: 4.9,
      vehicle: '京A12345',
      vehicleType: '厢式货车',
    },
    pickup: '北京市朝阳区建国路88号',
    dropoff: '北京市海淀区中关村大街1号',
    distance: '15.5 公里',
    estimatedTime: '约 30 分钟',
    price: 85,
    createdAt: '2026-04-19 10:00',
  };

  const handleCancelOrder = () => {
    // 取消订单
    setOrderStatus('cancelled');
  };

  const handleContactDriver = () => {
    // 联系司机
  };

  return (
    <ScrollView style={styles.container}>
      {/* 订单状态 */}
      <View style={[styles.statusContainer, { backgroundColor: orderStatus === 'pending' ? '#FFF3CD' : orderStatus === 'accepted' ? '#E3F2FD' : orderStatus === 'enroute' ? '#E8F5E8' : '#F3E5F5' }]}>
        <Ionicons 
          name={orderStatus === 'pending' ? 'time-outline' : orderStatus === 'accepted' ? 'checkmark-circle-outline' : orderStatus === 'enroute' ? 'car-outline' : 'checkmark-done-outline'} 
          size={24} 
          color={orderStatus === 'pending' ? '#FFC107' : orderStatus === 'accepted' ? '#2196F3' : orderStatus === 'enroute' ? '#4CAF50' : '#9C27B0'} 
        />
        <Text style={[styles.statusText, { color: orderStatus === 'pending' ? '#FFC107' : orderStatus === 'accepted' ? '#2196F3' : orderStatus === 'enroute' ? '#4CAF50' : '#9C27B0' }]}>
          {orderStatus === 'pending' ? '等待司机接单' : orderStatus === 'accepted' ? '司机已接单' : orderStatus === 'enroute' ? '司机正在赶来' : '订单已完成'}
        </Text>
      </View>

      {/* 订单信息 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>订单信息</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>订单编号</Text>
          <Text style={styles.infoValue}>{order.id}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>下单时间</Text>
          <Text style={styles.infoValue}>{order.createdAt}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>服务类型</Text>
          <Text style={styles.infoValue}>货运</Text>
        </View>
      </View>

      {/* 路线信息 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>路线信息</Text>
        <View style={styles.locationItem}>
          <View style={[styles.locationDot, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.locationText}>{order.pickup}</Text>
        </View>
        <View style={styles.locationLine} />
        <View style={styles.locationItem}>
          <View style={[styles.locationDot, { backgroundColor: '#F44336' }]} />
          <Text style={styles.locationText}>{order.dropoff}</Text>
        </View>
        <View style={styles.routeInfo}>
          <Text style={styles.routeText}>{order.distance}</Text>
          <Text style={styles.routeText}>{order.estimatedTime}</Text>
        </View>
      </View>

      {/* 司机信息 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>司机信息</Text>
        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Text style={styles.avatarText}>{order.driver.name.charAt(0)}</Text>
          </View>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{order.driver.name}</Text>
            <Text style={styles.driverVehicle}>{order.driver.vehicleType} {order.driver.vehicle}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{order.driver.rating}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.contactButton} onPress={handleContactDriver}>
            <Ionicons name="call" size={20} color="#FF6B00" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 价格信息 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>价格信息</Text>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>基础费用</Text>
          <Text style={styles.priceValue}>¥30</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>里程费用</Text>
          <Text style={styles.priceValue}>¥55</Text>
        </View>
        <View style={[styles.priceItem, styles.totalPriceItem]}>
          <Text style={styles.totalPriceLabel}>总计</Text>
          <Text style={styles.totalPriceValue}>¥{order.price}</Text>
        </View>
      </View>

      {/* 底部操作栏 */}
      <View style={styles.bottomBar}>
        {orderStatus === 'pending' && (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
            <Text style={styles.cancelButtonText}>取消订单</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.primaryButton, orderStatus === 'completed' && styles.disabledButton]}>
          <Text style={styles.primaryButtonText}>
            {orderStatus === 'completed' ? '已完成' : '确认支付'}
          </Text>
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
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
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
    height: 20,
    backgroundColor: '#e0e0e0',
    marginLeft: 5,
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  routeText: {
    fontSize: 14,
    color: '#666',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  driverVehicle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  contactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
  },
  totalPriceItem: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPriceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6B00',
    alignItems: 'center',
    marginRight: 12,
  },
  cancelButtonText: {
    color: '#FF6B00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButton: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FF6B00',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});