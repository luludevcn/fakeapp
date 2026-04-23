import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  // 模拟用户数据
  const user = {
    name: '张三',
    phone: '15829383745',
    avatar: 'https://picsum.photos/100',
    balance: 103884.80,
    orderCount: 78,
  };

  // 功能列表
  const menuItems = [
    { id: '1', name: '我的车辆', icon: 'car' },
    { id: '2', name: '客服中心', icon: 'headset' },
    { id: '3', name: '车主服务', icon: 'grid' },
    { id: '4', name: '培训地址电话', icon: 'location' },
    { id: '5', name: '关注微信', icon: 'logo-wechat' },
    { id: '6', name: '客户收藏', icon: 'star' },
    { id: '7', name: '法律条款及平台规则', icon: 'document-text' },
    { id: '8', name: '个性化设置', icon: 'settings' }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 用户信息区域 */}
      <View style={styles.userSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
        </View>
        <TouchableOpacity style={styles.arrow}>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 钱包和订单卡片 */}
      <View style={styles.cardsSection}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/wallet')}>
          <View style={styles.cardContent}>
            <Ionicons name="wallet" size={20} color="#FF6B00" />
            <Text style={styles.cardTitle}>我的钱包 (元)</Text>
            <Text style={styles.cardValue}>¥{user.balance.toFixed(2)}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <Ionicons name="document-text" size={20} color="#4CAF50" />
            <Text style={styles.cardTitle}>我的订单</Text>
            <Text style={styles.userPhone}>已完成{user.orderCount}个订单</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
      </View>

      {/* 专属助手 */}
      <View style={styles.assistantSection}>
        <Image source={{ uri: 'https://picsum.photos/50' }} style={styles.assistantAvatar} />
        <View style={styles.assistantInfo}>
          <Text style={styles.assistantTitle}>我是您的专属助手</Text>
          <Text style={styles.assistantText}>很高兴为您服务，有问题随时联系我</Text>
        </View>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>立即联系</Text>
        </TouchableOpacity>
      </View>

      {/* 功能菜单列表 */}
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={() => {
            if (item.id === '1') {
              router.push('/vehicle');
            }
          }}
        >
          <View style={styles.menuLeft}>
            <Ionicons name={item.icon as any} size={20} color="#666666" />
            <Text style={styles.menuText}>{item.name}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  arrow: {
    padding: 8,
  },
  cardsSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: '#E5E5EA',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 1,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  assistantSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 10,
  },
  assistantAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  assistantInfo: {
    flex: 1,
  },
  assistantTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  assistantText: {
    fontSize: 14,
    color: '#666666',
  },
  contactButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
