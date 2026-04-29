import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Vehicle {
  id: string;
  plateNumber: string;
  brand: string;
  model: string;
  type: string;
  status: '正常' | '审核中' | '禁用';
  isDefault: boolean;
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    plateNumber: '京A12345',
    brand: '福田',
    model: '奥铃CTS',
    type: '厢式货车',
    status: '正常',
    isDefault: true,
  },
  {
    id: '2',
    plateNumber: '京B67890',
    brand: '依维柯',
    model: 'Daily',
    type: '封闭货车',
    status: '正常',
    isDefault: false,
  },
];

export default function Vehicle() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);

  const handleSetDefault = (vehicleId: string) => {
    setVehicles(vehicles.map(vehicle => ({
      ...vehicle,
      isDefault: vehicle.id === vehicleId,
    })));
    Alert.alert('成功', '已设置为默认车辆');
  };

  const handleAddVehicle = () => {
    router.push('/vehicle/add');
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case '正常': return 'bg-green-50';
      case '审核中': return 'bg-orange-50';
      default: return 'bg-gray-100';
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">我的车辆</Text>
        <TouchableOpacity className="p-2" onPress={handleAddVehicle}>
          <Ionicons name="add" size={24} color="#FF6B00" />
        </TouchableOpacity>
      </View>

      <View className="p-4">
        {vehicles.map((vehicle) => (
          <View key={vehicle.id} className="bg-white rounded-lg p-4 mb-4 shadow">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="text-lg font-bold text-gray-800 mb-1">{vehicle.plateNumber}</Text>
                <Text className="text-sm text-gray-600">{vehicle.brand} {vehicle.model} | {vehicle.type}</Text>
              </View>
              {vehicle.isDefault && (
                <View className="bg-orange-500 py-1 px-2 rounded">
                  <Text className="text-xs text-white font-bold">默认</Text>
                </View>
              )}
            </View>
            
            <View className="flex-row justify-between items-center">
              <View className={`py-1 px-2 rounded ${getStatusStyle(vehicle.status)}`}>
                <Text className="text-xs font-bold text-gray-700">{vehicle.status}</Text>
              </View>
              <TouchableOpacity 
                className={`border py-1.5 px-3 rounded-full ${vehicle.isDefault ? 'border-gray-300' : 'border-orange-500'}`}
                onPress={() => handleSetDefault(vehicle.id)}
                disabled={vehicle.isDefault}
              >
                <Text className={`text-xs font-bold ${vehicle.isDefault ? 'text-gray-400' : 'text-orange-500'}`}>
                  {vehicle.isDefault ? '已设为默认' : '设为默认'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity className="bg-white rounded-lg p-10 items-center border border-gray-200 border-dashed" onPress={handleAddVehicle}>
          <Ionicons name="add-circle" size={48} color="#FF6B00" />
          <Text className="text-base text-orange-500 mt-2">添加车辆</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
