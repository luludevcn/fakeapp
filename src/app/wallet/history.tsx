import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  time: string;
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 328.85,
    description: '订单收入',
    time: '10:30',
    date: '2026-04-21',
  },
  {
    id: '2',
    type: 'expense',
    amount: 50,
    description: '提现',
    time: '09:15',
    date: '2026-04-21',
  },
  {
    id: '3',
    type: 'income',
    amount: 74.40,
    description: '订单收入',
    time: '18:45',
    date: '2026-04-20',
  },
  {
    id: '4',
    type: 'income',
    amount: 150.00,
    description: '奖励金',
    time: '14:20',
    date: '2026-04-20',
  },
  {
    id: '5',
    type: 'expense',
    amount: 100,
    description: '提现',
    time: '11:00',
    date: '2026-04-19',
  },
];

export default function WalletHistory() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [selectedDate, setSelectedDate] = useState('全部');

  const dates = ['全部', '2026-04-21', '2026-04-20', '2026-04-19'];

  const filteredTransactions = selectedDate === '全部' 
    ? transactions 
    : transactions.filter(t => t.date === selectedDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>钱包明细</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 日期筛选 */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.dateFilter}
      >
        {dates.map((date) => (
          <TouchableOpacity
            key={date}
            style={[styles.dateItem, selectedDate === date && styles.selectedDateItem]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>
              {date === '全部' ? '全部' : date.replace('-', '/').substring(5)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 交易列表 */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, item.type === 'income' ? styles.incomeIcon : styles.expenseIcon]}>
                <Ionicons 
                  name={item.type === 'income' ? 'arrow-down' : 'arrow-up'} 
                  size={20} 
                  color="#FFFFFF" 
                />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDescription}>{item.description}</Text>
                <Text style={styles.transactionTime}>{item.time} {item.date}</Text>
              </View>
            </View>
            <Text style={[styles.transactionAmount, item.type === 'income' ? styles.incomeAmount : styles.expenseAmount]}>
              {item.type === 'income' ? '+' : '-'}{item.amount.toFixed(2)}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#CCCCCC" />
            <Text style={styles.emptyText}>暂无交易记录</Text>
          </View>
        }
      />
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
  dateFilter: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  dateItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  selectedDateItem: {
    backgroundColor: '#FF6B00',
  },
  dateText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedDateText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  incomeIcon: {
    backgroundColor: '#4CAF50',
  },
  expenseIcon: {
    backgroundColor: '#F44336',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  transactionTime: {
    fontSize: 14,
    color: '#999999',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  incomeAmount: {
    color: '#4CAF50',
  },
  expenseAmount: {
    color: '#F44336',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    marginTop: 16,
  },
});