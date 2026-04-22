import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Withdraw() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const availableBalance = 10384.80;

  const handleWithdraw = () => {
    if (!amount || !account) {
      Alert.alert('提示', '请输入提现金额和银行卡号');
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      Alert.alert('提示', '请输入有效的提现金额');
      return;
    }

    if (withdrawAmount > availableBalance) {
      Alert.alert('提示', '提现金额不能超过可用余额');
      return;
    }

    setLoading(true);
    try {
      // 模拟提现操作
      setTimeout(() => {
        setLoading(false);
        Alert.alert('成功', '提现申请已提交，预计1-2个工作日到账');
        router.back();
      }, 1500);
    } catch (error) {
      setLoading(false);
      Alert.alert('错误', '提现失败，请重试');
    }
  };

  const quickAmounts = [50, 100, 500, 1000];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>提现</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* 可用余额 */}
        <View style={styles.balanceInfo}>
          <Text style={styles.balanceLabel}>可用余额</Text>
          <Text style={styles.balanceAmount}>¥{availableBalance.toFixed(2)}</Text>
        </View>

        {/* 提现金额 */}
        <View style={styles.amountSection}>
          <Text style={styles.label}>提现金额</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="请输入提现金额"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <View style={styles.quickAmounts}>
            {quickAmounts.map((quickAmount) => (
              <TouchableOpacity 
                key={quickAmount}
                style={styles.quickAmountItem}
                onPress={() => setAmount(quickAmount.toString())}
              >
                <Text style={styles.quickAmountText}>¥{quickAmount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 提现账户 */}
        <View style={styles.accountSection}>
          <Text style={styles.label}>银行卡号</Text>
          <TextInput
            style={styles.accountInput}
            placeholder="请输入银行卡号"
            placeholderTextColor="#999999"
            value={account}
            onChangeText={setAccount}
          />
        </View>

        {/* 提现按钮 */}
        <TouchableOpacity 
          style={[styles.withdrawButton, loading && styles.disabledButton]}
          onPress={handleWithdraw}
          disabled={loading}
        >
          <Text style={styles.withdrawButtonText}>{loading ? '处理中...' : '确认提现'}</Text>
        </TouchableOpacity>

        {/* 提示信息 */}
        <Text style={styles.tipText}>* 提现到账时间：1-2个工作日</Text>
        <Text style={styles.tipText}>* 提现手续费：每笔2元</Text>
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
  content: {
    padding: 16,
  },
  balanceInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  amountSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountItem: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  quickAmountText: {
    fontSize: 14,
    color: '#333333',
  },
  accountSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  accountInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
  },
  withdrawButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 16,
  },
});