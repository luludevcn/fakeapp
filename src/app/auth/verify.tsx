import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Verify() {
  const router = useRouter();
  const [idCardFront, setIdCardFront] = useState<string | null>(null);
  const [idCardBack, setIdCardBack] = useState<string | null>(null);
  const [driverLicense, setDriverLicense] = useState<string | null>(null);
  const [vehicleLicense, setVehicleLicense] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (setter: (value: string) => void) => {
    // 模拟选择图片
    setTimeout(() => {
      setter('https://picsum.photos/400/300');
      Alert.alert('成功', '图片上传成功');
    }, 1000);
  };

  const handleSubmit = () => {
    if (!idCardFront || !idCardBack || !driverLicense || !vehicleLicense) {
      Alert.alert('提示', '请上传所有证件照片');
      return;
    }

    setLoading(true);
    try {
      // 模拟提交审核
      setTimeout(() => {
        setLoading(false);
        Alert.alert('成功', '实名认证提交成功，正在审核中');
        router.replace('/');
      }, 1500);
    } catch (error) {
      setLoading(false);
      Alert.alert('错误', '提交失败，请重试');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>实名认证</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>请上传以下证件照片</Text>

        {/* 身份证正面 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>身份证正面</Text>
          <TouchableOpacity 
            style={[styles.uploadContainer, idCardFront && styles.uploadedContainer]}
            onPress={() => handleUpload(setIdCardFront)}
          >
            {idCardFront ? (
              <Image source={{ uri: idCardFront }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Ionicons name="camera" size={48} color="#CCCCCC" />
                <Text style={styles.uploadText}>点击上传</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* 身份证反面 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>身份证反面</Text>
          <TouchableOpacity 
            style={[styles.uploadContainer, idCardBack && styles.uploadedContainer]}
            onPress={() => handleUpload(setIdCardBack)}
          >
            {idCardBack ? (
              <Image source={{ uri: idCardBack }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Ionicons name="camera" size={48} color="#CCCCCC" />
                <Text style={styles.uploadText}>点击上传</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* 驾驶证 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>驾驶证</Text>
          <TouchableOpacity 
            style={[styles.uploadContainer, driverLicense && styles.uploadedContainer]}
            onPress={() => handleUpload(setDriverLicense)}
          >
            {driverLicense ? (
              <Image source={{ uri: driverLicense }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Ionicons name="camera" size={48} color="#CCCCCC" />
                <Text style={styles.uploadText}>点击上传</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* 行驶证 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>行驶证</Text>
          <TouchableOpacity 
            style={[styles.uploadContainer, vehicleLicense && styles.uploadedContainer]}
            onPress={() => handleUpload(setVehicleLicense)}
          >
            {vehicleLicense ? (
              <Image source={{ uri: vehicleLicense }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Ionicons name="camera" size={48} color="#CCCCCC" />
                <Text style={styles.uploadText}>点击上传</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* 提交按钮 */}
        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>{loading ? '提交中...' : '提交审核'}</Text>
        </TouchableOpacity>

        {/* 提示信息 */}
        <Text style={styles.tipText}>* 提交后，我们将在1-2个工作日内完成审核</Text>
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
  subtitle: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  uploadContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  uploadedContainer: {
    borderStyle: 'solid',
    borderColor: '#E5E5EA',
  },
  uploadPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
    color: '#999999',
    marginTop: 8,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
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