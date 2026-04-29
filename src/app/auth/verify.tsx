import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
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
    setTimeout(() => {
      setLoading(false);
      Alert.alert('成功', '实名认证提交成功，正在审核中');
      router.replace('/');
    }, 1500);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">实名认证</Text>
        <View className="w-10" />
      </View>

      <View className="p-4">
        <Text className="text-base text-gray-800 mb-6">请上传以下证件照片</Text>

        {/* 身份证正面 */}
        <View className="mb-6">
          <Text className="text-sm text-gray-600 mb-2">身份证正面</Text>
          <TouchableOpacity 
            className={`w-full h-[200px] border rounded-lg bg-white ${idCardFront ? 'border-solid border-gray-200' : 'border-dashed border-gray-200'}`}
            onPress={() => handleUpload(setIdCardFront)}
          >
            {idCardFront ? (
              <Image source={{ uri: idCardFront }} className="w-full h-full rounded-lg" />
            ) : (
              <View className="flex-1 justify-center items-center">
                <Ionicons name="camera" size={48} color="#CCCCCC" />
                <Text className="text-sm text-gray-400 mt-2">点击上传</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* 身份证反面 */}
        <View className="mb-6">
          <Text className="text-sm text-gray-600 mb-2">身份证反面</Text>
          <TouchableOpacity 
            className={`w-full h-[200px] border rounded-lg bg-white ${idCardBack ? 'border-solid border-gray-200' : 'border-dashed border-gray-200'}`}
            onPress={() => handleUpload(setIdCardBack)}
          >
            {idCardBack ? (
              <Image source={{ uri: idCardBack }} className="w-full h-full rounded-lg" />
            ) : (
              <View className="flex-1 justify-center items-center">
                <Ionicons name="camera" size={48} color="#CCCCCC" />
                <Text className="text-sm text-gray-400 mt-2">点击上传</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* 驾驶证 */}
        <View className="mb-6">
          <Text className="text-sm text-gray-600 mb-2">驾驶证</Text>
          <TouchableOpacity 
            className={`w-full h-[200px] border rounded-lg bg-white ${driverLicense ? 'border-solid border-gray-200' : 'border-dashed border-gray-200'}`}
            onPress={() => handleUpload(setDriverLicense)}
          >
            {driverLicense ? (
              <Image source={{ uri: driverLicense }} className="w-full h-full rounded-lg" />
            ) : (
              <View className="flex-1 justify-center items-center">
                <Ionicons name="camera" size={48} color="#CCCCCC" />
                <Text className="text-sm text-gray-400 mt-2">点击上传</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* 行驶证 */}
        <View className="mb-6">
          <Text className="text-sm text-gray-600 mb-2">行驶证</Text>
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

        {/* 提交按钮 */}
        <TouchableOpacity 
          className={`py-4 rounded-lg items-center mt-4 ${loading ? 'bg-gray-400' : 'bg-orange-500'}`}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-white text-base font-bold">{loading ? '提交中...' : '提交审核'}</Text>
        </TouchableOpacity>

        {/* 提示信息 */}
        <Text className="text-xs text-gray-400 text-center mt-4">* 提交后，我们将在1-2个工作日内完成审核</Text>
      </View>
    </ScrollView>
  );
}
