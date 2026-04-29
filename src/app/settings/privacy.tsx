import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

export default function PrivacySettings() {
  const router = useRouter();
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [backgroundLocation, setBackgroundLocation] = useState(false);
  const [accurateLocation, setAccurateLocation] = useState(true);

  const handleToggleLocation = async (enabled: boolean) => {
    setLocationEnabled(enabled);
    if (!enabled) {
      Alert.alert(
        '提示',
        '关闭位置权限后，将无法使用导航和附近订单功能',
        [
          { text: '取消', onPress: () => setLocationEnabled(true) },
          { text: '确定', onPress: () => {} },
        ]
      );
    }
  };

  const handleToggleBackgroundLocation = (enabled: boolean) => {
    if (enabled && !backgroundLocation) {
      Alert.alert(
        '提示',
        '开启后台定位会增加电量消耗，但可以获得更精确的位置服务',
        [
          { text: '取消', onPress: () => setBackgroundLocation(false) },
          { text: '确定', onPress: () => setBackgroundLocation(true) },
        ]
      );
    } else {
      setBackgroundLocation(enabled);
    }
  };

  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  const handleCheckPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    let statusText = '未知';
    switch (status) {
      case 'granted':
        statusText = '已授权';
        break;
      case 'denied':
        statusText = '被拒绝';
        break;
      case 'undetermined':
        statusText = '未决定';
        break;
    }
    Alert.alert('位置权限状态', `当前位置权限：${statusText}`);
  };

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.title}>隐私设置</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 说明 */}
        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>您的隐私安全</Text>
            <Text style={styles.infoText}>
              我们非常重视您的隐私保护，所有位置数据仅用于提供服务和改善用户体验
            </Text>
          </View>
        </View>

        {/* 位置权限设置 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>位置权限</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingNameRow}>
                <Text style={styles.settingName}>位置服务</Text>
                <View style={[styles.statusBadge, locationEnabled ? styles.statusEnabled : styles.statusDisabled]}>
                  <Text style={[styles.statusText, locationEnabled ? styles.statusTextEnabled : styles.statusTextDisabled]}>
                    {locationEnabled ? '已开启' : '已关闭'}
                  </Text>
                </View>
              </View>
              <Text style={styles.settingDesc}>允许应用获取您的位置信息</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, locationEnabled && styles.toggleEnabled]}
              onPress={() => handleToggleLocation(!locationEnabled)}
            >
              <View style={[styles.toggleThumb, locationEnabled && styles.toggleThumbEnabled]} />
            </TouchableOpacity>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingNameRow}>
                <Text style={styles.settingName}>高精度定位</Text>
              </View>
              <Text style={styles.settingDesc}>使用 GPS、Wi-Fi 和移动网络定位</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, accurateLocation && styles.toggleEnabled]}
              onPress={() => setAccurateLocation(!accurateLocation)}
              disabled={!locationEnabled}
            >
              <View style={[styles.toggleThumb, accurateLocation && styles.toggleThumbEnabled]} />
            </TouchableOpacity>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingNameRow}>
                <Text style={styles.settingName}>后台位置</Text>
              </View>
              <Text style={styles.settingDesc}>允许应用在后台获取位置</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, backgroundLocation && styles.toggleEnabled]}
              onPress={() => handleToggleBackgroundLocation(!backgroundLocation)}
              disabled={!locationEnabled}
            >
              <View style={[styles.toggleThumb, backgroundLocation && styles.toggleThumbEnabled]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 系统权限设置 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>系统权限</Text>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleCheckPermission}>
            <Text style={styles.actionText}>查看权限状态</Text>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleOpenSettings}>
            <Text style={styles.actionText}>打开系统设置</Text>
            <Ionicons name="open-outline" size={20} color="#999999" />
          </TouchableOpacity>
        </View>

        {/* 数据管理 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>数据管理</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionText}>清除位置历史</Text>
            <Ionicons name="trash-outline" size={20} color="#999999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionText}>查看隐私政策</Text>
            <Ionicons name="document-text-outline" size={20} color="#999999" />
          </TouchableOpacity>
        </View>

        {/* 温馨提示 */}
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>温馨提示</Text>
          <View style={styles.noticeItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.noticeText}>
              您的位置数据仅用于提供导航和订单匹配服务
            </Text>
          </View>
          <View style={styles.noticeItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.noticeText}>
              我们不会将您的位置数据共享给第三方
            </Text>
          </View>
          <View style={styles.noticeItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.noticeText}>
              您可以随时在设置中关闭位置权限
            </Text>
          </View>
        </View>

        <View style={styles.bottomPadding} />
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
    backgroundColor: '#E8F5E9',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#999999',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  settingName: {
    fontSize: 16,
    color: '#333333',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusEnabled: {
    backgroundColor: '#E8F5E9',
  },
  statusDisabled: {
    backgroundColor: '#F5F5F5',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  statusTextEnabled: {
    color: '#4CAF50',
  },
  statusTextDisabled: {
    color: '#999999',
  },
  settingDesc: {
    fontSize: 12,
    color: '#999999',
  },
  toggle: {
    width: 52,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5EA',
    padding: 2,
    justifyContent: 'center',
  },
  toggleEnabled: {
    backgroundColor: '#4CAF50',
  },
  toggleThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbEnabled: {
    alignSelf: 'flex-end',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  actionText: {
    fontSize: 16,
    color: '#333333',
  },
  noticeCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  noticeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  noticeText: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  bottomPadding: {
    height: 32,
  },
});