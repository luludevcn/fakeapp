import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
    <View className="flex-1 bg-gray-100">
      {/* 头部 */}
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">常见问题</Text>
        <View className="w-10" />
      </View>

      {/* 常见问题列表 */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {faqItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="bg-white mx-4 mt-3 rounded-lg overflow-hidden"
            onPress={() => toggleExpand(item.id)}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-between px-4 py-4">
              <Text className="flex-1 text-base text-gray-800 mr-3">{item.question}</Text>
              <Ionicons
                name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#666666"
              />
            </View>
            {expandedId === item.id && (
              <View className="px-4 pb-4 border-t border-gray-100">
                <Text className="text-sm text-gray-600 leading-relaxed">{item.answer}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
