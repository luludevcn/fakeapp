import { useRouter } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Messages() {
  const router = useRouter();
  const { messages, markMessageAsRead, deleteMessage } = useAppStore();
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  const handleMessagePress = (messageId: string) => {
    if (isSelectMode) {
      // 选择模式：切换选择状态
      setSelectedMessages(prev => 
        prev.includes(messageId) 
          ? prev.filter(id => id !== messageId) 
          : [...prev, messageId]
      );
    } else {
      // 普通模式：标记为已读并查看详情
      markMessageAsRead(messageId);
      // 这里可以跳转到消息详情页面，暂时用Alert模拟
      Alert.alert('消息详情', messages.find(m => m.id === messageId)?.content || '');
    }
  };

  const handleLongPress = (messageId: string) => {
    setSelectedMessages([messageId]);
    setIsSelectMode(true);
  };

  const handleDeleteSelected = () => {
    Alert.alert(
      '删除消息',
      `确定要删除选中的 ${selectedMessages.length} 条消息吗？`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: () => {
            selectedMessages.forEach(id => deleteMessage(id));
            setSelectedMessages([]);
            setIsSelectMode(false);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleMarkAllAsRead = () => {
    messages.forEach(message => {
      if (!message.read) {
        markMessageAsRead(message.id);
      }
    });
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isSelected = selectedMessages.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.messageItem, isSelected && styles.selectedMessage]}
        onPress={() => handleMessagePress(item.id)}
        onLongPress={() => handleLongPress(item.id)}
      >
        {isSelectMode && (
          <View style={styles.checkboxContainer}>
            <Ionicons
              name={isSelected ? 'checkbox' : 'square-outline'}
              size={20}
              color={isSelected ? '#4CAF50' : '#999999'}
            />
          </View>
        )}
        <View style={[styles.messageIndicator, !item.read && styles.unreadIndicator]} />
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text style={[styles.messageTitle, !item.read && styles.unreadTitle]}>
              {item.title}
            </Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
          <Text style={[styles.messageText, !item.read && styles.unreadText]}>
            {item.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {isSelectMode ? `已选择 ${selectedMessages.length} 条` : '消息中心'}
        </Text>
        {isSelectMode ? (
          <TouchableOpacity onPress={handleDeleteSelected} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>删除</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleMarkAllAsRead} style={styles.moreButton}>
            <Text style={styles.moreButtonText}>全部已读</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 消息列表 */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="mail-outline" size={64} color="#CCCCCC" />
            <Text style={styles.emptyText}>暂无消息</Text>
          </View>
        }
      />
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
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#F44336',
  },
  messagesList: {
    flexGrow: 1,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  selectedMessage: {
    backgroundColor: '#F0F8FF',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  messageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
    marginRight: 12,
  },
  unreadIndicator: {
    backgroundColor: '#FF6B00',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  messageTitle: {
    fontSize: 16,
    color: '#333333',
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  messageTime: {
    fontSize: 12,
    color: '#999999',
  },
  messageText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  unreadText: {
    color: '#333333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    marginTop: 16,
  },
});