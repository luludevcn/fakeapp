import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    // 初始化消息列表，添加欢迎消息
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

    // 添加用户消息
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');

    // 模拟客服回复
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
      <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessageContainer : styles.systemMessageContainer]}>
        <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessageBubble : styles.systemMessageBubble]}>
          <Text style={[styles.messageText, item.sender === 'user' ? styles.userMessageText : styles.systemMessageText]}>
            {item.text}
          </Text>
        </View>
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* 头部 */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>客服中心</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#333333" />
        </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* 消息列表 */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      {/* 输入区域 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="请输入您的问题..."
          placeholderTextColor="#999999"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  moreButton: {
    padding: 8,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  systemMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  userMessageBubble: {
    backgroundColor: '#4CAF50',
    borderBottomRightRadius: 4,
  },
  systemMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  systemMessageText: {
    color: '#333333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    fontSize: 14,
    color: '#333333',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
});