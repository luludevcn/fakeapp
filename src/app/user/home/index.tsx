import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function UserHomePage() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');

  const handleSearch = () => {
    // 搜索附近司机
    router.push('/user/home/map' as any);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 搜索栏 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <View style={styles.locationInput}>
            <Ionicons name="location" size={20} color="#FF6B00" />
            <TextInput
              style={styles.input}
              placeholder="起点"
              value={pickupLocation}
              onChangeText={setPickupLocation}
            />
          </View>
          <Ionicons name="arrow-down" size={20} color="#999" style={styles.arrowIcon} />
          <View style={styles.locationInput}>
            <Ionicons name="location" size={20} color="#FF6B00" />
            <TextInput
              style={styles.input}
              placeholder="终点"
              value={dropoffLocation}
              onChangeText={setDropoffLocation}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>搜索</Text>
        </TouchableOpacity>
      </View>

      {/* 服务类型 */}
      <View style={styles.servicesContainer}>
        <Text style={styles.sectionTitle}>服务类型</Text>
        <View style={styles.serviceGrid}>
          <TouchableOpacity style={styles.serviceItem}>
            <View style={[styles.serviceIcon, { backgroundColor: '#FFE8D6' }]}>
              <Ionicons name="car" size={24} color="#FF6B00" />
            </View>
            <Text style={styles.serviceText}>快车</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceItem}>
            <View style={[styles.serviceIcon, { backgroundColor: '#E6F7FF' }]}>
              <Ionicons name="bus" size={24} color="#1890FF" />
            </View>
            <Text style={styles.serviceText}>货运</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceItem}>
            <View style={[styles.serviceIcon, { backgroundColor: '#E6F7E6' }]}>
              <Ionicons name="home" size={24} color="#52C41A" />
            </View>
            <Text style={styles.serviceText}>搬家</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceItem}>
            <View style={[styles.serviceIcon, { backgroundColor: '#F3E6FF' }]}>
              <Ionicons name="cube" size={24} color="#722ED1" />
            </View>
            <Text style={styles.serviceText}>配送</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 推荐路线 */}
      <View style={styles.recommendContainer}>
        <Text style={styles.sectionTitle}>推荐路线</Text>
        <TouchableOpacity style={styles.recommendItem}>
          <View style={styles.recommendInfo}>
            <Text style={styles.recommendTitle}>公司 → 家</Text>
            <Text style={styles.recommendSubtitle}>约 15 分钟</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.recommendItem}>
          <View style={styles.recommendInfo}>
            <Text style={styles.recommendTitle}>家 → 超市</Text>
            <Text style={styles.recommendSubtitle}>约 8 分钟</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  arrowIcon: {
    alignSelf: 'center',
    marginVertical: 4,
  },
  searchButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicesContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  serviceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceItem: {
    alignItems: 'center',
    width: '22%',
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 14,
    color: '#333',
  },
  recommendContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
  },
  recommendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recommendInfo: {
    flex: 1,
  },
  recommendTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  recommendSubtitle: {
    fontSize: 14,
    color: '#999',
  },
});