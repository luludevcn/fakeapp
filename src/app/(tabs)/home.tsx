import { useAppStore } from "@/store/useAppStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();
  const { services } = useAppStore();



  // 顶部功能入口
  const topFeatures = [
    { id: '1', name: '接单', icon: 'car', onPress: () => router.push('/order') },
    { id: '2', name: '投标', icon: 'gift', onPress: () => console.log('投标') },
    { id: '3', name: '奖励', icon: 'trophy', onPress: () => console.log('奖励') },
    { id: '4', name: '接单码', icon: 'qr-code', onPress: () => console.log('接单码') }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 顶部功能入口 */}
      <View style={styles.topFeatures}>
        {topFeatures.map((feature) => (
          <TouchableOpacity key={feature.id} style={styles.featureItem} onPress={feature.onPress}>
            <View style={styles.featureIcon}>
              <Ionicons name={feature.icon as any} size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.featureText}>{feature.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 服务网格布局 */}
      <View style={styles.servicesGrid}>
        {services.map((service, index) => (
          <TouchableOpacity key={service.id} style={styles.serviceItem}>
            <View style={styles.serviceIcon}>
              <Text style={styles.serviceEmoji}>{service.icon}</Text>
            </View>
            <Text style={styles.serviceText}>{service.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 促销横幅 */}
      <View style={styles.promoBanner}>
        <Image 
          source={{ uri: 'https://picsum.photos/400/150' }} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>海量订单 月入过万</Text>
          <Text style={styles.bannerSubtitle}>自由出工 收入有保障</Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>加入快狗</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 会员焕新计划 */}
      <View style={styles.memberCard}>
        <Image 
          source={{ uri: 'https://picsum.photos/400/150' }} 
          style={styles.memberImage}
          resizeMode="cover"
        />
        <View style={styles.memberContent}>
          <Text style={styles.memberTitle}>会员焕新计划</Text>
          <Text style={styles.memberSubtitle}>3大卡种任您选，助力货运更高效</Text>
          <TouchableOpacity style={styles.memberButton}>
            <Text style={styles.memberButtonText}>点击查看</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  topFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2C3E50',
    paddingVertical: 20,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#34495E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  serviceItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceEmoji: {
    fontSize: 24,
  },
  serviceText: {
    fontSize: 12,
    color: '#333333',
  },
  promoBanner: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FF6B00',
  },
  bannerImage: {
    width: '100%',
    height: 120,
  },
  bannerContent: {
    padding: 16,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  joinButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  memberCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  memberImage: {
    width: '100%',
    height: 150,
  },
  memberContent: {
    padding: 16,
  },
  memberTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  memberSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  memberButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  memberButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
