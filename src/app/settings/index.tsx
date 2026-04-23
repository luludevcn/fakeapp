import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      '退出登录',
      '确定要退出登录吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          style: 'destructive',
          onPress: () => {
            setUser(null);
            router.replace('/auth/login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleAbout = () => {
    Alert.alert('关于', '快狗打车司机端 v1.0.0\n\n为司机提供便捷的接单和管理功能');
  };

  const handlePrivacy = () => {
    Alert.alert('隐私政策', '我们重视您的隐私，所有数据都会被严格保护');
  };

  const handleTerms = () => {
    Alert.alert('用户协议', '使用本应用即表示您同意我们的用户协议');
  };

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>设置</Text>
        <View style={styles.placeholder} />
        </View>
      </SafeAreaView>

      {/* 设置选项 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>通知设置</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>推送通知</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>隐私设置</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>位置服务</Text>
          <Switch
            value={location}
            onValueChange={setLocation}
            trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>外观设置</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>深色模式</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#E5E5EA', true: '#4CAF50' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>账户设置</Text>
        <TouchableOpacity style={styles.settingItem} onPress={handlePrivacy}>
          <Text style={styles.settingText}>隐私政策</Text>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={handleTerms}>
          <Text style={styles.settingText}>用户协议</Text>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
          <Text style={styles.settingText}>关于我们</Text>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/settings/faq')}>
          <Text style={styles.settingText}>常见问题</Text>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>
      </View>

      {/* 退出登录按钮 */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>退出登录</Text>
      </TouchableOpacity>
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
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#999999',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingText: {
    fontSize: 16,
    color: '#333333',
  },
  logoutButton: {
    marginTop: 32,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  logoutText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: 'bold',
  },
});