import SwipeableTabs from "@/components/SwipeableTabs";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Message() {

  // 功能入口
  const features = [
    { id: '1', name: '新手指南', icon: 'person-add', color: '#FF6B00' },
    { id: '2', name: '司机规则', icon: 'document-text', color: '#4CAF50' },
    { id: '3', name: '司机关怀', icon: 'heart', color: '#F44336' },
    { id: '4', name: '接单秘籍', icon: 'book', color: '#2196F3' },
    { id: '5', name: '常用功能', icon: 'grid', color: '#9C27B0' },
    { id: '6', name: '司机故事', icon: 'star', color: '#FF9800' },
    { id: '7', name: '司机安全', icon: 'shield', color: '#00BCD4' },
    { id: '8', name: '公示公告', icon: 'megaphone', color: '#795548' },
    { id: '9', name: '调查问卷', icon: 'clipboard', color: '#607D8B' }
  ];

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

  const [activeTab, setActiveTab] = useState('message');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 会员焕新计划横幅 */}
      <View style={styles.memberBanner}>
        <Image
          source={{ uri: 'https://picsum.photos/400/150' }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>会员焕新计划</Text>
          <Text style={styles.bannerSubtitle}>3大卡种任您选，助力货运更高效</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>点击查看</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 功能分类标签 */}
      <SwipeableTabs
        tabs={[{ name: 'message', label: '消息通知' }, { name: 'driver', label: '司机学堂' }, { name: 'activity', label: '热门活动' }]}
        initialTab="message"
        onTabChange={setActiveTab} />

      <View>
        {/* 消息列表 */}
        {activeTab === 'message' && (
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
        )}
        {/* 功能入口网格 */}
        {activeTab === 'driver' && (
          <View style={styles.featuresGrid}>
            {features.map((feature) => (
              <TouchableOpacity key={feature.id} style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                  <Ionicons name={feature.icon as any} size={24} color={feature.color} />
                </View>
                <Text style={styles.featureText}>{feature.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {/* 无更多数据提示 */}
        {activeTab === 'activity' && (
          <View style={styles.noMoreData}>
            <Text style={styles.noMoreText}>无更多数据</Text>
          </View>
        )}
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
  memberBanner: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  bannerImage: {
    width: '100%',
    height: 150,
  },
  bannerContent: {
    padding: 16,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  featureItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#333333',
  },
  noMoreData: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noMoreText: {
    fontSize: 14,
    color: '#999999',
  },
});
