import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

export default function CustomerService() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        text: '您好！欢迎使用快狗打车客服服务，请问有什么可以帮助您的？',
        sender: 'system',
        timestamp: new Date(),
      },
    ];
    setMessages(initialMessages);
  }, []);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');

    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAutoReply(inputText.trim()),
        sender: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  const getAutoReply = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('订单') || lowerMessage.includes('接单')) {
      return '关于订单问题，您可以在订单详情页面查看或联系相关人员。如需人工客服，请回复“人工”。';
    } else if (lowerMessage.includes('钱包') || lowerMessage.includes('提现')) {
      return '关于钱包问题，您可以在钱包页面查看余额和提现记录。如需人工客服，请回复“人工”。';
    } else if (lowerMessage.includes('车辆') || lowerMessage.includes('认证')) {
      return '关于车辆认证问题，您可以在车辆管理页面查看认证状态。如需人工客服，请回复“人工”。';
    } else if (lowerMessage.includes('人工')) {
      return '正在为您转接人工客服，请稍候...';
    } else {
      return '感谢您的咨询，我们会尽快处理您的问题。如需人工客服，请回复“人工”。';
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    return (
      <View className={`mb-4 max-w-[80%] ${item.sender === 'user' ? 'self-end' : 'self-start'}`}>
        <View className={`px-3 py-2.5 rounded-2xl ${item.sender === 'user' ? 'bg-green-500 rounded-br-sm' : 'bg-white rounded-bl-sm border border-gray-200'}`}>
          <Text className={`text-sm leading-relaxed ${item.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
            {item.text}
          </Text>
        </View>
        <Text className="text-xs text-gray-400 mt-1 self-end">
          {item.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-gray-100"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* 头部 */}
      <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">客服中心</Text>
        <TouchableOpacity className="p-2">
          <Ionicons name="ellipsis-vertical" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* 消息列表 */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      {/* 输入区域 */}
      <View className="flex-row items-end bg-white px-3 py-3 border-t border-gray-200">
        <TextInput
          className="flex-1 min-h-[40px] max-h-[100px] px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-800"
          placeholder="请输入您的问题..."
          placeholderTextColor="#999999"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          className={`w-10 h-10 rounded-full justify-center items-center ml-3 ${!inputText.trim() ? 'bg-gray-300' : 'bg-green-500'}`}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
