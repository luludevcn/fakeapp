import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface BidOrder {
  id: string;
  from: string;
  to: string;
  distance: string;
  weight: string;
  volume: string;
  price: number;
  type: string;
  time: string;
  description: string;
}

export default function Bidding() {
  const router = useRouter();
  const { user } = useAppStore();
  const [selectedOrder, setSelectedOrder] = useState<BidOrder | null>(null);
  const [bidPrice, setBidPrice] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);

  // 模拟投标订单列表
  const biddingOrders: BidOrder[] = [
    {
      id: '1',
      from: '北京市朝阳区望京 SOHO',
      to: '北京市海淀区中关村',
      distance: '15.2km',
      weight: '500kg',
      volume: '2m³',
      price: 150,
      type: '搬运',
      time: '2024-01-15 14:00',
      description: '需要搬运办公家具，有电梯'
    },
    {
      id: '2',
      from: '上海市浦东新区陆家嘴',
      to: '上海市黄浦区外滩',
      distance: '8.5km',
      weight: '200kg',
      volume: '1m³',
      price: 120,
      type: '配送',
      time: '2024-01-15 16:00',
      description: '文件配送，需要准时送达'
    },
    {
      id: '3',
      from: '广州市天河区珠江新城',
      to: '广州市海珠区琶洲',
      distance: '12.3km',
      weight: '800kg',
      volume: '3m³',
      price: 200,
      type: '搬运',
      time: '2024-01-16 09:00',
      description: '搬运家电，需要帮忙拆装'
    }
  ];

  const handleBidPress = (order: BidOrder) => {
    setSelectedOrder(order);
    setBidPrice(order.price.toString());
    setShowBidModal(true);
  };

  const handleSubmitBid = () => {
    if (!bidPrice || isNaN(Number(bidPrice))) {
      Alert.alert('提示', '请输入有效的投标价格');
      return;
    }

    if (Number(bidPrice) < 0) {
      Alert.alert('提示', '投标价格不能为负数');
      return;
    }

    Alert.alert(
      '确认投标',
      `您确定的投标价格是 ¥${bidPrice}，一旦中标将不能修改。`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确认',
          onPress: () => {
            Alert.alert('成功', '投标已提交，请等待客户确认');
            setShowBidModal(false);
            setSelectedOrder(null);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>投标大厅</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 统计信息 */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{biddingOrders.length}</Text>
          <Text style={styles.statLabel}>可投标订单</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>我的投标</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>已中标</Text>
        </View>
      </View>

      {/* 订单列表 */}
      <ScrollView style={styles.ordersList} showsVerticalScrollIndicator={false}>
        {biddingOrders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() => handleBidPress(order)}
          >
            <View style={styles.orderHeader}>
              <View style={styles.orderType}>
                <Text style={styles.orderTypeText}>{order.type}</Text>
              </View>
              <Text style={styles.orderTime}>{order.time}</Text>
            </View>

            <View style={styles.orderRoute}>
              <View style={styles.routeItem}>
                <View style={[styles.routeDot, styles.fromDot]} />
                <Text style={styles.routeText} numberOfLines={1}>{order.from}</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routeItem}>
                <View style={[styles.routeDot, styles.toDot]} />
                <Text style={styles.routeText} numberOfLines={1}>{order.to}</Text>
              </View>
            </View>

            <View style={styles.orderInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>距离</Text>
                <Text style={styles.infoValue}>{order.distance}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>重量</Text>
                <Text style={styles.infoValue}>{order.weight}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>体积</Text>
                <Text style={styles.infoValue}>{order.volume}</Text>
              </View>
            </View>

            <View style={styles.orderDescription}>
              <Text style={styles.descriptionText}>{order.description}</Text>
            </View>

            <View style={styles.orderFooter}>
              <View style={styles.priceInfo}>
                <Text style={styles.priceLabel}>客户预算</Text>
                <Text style={styles.priceValue}>¥{order.price}</Text>
              </View>
              <TouchableOpacity style={styles.bidButton} onPress={() => handleBidPress(order)}>
                <Text style={styles.bidButtonText}>立即投标</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 投标弹窗 */}
      {showBidModal && selectedOrder && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>投标</Text>
              <TouchableOpacity onPress={() => setShowBidModal(false)}>
                <Ionicons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.orderSummary}>
                <Text style={styles.summaryLabel}>订单路线</Text>
                <Text style={styles.summaryValue}>{selectedOrder.from} → {selectedOrder.to}</Text>
              </View>

              <View style={styles.orderSummary}>
                <Text style={styles.summaryLabel}>客户预算</Text>
                <Text style={styles.summaryValue}>¥{selectedOrder.price}</Text>
              </View>

              <View style={styles.bidInput}>
                <Text style={styles.bidLabel}>您的投标价格</Text>
                <View style={styles.priceInputContainer}>
                  <Text style={styles.currencySymbol}>¥</Text>
                  <TextInput
                    style={styles.priceInput}
                    value={bidPrice}
                    onChangeText={setBidPrice}
                    keyboardType="numeric"
                    placeholder="请输入投标价格"
                    placeholderTextColor="#999999"
                  />
                </View>
                <Text style={styles.bidTip}>投标价格可以略低于客户预算以提高中标率</Text>
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowBidModal(false)}
              >
                <Text style={styles.cancelButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleSubmitBid}
              >
                <Text style={styles.submitButtonText}>确认投标</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
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
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 8,
  },
  ordersList: {
    flex: 1,
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderType: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  orderTypeText: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  orderTime: {
    fontSize: 12,
    color: '#999999',
  },
  orderRoute: {
    marginBottom: 12,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  fromDot: {
    backgroundColor: '#4CAF50',
  },
  toDot: {
    backgroundColor: '#F44336',
  },
  routeText: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: '#E5E5EA',
    marginLeft: 4,
    marginVertical: 4,
  },
  orderInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginRight: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999999',
    marginRight: 4,
  },
  infoValue: {
    fontSize: 12,
    color: '#333333',
  },
  orderDescription: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 20,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceInfo: {
    flexDirection: 'column',
  },
  priceLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F44336',
  },
  bidButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  bidButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '85%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalBody: {
    padding: 16,
  },
  orderSummary: {
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 14,
    color: '#333333',
  },
  bidInput: {
    marginTop: 8,
  },
  bidLabel: {
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  currencySymbol: {
    fontSize: 18,
    color: '#FF6B00',
    fontWeight: 'bold',
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
    fontSize: 18,
    color: '#333333',
  },
  bidTip: {
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#FF6B00',
    marginLeft: 12,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});