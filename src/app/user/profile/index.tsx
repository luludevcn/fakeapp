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

export default function ProfilePage() {
  const user = {
    name: '张三',
    phone: '138****8888',
    avatar: null,
    balance: 150.50,
    points: 280,
  };

  const menuItems: MenuItem[] = [
    {
      id: '1',
      icon: 'wallet',
      title: '我的钱包',
      subtitle: `余额: ¥${user.balance}`,
      onPress: () => console.log('我的钱包'),
    },
    {
      id: '2',
      icon: 'star',
      title: '我的积分',
      subtitle: `${user.points} 积分`,
      onPress: () => console.log('我的积分'),
    },
    {
      id: '3',
      icon: 'card',
      title: '优惠券',
      subtitle: '3 张可用',
      onPress: () => console.log('优惠券'),
    },
    {
      id: '4',
      icon: 'location',
      title: '常用地址',
      onPress: () => console.log('常用地址'),
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
      {/* 用户信息 */}
      <View style={styles.userInfoContainer}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
        )}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#FF6B00" />
        </TouchableOpacity>
      </View>

      {/* 统计信息 */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.balance}</Text>
          <Text style={styles.statLabel}>余额</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.points}</Text>
          <Text style={styles.statLabel}>积分</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>优惠券</Text>
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
  userInfoContainer: {
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
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userPhone: {
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
    color: '#FF6B00',
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