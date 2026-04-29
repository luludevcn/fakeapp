import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    if (!phone || !password) {
      Alert.alert('提示', '请输入手机号和密码');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟登录成功
      const mockUser = {
        id: '1',
        name: '张三',
        avatar: 'https://picsum.photos/100',
        level: '白银会员',
        balance: 10384.80,
      };

      setUser(mockUser);
      Alert.alert('成功', isLogin ? '登录成功' : '注册成功');
      router.replace('/');
    } catch (error) {
      Alert.alert('错误', '操作失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 px-5">
      {/* 顶部logo */}
      <View className="items-center mt-16 mb-10">
        <Image 
          source={{ uri: 'https://picsum.photos/200/100' }} 
          className="w-30 h-14 mb-4"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-gray-800">快狗打车司机端</Text>
      </View>

      {/* 登录/注册表单 */}
      <View className="bg-white rounded-lg p-5 shadow">
        {/* 切换按钮 */}
        <View className="flex-row mb-6">
          <TouchableOpacity 
            className={`flex-1 py-3 items-center ${isLogin ? 'border-b-2 border-orange-500' : ''}`} 
            onPress={() => setIsLogin(true)}
          >
            <Text className={`text-base ${isLogin ? 'text-orange-500 font-bold' : 'text-gray-600'}`}>登录</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-3 items-center ${!isLogin ? 'border-b-2 border-orange-500' : ''}`} 
            onPress={() => setIsLogin(false)}
          >
            <Text className={`text-base ${!isLogin ? 'text-orange-500 font-bold' : 'text-gray-600'}`}>注册</Text>
          </TouchableOpacity>
        </View>

        {/* 手机号输入 */}
        <View className="flex-row items-center border-b border-gray-200 py-3 mb-4">
          <Ionicons name="call" size={20} color="#999999" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-800"
            placeholder="请输入手机号"
            placeholderTextColor="#999999"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* 密码输入 */}
        <View className="flex-row items-center border-b border-gray-200 py-3">
          <Ionicons name="lock-closed" size={20} color="#999999" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-800"
            placeholder="请输入密码"
            placeholderTextColor="#999999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* 登录/注册按钮 */}
        <TouchableOpacity 
          className={`py-4 rounded-lg items-center mt-2 ${loading ? 'bg-gray-400' : 'bg-orange-500'}`}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-white text-base font-bold">{loading ? '处理中...' : (isLogin ? '登录' : '注册')}</Text>
        </TouchableOpacity>

        {/* 忘记密码 */}
        <TouchableOpacity className="items-center mt-4">
          <Text className="text-sm text-gray-600">忘记密码？</Text>
        </TouchableOpacity>
      </View>

      {/* 底部提示 */}
      <View className="flex-row justify-center items-center mt-10">
        <Text className="text-xs text-gray-400">登录即表示同意</Text>
        <TouchableOpacity>
          <Text className="text-xs text-orange-500">《用户协议》</Text>
        </TouchableOpacity>
        <Text className="text-xs text-gray-400">和</Text>
        <TouchableOpacity>
          <Text className="text-xs text-orange-500">《隐私政策》</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
