import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Message() {
  // 模拟消息数据
  const messages = [
    {
      id: '1',
      title: '系统通知',
      content: '您的账户已完成实名认证，现在可以开始接单了',
      time: '10:30',
      unread: true,
      type: 'system'
    },
    {
      id: '2',
      title: '订单消息',
      content: '您的订单 #12345 已被客户确认完成',
      time: '09:15',
      unread: false,
      type: 'order'
    },
    {
      id: '3',
      title: '活动通知',
      content: '限时活动：完成3单送50元加油券',
      time: '昨天',
      unread: true,
      type: 'activity'
    },
    {
      id: '4',
      title: '系统通知',
      content: '您的会员等级已升级为白银会员',
      time: '昨天',
      unread: false,
      type: 'system'
    },
    {
      id: '5',
      title: '订单消息',
      content: '您有一个新的订单，请及时查看',
      time: '前天',
      unread: false,
      type: 'order'
    }
  ];

  const getIconForType = (type: string) => {
    switch (type) {
      case 'system':
        return 'notifications';
      case 'order':
        return 'document-text';
      case 'activity':
        return 'gift';
      default:
        return 'chatbubble';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 消息列表 */}
      <View style={styles.messagesList}>
        {messages.map((message) => (
          <TouchableOpacity key={message.id} style={styles.messageItem}>
            <View style={styles.messageIcon}>
              <Ionicons name={getIconForType(message.type) as any} size={24} color="#FF6B00" />
              {message.unread && <View style={styles.unreadBadge} />}
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageTitle}>{message.title}</Text>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
              <Text style={styles.messageText} numberOfLines={2}>{message.content}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  messagesList: {
    paddingVertical: 8,
  },
  messageItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 1,
  },
  messageIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F44336',
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
    fontWeight: 'bold',
    color: '#333333',
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
});
