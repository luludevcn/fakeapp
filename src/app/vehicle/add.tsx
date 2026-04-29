import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
    setTimeout(() => {
      setLoading(false);
      Alert.alert('成功', '车辆添加成功，正在审核中');
      router.replace('/vehicle');
    }, 1500);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">添加车辆</Text>
        <View className="w-10" />
      </View>

      <View className="p-4">
        {/* 车牌号 */}
        <View className="mb-5">
          <Text className="text-sm text-gray-600 mb-2">车牌号</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-lg p-3 text-base text-gray-800"
            placeholder="请输入车牌号"
            placeholderTextColor="#999999"
            value={plateNumber}
            onChangeText={setPlateNumber}
          />
        </View>

        {/* 品牌 */}
        <View className="mb-5">
          <Text className="text-sm text-gray-600 mb-2">品牌</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-lg p-3 text-base text-gray-800"
            placeholder="请输入车辆品牌"
            placeholderTextColor="#999999"
            value={brand}
            onChangeText={setBrand}
          />
        </View>

        {/* 型号 */}
        <View className="mb-5">
          <Text className="text-sm text-gray-600 mb-2">型号</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-lg p-3 text-base text-gray-800"
            placeholder="请输入车辆型号"
            placeholderTextColor="#999999"
            value={model}
            onChangeText={setModel}
          />
        </View>

        {/* 车型 */}
        <View className="mb-5">
          <Text className="text-sm text-gray-600 mb-2">车型</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-lg p-3 text-base text-gray-800"
            placeholder="请输入车型（如：厢式货车、封闭货车等）"
            placeholderTextColor="#999999"
            value={type}
            onChangeText={setType}
          />
        </View>

        {/* 行驶证 */}
        <View className="mb-5">
          <Text className="text-sm text-gray-600 mb-2">行驶证照片</Text>
          <TouchableOpacity 
            className={`w-full h-[200px] border rounded-lg bg-white ${vehicleLicense ? 'border-solid border-gray-200' : 'border-dashed border-gray-200'}`}
            onPress={() => handleUpload(setVehicleLicense)}
          >
            {vehicleLicense ? (
              <Image source={{ uri: vehicleLicense }} className="w-full h-full rounded-lg" />
            ) : (
              <View className="flex-1 justify-center items-center">
                <Ionicons name="camera" size={48} color="#CCCCCC" />
                <Text className="text-sm text-gray-400 mt-2">点击上传</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* 车辆照片 */}
        <View className="mb-5">
          <Text className="text-sm text-gray-600 mb-2">车辆照片</Text>
          <TouchableOpacity 
            className={`w-full h-[200px] border rounded-lg bg-white ${vehiclePhoto ? 'border-solid border-gray-200' : 'border-dashed border-gray-200'}`}
            onPress={() => handleUpload(setVehiclePhoto)}
          >
            {vehiclePhoto ? (
              <Image source={{ uri: vehiclePhoto }} className="w-full h-full rounded-lg" />
            ) : (
              <View className="flex-1 justify-center items-center">
                <Ionicons name="camera" size={48} color="#CCCCCC" />
                <Text className="text-sm text-gray-400 mt-2">点击上传</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* 提交按钮 */}
        <TouchableOpacity 
          className={`py-4 rounded-lg items-center mt-4 ${loading ? 'bg-gray-400' : 'bg-orange-500'}`}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-white text-base font-bold">{loading ? '提交中...' : '提交'}</Text>
        </TouchableOpacity>

        {/* 提示信息 */}
        <Text className="text-xs text-gray-400 text-center mt-4">* 提交后，我们将在1-2个工作日内完成审核</Text>
      </View>
    </ScrollView>
  );
}
