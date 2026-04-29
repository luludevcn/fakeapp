import { useAppStore } from "@/store/useAppStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();
  const { services } = useAppStore();

  const topFeatures = [
    { id: '1', name: '接单', icon: 'car', onPress: () => router.push('/order' as any) },
    { id: '2', name: '投标', icon: 'gift', onPress: () => router.push('/bidding' as any) },
    { id: '3', name: '奖励', icon: 'trophy', onPress: () => router.push('/rewards' as any) },
    { id: '4', name: '接单码', icon: 'qr-code', onPress: () => router.push('/ordercode' as any) }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      {/* 顶部功能入口 */}
      <View className="flex-row justify-around bg-[#2C3E50] py-5">
        {topFeatures.map((feature) => (
          <TouchableOpacity key={feature.id} className="items-center" onPress={feature.onPress}>
            <View className="w-14 h-14 rounded-full bg-[#34495E] justify-center items-center mb-2">
              <Ionicons name={feature.icon as any} size={28} color="#FFFFFF" />
            </View>
            <Text className="text-white text-xs">{feature.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 服务网格布局 */}
      <View className="flex-row flex-wrap p-4 bg-white mb-2.5">
        {services.map((service, index) => (
          <TouchableOpacity key={service.id} className="w-1/4 items-center py-4">
            <View className="w-14 h-14 rounded-full bg-gray-100 justify-center items-center mb-2">
              <Text className="text-2xl">{service.icon}</Text>
            </View>
            <Text className="text-xs text-gray-800">{service.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 促销横幅 */}
      <View className="mx-4 mb-4 rounded-lg overflow-hidden bg-orange-500">
        <Image 
          source={{ uri: 'https://picsum.photos/400/150' }} 
          className="w-full h-30"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-lg font-bold text-white mb-1">海量订单 月入过万</Text>
          <Text className="text-sm text-white mb-3">自由出工 收入有保障</Text>
          <TouchableOpacity className="bg-white py-2 px-4 rounded-full self-start">
            <Text className="text-orange-500 font-bold">加入快狗</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 会员焕新计划 */}
      <View className="mx-4 mb-5 rounded-lg overflow-hidden bg-white">
        <Image 
          source={{ uri: 'https://picsum.photos/400/150' }} 
          className="w-full h-[150px]"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-base font-bold text-gray-800 mb-1">会员焕新计划</Text>
          <Text className="text-sm text-gray-600 mb-3">3大卡种任您选，助力货运更高效</Text>
          <TouchableOpacity className="bg-orange-500 py-2 px-4 rounded-full self-start">
            <Text className="text-white font-bold">点击查看</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
