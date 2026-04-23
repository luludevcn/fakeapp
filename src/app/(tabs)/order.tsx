import { useAppStore } from "@/store/useAppStore";
import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Order() {
  const router = useRouter();
  const { pendingOrders, myOrders, acceptOrder, getPendingOrders, getMyOrders, updateOrderStatus } = useAppStore();
  const [activeTab, setActiveTab] = useState<'pending' | 'my'>('pending');
  const [location, setLocation] = useState({ latitude: 39.9042, longitude: 116.4074 });
  const [errorMsg, setErrorMsg] = useState('');
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    // 加载待接单列表
    getPendingOrders();
    // 加载已接订单列表
    getMyOrders();

    // 获取当前位置
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('位置权限被拒绝');
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });
    })();
  }, []);

  const handleOrderPress = (order: any) => {
    // 跳转到订单详情页面
    router.push(`/order/${order.id}`);
  };

  const handleAcceptOrder = (orderId: string) => {
    // 调用接单方法
    acceptOrder(orderId);
    // 显示接单成功提示
    Alert.alert('接单成功', '订单已成功接取，祝您旅途愉快！');
  };

  const handleUpdateOrderStatus = (orderId: string, status: '已接单' | '配送中' | '已完成') => {
    updateOrderStatus(orderId, status);
    Alert.alert('操作成功', `订单状态已更新为${status}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 顶部横幅 */}
      <View style={styles.banner}>
        <Image 
          source={{ uri: 'https://picsum.photos/400/200' }} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>加入快狗打车</Text>
          <Text style={styles.bannerSubtitle}>海量订单 多劳多得</Text>
          <View style={styles.bannerTags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>知名品牌</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>自由出工</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>收入有保障</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>立即加盟</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 地图区域 */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          style={styles.map}
          initialRegion={{
            ...location,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {/* 当前位置标记 */}
          <Marker
            coordinate={location}
            title="我的位置"
            pinColor="#4CAF50"
          />

          {/* 订单起点标记 */}
          {pendingOrders.slice(0, 3).map((order) => (
            <Marker
              key={`from-${order.id}`}
              coordinate={{
                latitude: order.fromLat || location.latitude + Math.random() * 0.02,
                longitude: order.fromLng || location.longitude + Math.random() * 0.02,
              }}
              title={order.from}
              pinColor="#4CAF50"
            />
          ))}

          {/* 订单终点标记 */}
          {pendingOrders.slice(0, 3).map((order) => (
            <Marker
              key={`to-${order.id}`}
              coordinate={{
                latitude: order.toLat || location.latitude + Math.random() * 0.02 + 0.01,
                longitude: order.toLng || location.longitude + Math.random() * 0.02 + 0.01,
              }}
              title={order.to}
              pinColor="#F44336"
            />
          ))}
        </MapView>
        <View style={styles.mapOverlay}>
          <Text style={styles.mapOverlayText}>附近订单</Text>
          <Text style={styles.mapOverlaySubtext}>{pendingOrders.length} 个待接订单</Text>
        </View>
      </View>

      {/* 标签页切换 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>待接单</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'my' && styles.activeTab]}
          onPress={() => setActiveTab('my')}
        >
          <Text style={[styles.tabText, activeTab === 'my' && styles.activeTabText]}>我的订单</Text>
        </TouchableOpacity>
      </View>

      {/* 订单列表 */}
      <View style={styles.ordersList}>
        {activeTab === 'pending' ? (
          pendingOrders.length > 0 ? (
            pendingOrders.map((order) => (
              <TouchableOpacity 
                key={order.id} 
                style={styles.orderItem}
                onPress={() => handleOrderPress(order)}
              >
                <View style={styles.orderInfo}>
                  <View style={styles.locationRow}>
                    <Ionicons name="location" size={16} color="#4CAF50" />
                    <Text style={styles.locationText}>{order.from}</Text>
                  </View>
                  <View style={styles.locationRow}>
                    <Ionicons name="location" size={16} color="#F44336" />
                    <Text style={styles.locationText}>{order.to}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceText}>¥{order.price.toFixed(2)}</Text>
                    {order.补贴 && (
                      <View style={styles.subsidyTag}>
                        <Text style={styles.subsidyText}>平台补贴{order.补贴}元</Text>
                      </View>
                    )}
                  </View>
                </View>
                <TouchableOpacity style={styles.acceptButton} onPress={() => handleAcceptOrder(order.id)}>
                  <Text style={styles.acceptButtonText}>立即接单</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={64} color="#CCCCCC" />
              <Text style={styles.emptyText}>暂无可用订单</Text>
              <Text style={styles.emptySubtext}>请稍后再试</Text>
            </View>
          )
        ) : (
          myOrders.length > 0 ? (
            myOrders.map((order) => (
              <TouchableOpacity 
                key={order.id} 
                style={styles.orderItem}
                onPress={() => handleOrderPress(order)}
              >
                <View style={styles.orderInfo}>
                  <View style={styles.statusRow}>
                    <View style={[styles.statusTag, order.status === '已接单' ? styles.statusPending : order.status === '配送中' ? styles.statusDelivering : styles.statusCompleted]}>
                      <Text style={styles.statusText}>{order.status}</Text>
                    </View>
                    <Text style={styles.distanceText}>距您{order.distance}</Text>
                  </View>
                  <View style={styles.locationRow}>
                    <Ionicons name="location" size={16} color="#4CAF50" />
                    <Text style={styles.locationText}>{order.from}</Text>
                  </View>
                  <View style={styles.locationRow}>
                    <Ionicons name="location" size={16} color="#F44336" />
                    <Text style={styles.locationText}>{order.to}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceText}>¥{order.price.toFixed(2)}</Text>
                    {order.补贴 && (
                      <View style={styles.subsidyTag}>
                        <Text style={styles.subsidyText}>平台补贴{order.补贴}元</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.actionButtons}>
                  {order.status === '已接单' && (
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleUpdateOrderStatus(order.id, '配送中')}
                    >
                      <Text style={styles.actionButtonText}>开始配送</Text>
                    </TouchableOpacity>
                  )}
                  {order.status === '配送中' && (
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleUpdateOrderStatus(order.id, '已完成')}
                    >
                      <Text style={styles.actionButtonText}>完成订单</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={64} color="#CCCCCC" />
              <Text style={styles.emptyText}>暂无订单</Text>
              <Text style={styles.emptySubtext}>您还没有接取任何订单</Text>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  banner: {
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
  bannerTags: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666666',
  },
  joinButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FF6B00',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  ordersList: {
    padding: 16,
  },
  orderItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    color: '#999999',
  },
  orderItemActive: {
    backgroundColor: '#FF6B00',
  },
  orderItemActiveText: {
    color: '#FFFFFF',
  },
  orderInfo: {
    flex: 1,
    marginRight: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusDelivering: {
    backgroundColor: '#E3F2FD',
  },
  statusCompleted: {
    backgroundColor: '#E8F5E8',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
  },
  subsidyTag: {
    backgroundColor: '#FFF3E0',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  subsidyText: {
    fontSize: 12,
    color: '#FF9800',
  },
  acceptButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  actionButtons: {
    alignItems: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    marginTop: 8,
  },
  mapContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    height: 200,
  },
  map: {
    flex: 1,
  },
  mapOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  mapOverlayText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mapOverlaySubtext: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 2,
  },

});
