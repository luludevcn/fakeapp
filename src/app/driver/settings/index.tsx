import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DriverSettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [autoAccept, setAutoAccept] = useState(false);

  const settingsItems = [
    {
      id: '1',
      icon: 'notifications',
      title: '通知设置',
      type: 'switch',
      value: notifications,
      onValueChange: setNotifications,
    },
    {
      id: '2',
      icon: 'location',
      title: '位置服务',
      type: 'switch',
      value: location,
      onValueChange: setLocation,
    },
    {
      id: '3',
      icon: 'checkmark-circle',
      title: '自动接单',
      type: 'switch',
      value: autoAccept,
      onValueChange: setAutoAccept,
    },
    {
      id: '4',
      icon: 'lock-closed',
      title: '账号安全',
      type: 'navigation',
      onPress: () => console.log('账号安全'),
    },
    {
      id: '5',
      icon: 'language',
      title: '语言设置',
      type: 'navigation',
      onPress: () => console.log('语言设置'),
    },
    {
      id: '6',
      icon: 'information-circle',
      title: '关于我们',
      type: 'navigation',
      onPress: () => console.log('关于我们'),
    },
    {
      id: '7',
      icon: 'help-circle',
      title: '帮助中心',
      type: 'navigation',
      onPress: () => console.log('帮助中心'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.settingsContainer}>
        {settingsItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.settingsItem}
            onPress={item.type === 'navigation' ? item.onPress : undefined}
            disabled={item.type === 'switch'}
          >
            <View style={styles.settingsIconContainer}>
              <Ionicons name={item.icon as any} size={24} color="#666" />
            </View>
            <Text style={styles.settingsTitle}>{item.title}</Text>
            {item.type === 'switch' ? (
              <Switch
                value={item.value}
                onValueChange={item.onValueChange}
                trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
                thumbColor={item.value ? '#fff' : '#f4f3f4'}
              />
            ) : (
              <Ionicons name="chevron-forward" size={20} color="#999" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* 版本信息 */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>快狗打车司机端 v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  settingsContainer: {
    backgroundColor: '#fff',
    marginTop: 12,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  versionContainer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#999',
  },
});