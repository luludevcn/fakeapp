import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
    setTimeout(() => {
      setLoading(false);
      Alert.alert('成功', '提现申请已提交，预计1-2个工作日到账');
      router.back();
    }, 1500);
  };

  const quickAmounts = [50, 100, 500, 1000];

  return (
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">提现</Text>
        <View className="w-10" />
      </View>

      <View className="p-4">
        {/* 可用余额 */}
        <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="text-sm text-gray-600 mb-1">可用余额</Text>
          <Text className="text-xl font-bold text-gray-800">¥{availableBalance.toFixed(2)}</Text>
        </View>

        {/* 提现金额 */}
        <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="text-sm text-gray-600 mb-2">提现金额</Text>
          <TextInput
            className="border border-gray-200 rounded-lg p-3 text-base text-gray-800 mb-4"
            placeholder="请输入提现金额"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <View className="flex-row justify-between">
            {quickAmounts.map((quickAmount) => (
              <TouchableOpacity 
                key={quickAmount}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg items-center mx-1"
                onPress={() => setAmount(quickAmount.toString())}
              >
                <Text className="text-sm text-gray-800">¥{quickAmount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 提现账户 */}
        <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="text-sm text-gray-600 mb-2">银行卡号</Text>
          <TextInput
            className="border border-gray-200 rounded-lg p-3 text-base text-gray-800"
            placeholder="请输入银行卡号"
            placeholderTextColor="#999999"
            value={account}
            onChangeText={setAccount}
          />
        </View>

        {/* 提现按钮 */}
        <TouchableOpacity 
          className={`py-4 rounded-lg items-center mt-2 ${loading ? 'bg-gray-400' : 'bg-orange-500'}`}
          onPress={handleWithdraw}
          disabled={loading}
        >
          <Text className="text-white text-base font-bold">{loading ? '处理中...' : '确认提现'}</Text>
        </TouchableOpacity>

        {/* 提示信息 */}
        <Text className="text-xs text-gray-400 text-center mt-4">* 提现到账时间：1-2个工作日</Text>
        <Text className="text-xs text-gray-400 text-center mt-2">* 提现手续费：每笔2元</Text>
      </View>
    </ScrollView>
  );
}
