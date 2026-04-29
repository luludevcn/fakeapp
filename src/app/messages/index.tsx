import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';

type MessageCategory = 'all' | 'order' | 'system' | 'activity';

export default function Messages() {
  const router = useRouter();
  const { messages, markMessageAsRead, deleteMessage } = useAppStore();
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory>('all');

  const categories: { key: MessageCategory; label: string; icon: string }[] = [
    { key: 'all', label: '全部', icon: 'list' },
    { key: 'order', label: '订单', icon: 'car' },
    { key: 'system', label: '系统', icon: 'settings' },
    { key: 'activity', label: '活动', icon: 'gift' },
  ];

  const filteredMessages = useMemo(() => {
    if (selectedCategory === 'all') {
      return messages;
    }
    return messages.filter(msg => {
      switch (selectedCategory) {
        case 'order':
          return msg.type === 'order' || msg.type === 'dispatch';
        case 'system':
          return msg.type === 'system';
        case 'activity':
          return msg.type === 'activity' || msg.type === 'promotion';
        default:
          return true;
      }
    });
  }, [messages, selectedCategory]);

  const handleMessagePress = (messageId: string) => {
    if (isSelectMode) {
      setSelectedMessages(prev => 
        prev.includes(messageId) 
          ? prev.filter(id => id !== messageId) 
          : [...prev, messageId]
      );
    } else {
      markMessageAsRead(messageId);
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
        className={`flex-row items-center bg-white px-4 py-4 border-b border-gray-100 ${isSelected ? 'bg-blue-50' : ''}`}
        onPress={() => handleMessagePress(item.id)}
        onLongPress={() => handleLongPress(item.id)}
      >
        {isSelectMode && (
          <View className="mr-3">
            <Ionicons
              name={isSelected ? 'checkbox' : 'square-outline'}
              size={20}
              color={isSelected ? '#4CAF50' : '#999999'}
            />
          </View>
        )}
        <View className={`w-2 h-2 rounded-full mr-3 ${!item.read ? 'bg-orange-500' : 'bg-transparent'}`} />
        <View className="flex-1">
          <View className="flex-row justify-between mb-1">
            <Text className={`text-base ${!item.read ? 'text-gray-800 font-bold' : 'text-gray-800'}`}>
              {item.title}
            </Text>
            <Text className="text-xs text-gray-400">{item.time}</Text>
          </View>
          <Text className={`text-sm ${!item.read ? 'text-gray-800' : 'text-gray-600'} leading-relaxed`}>
            {item.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* 头部 */}
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">
          {isSelectMode ? `已选择 ${selectedMessages.length} 条` : '消息中心'}
        </Text>
        {isSelectMode ? (
          <TouchableOpacity className="p-2" onPress={handleDeleteSelected}>
            <Text className="text-sm text-red-500">删除</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="p-2" onPress={handleMarkAllAsRead}>
            <Text className="text-sm text-green-500">全部已读</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 消息列表 */}
      <FlatList
        data={filteredMessages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center pt-24">
            <Ionicons name="mail-outline" size={64} color="#CCCCCC" />
            <Text className="text-base text-gray-400 mt-4">暂无消息</Text>
          </View>
        }
      />
    </View>
  );
}
