import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { ExpoGaodeMapModule, MapView, Marker, Polyline } from 'expo-gaode-map';
import { PermissionStatus } from 'expo-modules-core';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      // 刷新订单数据
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
      // 刷新订单数据
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

  if (!order) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 头部 */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.title}>订单详情</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>

      {/* 订单状态 */}
      <View style={[styles.statusCard, order.status === '待接单' ? styles.statusPending : order.status === '配送中' ? styles.statusDelivering : styles.statusCompleted]}>
        <Text style={styles.statusText}>{order.status}</Text>
        <Text style={styles.statusDescription}>
          {order.status === '待接单' && '等待司机接单'}
          {order.status === '已接单' && '司机已接单，准备出发'}
          {order.status === '配送中' && '货物正在配送中'}
          {order.status === '已完成' && '订单已完成'}
        </Text>
      </View>

      {/* 订单基本信息 */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>订单号</Text>
          <Text style={styles.infoValue}>#{order.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>订单类型</Text>
          <Text style={styles.infoValue}>{order.type}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>距离</Text>
          <Text style={styles.infoValue}>{order.distance}</Text>
        </View>
      </View>

      {/* 地图路线 */}
      <View style={styles.mapCard}>
        <Text style={styles.mapTitle}>行驶路线</Text>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialCameraPosition={{
              target: {
                latitude: (order.fromLat || location.latitude + 0.01),
                longitude: (order.fromLng || location.longitude + 0.01),
              },
              zoom: 14
            }}
            myLocationEnabled
          >
            {/* 起点标记 */}
            <Marker
              position={{
                latitude: order.fromLat || location.latitude + 0.02,
                longitude: order.fromLng || location.longitude + 0.02,
              }}
              title={order.from}
              icon="https://api.map.baidu.com/lbsapi/createmap/images/poi-marker-green.png"
            />

            {/* 终点标记 */}
            <Marker
              position={{
                latitude: order.toLat || location.latitude + 0.04,
                longitude: order.toLng || location.longitude + 0.04,
              }}
              title={order.to}
              icon="https://api.map.baidu.com/lbsapi/createmap/images/poi-marker-red.png"
            />

            {/* 路线 */}
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
              colors={['#4ff321ff']} // 线条颜色
              strokeWidth={5}
            />
          </MapView>
        </View>
      </View>

      {/* 地址信息 */}
      <View style={styles.addressCard}>
        <View style={styles.addressItem}>
          <View style={[styles.addressIcon, styles.fromIcon]}>
            <Ionicons name="location" size={16} color="#FFFFFF" />
          </View>
          <View style={styles.addressContent}>
            <Text style={styles.addressLabel}>起点</Text>
            <Text style={styles.addressText}>{order.from}</Text>
          </View>
        </View>
        <View style={styles.addressDivider} />
        <View style={styles.addressItem}>
          <View style={[styles.addressIcon, styles.toIcon]}>
            <Ionicons name="location" size={16} color="#FFFFFF" />
          </View>
          <View style={styles.addressContent}>
            <Text style={styles.addressLabel}>终点</Text>
            <Text style={styles.addressText}>{order.to}</Text>
          </View>
        </View>
      </View>

      {/* 价格信息 */}
      <View style={styles.priceCard}>
        <Text style={styles.priceTitle}>费用明细</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>基础费用</Text>
          <Text style={styles.priceValue}>¥{order.price.toFixed(2)}</Text>
        </View>
        {order.补贴 && (
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>平台补贴</Text>
            <Text style={styles.subsidyValue}>+¥{order.补贴.toFixed(2)}</Text>
          </View>
        )}
        <View style={[styles.priceRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>总计</Text>
          <Text style={styles.totalValue}>¥{(order.price + (order.补贴 || 0)).toFixed(2)}</Text>
        </View>
      </View>

      {/* 操作按钮 */}
      <View style={styles.actionContainer}>
        {order.status === '待接单' && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => handleAcceptOrder()}
          >
            <Text style={styles.primaryButtonText}>立即接单</Text>
          </TouchableOpacity>
        )}
        {order.status === '已接单' && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => handleUpdateOrderStatus('配送中')}
          >
            <Text style={styles.primaryButtonText}>开始配送</Text>
          </TouchableOpacity>
        )}
        {order.status === '配送中' && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.primaryButton, styles.navButton]}
              onPress={() => router.push('/navigation')}
            >
              <Ionicons name="navigate" size={20} color="#FFFFFF" />
              <Text style={styles.navButtonText}>开始导航</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.primaryButton, styles.completeButton]}
              onPress={() => handleUpdateOrderStatus('已完成')}
            >
              <Text style={styles.primaryButtonText}>完成订单</Text>
            </TouchableOpacity>
          </View>
        )}
        {order.status === '已完成' && !order.rating && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push(`/order/rate?id=${order.id}`)}
          >
            <Text style={styles.primaryButtonText}>评价订单</Text>
          </TouchableOpacity>
        )}
        {order.status === '已完成' && order.rating && (
          <View style={styles.ratedContainer}>
            <Text style={styles.ratedText}>已评价</Text>
            <View style={styles.ratedStars}>
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
          <View style={styles.secondaryButtons}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>联系客户</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleCancelOrder}>
              <Text style={styles.secondaryButtonText}>取消订单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleComplaint}>
              <Text style={styles.secondaryButtonText}>投诉</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
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
  placeholder: {
    width: 40,
  },
  statusCard: {
    margin: 16,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 14,
    color: '#666666',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
  },
  mapCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  fromIcon: {
    backgroundColor: '#4CAF50',
  },
  toIcon: {
    backgroundColor: '#F44336',
  },
  addressContent: {
    flex: 1,
    marginLeft: 12,
  },
  addressLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  addressDivider: {
    height: 30,
    width: 1,
    backgroundColor: '#E5E5EA',
    marginLeft: 11,
    marginVertical: 8,
  },
  priceCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333333',
  },
  subsidyValue: {
    fontSize: 14,
    color: '#4CAF50',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
  },
  actionContainer: {
    padding: 16,
  },
  primaryButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  completeButton: {
    flex: 1,
    marginLeft: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  secondaryButton: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginHorizontal: 4,
    marginVertical: 4,
  },
  secondaryButtonText: {
    color: '#666666',
    fontSize: 14,
  },
  ratedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  ratedText: {
    fontSize: 16,
    color: '#666666',
    marginRight: 8,
  },
  ratedStars: {
    flexDirection: 'row',
  },
});