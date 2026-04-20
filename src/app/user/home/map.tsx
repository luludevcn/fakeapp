import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import useLocation from '../../../hooks/useLocation';

export default function MapPage() {
  const location = useLocation();
  const [region, setRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (!location.loading && !location.error) {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location.latitude, location.longitude, location.loading, location.error]);

  const [drivers, setDrivers] = useState<Array<{ id: number; latitude: number; longitude: number; name: string }>>([
    { id: 1, latitude: 39.9042, longitude: 116.4074, name: '张师傅' },
    { id: 2, latitude: 39.9142, longitude: 116.4174, name: '李师傅' },
    { id: 3, latitude: 39.8942, longitude: 116.3974, name: '王师傅' },
  ]);

  const [route, setRoute] = useState({
    coordinates: [
      { latitude: 39.9042, longitude: 116.4074 },
      { latitude: 39.9142, longitude: 116.4174 },
    ],
  });

  const handleSelectDriver = (driver: { id: number; latitude: number; longitude: number; name: string }) => {
    router.push('/user/home/order-detail' as any);
  };

  if (location.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={styles.loadingText}>获取位置中...</Text>
      </View>
    );
  }

  if (location.error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="location-outline" size={64} color="#F44336" />
        <Text style={styles.errorText}>{location.error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => window.location.reload()}>
          <Text style={styles.retryButtonText}>重试</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {/* 用户当前位置标记 */}
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="我的位置"
          pinColor="#FF6B00"
        />

        {/* 路线 */}
        <Polyline
          coordinates={[
            { latitude: location.latitude, longitude: location.longitude },
            ...route.coordinates
          ]}
          strokeColor="#FF6B00"
          strokeWidth={3}
        />

        {/* 终点标记 */}
        <Marker
          coordinate={route.coordinates[route.coordinates.length - 1]}
          title="终点"
          pinColor="#F44336"
        />

        {/* 司机标记 */}
        {drivers.map((driver) => (
          <Marker
            key={driver.id}
            coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
            title={driver.name}
            pinColor="#2196F3"
          />
        ))}
      </MapView>

      {/* 司机列表 */}
      <View style={styles.driverList}>
        <Text style={styles.listTitle}>附近司机</Text>
        {drivers.map((driver) => (
          <TouchableOpacity 
            key={driver.id} 
            style={styles.driverItem}
            onPress={() => handleSelectDriver(driver)}
          >
            <View style={styles.driverInfo}>
              <View style={styles.driverAvatar}>
                <Text style={styles.avatarText}>{driver.name.charAt(0)}</Text>
              </View>
              <View style={styles.driverDetails}>
                <Text style={styles.driverName}>{driver.name}</Text>
                <Text style={styles.driverDistance}>距离您约 1.2 公里</Text>
              </View>
            </View>
            <Text style={styles.driverPrice}>¥35</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 底部操作栏 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>确认叫车</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  driverList: {
    position: 'absolute',
    top: 100,
    right: 16,
    width: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  driverItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '500',
  },
  driverDistance: {
    fontSize: 12,
    color: '#999',
  },
  driverPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 16,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});