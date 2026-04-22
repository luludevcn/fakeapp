import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddVehicle() {
  const router = useRouter();
  const [plateNumber, setPlateNumber] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [vehicleLicense, setVehicleLicense] = useState<string | null>(null);
  const [vehiclePhoto, setVehiclePhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (setter: (value: string) => void) => {
    // 模拟选择图片
    setTimeout(() => {
      setter('https://picsum.photos/400/300');
      Alert.alert('成功', '图片上传成功');
    }, 1000);
  };

  const handleSubmit = () => {
    if (!plateNumber || !brand || !model || !type || !vehicleLicense || !vehiclePhoto) {
      Alert.alert('提示', '请填写所有信息并上传照片');
      return;
    }

    setLoading(true);
    try {
      // 模拟提交
      setTimeout(() => {
        setLoading(false);
        Alert.alert('成功', '车辆添加成功，正在审核中');
        router.replace('/vehicle');
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
        <Text style={styles.title}>添加车辆</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* 车牌号 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>车牌号</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入车牌号"
            placeholderTextColor="#999999"
            value={plateNumber}
            onChangeText={setPlateNumber}
          />
        </View>

        {/* 品牌 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>品牌</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入车辆品牌"
            placeholderTextColor="#999999"
            value={brand}
            onChangeText={setBrand}
          />
        </View>

        {/* 型号 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>型号</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入车辆型号"
            placeholderTextColor="#999999"
            value={model}
            onChangeText={setModel}
          />
        </View>

        {/* 车型 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>车型</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入车型（如：厢式货车、封闭货车等）"
            placeholderTextColor="#999999"
            value={type}
            onChangeText={setType}
          />
        </View>

        {/* 行驶证 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>行驶证照片</Text>
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

        {/* 车辆照片 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>车辆照片</Text>
          <TouchableOpacity 
            style={[styles.uploadContainer, vehiclePhoto && styles.uploadedContainer]}
            onPress={() => handleUpload(setVehiclePhoto)}
          >
            {vehiclePhoto ? (
              <Image source={{ uri: vehiclePhoto }} style={styles.uploadedImage} />
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
          <Text style={styles.submitButtonText}>{loading ? '提交中...' : '提交'}</Text>
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
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