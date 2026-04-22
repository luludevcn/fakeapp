import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function IncomeReport() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('month'); // day, week, month, year

  // 模拟收入数据
  const incomeData = {
    day: {
      total: 328.85,
      orders: 2,
      average: 164.43,
      trend: '+15%',
    },
    week: {
      total: 1560.20,
      orders: 8,
      average: 195.03,
      trend: '+8%',
    },
    month: {
      total: 5800.00,
      orders: 32,
      average: 181.25,
      trend: '+12%',
    },
    year: {
      total: 68000.00,
      orders: 380,
      average: 178.95,
      trend: '+20%',
    },
  };

  const periods = [
    { id: 'day', label: '今日' },
    { id: 'week', label: '本周' },
    { id: 'month', label: '本月' },
    { id: 'year', label: '本年' },
  ];

  const currentData = incomeData[selectedPeriod as keyof typeof incomeData];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>收入报表</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 时间选择器 */}
      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            style={[styles.periodItem, selectedPeriod === period.id && styles.selectedPeriodItem]}
            onPress={() => setSelectedPeriod(period.id)}
          >
            <Text style={[styles.periodText, selectedPeriod === period.id && styles.selectedPeriodText]}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 收入概览 */}
      <View style={styles.overviewCard}>
        <Text style={styles.overviewTitle}>收入概览</Text>
        <Text style={styles.totalIncome}>¥{currentData.total.toFixed(2)}</Text>
        <View style={styles.overviewDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>订单数</Text>
            <Text style={styles.detailValue}>{currentData.orders}单</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>平均收入</Text>
            <Text style={styles.detailValue}>¥{currentData.average.toFixed(2)}</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>同比增长</Text>
            <Text style={[styles.detailValue, currentData.trend.includes('+') ? styles.positiveTrend : styles.negativeTrend]}>
              {currentData.trend}
            </Text>
          </View>
        </View>
      </View>

      {/* 收入趋势图 */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>收入趋势</Text>
        <View style={styles.chartPlaceholder}>
          <Ionicons name="bar-chart" size={80} color="#CCCCCC" />
          <Text style={styles.chartPlaceholderText}>收入趋势图表</Text>
        </View>
      </View>

      {/* 订单类型分析 */}
      <View style={styles.analysisCard}>
        <Text style={styles.analysisTitle}>订单类型分析</Text>
        <View style={styles.typeItem}>
          <Text style={styles.typeName}>实时订单</Text>
          <View style={styles.typeBarContainer}>
            <View style={[styles.typeBar, { width: '70%' }]} />
          </View>
          <Text style={styles.typePercentage}>70%</Text>
        </View>
        <View style={styles.typeItem}>
          <Text style={styles.typeName}>预约订单</Text>
          <View style={styles.typeBarContainer}>
            <View style={[styles.typeBar, { width: '30%' }]} />
          </View>
          <Text style={styles.typePercentage}>30%</Text>
        </View>
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  periodItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  selectedPeriodItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B00',
  },
  periodText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedPeriodText: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  overviewTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  totalIncome: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  overviewDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  detailDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E5EA',
  },
  positiveTrend: {
    color: '#4CAF50',
  },
  negativeTrend: {
    color: '#F44336',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 8,
    padding: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#999999',
    marginTop: 8,
  },
  analysisCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 8,
    padding: 20,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeName: {
    width: 80,
    fontSize: 14,
    color: '#666666',
  },
  typeBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginHorizontal: 12,
  },
  typeBar: {
    height: '100%',
    backgroundColor: '#FF6B00',
    borderRadius: 4,
  },
  typePercentage: {
    width: 40,
    fontSize: 14,
    color: '#333333',
    textAlign: 'right',
  },
});