import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// 配置通知行为
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * 请求通知权限
 */
export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  } catch (error) {
    console.error('请求通知权限失败:', error);
    return false;
  }
}

/**
 * 获取推送令牌
 */
export async function getPushToken(): Promise<string | null> {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    if (existingStatus !== 'granted') {
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: 'your-project-id', // 替换为实际的项目 ID
    });

    return token.data;
  } catch (error) {
    console.error('获取推送令牌失败:', error);
    return null;
  }
}

/**
 * 发送本地通知
 */
export async function sendLocalNotification(options: {
  title: string;
  body: string;
  data?: any;
  sound?: boolean;
}) {
  const { title, body, data, sound = true } = options;

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: null, // 立即发送
  });
}

/**
 * 定时发送通知
 */
export async function scheduleNotification(options: {
  title: string;
  body: string;
  trigger: Date | number;
  data?: any;
}) {
  const { title, body, trigger, data } = options;

  let triggerConfig: Notifications.NotificationTriggerInput;

  if (trigger instanceof Date) {
    triggerConfig = {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: trigger.getTime(),
    };
  } else {
    // 秒数
    triggerConfig = {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: trigger,
      repeats: false,
    };
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
    },
    trigger: triggerConfig,
  });

  return notificationId;
}

/**
 * 取消通知
 */
export async function cancelNotification(notificationId: string) {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

/**
 * 取消所有通知
 */
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.dismissAllNotificationsAsync();
}

/**
 * 获取所有已安排的通知
 */
export async function getScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}

/**
 * 监听通知点击事件
 */
export function addNotificationResponseListener(
  callback: (response: Notifications.NotificationResponse) => void
) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}

/**
 * 监听通知接收事件
 */
export function addNotificationReceivedListener(
  callback: (notification: Notifications.Notification) => void
) {
  return Notifications.addNotificationReceivedListener(callback);
}

/**
 * 移除监听器
 */
export function removeNotificationSubscription(
  subscription: Notifications.Subscription
) {
  subscription.remove();
}

/**
 * 设置通知角标
 */
export async function setBadgeCounterAsync(counter: number) {
  await Notifications.setBadgeCountAsync(counter);
}

/**
 * 订单推送通知
 */
export async function sendOrderNotification(order: {
  id: string;
  from: string;
  to: string;
  price: number;
}) {
  await sendLocalNotification({
    title: '新订单来了！',
    body: `您有新的订单，${order.from} 到 ${order.to}，运费 ¥${order.price}`,
    data: {
      type: 'new_order',
      orderId: order.id,
    },
    sound: true,
  });
}

/**
 * 系统通知
 */
export async function sendSystemNotification(options: {
  title: string;
  body: string;
  type?: 'activity' | 'notice' | 'promotion';
  data?: any;
}) {
  await sendLocalNotification({
    title: options.title,
    body: options.body,
    data: {
      type: options.type || 'notice',
      ...options.data,
    },
    sound: true,
  });
}

/**
 * 初始化推送通知
 */
export async function initPushNotification() {
  // 请求权限
  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    console.warn('用户未授权通知权限');
    return null;
  }

  // 获取推送令牌
  const pushToken = await getPushToken();

  // 设置 Android 通知渠道
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: '默认通知',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
    });

    // 订单通知渠道
    await Notifications.setNotificationChannelAsync('orders', {
      name: '订单通知',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
      showBadge: true,
    });

    // 系统通知渠道
    await Notifications.setNotificationChannelAsync('system', {
      name: '系统通知',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
    });
  }

  return pushToken;
}

export default {
  requestNotificationPermission,
  getPushToken,
  sendLocalNotification,
  scheduleNotification,
  cancelNotification,
  cancelAllNotifications,
  getScheduledNotifications,
  addNotificationResponseListener,
  addNotificationReceivedListener,
  removeNotificationSubscription,
  setBadgeCounterAsync,
  sendOrderNotification,
  sendSystemNotification,
  initPushNotification,
};