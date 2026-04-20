import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  unread: boolean;
  type: 'system' | 'driver' | 'order';
}

export default function MessagePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: '系统',
      content: '您的账户已成功充值 100 元',
      timestamp: '2026-04-19 10:30',
      unread: true,
      type: 'system',
    },
    {
      id: '2',
      sender: '张师傅',
      content: '您好，我正在赶来的路上，预计 10 分钟后到达',
      timestamp: '2026-04-19 09:45',
      unread: true,
      type: 'driver',
    },
    {
      id: '3',
      sender: '系统',
      content: '您的订单 #20260418987654 已完成',
      timestamp: '2026-04-18 16:00',
      unread: false,
      type: 'order',
    },
    {
      id: '4',
      sender: '李师傅',
      content: '您好，请问您的货物有多重？',
      timestamp: '2026-04-18 15:00',
      unread: false,
      type: 'driver',
    },
  ]);

  const getSenderIcon = (type: string) => {
    switch (type) {
      case 'system':
        return 'notifications';
      case 'driver':
        return 'person';
      case 'order':
        return 'document-text';
      default:
        return 'chatbubble';
    }
  };

  const getSenderColor = (type: string) => {
    switch (type) {
      case 'system':
        return '#2196F3';
      case 'driver':
        return '#4CAF50';
      case 'order':
        return '#FF6B00';
      default:
        return '#999';
    }
  };

  const renderMessageItem = ({ item }: { item: Message }) => (
    <TouchableOpacity style={styles.messageItem}>
      <View style={[styles.messageIcon, { backgroundColor: getSenderColor(item.type) + '20' }]}>
        <Ionicons name={getSenderIcon(item.type) as any} size={24} color={getSenderColor(item.type)} />
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageSender}>{item.sender}</Text>
          <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
        </View>
        <Text style={[styles.messageText, item.unread && styles.unreadMessage]} numberOfLines={2}>
          {item.content}
        </Text>
      </View>
      {item.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
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
  listContent: {
    paddingVertical: 8,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 1,
  },
  messageIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  messageSender: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  unreadMessage: {
    fontWeight: '500',
    color: '#333',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B00',
    marginLeft: 12,
  },
});