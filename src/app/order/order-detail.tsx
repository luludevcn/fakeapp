import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

export type OrderType = {
  id: string;
  status: string;
  type: string;
  from: string;
  to: string;
  time: string;
  price: string;
};

const OrderDetailScreen = () => {
  const params = useLocalSearchParams();
  
  // 从参数中获取订单数据
  const order: OrderType = {
    id: params.id as string || '1',
    status: params.status as string || '待接单',
    type: params.type as string || '小型拉货',
    from: params.from as string || '北京市朝阳区望京SOHO',
    to: params.to as string || '北京市海淀区中关村',
    time: params.time as string || new Date().toLocaleString('zh-CN'),
    price: params.price as string || '85',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 订单状态 */}
        <View style={[styles.statusContainer, { backgroundColor: order.status === '已完成' ? '#E8F5E8' : '#FFF3E0' }]}>
          <Ionicons 
            name={order.status === '已完成' ? 'checkmark-circle-outline' : 'time-outline'} 
            size={24} 
            color={order.status === '已完成' ? '#4CAF50' : '#FF6B00'} 
          />
          <Text style={[styles.statusText, { color: order.status === '已完成' ? '#4CAF50' : '#FF6B00' }]}>
            {order.status}
          </Text>
          <Text style={styles.statusSubtext}>
            {order.status === '已完成' ? '订单已完成' : '正在为您寻找司机...'}
          </Text>
        </View>

        {/* 订单信息 */}
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>订单信息</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>订单编号</Text>
            <Text style={styles.infoValue}>#{order.id}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>服务类型</Text>
            <View style={styles.typeTag}>
              <Text style={styles.typeText}>{order.type}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>下单时间</Text>
            <Text style={styles.infoValue}>{order.time}</Text>
          </View>
        </View>

        {/* 路线信息 */}
        <View style={styles.routeContainer}>
          <Text style={styles.sectionTitle}>路线信息</Text>
          
          <View style={styles.routeItem}>
            <View style={[styles.routeIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="location" size={16} color="#FF6B00" />
            </View>
            <Text style={styles.routeText}>{order.from}</Text>
          </View>
          
          <View style={styles.routeArrow}>
            <Ionicons name="chevron-down" size={16} color="#999" />
          </View>
          
          <View style={styles.routeItem}>
            <View style={[styles.routeIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="location" size={16} color="#FF6B00" />
            </View>
            <Text style={styles.routeText}>{order.to}</Text>
          </View>
        </View>

        {/* 价格信息 */}
        <View style={styles.priceContainer}>
          <Text style={styles.sectionTitle}>价格信息</Text>
          
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>起步价</Text>
            <Text style={styles.priceValue}>¥30</Text>
          </View>
          
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>里程费</Text>
            <Text style={styles.priceValue}>¥45</Text>
          </View>
          
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>时长费</Text>
            <Text style={styles.priceValue}>¥10</Text>
          </View>
          
          <View style={[styles.priceItem, styles.totalPrice]}>
            <Text style={styles.totalPriceLabel}>总计</Text>
            <Text style={styles.totalPriceValue}>¥{order.price}</Text>
          </View>
        </View>

        {/* 操作按钮 */}
        {order.status !== '已完成' && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
              <Text style={styles.cancelButtonText}>取消订单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.contactButton]}>
              <Text style={styles.contactButtonText}>联系客服</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  statusSubtext: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  infoContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
  },
  typeTag: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    color: '#FF6B00',
  },
  routeContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 10,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  routeArrow: {
    marginLeft: 12,
    marginVertical: 8,
  },
  priceContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 20,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
  },
  totalPrice: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPriceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  contactButton: {
    backgroundColor: '#FF6B00',
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderDetailScreen;