import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';

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
      // 模拟API请求
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
    <View style={styles.container}>
      {/* 顶部logo */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://picsum.photos/200/100' }} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>快狗打车司机端</Text>
      </View>

      {/* 登录/注册表单 */}
      <View style={styles.form}>
        {/* 切换按钮 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, isLogin && styles.activeTab]} 
            onPress={() => setIsLogin(true)}
          >
            <Text style={[styles.tabText, isLogin && styles.activeTabText]}>登录</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, !isLogin && styles.activeTab]} 
            onPress={() => setIsLogin(false)}
          >
            <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>注册</Text>
          </TouchableOpacity>
        </View>

        {/* 手机号输入 */}
        <View style={styles.inputContainer}>
          <Ionicons name="call" size={20} color="#999999" />
          <TextInput
            style={styles.input}
            placeholder="请输入手机号"
            placeholderTextColor="#999999"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* 密码输入 */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color="#999999" />
          <TextInput
            style={styles.input}
            placeholder="请输入密码"
            placeholderTextColor="#999999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* 登录/注册按钮 */}
        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>{loading ? '处理中...' : (isLogin ? '登录' : '注册')}</Text>
        </TouchableOpacity>

        {/* 忘记密码 */}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>忘记密码？</Text>
        </TouchableOpacity>
      </View>

      {/* 底部提示 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>登录即表示同意</Text>
        <TouchableOpacity>
          <Text style={styles.footerLink}>《用户协议》</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>和</Text>
        <TouchableOpacity>
          <Text style={styles.footerLink}>《隐私政策》</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B00',
  },
  tabText: {
    fontSize: 16,
    color: '#666666',
  },
  activeTabText: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingVertical: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333333',
  },
  submitButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#666666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
  },
  footerLink: {
    fontSize: 12,
    color: '#FF6B00',
  },
});