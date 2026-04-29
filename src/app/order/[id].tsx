import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { ExpoGaodeMapModule, MapView, Marker, Polyline } from 'expo-gaode-map';
import { PermissionStatus } from 'expo-modules-core';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.08;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function OrderDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders, acceptOrder, updateOrderStatus, cancelOrder } = useAppStore();
  const [order, setOrder] = useState<any>(null);
  const [location, setLocation] = useState({ latitude: 39.9042, longitude: 116.4074 });
  const mapRef = useRef<React.ElementRef<typeof MapView>>(null);

  useEffect(() => {
    (async () => {
      try {
        // 初始化高德地图隐私配置
        const privacyStatus = ExpoGaodeMapModule.getPrivacyStatus();
        if (!privacyStatus.isReady) {
          ExpoGaodeMapModule.setPrivacyConfig({
            hasShow: true,
            hasContainsPrivacy: true,
            hasAgree: true,
            privacyVersion: '2026-04-23'
          });
        }

        // 查找订单
        const foundOrder = orders.find(o => o.id === id);
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          Alert.alert('错误', '订单不存在');
          router.back();
          return;
        }

        // 请求位置权限
        const permissionStatus = await ExpoGaodeMapModule.requestLocationPermission();
        if (permissionStatus.status !== PermissionStatus.GRANTED) {
          return;
        }

        // 获取当前位置
        const locationData = await ExpoGaodeMapModule.getCurrentLocation();
        setLocation({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
      } catch (error) {
        console.error('获取位置失败:', error);
      }
    })();
  }, [id, orders]);

  const handleAcceptOrder = () => {
    if (order) {
      acceptOrder(order.id);
      Alert.alert('成功', '订单已成功接取，祝您旅途愉快！');
      const updatedOrder = orders.find(o => o.id === id);
      if (updatedOrder) {
        setOrder(updatedOrder);
      }
    }
  };

  const handleUpdateOrderStatus = (status: '已接单' | '配送中' | '已完成') => {
    if (order) {
      updateOrderStatus(order.id, status);
      Alert.alert('成功', `订单状态已更新为${status}`);
      const updatedOrder = orders.find(o => o.id === id);
      if (updatedOrder) {
        setOrder(updatedOrder);
      }
    }
  };

  const handleCancelOrder = () => {
    Alert.alert(
      '取消订单',
      '确定要取消这个订单吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          style: 'destructive',
          onPress: () => {
            if (order) {
              cancelOrder(order.id);
              Alert.alert('成功', '订单已取消');
              router.back();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleComplaint = () => {
    router.push(`/order/complaint?id=${id}`);
  };

  const getStatusStyle = () => {
    switch (order?.status) {
      case '待接单':
        return 'bg-orange-100';
      case '已接单':
      case '配送中':
        return 'bg-blue-100';
      case '已完成':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusTextStyle = () => {
    switch (order?.status) {
      case '待接单':
        return 'text-orange-600';
      case '已接单':
      case '配送中':
        return 'text-blue-600';
      case '已完成':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-base text-gray-600">加载中...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      {/* 头部 */}
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">订单详情</Text>
        <View className="w-10" />
      </View>

      {/* 订单状态 */}
      <View className={`mx-4 my-4 p-5 rounded-lg items-center ${getStatusStyle()}`}>
        <Text className={`text-xl font-bold mb-2 ${getStatusTextStyle()}`}>{order.status}</Text>
        <Text className="text-sm text-gray-600">
          {order.status === '待接单' && '等待司机接单'}
          {order.status === '已接单' && '司机已接单，准备出发'}
          {order.status === '配送中' && '货物正在配送中'}
          {order.status === '已完成' && '订单已完成'}
        </Text>
      </View>

      {/* 订单基本信息 */}
      <View className="bg-white mx-4 mb-4 rounded-lg p-4">
        <View className="flex-row justify-between mb-3">
          <Text className="text-sm text-gray-600">订单号</Text>
          <Text className="text-sm text-gray-800">#{order.id}</Text>
        </View>
        <View className="flex-row justify-between mb-3">
          <Text className="text-sm text-gray-600">订单类型</Text>
          <Text className="text-sm text-gray-800">{order.type}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-sm text-gray-600">距离</Text>
          <Text className="text-sm text-gray-800">{order.distance}</Text>
        </View>
      </View>

      {/* 地图路线 */}
      <View className="bg-white mx-4 mb-4 rounded-lg p-4">
        <Text className="text-base font-bold text-gray-800 mb-3">行驶路线</Text>
        <View className="h-[200px] rounded-lg overflow-hidden">
          <MapView
            ref={mapRef}
            initialCameraPosition={{
              target: {
                latitude: (order.fromLat || location.latitude + 0.01),
                longitude: (order.fromLng || location.longitude + 0.01),
              },
              zoom: 14
            }}
            myLocationEnabled
          >
            <Marker
              position={{
                latitude: order.fromLat || location.latitude + 0.02,
                longitude: order.fromLng || location.longitude + 0.02,
              }}
              title={order.from}
              icon="https://api.map.baidu.com/lbsapi/createmap/images/poi-marker-green.png"
            />

            <Marker
              position={{
                latitude: order.toLat || location.latitude + 0.04,
                longitude: order.toLng || location.longitude + 0.04,
              }}
              title={order.to}
              icon="https://api.map.baidu.com/lbsapi/createmap/images/poi-marker-red.png"
            />

            <Polyline
              points={[
                {
                  latitude: order.fromLat || location.latitude + 0.02,
                  longitude: order.fromLng || location.longitude + 0.02,
                },
                {
                  latitude: order.toLat || location.latitude + 0.04,
                  longitude: order.toLng || location.longitude + 0.04,
                },
              ]}
              colors={['#4ff321ff']}
              strokeWidth={5}
            />
          </MapView>
        </View>
      </View>

      {/* 地址信息 */}
      <View className="bg-white mx-4 mb-4 rounded-lg p-4">
        <View className="flex-row items-start">
          <View className="w-6 h-6 rounded-full bg-green-500 justify-center items-center mt-0.5">
            <Ionicons name="location" size={12} color="#FFFFFF" />
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-xs text-gray-400 mb-1">起点</Text>
            <Text className="text-sm text-gray-800 leading-relaxed">{order.from}</Text>
          </View>
        </View>
        <View className="h-[75px] w-px bg-gray-200 ml-[11px] my-2" />
        <View className="flex-row items-start">
          <View className="w-6 h-6 rounded-full bg-red-500 justify-center items-center mt-0.5">
            <Ionicons name="location" size={12} color="#FFFFFF" />
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-xs text-gray-400 mb-1">终点</Text>
            <Text className="text-sm text-gray-800 leading-relaxed">{order.to}</Text>
          </View>
        </View>
      </View>

      {/* 价格信息 */}
      <View className="bg-white mx-4 mb-4 rounded-lg p-4">
        <Text className="text-base font-bold text-gray-800 mb-3">费用明细</Text>
        <View className="flex-row justify-between mb-3">
          <Text className="text-sm text-gray-600">基础费用</Text>
          <Text className="text-sm text-gray-800">¥{order.price.toFixed(2)}</Text>
        </View>
        {order.补贴 && (
          <View className="flex-row justify-between mb-3">
            <Text className="text-sm text-gray-600">平台补贴</Text>
            <Text className="text-sm text-green-500">+¥{order.补贴.toFixed(2)}</Text>
          </View>
        )}
        <View className="flex-row justify-between pt-3 border-t border-gray-200 mt-1">
          <Text className="text-base font-bold text-gray-800">总计</Text>
          <Text className="text-lg font-bold text-red-500">¥{(order.price + (order.补贴 || 0)).toFixed(2)}</Text>
        </View>
      </View>

      {/* 操作按钮 */}
      <View className="px-4 pb-4">
        {order.status === '待接单' && (
          <TouchableOpacity 
            className="bg-orange-500 py-4 rounded-lg items-center mb-4"
            onPress={() => handleAcceptOrder()}
          >
            <Text className="text-white text-base font-bold">立即接单</Text>
          </TouchableOpacity>
        )}
        {order.status === '已接单' && (
          <TouchableOpacity 
            className="bg-orange-500 py-4 rounded-lg items-center mb-4"
            onPress={() => handleUpdateOrderStatus('配送中')}
          >
            <Text className="text-white text-base font-bold">开始配送</Text>
          </TouchableOpacity>
        )}
        {order.status === '配送中' && (
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity 
              className="flex-1 bg-orange-500 py-4 rounded-lg items-center flex-row justify-center mr-2"
              onPress={() => router.push('/navigation')}
            >
              <Ionicons name="navigate" size={20} color="#FFFFFF" />
              <Text className="text-white text-base font-bold ml-2">开始导航</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 bg-orange-500 py-4 rounded-lg items-center ml-2"
              onPress={() => handleUpdateOrderStatus('已完成')}
            >
              <Text className="text-white text-base font-bold">完成订单</Text>
            </TouchableOpacity>
          </View>
        )}
        {order.status === '已完成' && !order.rating && (
          <TouchableOpacity 
            className="bg-orange-500 py-4 rounded-lg items-center mb-4"
            onPress={() => router.push(`/order/rate?id=${order.id}`)}
          >
            <Text className="text-white text-base font-bold">评价订单</Text>
          </TouchableOpacity>
        )}
        {order.status === '已完成' && order.rating && (
          <View className="flex-row items-center justify-center py-4">
            <Text className="text-base text-gray-600 mr-2">已评价</Text>
            <View className="flex-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= order.rating! ? 'star' : 'star-outline'}
                  size={20}
                  color={star <= order.rating! ? '#FFD700' : '#CCCCCC'}
                />
              ))}
            </View>
          </View>
        )}
        {order.status !== '待接单' && order.status !== '已完成' && order.status !== '已取消' && (
          <View className="flex-row justify-between flex-wrap">
            <TouchableOpacity className="flex-1 min-w-[30%] py-3 rounded-lg items-center border border-gray-200 mx-1 my-1">
              <Text className="text-sm text-gray-600">联系客户</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 min-w-[30%] py-3 rounded-lg items-center border border-gray-200 mx-1 my-1" onPress={handleCancelOrder}>
              <Text className="text-sm text-gray-600">取消订单</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 min-w-[30%] py-3 rounded-lg items-center border border-gray-200 mx-1 my-1" onPress={handleComplaint}>
              <Text className="text-sm text-gray-600">投诉</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
