import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    question: '如何注册成为快狗打车司机？',
    answer: '您需要下载快狗打车司机端APP，点击注册按钮，按照提示填写个人信息、车辆信息，并上传相关证件进行审核。审核通过后即可成为快狗打车司机。',
  },
  {
    id: '2',
    question: '接单后可以取消订单吗？',
    answer: '接单后如需取消订单，请在订单详情页面点击取消订单按钮，并选择取消原因。频繁取消订单可能会影响您的服务评分。',
  },
  {
    id: '3',
    question: '如何提现我的收入？',
    answer: '您可以在钱包页面点击提现按钮，选择提现金额和提现方式，按照提示完成提现操作。提现到账时间一般为1-3个工作日。',
  },
  {
    id: '4',
    question: '订单完成后如何评价？',
    answer: '订单完成后，您可以在订单详情页面点击评价订单按钮，对本次服务进行评分和评价。',
  },
  {
    id: '5',
    question: '如何处理客户投诉？',
    answer: '如遇客户投诉，请及时联系客服说明情况。客服会根据实际情况进行处理，维护您的合法权益。',
  },
  {
    id: '6',
    question: '如何更新车辆信息？',
    answer: '您可以在我的车辆页面点击编辑按钮，更新车辆信息并重新提交审核。审核通过后，新的车辆信息将生效。',
  },
  {
    id: '7',
    question: '平台补贴如何领取？',
    answer: '平台会根据活动规则自动发放补贴到您的账户，您可以在钱包页面查看补贴明细。',
  },
  {
    id: '8',
    question: '遇到订单纠纷怎么办？',
    answer: '如遇订单纠纷，请保留相关证据并及时联系客服。客服会根据实际情况进行调解和处理。',
  },
];

export default function FAQ() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>常见问题</Text>
        <View style={styles.placeholder} />
        </View>
      </SafeAreaView>

      {/* 常见问题列表 */}
      <ScrollView style={styles.faqList} showsVerticalScrollIndicator={false}>
        {faqItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.faqItem}
            onPress={() => toggleExpand(item.id)}
            activeOpacity={0.8}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.question}>{item.question}</Text>
              <Ionicons
                name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#666666"
              />
            </View>
            {expandedId === item.id && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{item.answer}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  faqList: {
    flex: 1,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  question: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginRight: 12,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  answer: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});