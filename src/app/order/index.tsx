import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export type OrderType = {
  id: string;
  status: string;
  type: string;
  from: string;
  to: string;
  time: string;
  price: string;
};

// 模拟订单数据
const mockOrders: OrderType[] = [
  {
    id: '1',
    status: '已完成',
    type: '小型拉货',
    from: '北京市朝阳区望京SOHO',
    to: '北京市海淀区中关村',
    time: '2024-01-15 14:30',
    price: '85',
  },
  {
    id: '2',
    status: '进行中',
    type: '中型拉货',
    from: '北京市东城区王府井',
    to: '北京市西城区金融街',
    time: '2024-01-15 10:15',
    price: '120',
  },
  {
    id: '3',
    status: '已完成',
    type: '搬家服务',
    from: '北京市丰台区丽泽桥',
    to: '北京市昌平区回龙观',
    time: '2024-01-14 09:00',
    price: '350',
  },
];

const OrderScreen = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderType[]>(mockOrders);

  const renderOrderItem = ({ item }: { item: OrderType }) => {
    return (
      <TouchableOpacity 
        style={styles.orderCard} 
        onPress={() => router.push({
          pathname: '/order/order-detail',
          params: { 
            id: item.id,
            status: item.status,
            type: item.type,
            from: item.from,
            to: item.to,
            time: item.time,
            price: item.price
          }
        })}
      >
        <View style={styles.orderHeader}>
          <View style={styles.orderTypeContainer}>
            <Text style={styles.orderType}>{item.type}</Text>
          </View>
          <Text style={[styles.orderStatus, { color: item.status === '已完成' ? '#4CAF50' : '#FF6B00' }]}>
            {item.status}
          </Text>
        </View>
        
        <View style={styles.orderContent}>
          <View style={styles.locationItem}>
            <View style={styles.locationIcon}>
              <Ionicons name="location" size={16} color="#FF6B00" />
            </View>
            <Text style={styles.locationText}>{item.from}</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Ionicons name="chevron-down" size={16} color="#999" />
          </View>
          <View style={styles.locationItem}>
            <View style={styles.locationIcon}>
              <Ionicons name="location" size={16} color="#FF6B00" />
            </View>
            <Text style={styles.locationText}>{item.to}</Text>
          </View>
        </View>
        
        <View style={styles.orderFooter}>
          <Text style={styles.orderTime}>{item.time}</Text>
          <Text style={styles.orderPrice}>¥{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderTypeContainer: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  orderType: {
    fontSize: 12,
    color: '#FF6B00',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderContent: {
    marginBottom: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  arrowContainer: {
    marginLeft: 12,
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  orderTime: {
    fontSize: 12,
    color: '#999',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
});

export default OrderScreen;