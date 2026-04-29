import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const user = {
    name: '张三',
    phone: '15829383745',
    avatar: 'https://picsum.photos/100',
    balance: 103884.80,
    orderCount: 78,
  };

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
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      {/* 用户信息区域 */}
      <View className="flex-row items-center bg-[#2C3E50] p-5">
        <Image source={{ uri: user.avatar }} className="w-15 h-15 rounded-full mr-4" />
        <View className="flex-1">
          <Text className="text-white text-lg font-bold mb-1">{user.name}</Text>
          <Text className="text-gray-300 text-sm">{user.phone}</Text>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 钱包和订单卡片 */}
      <View className="flex-row bg-white mx-4 mt-4 rounded-lg overflow-hidden">
        <TouchableOpacity className="flex-1 flex-row items-center p-4 border-r border-gray-200" onPress={() => router.push('/wallet')}>
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Ionicons name="wallet" size={20} color="#FF6B00" />
              <Text className="text-gray-600 text-sm ml-2">我的钱包 (元)</Text>
            </View>
            <Text className="text-gray-800 text-lg font-bold">¥{user.balance.toFixed(2)}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 flex-row items-center p-4">
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Ionicons name="document-text" size={20} color="#4CAF50" />
              <Text className="text-gray-600 text-sm ml-2">我的订单</Text>
            </View>
            <Text className="text-gray-400 text-sm">已完成{user.orderCount}个订单</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
      </View>

      {/* 专属助手 */}
      <View className="flex-row items-center bg-white mx-4 mt-2.5 p-4">
        <Image source={{ uri: 'https://picsum.photos/50' }} className="w-12 h-12 rounded-full mr-3" />
        <View className="flex-1">
          <Text className="text-gray-800 text-base font-bold mb-1">我是您的专属助手</Text>
          <Text className="text-gray-600 text-sm">很高兴为您服务，有问题随时联系我</Text>
        </View>
        <TouchableOpacity className="bg-orange-500 py-1.5 px-3 rounded-full">
          <Text className="text-white text-sm font-bold">立即联系</Text>
        </TouchableOpacity>
      </View>

      {/* 功能菜单列表 */}
      {menuItems.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          className="flex-row items-center justify-between bg-white px-4 py-4 border-b border-gray-50"
          onPress={() => {
            if (item.id === '1') {
              router.push('/vehicle');
            }
          }}
        >
          <View className="flex-row items-center">
            <Ionicons name={item.icon as any} size={20} color="#666666" />
            <Text className="text-gray-800 text-base ml-3">{item.name}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
