import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MenuItem {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
}

export default function DriverProfilePage() {
  const driver = {
    name: '张师傅',
    phone: '138****8888',
    avatar: null,
    rating: 4.9,
    completedOrders: 128,
    balance: 1250.50,
    vehicle: '京A12345',
    vehicleType: '厢式货车',
  };

  const menuItems: MenuItem[] = [
    {
      id: '1',
      icon: 'wallet',
      title: '我的钱包',
      subtitle: `余额: ¥${driver.balance}`,
      onPress: () => console.log('我的钱包'),
    },
    {
      id: '2',
      icon: 'star',
      title: '我的评价',
      subtitle: `评分: ${driver.rating}`,
      onPress: () => console.log('我的评价'),
    },
    {
      id: '3',
      icon: 'document-text',
      title: '车辆信息',
      subtitle: `${driver.vehicleType} ${driver.vehicle}`,
      onPress: () => console.log('车辆信息'),
    },
    {
      id: '4',
      icon: 'location',
      title: '常用地点',
      onPress: () => console.log('常用地点'),
    },
    {
      id: '5',
      icon: 'help-circle',
      title: '帮助中心',
      onPress: () => console.log('帮助中心'),
    },
    {
      id: '6',
      icon: 'settings',
      title: '设置',
      onPress: () => console.log('设置'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* 司机信息 */}
      <View style={styles.driverInfoContainer}>
        {driver.avatar ? (
          <Image source={{ uri: driver.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{driver.name.charAt(0)}</Text>
          </View>
        )}
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <Text style={styles.driverPhone}>{driver.phone}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{driver.rating}</Text>
            <Text style={styles.orderText}>{driver.completedOrders} 单</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* 统计信息 */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{driver.balance}</Text>
          <Text style={styles.statLabel}>余额</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{driver.rating}</Text>
          <Text style={styles.statLabel}>评分</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{driver.completedOrders}</Text>
          <Text style={styles.statLabel}>完成订单</Text>
        </View>
      </View>

      {/* 菜单列表 */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.onPress}>
            <View style={styles.menuIconContainer}>
              <Ionicons name={item.icon as any} size={24} color="#666" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              {item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      {/* 退出登录 */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>退出登录</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  driverInfo: {
    flex: 1,
    marginLeft: 16,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  driverPhone: {
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
    color: '#333',
    marginLeft: 4,
    marginRight: 12,
  },
  orderText: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 12,
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
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '500',
  },
});