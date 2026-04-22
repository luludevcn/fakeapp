import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>我的车辆</Text>
        <TouchableOpacity onPress={handleAddVehicle} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FF6B00" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {vehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <View style={styles.vehicleInfo}>
                <Text style={styles.plateNumber}>{vehicle.plateNumber}</Text>
                <Text style={styles.vehicleType}>{vehicle.brand} {vehicle.model} | {vehicle.type}</Text>
              </View>
              {vehicle.isDefault && (
                <View style={styles.defaultTag}>
                  <Text style={styles.defaultText}>默认</Text>
                </View>
              )}
            </View>
            
            <View style={styles.vehicleFooter}>
              <View style={[styles.statusTag, vehicle.status === '正常' ? styles.statusNormal : vehicle.status === '审核中' ? styles.statusPending : styles.statusDisabled]}>
                <Text style={styles.statusText}>{vehicle.status}</Text>
              </View>
              <TouchableOpacity 
                style={[styles.setDefaultButton, vehicle.isDefault && styles.disabledButton]}
                onPress={() => handleSetDefault(vehicle.id)}
                disabled={vehicle.isDefault}
              >
                <Text style={[styles.setDefaultText, vehicle.isDefault && styles.disabledText]}>
                  {vehicle.isDefault ? '已设为默认' : '设为默认'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addCard} onPress={handleAddVehicle}>
          <Ionicons name="add-circle" size={48} color="#FF6B00" />
          <Text style={styles.addText}>添加车辆</Text>
        </TouchableOpacity>
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
  addButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vehicleInfo: {
    flex: 1,
  },
  plateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  vehicleType: {
    fontSize: 14,
    color: '#666666',
  },
  defaultTag: {
    backgroundColor: '#FF6B00',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  vehicleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusNormal: {
    backgroundColor: '#E8F5E8',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusDisabled: {
    backgroundColor: '#EEEEEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  setDefaultButton: {
    borderWidth: 1,
    borderColor: '#FF6B00',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  disabledButton: {
    borderColor: '#CCCCCC',
  },
  setDefaultText: {
    fontSize: 12,
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#999999',
  },
  addCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
  },
  addText: {
    fontSize: 16,
    color: '#FF6B00',
    marginTop: 8,
  },
});