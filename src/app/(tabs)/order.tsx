import { useAppStore } from "@/store/useAppStore";
import { Ionicons } from "@expo/vector-icons";
import ExpoGaodeMapModule, { MapView, Marker } from 'expo-gaode-map';
import { PermissionStatus } from "expo-modules-core";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface LocationState {
  latitude: number;
  longitude: number;
}

interface Order {
  id: string;
  from: string;
  to: string;
  price: number;
  fromLat?: number;
  fromLng?: number;
  toLat?: number;
  toLng?: number;
  补贴?: number;
  status?: string;
}

export default function OrderComponent() {
  const router = useRouter();
  const { pendingOrders, myOrders, acceptOrder, getPendingOrders, getMyOrders, updateOrderStatus } = useAppStore();
  const [activeTab, setActiveTab] = useState<'pending' | 'my'>('pending');
  const [location, setLocation] = useState<LocationState>({ latitude: 39.9042, longitude: 116.4074 });
  const [errorMsg, setErrorMsg] = useState<string>('');
  const mapRef = useRef<React.ElementRef<typeof MapView>>(null);

  useEffect(() => {
    getPendingOrders();
    getMyOrders();

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

        // 请求位置权限
        const permissionStatus = await ExpoGaodeMapModule.requestLocationPermission();
        if (permissionStatus.status !== PermissionStatus.GRANTED) {
          setErrorMsg('位置权限被拒绝');
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
        setErrorMsg('获取位置失败，请检查位置权限');
      }
    })();
  }, []);

  const handleOrderPress = useCallback((order: Order) => {
    router.push(`/order/${order.id}`);
  }, [router]);

  const handleAcceptOrder = useCallback((orderId: string) => {
    acceptOrder(orderId);
    Alert.alert('接单成功', '订单已成功接取，祝您旅途愉快！');
  }, [acceptOrder]);

  const handleUpdateOrderStatus = useCallback((orderId: string, status: '已接单' | '配送中' | '已完成') => {
    updateOrderStatus(orderId, status);
    Alert.alert('操作成功', `订单状态已更新为${status}`);
  }, [updateOrderStatus]);

  const displayOrders = useMemo(() => {
    return activeTab === 'pending' ? pendingOrders : myOrders;
  }, [activeTab, pendingOrders, myOrders]);

  const displayedPendingOrders = useMemo(() => {
    return pendingOrders.slice(0, 3);
  }, [pendingOrders]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '已接单':
        return 'bg-orange-100';
      case '配送中':
        return 'bg-blue-100';
      case '已完成':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusTextStyle = (status: string) => {
    switch (status) {
      case '已接单':
        return 'text-orange-600';
      case '配送中':
        return 'text-blue-600';
      case '已完成':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      {/* 顶部横幅 */}
      <View className="mx-4 my-4 rounded-lg overflow-hidden bg-white">
        <Image 
          source={{ uri: 'https://picsum.photos/400/200' }} 
          className="w-full h-[150px]"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-800 mb-1">加入快狗打车</Text>
          <Text className="text-sm text-gray-600 mb-3">海量订单 多劳多得</Text>
          <View className="flex-row mb-4">
            <View className="bg-gray-100 py-1 px-2 rounded mr-2">
              <Text className="text-xs text-gray-600">知名品牌</Text>
            </View>
            <View className="bg-gray-100 py-1 px-2 rounded mr-2">
              <Text className="text-xs text-gray-600">自由出工</Text>
            </View>
            <View className="bg-gray-100 py-1 px-2 rounded">
              <Text className="text-xs text-gray-600">收入有保障</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-orange-500 py-3 rounded-lg items-center">
            <Text className="text-white font-bold text-base">立即加盟</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 地图区域 */}
      <View className="mx-4 mb-4 rounded-lg overflow-hidden h-[200px]">
        <MapView
          ref={mapRef}
          initialCameraPosition={{
            target: location,
            zoom: 14
          }}
          myLocationEnabled
        >
          <Marker
            position={location}
            title="我的位置"
            icon="https://api.map.baidu.com/lbsapi/createmap/images/poi-marker-green.png"
          />

          {displayedPendingOrders.map((order) => (
            <Marker
              key={`from-${order.id}`}
              position={{
                latitude: order.fromLat || location.latitude + Math.random() * 0.02,
                longitude: order.fromLng || location.longitude + Math.random() * 0.02,
              }}
              title={order.from}
              icon="https://api.map.baidu.com/lbsapi/createmap/images/poi-marker-green.png"
            />
          ))}

          {displayedPendingOrders.map((order) => (
            <Marker
              key={`to-${order.id}`}
              position={{
                latitude: order.toLat || location.latitude + Math.random() * 0.02 + 0.01,
                longitude: order.toLng || location.longitude + Math.random() * 0.02 + 0.01,
              }}
              title={order.to}
              icon="https://api.map.baidu.com/lbsapi/createmap/images/poi-marker-red.png"
            />
          ))}
        </MapView>
        <View className="absolute top-3 left-3 bg-black/60 py-2 px-3 rounded">
          <Text className="text-white text-sm font-bold">附近订单</Text>
          <Text className="text-white text-xs mt-0.5">{displayedPendingOrders.length} 个待接订单</Text>
        </View>
      </View>

      {/* 标签页切换 */}
      <View className="flex-row bg-white mx-4 mb-4 rounded-lg p-1">
        <TouchableOpacity 
          className={`flex-1 py-3 items-center rounded-md transition-colors ${activeTab === 'pending' ? 'bg-orange-500' : ''}`}
          onPress={() => setActiveTab('pending')}
        >
          <Text className={`text-sm ${activeTab === 'pending' ? 'text-white font-bold' : 'text-gray-600'}`}>待接单</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 py-3 items-center rounded-md transition-colors ${activeTab === 'my' ? 'bg-orange-500' : ''}`}
          onPress={() => setActiveTab('my')}
        >
          <Text className={`text-sm ${activeTab === 'my' ? 'text-white font-bold' : 'text-gray-600'}`}>我的订单</Text>
        </TouchableOpacity>
      </View>

      {/* 订单列表 */}
      <View className="px-4 pb-4">
        {activeTab === 'pending' ? (
          displayOrders.length > 0 ? (
            displayOrders.map((order) => (
              <TouchableOpacity 
                key={order.id} 
                className="bg-white rounded-lg p-4 mb-3 flex-row justify-between items-center"
                onPress={() => handleOrderPress(order)}
              >
                <View className="flex-1 mr-3">
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="location" size={16} color="#4CAF50" />
                    <Text className="text-sm text-gray-800 ml-2 flex-1">{order.from}</Text>
                  </View>
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="location" size={16} color="#F44336" />
                    <Text className="text-sm text-gray-800 ml-2 flex-1">{order.to}</Text>
                  </View>
                  <View className="flex-row items-center mt-2">
                    <Text className="text-lg font-bold text-red-500">¥{order.price.toFixed(2)}</Text>
                    {order.补贴 && (
                      <View className="bg-orange-100 py-0.5 px-2 rounded ml-2">
                        <Text className="text-xs text-orange-500">平台补贴{order.补贴}元</Text>
                      </View>
                    )}
                  </View>
                </View>
                <TouchableOpacity className="bg-orange-500 py-2.5 px-5 rounded-full" onPress={() => handleAcceptOrder(order.id)}>
                  <Text className="text-white font-bold">立即接单</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <View className="items-center py-[60px]">
              <Ionicons name="document-text-outline" size={64} color="#CCCCCC" />
              <Text className="text-base text-gray-600 mt-4">暂无可用订单</Text>
              <Text className="text-sm text-gray-400 mt-2">请稍后再试</Text>
            </View>
          )
        ) : (
          displayOrders.length > 0 ? (
            displayOrders.map((order) => (
              <TouchableOpacity 
                key={order.id} 
                className="bg-white rounded-lg p-4 mb-3 flex-row justify-between items-center"
                onPress={() => handleOrderPress(order)}
              >
                <View className="flex-1 mr-3">
                  <View className="flex-row justify-between items-center mb-2">
                    <View className={`py-1 px-2 rounded ${getStatusStyle(order.status)}`}>
                      <Text className={`text-xs font-bold ${getStatusTextStyle(order.status)}`}>{order.status}</Text>
                    </View>
                    <Text className="text-xs text-gray-400">距您{order.distance}</Text>
                  </View>
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="location" size={16} color="#4CAF50" />
                    <Text className="text-sm text-gray-800 ml-2 flex-1">{order.from}</Text>
                  </View>
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="location" size={16} color="#F44336" />
                    <Text className="text-sm text-gray-800 ml-2 flex-1">{order.to}</Text>
                  </View>
                  <View className="flex-row items-center mt-2">
                    <Text className="text-lg font-bold text-red-500">¥{order.price.toFixed(2)}</Text>
                    {order.补贴 && (
                      <View className="bg-orange-100 py-0.5 px-2 rounded ml-2">
                        <Text className="text-xs text-orange-500">平台补贴{order.补贴}元</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View className="items-end">
                  {order.status === '已接单' && (
                    <TouchableOpacity 
                      className="bg-orange-500 py-2 px-4 rounded-full"
                      onPress={() => handleUpdateOrderStatus(order.id, '配送中')}
                    >
                      <Text className="text-white text-xs font-bold">开始配送</Text>
                    </TouchableOpacity>
                  )}
                  {order.status === '配送中' && (
                    <TouchableOpacity 
                      className="bg-orange-500 py-2 px-4 rounded-full"
                      onPress={() => handleUpdateOrderStatus(order.id, '已完成')}
                    >
                      <Text className="text-white text-xs font-bold">完成订单</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="items-center py-[60px]">
              <Ionicons name="document-text-outline" size={64} color="#CCCCCC" />
              <Text className="text-base text-gray-600 mt-4">暂无订单</Text>
              <Text className="text-sm text-gray-400 mt-2">您还没有接取任何订单</Text>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}
