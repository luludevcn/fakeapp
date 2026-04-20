import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const router = useRouter();
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  const handleOrder = () => {
    router.push({
      pathname: '/home/map',
      params: { from, to }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 地址输入区域 */}
        <View style={styles.addressContainer}>
          <View style={styles.addressItem}>
            <View style={styles.addressIcon}>
              <Ionicons name="location" size={20} color="#FF6B00" />
            </View>
            <TextInput
              style={styles.addressInput}
              placeholder="请输入起点"
              value={from}
              onChangeText={setFrom}
              onFocus={() => router.push({
                pathname: '/home/map',
                params: { type: 'from' }
              })}
            />
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
          <View style={styles.divider} />
          <View style={styles.addressItem}>
            <View style={styles.addressIcon}>
              <Ionicons name="location" size={20} color="#FF6B00" />
            </View>
            <TextInput
              style={styles.addressInput}
              placeholder="请输入终点"
              value={to}
              onChangeText={setTo}
              onFocus={() => router.push({
                pathname: '/home/map',
                params: { type: 'to' }
              })}
            />
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
        </View>

        {/* 服务类型 */}
        <View style={styles.serviceContainer}>
          <Text style={styles.sectionTitle}>服务类型</Text>
          <View style={styles.serviceGrid}>
            <TouchableOpacity style={styles.serviceItem}>
              <View style={[styles.serviceIcon, { backgroundColor: '#FFF3E0' }]}>
                <Ionicons name="cube" size={24} color="#FF6B00" />
              </View>
              <Text style={styles.serviceText}>小型拉货</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <View style={[styles.serviceIcon, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="car" size={24} color="#2196F3" />
              </View>
              <Text style={styles.serviceText}>中型拉货</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <View style={[styles.serviceIcon, { backgroundColor: '#E8F5E8' }]}>
                <Ionicons name="bus" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.serviceText}>大型拉货</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <View style={[styles.serviceIcon, { backgroundColor: '#F3E5F5' }]}>
                <Ionicons name="people" size={24} color="#9C27B0" />
              </View>
              <Text style={styles.serviceText}>搬家服务</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 价格估算 */}
        <View style={styles.estimateContainer}>
          <Text style={styles.sectionTitle}>价格估算</Text>
          <View style={styles.estimateCard}>
            <View style={styles.estimateItem}>
              <Text style={styles.estimateLabel}>起步价</Text>
              <Text style={styles.estimateValue}>¥30</Text>
            </View>
            <View style={styles.estimateItem}>
              <Text style={styles.estimateLabel}>里程费</Text>
              <Text style={styles.estimateValue}>¥2.5/公里</Text>
            </View>
            <View style={styles.estimateItem}>
              <Text style={styles.estimateLabel}>时长费</Text>
              <Text style={styles.estimateValue}>¥0.5/分钟</Text>
            </View>
          </View>
        </View>

        {/* 立即叫车按钮 */}
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>立即叫车</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  addressContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 10,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  addressIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 40,
  },
  serviceContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 12,
  },
  estimateContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 20,
  },
  estimateCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
  },
  estimateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  estimateLabel: {
    fontSize: 14,
    color: '#666',
  },
  estimateValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderButton: {
    backgroundColor: '#FF6B00',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  orderButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;