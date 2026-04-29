import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ComplaintReason {
  id: string;
  label: string;
  selected: boolean;
}

export default function Complaint() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders } = useAppStore();

  const [selectedReasons, setSelectedReasons] = useState<ComplaintReason[]>([
    { id: '1', label: '客户态度恶劣', selected: false },
    { id: '2', label: '要求违规操作', selected: false },
    { id: '3', label: '虚假订单信息', selected: false },
    { id: '4', label: '恶意取消订单', selected: false },
    { id: '5', label: '拒绝支付费用', selected: false },
    { id: '6', label: '其他原因', selected: false },
  ]);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const order = orders.find(o => o.id === id);

  const handleToggleReason = (id: string) => {
    setSelectedReasons(prev =>
      prev.map(reason =>
        reason.id === id ? { ...reason, selected: !reason.selected } : reason
      )
    );
  };

  const handleAddImage = () => {
    // 这里可以实现图片选择功能
    Alert.alert('提示', '图片上传功能开发中');
  };

  const handleSubmit = () => {
    const selectedCount = selectedReasons.filter(r => r.selected).length;

    if (selectedCount === 0) {
      Alert.alert('提示', '请至少选择一个投诉原因');
      return;
    }

    if (description.trim().length === 0) {
      Alert.alert('提示', '请填写投诉详情');
      return;
    }

    Alert.alert(
      '提交投诉',
      '投诉提交后，平台将在 1-3 个工作日内处理，请耐心等待。',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确认提交',
          onPress: async () => {
            setIsSubmitting(true);
            // 模拟提交
            await new Promise(resolve => setTimeout(resolve, 1000));
            Alert.alert('成功', '投诉已提交，平台会尽快处理');
            setIsSubmitting(false);
            router.back();
          }
        }
      ]
    );
  };

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>订单不存在</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>投诉订单</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 订单信息 */}
        <View style={styles.orderCard}>
          <Text style={styles.orderCardTitle}>订单信息</Text>
          <View style={styles.orderInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>订单号</Text>
              <Text style={styles.infoValue}>{order.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>订单金额</Text>
              <Text style={styles.infoPrice}>¥{order.price.toFixed(2)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>订单状态</Text>
              <Text style={styles.infoValue}>{order.status}</Text>
            </View>
          </View>
        </View>

        {/* 投诉原因 */}
        <View style={styles.reasonCard}>
          <Text style={styles.reasonCardTitle}>投诉原因</Text>
          <Text style={styles.reasonTip}>请选择投诉原因（可多选）</Text>

          <View style={styles.reasonGrid}>
            {selectedReasons.map((reason) => (
              <TouchableOpacity
                key={reason.id}
                style={[
                  styles.reasonItem,
                  reason.selected && styles.reasonItemSelected
                ]}
                onPress={() => handleToggleReason(reason.id)}
              >
                <View style={[styles.reasonCheckbox, reason.selected && styles.reasonCheckboxSelected]}>
                  {reason.selected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
                <Text style={[styles.reasonText, reason.selected && styles.reasonTextSelected]}>
                  {reason.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 投诉详情 */}
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionCardTitle}>投诉详情</Text>
          <Text style={styles.descriptionTip}>请详细描述投诉原因，有助于平台快速处理</Text>

          <TextInput
            style={styles.descriptionInput}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholder="请输入投诉详情..."
            placeholderTextColor="#999999"
            value={description}
            onChangeText={setDescription}
          />
          <Text style={styles.charCount}>{description.length}/500</Text>
        </View>

        {/* 上传凭证 */}
        <View style={styles.evidenceCard}>
          <Text style={styles.evidenceCardTitle}>上传凭证（选填）</Text>
          <Text style={styles.evidenceTip}>如有聊天记录、照片等证据，请上传以便平台核实</Text>

          <View style={styles.imageGrid}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageItem}>
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={32} color="#CCCCCC" />
                </View>
                <TouchableOpacity
                  style={styles.removeImage}
                  onPress={() => setImages(prev => prev.filter((_, i) => i !== index))}
                >
                  <Ionicons name="close-circle" size={20} color="#FF4444" />
                </TouchableOpacity>
              </View>
            ))}

            {images.length < 4 && (
              <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
                <Ionicons name="add-circle-outline" size={32} color="#FF6B00" />
                <Text style={styles.addImageText}>添加图片</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.imageTip}>最多可上传 4 张图片，支持 JPG、PNG 格式</Text>
        </View>

        {/* 提交按钮 */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? '提交中...' : '提交投诉'}
          </Text>
        </TouchableOpacity>

        <View style={styles.tipContainer}>
          <Ionicons name="information-circle-outline" size={16} color="#999999" />
          <Text style={styles.tipText}>
            投诉提交后，平台客服将在 1-3 个工作日内处理，处理结果将通过消息通知您
          </Text>
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
    flex: 1,
  },
  orderCard: {
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  orderCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  orderInfo: {
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#999999',
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
  },
  infoPrice: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: 'bold',
  },
  reasonCard: {
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  reasonCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  reasonTip: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 12,
  },
  reasonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  reasonItemSelected: {
    backgroundColor: '#FFF3E0',
  },
  reasonCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  reasonCheckboxSelected: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  reasonText: {
    fontSize: 14,
    color: '#666666',
  },
  reasonTextSelected: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  descriptionCard: {
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  descriptionCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  descriptionTip: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 12,
  },
  descriptionInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333333',
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'right',
    marginTop: 8,
  },
  evidenceCard: {
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  evidenceCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  evidenceTip: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 12,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageItem: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImage: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#FFF3E0',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  addImageText: {
    fontSize: 12,
    color: '#FF6B00',
    marginTop: 4,
  },
  imageTip: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
  submitButton: {
    marginHorizontal: 16,
    backgroundColor: '#FF6B00',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tipContainer: {
    flexDirection: 'row',
    margin: 16,
    padding: 12,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
  },
  tipText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  bottomPadding: {
    height: 32,
  },
});