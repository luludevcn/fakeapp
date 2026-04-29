import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Clipboard, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderCode() {
  const router = useRouter();
  const { user } = useAppStore();
  const [showShareMenu, setShowShareMenu] = useState(false);

  // 生成司机的接单码（模拟）
  const driverCode = 'DG123456789';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${driverCode}`;

  const handleCopyCode = () => {
    Clipboard.setString(driverCode);
    Alert.alert('成功', '接单码已复制到剪贴板');
    setShowShareMenu(false);
  };

  const handleShare = () => {
    // 这里可以实现分享功能
    Alert.alert('提示', '分享功能开发中');
    setShowShareMenu(false);
  };

  const handleSaveImage = () => {
    // 这里可以实现保存图片功能
    Alert.alert('提示', '保存图片功能开发中');
    setShowShareMenu(false);
  };

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>我的接单码</Text>
        <TouchableOpacity onPress={() => setShowShareMenu(!showShareMenu)} style={styles.menuButton}>
          <Ionicons name="share-outline" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 说明卡片 */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={24} color="#FF6B00" />
            <Text style={styles.infoTitle}>什么是接单码？</Text>
          </View>
          <Text style={styles.infoContent}>
            接单码是客户快速下单的专属凭证。客户扫描您的接单码后，将自动关联到您为服务司机，
            订单将优先推送给您。每个司机拥有唯一的接单码。
          </Text>
        </View>

        {/* 二维码卡片 */}
        <View style={styles.qrCard}>
          <View style={styles.qrHeader}>
            <View>
              <Text style={styles.driverName}>{user?.name || '张师傅'}</Text>
              <Text style={styles.driverId}>接单码：{driverCode}</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.verifiedText}>已认证</Text>
            </View>
          </View>

          <View style={styles.qrCodeContainer}>
            <Image 
              source={{ uri: qrCodeUrl }} 
              style={styles.qrCode}
              resizeMode="contain"
            />
            <View style={styles.logoOverlay}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>快狗</Text>
              </View>
            </View>
          </View>

          <Text style={styles.qrTip}>扫描二维码快速下单</Text>

          <View style={styles.qrFooter}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCopyCode}>
              <Ionicons name="copy-outline" size={20} color="#FF6B00" />
              <Text style={styles.actionButtonText}>复制接单码</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={20} color="#FF6B00" />
              <Text style={styles.actionButtonText}>分享</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleSaveImage}>
              <Ionicons name="download-outline" size={20} color="#FF6B00" />
              <Text style={styles.actionButtonText}>保存图片</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 使用场景 */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>使用场景</Text>
          
          <View style={styles.scenarioItem}>
            <View style={styles.scenarioNumber}>
              <Text style={styles.scenarioNumberText}>1</Text>
            </View>
            <View style={styles.scenarioContent}>
              <Text style={styles.scenarioSubtitle}>线下推广</Text>
              <Text style={styles.scenarioDescription}>
                将接单码打印成海报或名片，放置在人流量大的地方，吸引客户扫码下单
              </Text>
            </View>
          </View>

          <View style={styles.scenarioItem}>
            <View style={styles.scenarioNumber}>
              <Text style={styles.scenarioNumberText}>2</Text>
            </View>
            <View style={styles.scenarioContent}>
              <Text style={styles.scenarioSubtitle}>社交媒体</Text>
              <Text style={styles.scenarioDescription}>
                将接单码分享到微信朋友圈、微信群等社交平台，让老客户快速找到您
              </Text>
            </View>
          </View>

          <View style={styles.scenarioItem}>
            <View style={styles.scenarioNumber}>
              <Text style={styles.scenarioNumberText}>3</Text>
            </View>
            <View style={styles.scenarioContent}>
              <Text style={styles.scenarioSubtitle}>固定客户</Text>
              <Text style={styles.scenarioDescription}>
                为固定客户提供专属接单码，建立长期合作关系，提高收入稳定性
              </Text>
            </View>
          </View>
        </View>

        {/* 数据统计 */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>数据统计</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>128</Text>
              <Text style={styles.statLabel}>扫码次数</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>转化订单</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>35%</Text>
              <Text style={styles.statLabel}>转化率</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 分享菜单 */}
      {showShareMenu && (
        <View style={styles.shareMenu}>
          <TouchableOpacity style={styles.shareMenuItem} onPress={handleCopyCode}>
            <Ionicons name="copy-outline" size={24} color="#333333" />
            <Text style={styles.shareMenuItemText}>复制接单码</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareMenuItem} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={24} color="#333333" />
            <Text style={styles.shareMenuItemText}>分享</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareMenuItem} onPress={handleSaveImage}>
            <Ionicons name="download-outline" size={24} color="#333333" />
            <Text style={styles.shareMenuItemText}>保存图片</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.shareMenuItem} 
            onPress={() => setShowShareMenu(false)}
          >
            <Ionicons name="close-outline" size={24} color="#999999" />
            <Text style={[styles.shareMenuItemText, { color: '#999999' }]}>取消</Text>
          </TouchableOpacity>
        </View>
      )}
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
  menuButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  infoCard: {
    margin: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 8,
  },
  infoContent: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 22,
  },
  qrCard: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  qrHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  driverId: {
    fontSize: 14,
    color: '#999999',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
  },
  qrCodeContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  qrCode: {
    width: 240,
    height: 240,
  },
  logoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  qrTip: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 24,
  },
  qrFooter: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FF6B00',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  scenarioCard: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  scenarioItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  scenarioNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scenarioNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scenarioContent: {
    flex: 1,
  },
  scenarioSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  scenarioDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 20,
  },
  statsCard: {
    margin: 16,
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999999',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 8,
  },
  shareMenu: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  shareMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 150,
  },
  shareMenuItemText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 12,
  },
});