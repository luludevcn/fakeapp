import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { ExpoGaodeMapModule, MapView, Marker, Polyline } from 'expo-gaode-map';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
        if (permissionStatus !== 'granted') {
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
      // 模拟目的地（实际应用中应该从订单获取）
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
    <View style={styles.container}>
      {/* 头部 */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerContent}>
        <TouchableOpacity onPress={handleNavigateBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>导航</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#333333" />
        </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* 地图 */}
      <MapView
        ref={mapRef}
        style={styles.map}
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

        {/* 路线 */}
        {navigation.destination && (
          <Polyline
            points={[location, navigation.destination]}
            colors={['#2196F3']}
            strokeWidth={3}
          />
        )}
      </MapView>

      {/* 底部信息栏 */}
      <View style={styles.bottomBar}>
        <View style={styles.routeInfo}>
          <Text style={styles.routeText}>距离目的地约 3.5 公里</Text>
          <Text style={styles.etaText}>预计需要 15 分钟</Text>
        </View>
        <TouchableOpacity
          style={[styles.trackingButton, isTracking && styles.stopButton]}
          onPress={isTracking ? stopTracking : startTracking}
        >
          <Ionicons
            name={isTracking ? 'stop' : 'play'}
            size={24}
            color="#FFFFFF"
          />
          <Text style={styles.trackingButtonText}>
            {isTracking ? '停止导航' : '开始导航'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 错误提示 */}
      {errorMsg ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  moreButton: {
    padding: 8,
  },
  map: {
    flex: 1,
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  routeInfo: {
    marginBottom: 16,
  },
  routeText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  etaText: {
    fontSize: 14,
    color: '#666666',
  },
  trackingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  trackingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  errorContainer: {
    position: 'absolute',
    top: 80,
    left: 16,
    right: 16,
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
  },
});