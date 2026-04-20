import { useAppStore } from "@/store/useAppStore";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  // 模拟用户数据
  const user = {
    name: '司机师傅',
    avatar: 'https://picsum.photos/100',
    level: '普通会员',
    balance: 1280.50
  };

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
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabActiveText}>消息通知</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>司机学堂</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>热门活动</Text>
        </TouchableOpacity>
      </View>

      {/* 功能入口网格 */}
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

      {/* 无更多数据提示 */}
      <View style={styles.noMoreData}>
        <Text style={styles.noMoreText}>无更多数据</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#FF6B00',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  tabActiveText: {
    fontSize: 14,
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
