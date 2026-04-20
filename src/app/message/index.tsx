import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// 模拟消息数据
const mockMessages = [
  {
    id: '1',
    title: '订单状态更新',
    content: '您的订单 #12345 已被司机接单',
    time: '10:30',
    unread: true,
  },
  {
    id: '2',
    title: '活动通知',
    content: '新用户专享优惠，首单立减20元',
    time: '09:15',
    unread: true,
  },
  {
    id: '3',
    title: '系统通知',
    content: '您的账户已完成实名认证',
    time: '昨天',
    unread: false,
  },
  {
    id: '4',
    title: '订单状态更新',
    content: '您的订单 #12344 已完成',
    time: '昨天',
    unread: false,
  },
];

const MessageScreen = () => {
  const [messages, setMessages] = useState(mockMessages);

  const renderMessageItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={styles.messageItem}>
        <View style={styles.messageIcon}>
          <Ionicons 
            name={item.title.includes('订单') ? 'list' : item.title.includes('活动') ? 'gift' : 'information-circle'} 
            size={24} 
            color="#FF6B00" 
          />
          {item.unread && <View style={styles.unreadBadge} />}
        </View>
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text style={[styles.messageTitle, item.unread && styles.unreadTitle]}>{item.title}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
          <Text style={styles.messageText} numberOfLines={2}>{item.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>消息中心</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    flexGrow: 1,
  },
  messageItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  messageIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B00',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default MessageScreen;