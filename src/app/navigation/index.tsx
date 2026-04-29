import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { ExpoGaodeMapModule, MapView, Marker, Polyline } from 'expo-gaode-map';
import { PermissionStatus } from 'expo-modules-core';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Navigation() {
  const router = useRouter();
  const { navigation, setCurrentLocation, setDestination } = useAppStore();
  const [location, setLocation] = useState(navigation.currentLocation);
  const [errorMsg, setErrorMsg] = useState('');
  const [isTracking, setIsTracking] = useState(false);
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

        // 请求位置权限
        const permissionStatus = await ExpoGaodeMapModule.requestLocationPermission();
        if (permissionStatus.status !== PermissionStatus.GRANTED) {
          setErrorMsg('位置权限被拒绝');
          return;
        }

        // 获取当前位置
        const location = await ExpoGaodeMapModule.getCurrentLocation();
        const newLocation = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
        setLocation(newLocation);
        setCurrentLocation(newLocation);
      } catch (error) {
        console.error('获取位置失败:', error);
        setErrorMsg('获取位置失败，请检查位置权限');
      }
    })();
  }, []);

  const startTracking = async () => {
    setIsTracking(true);
    try {
      const destination = {
        latitude: 39.9142,
        longitude: 116.4074,
      };
      setDestination(destination);

      // 开始实时定位
      ExpoGaodeMapModule.start();

      const subscription = ExpoGaodeMapModule.addLocationListener((location) => {
        const newLocation = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
        setLocation(newLocation);
        setCurrentLocation(newLocation);

        // 移动地图视角到当前位置
        if (mapRef.current) {
          mapRef.current.moveCamera({
            target: {
              latitude: newLocation.latitude,
              longitude: newLocation.longitude,
            }
          });
        }
      });

      return () => {
        subscription.remove();
        ExpoGaodeMapModule.stop();
      };
    } catch (error) {
      Alert.alert('错误', '定位失败，请检查位置权限');
      setIsTracking(false);
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
    setDestination(null);
  };

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* 头部 */}
      <SafeAreaView className="bg-white" edges={['top']}>
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
          <TouchableOpacity className="p-2" onPress={handleNavigateBack}>
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">导航</Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="ellipsis-vertical" size={24} color="#333333" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* 地图 */}
      <View className="flex-1">
        <MapView
          ref={mapRef}
          initialCameraPosition={{
            target: location,
            zoom: 16
          }}
          myLocationEnabled
        >
        {/* 目的地标记 */}
        {navigation.destination && (
          <Marker
            position={navigation.destination}
            title="目的地"
            icon="https://api.map.baidu.com/lbsapi/createmap/images/poi-marker-red.png"
          />
        )}

        {navigation.destination && (
          <Polyline
            points={[location, navigation.destination]}
            colors={['#2196F3']}
            strokeWidth={3}
          />
        )}
      </MapView>
      </View>

      {/* 底部信息栏 */}
      <View className="bg-white p-4 border-t border-gray-200">
        <View className="mb-4">
          <Text className="text-base text-gray-800 mb-1">距离目的地约 3.5 公里</Text>
          <Text className="text-sm text-gray-600">预计需要 15 分钟</Text>
        </View>
        <TouchableOpacity
          className={`flex-row items-center justify-center py-3.5 rounded-lg ${isTracking ? 'bg-red-500' : 'bg-green-500'}`}
          onPress={isTracking ? stopTracking : startTracking}
        >
          <Ionicons
            name={isTracking ? 'stop' : 'play'}
            size={24}
            color="#FFFFFF"
          />
          <Text className="text-white text-base font-bold ml-2">
            {isTracking ? '停止导航' : '开始导航'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 错误提示 */}
      {errorMsg ? (
        <View className="absolute top-20 left-4 right-4 bg-red-50 p-3 rounded-lg">
          <Text className="text-red-700 text-sm">{errorMsg}</Text>
        </View>
      ) : null}
    </View>
  );
}
