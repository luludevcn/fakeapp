import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Wallet() {
  const router = useRouter();
  // 模拟钱包数据
  const walletData = {
    balance: 10384.80,
    todayIncome: 328.85,
    thisWeekIncome: 1560.20,
    thisMonthIncome: 5800.00,
  };

  const menuItems = [
    { id: '1', name: '钱包明细', icon: 'list', onPress: () => router.push('/wallet/history') },
    { id: '2', name: '提现', icon: 'cash', onPress: () => router.push('/wallet/withdraw') },
    { id: '3', name: '收入报表', icon: 'bar-chart', onPress: () => router.push('/wallet/report') },
    { id: '4', name: '发票管理', icon: 'document-text', onPress: () => console.log('发票管理') },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>我的钱包</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 余额卡片 */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>可用余额</Text>
        <Text style={styles.balanceAmount}>¥{walletData.balance.toFixed(2)}</Text>
        <View style={styles.incomeInfo}>
          <View style={styles.incomeItem}>
            <Text style={styles.incomeLabel}>今日收入</Text>
            <Text style={styles.incomeAmount}>¥{walletData.todayIncome.toFixed(2)}</Text>
          </View>
          <View style={styles.incomeDivider} />
          <View style={styles.incomeItem}>
            <Text style={styles.incomeLabel}>本周收入</Text>
            <Text style={styles.incomeAmount}>¥{walletData.thisWeekIncome.toFixed(2)}</Text>
          </View>
          <View style={styles.incomeDivider} />
          <View style={styles.incomeItem}>
            <Text style={styles.incomeLabel}>本月收入</Text>
            <Text style={styles.incomeAmount}>¥{walletData.thisMonthIncome.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* 功能菜单 */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.onPress}>
            <View style={styles.menuLeft}>
              <Ionicons name={item.icon as any} size={24} color="#666666" />
              <Text style={styles.menuText}>{item.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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
  balanceCard: {
    backgroundColor: '#FF6B00',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  incomeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incomeItem: {
    flex: 1,
  },
  incomeLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  incomeAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  incomeDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
});