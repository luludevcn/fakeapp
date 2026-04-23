import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpoGaodeMapModule from 'expo-gaode-map';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PrivacyPolicy() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAgree = async () => {
    setIsLoading(true);
    try {
      // 存储用户同意隐私协议的状态
      await AsyncStorage.setItem('privacy_agreed', 'true');

      // 初始化高德地图隐私配置
      const privacyStatus = ExpoGaodeMapModule.getPrivacyStatus();
      if (!privacyStatus.isReady) {
        ExpoGaodeMapModule.setPrivacyConfig({
          hasShow: true,
          hasContainsPrivacy: true,
          hasAgree: true,
          privacyVersion: '2026-04-23'
        });
      }

      // 导航到登录页面
      router.replace('/auth/login');
    } catch (error) {
      Alert.alert('错误', '保存同意状态失败，请重试');
      setIsLoading(false);
    }
  };

  const handleDisagree = () => {
    Alert.alert(
      '提示',
      '必须同意隐私协议才能使用本应用',
      [{ text: '确定', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>隐私协议</Text>
        <Text style={styles.subtitle}>请仔细阅读并同意以下隐私协议</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>1. 隐私政策</Text>
        <Text style={styles.paragraph}>
          快狗打车致力于保护您的隐私。我们收集的信息仅用于提供和改进我们的服务，包括但不限于：
        </Text>
        <Text style={styles.paragraph}>
          - 您的位置信息：用于显示附近的订单和导航
          - 您的个人信息：用于身份验证和账户管理
          - 您的订单信息：用于提供服务和处理支付
        </Text>

        <Text style={styles.sectionTitle}>2. 高德地图服务</Text>
        <Text style={styles.paragraph}>
          本应用使用高德地图服务，高德地图可能会收集和处理您的位置信息。请参阅高德地图的隐私政策。
        </Text>

        <Text style={styles.sectionTitle}>3. 数据安全</Text>
        <Text style={styles.paragraph}>
          我们采取合理的安全措施保护您的个人信息，防止未授权访问、使用或披露。
        </Text>

        <Text style={styles.sectionTitle}>4. 用户权利</Text>
        <Text style={styles.paragraph}>
          您有权访问、修改或删除您的个人信息，如需帮助，请联系我们的客服。
        </Text>

        <Text style={styles.sectionTitle}>5. 协议更新</Text>
        <Text style={styles.paragraph}>
          我们可能会不时更新本隐私协议，更新后的协议将在应用中发布。
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.disagreeButton]}
          onPress={handleDisagree}
          disabled={isLoading}
        >
          <Text style={styles.disagreeButtonText}>不同意</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.agreeButton]}
          onPress={handleAgree}
          disabled={isLoading}
        >
          <Text style={styles.agreeButtonText}>
            {isLoading ? '处理中...' : '同意并继续'}
          </Text>
        </TouchableOpacity>
      </View>
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
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
    marginBottom: 16,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disagreeButton: {
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  disagreeButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  agreeButton: {
    backgroundColor: '#FF6B00',
    marginLeft: 12,
  },
  agreeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});