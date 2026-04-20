import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 用户信息 */}
        <View style={styles.userContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>用户</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>快狗用户</Text>
            <Text style={styles.userPhone}>138****8888</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* 功能菜单 */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="wallet" size={20} color="#FF6B00" />
            </View>
            <Text style={styles.menuText}>我的钱包</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="card" size={20} color="#2196F3" />
            </View>
            <Text style={styles.menuText}>我的优惠券</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#E8F5E8' }]}>
              <Ionicons name="star" size={20} color="#4CAF50" />
            </View>
            <Text style={styles.menuText}>我的评价</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="help-circle" size={20} color="#9C27B0" />
            </View>
            <Text style={styles.menuText}>帮助中心</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* 设置 */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#F5F5F5' }]}>
              <Ionicons name="settings" size={20} color="#666" />
            </View>
            <Text style={styles.menuText}>设置</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#F5F5F5' }]}>
              <Ionicons name="information-circle" size={20} color="#666" />
            </View>
            <Text style={styles.menuText}>关于我们</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* 退出登录 */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
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
  menuContainer: {
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6B00',
    fontWeight: '500',
  },
});

export default ProfileScreen;