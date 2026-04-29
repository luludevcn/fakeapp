import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type PaymentMethod = 'alipay' | 'wechat' | 'bankcard';

interface PaymentConfig {
  id: string;
  type: PaymentMethod;
  name: string;
  icon: string;
  description: string;
  isDefault: boolean;
}

export default function PaymentSettings() {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<PaymentConfig[]>([
    {
      id: '1',
      type: 'alipay',
      name: '支付宝',
      icon: 'logo-alipay',
      description: '推荐',
      isDefault: true,
    },
    {
      id: '2',
      type: 'wechat',
      name: '微信支付',
      icon: 'logo-wechat',
      description: '便捷',
      isDefault: false,
    },
    {
      id: '3',
      type: 'bankcard',
      name: '银行卡',
      icon: 'card-outline',
      description: '安全',
      isDefault: false,
    },
  ]);

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('alipay');

  const handleSelectMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handleSetDefault = () => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.type === selectedMethod,
      }))
    );
    Alert.alert('成功', '默认支付方式已设置');
  };

  const handleAddPaymentMethod = () => {
    Alert.alert(
      '添加支付方式',
      '请选择要添加的支付方式',
      [
        { text: '支付宝', onPress: () => Alert.alert('提示', '支付宝已添加') },
        { text: '微信支付', onPress: () => Alert.alert('提示', '微信支付已添加') },
        { text: '银行卡', onPress: () => Alert.alert('提示', '请到钱包页面绑定银行卡') },
        { text: '取消', style: 'cancel' },
      ]
    );
  };

  const getPaymentIcon = (icon: string) => {
    switch (icon) {
      case 'logo-alipay':
        return 'logo-alipay';
      case 'logo-wechat':
        return 'logo-wechat';
      case 'card-outline':
        return 'card-outline';
      default:
        return 'cash-outline';
    }
  };

  const getPaymentIconColor = (type: PaymentMethod) => {
    switch (type) {
      case 'alipay':
        return '#1677FF';
      case 'wechat':
        return '#07C160';
      case 'bankcard':
        return '#FF6B00';
      default:
        return '#666666';
    }
  };

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.title}>支付设置</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 说明 */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color="#FF6B00" />
          <Text style={styles.infoText}>
            设置默认支付方式，提现时将优先使用该方式
          </Text>
        </View>

        {/* 支付方式列表 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>选择支付方式</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentItem,
                selectedMethod === method.type && styles.paymentItemSelected,
              ]}
              onPress={() => handleSelectMethod(method.type)}
            >
              <View style={[styles.paymentIcon, { backgroundColor: getPaymentIconColor(method.type) + '20' }]}>
                <Ionicons
                  name={getPaymentIcon(method.icon) as any}
                  size={24}
                  color={getPaymentIconColor(method.type)}
                />
              </View>
              <View style={styles.paymentInfo}>
                <View style={styles.paymentNameRow}>
                  <Text style={styles.paymentName}>{method.name}</Text>
                  {method.description && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{method.description}</Text>
                    </View>
                  )}
                  {method.isDefault && (
                    <View style={[styles.badge, styles.defaultBadge]}>
                      <Text style={styles.defaultBadgeText}>已开通</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.paymentDesc}>
                  {method.type === 'bankcard' ? '绑定银行卡，收款更安全' : '便捷收款，到账快速'}
                </Text>
              </View>
              <View style={styles.radio}>
                <Ionicons
                  name={selectedMethod === method.type ? 'radio-button-on' : 'radio-button-off'}
                  size={24}
                  color={selectedMethod === method.type ? '#FF6B00' : '#CCCCCC'}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 设为默认按钮 */}
        <TouchableOpacity style={styles.setDefaultButton} onPress={handleSetDefault}>
          <Text style={styles.setDefaultButtonText}>设为默认支付方式</Text>
        </TouchableOpacity>

        {/* 注意事项 */}
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>注意事项</Text>
          <View style={styles.noticeItem}>
            <Text style={styles.noticeBullet}>•</Text>
            <Text style={styles.noticeText}>
              默认支付方式将在提现时优先使用
            </Text>
          </View>
          <View style={styles.noticeItem}>
            <Text style={styles.noticeBullet}>•</Text>
            <Text style={styles.noticeText}>
              如需修改，请重新设置默认支付方式
            </Text>
          </View>
          <View style={styles.noticeItem}>
            <Text style={styles.noticeBullet}>•</Text>
            <Text style={styles.noticeText}>
              支付方式需先完成实名认证后才能使用
            </Text>
          </View>
        </View>
      </ScrollView>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 8,
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#999999',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  paymentItemSelected: {
    backgroundColor: '#FFF3E0',
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 10,
    color: '#2196F3',
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
  },
  defaultBadgeText: {
    fontSize: 10,
    color: '#4CAF50',
  },
  paymentDesc: {
    fontSize: 12,
    color: '#999999',
  },
  radio: {
    marginLeft: 12,
  },
  setDefaultButton: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: '#FF6B00',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  setDefaultButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  noticeCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  noticeItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  noticeBullet: {
    fontSize: 12,
    color: '#999999',
    marginRight: 8,
  },
  noticeText: {
    fontSize: 12,
    color: '#666666',
    flex: 1,
  },
});