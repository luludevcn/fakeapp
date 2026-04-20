import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MapScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [from, setFrom] = useState<string>(params.from as string || '');
  const [to, setTo] = useState<string>(params.to as string || '');
  const [type, setType] = useState<string>(params.type as string || '');

  const handleConfirm = () => {
    if (type === 'from') {
      router.push({
        pathname: '/home',
        params: { from }
      });
    } else if (type === 'to') {
      router.push({
        pathname: '/home',
        params: { to }
      });
    } else {
      router.push({
        pathname: '/home/order-detail',
        params: { from, to }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 搜索框 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder={type === 'from' ? '搜索起点' : type === 'to' ? '搜索终点' : '搜索地点'}
            value={type === 'from' ? from : to}
            onChangeText={type === 'from' ? setFrom : setTo}
          />
          <TouchableOpacity>
            <Ionicons name="mic" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 推荐地点 */}
      <ScrollView style={styles.recommendContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>推荐地点</Text>
        
        {/* 常用地点 */}
        <View style={styles.locationSection}>
          <Text style={styles.sectionSubtitle}>常用地点</Text>
          <TouchableOpacity style={styles.locationItem}>
            <View style={[styles.locationIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="home" size={20} color="#FF6B00" />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>家</Text>
              <Text style={styles.locationAddress}>北京市朝阳区望京SOHO T3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationItem}>
            <View style={[styles.locationIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="business" size={20} color="#2196F3" />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>公司</Text>
              <Text style={styles.locationAddress}>北京市海淀区中关村软件园</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 最近搜索 */}
        <View style={styles.locationSection}>
          <Text style={styles.sectionSubtitle}>最近搜索</Text>
          <TouchableOpacity style={styles.locationItem}>
            <View style={[styles.locationIcon, { backgroundColor: '#F5F5F5' }]}>
              <Ionicons name="time" size={20} color="#999" />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>北京市海淀区中关村</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationItem}>
            <View style={[styles.locationIcon, { backgroundColor: '#F5F5F5' }]}>
              <Ionicons name="time" size={20} color="#999" />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>北京市东城区王府井</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationItem}>
            <View style={[styles.locationIcon, { backgroundColor: '#F5F5F5' }]}>
              <Ionicons name="time" size={20} color="#999" />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>北京市西城区金融街</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 确认按钮 */}
      <View style={styles.confirmContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>确认</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  recommendContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  locationSection: {
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#999',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 12,
    color: '#999',
  },
  confirmContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  confirmButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;