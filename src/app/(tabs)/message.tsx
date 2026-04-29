import SwipeableTabs from "@/components/SwipeableTabs";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Message() {
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
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      {/* 会员焕新计划横幅 */}
      <View className="mx-4 my-4 rounded-lg overflow-hidden bg-white">
        <Image
          source={{ uri: 'https://picsum.photos/400/150' }}
          className="w-full h-[150px]"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-800 mb-1">会员焕新计划</Text>
          <Text className="text-sm text-gray-600 mb-3">3大卡种任您选，助力货运更高效</Text>
          <TouchableOpacity className="bg-orange-500 py-2 px-4 rounded-full self-start">
            <Text className="text-white font-bold">点击查看</Text>
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
          <View className="py-2">
            {messages.map((message) => (
              <TouchableOpacity key={message.id} className="flex-row bg-white px-4 py-4 border-b border-gray-50">
                <View className="w-12 h-12 rounded-full bg-orange-50 justify-center items-center mr-3 relative">
                  <Ionicons name={getIconForType(message.type) as any} size={24} color="#FF6B00" />
                  {message.unread && <View className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500" />}
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-base font-bold text-gray-800">{message.title}</Text>
                    <Text className="text-xs text-gray-400">{message.time}</Text>
                  </View>
                  <Text className="text-sm text-gray-600 leading-relaxed" numberOfLines={2}>{message.content}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {/* 功能入口网格 */}
        {activeTab === 'driver' && (
          <View className="flex-row flex-wrap px-4">
            {features.map((feature) => (
              <TouchableOpacity key={feature.id} className="w-1/4 items-center py-4">
                <View className="w-14 h-14 rounded-full justify-center items-center mb-2" style={{ backgroundColor: feature.color + '20' }}>
                  <Ionicons name={feature.icon as any} size={24} color={feature.color} />
                </View>
                <Text className="text-xs text-gray-800">{feature.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {/* 无更多数据提示 */}
        {activeTab === 'activity' && (
          <View className="items-center py-10">
            <Text className="text-sm text-gray-400">无更多数据</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
