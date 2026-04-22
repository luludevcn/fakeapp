import { create } from 'zustand';

interface Order {
  id: string;
  from: string;
  to: string;
  price: number;
  distance: string;
  type: '实时' | '预约';
 补贴?: number;
  status: '待接单' | '已接单' | '配送中' | '已完成' | '已取消';
  rating?: number;
  comment?: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  level: string;
  balance: number;
}

interface AppState {
  // 用户状态
  user: User | null;
  setUser: (user: User) => void;
  
  // 订单状态
  orders: Order[];
  pendingOrders: Order[];
  myOrders: Order[];
  addOrder: (order: Order) => void;
  setOrders: (orders: Order[]) => void;
  acceptOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: '待接单' | '已接单' | '配送中' | '已完成') => void;
  cancelOrder: (orderId: string) => void;
  rateOrder: (orderId: string, rating: number, comment: string) => void;
  getPendingOrders: () => void;
  getMyOrders: () => void;
  
  // 服务状态
  services: {
    id: string;
    name: string;
    icon: string;
  }[];
  
  // 导航状态
  navigation: {
    currentLocation: { latitude: number; longitude: number };
    destination: { latitude: number; longitude: number } | null;
  };
  setCurrentLocation: (location: { latitude: number; longitude: number }) => void;
  setDestination: (destination: { latitude: number; longitude: number } | null) => void;
  
  // 标签页状态
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  
  // 消息状态
  messages: {
    id: string;
    title: string;
    content: string;
    time: string;
    read: boolean;
  }[];
  markMessageAsRead: (messageId: string) => void;
  deleteMessage: (messageId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // 用户状态
  user: null,
  setUser: (user) => set({ user }),
  
  // 订单状态
  orders: [
    {
      id: 'o1',
      from: '东小口森林公园 (东门)(北京市昌平区)',
      to: '大兴区安定镇后安定 (大兴北京市大...)',
      price: 328.85,
      distance: '10公里',
      type: '实时',
      status: '待接单'
    },
    {
      id: 'o2',
      from: '聚发大串 (北七家镇燕丹村 86号)',
      to: '潞苑东路 (通州区)',
      price: 74.40,
      distance: '4公里',
      type: '实时',
      补贴: 15,
      status: '待接单'
    },
    {
      id: 'o3',
      from: '东小口森林公园 (东门)(北京市昌平区)',
      to: '大兴区安定镇后安定 (大兴北京市大...)',
      price: 328.85,
      distance: '10公里',
      type: '预约',
      status: '待接单'
    },
    {
      id: 'o4',
      from: '聚发大串 (北七家镇燕丹村 86号)',
      to: '潞苑东路 (通州区)',
      price: 74.40,
      distance: '4公里',
      type: '预约',
      补贴: 15,
      status: '待接单'
    }
  ],
  pendingOrders: [
    {
      id: 'po1',
      from: '东小口森林公园 (东门)(北京市昌平区)',
      to: '大兴区安定镇后安定 (大兴北京市大...)',
      price: 328.85,
      distance: '10公里',
      type: '实时',
      status: '待接单'
    },
    {
      id: 'po2',
      from: '聚发大串 (北七家镇燕丹村 86号)',
      to: '潞苑东路 (通州区)',
      price: 74.40,
      distance: '4公里',
      type: '实时',
      补贴: 15,
      status: '待接单'
    },
    {
      id: 'po3',
      from: '东小口森林公园 (东门)(北京市昌平区)',
      to: '大兴区安定镇后安定 (大兴北京市大...)',
      price: 328.85,
      distance: '10公里',
      type: '预约',
      status: '待接单'
    },
    {
      id: 'po4',
      from: '聚发大串 (北七家镇燕丹村 86号)',
      to: '潞苑东路 (通州区)',
      price: 74.40,
      distance: '4公里',
      type: '预约',
      补贴: 15,
      status: '待接单'
    }
  ],
  myOrders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  setOrders: (orders) => set({ orders }),
  acceptOrder: (orderId) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === orderId ? { ...order, status: '已接单' } : order
    ),
    pendingOrders: state.pendingOrders.filter(order => order.id !== orderId),
    myOrders: [...state.myOrders, state.orders.find(order => order.id === orderId) as Order]
  })),
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ),
    myOrders: state.myOrders.map(order => 
      order.id === orderId ? { ...order, status } : order
    )
  })),
  cancelOrder: (orderId) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === orderId ? { ...order, status: '已取消' } : order
    ),
    myOrders: state.myOrders.filter(order => order.id !== orderId)
  })),
  rateOrder: (orderId, rating, comment) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === orderId ? { ...order, rating, comment } : order
    ),
    myOrders: state.myOrders.map(order => 
      order.id === orderId ? { ...order, rating, comment } : order
    )
  })),
  getPendingOrders: () => set((state) => ({
    pendingOrders: state.orders.filter(order => order.status === '待接单')
  })),
  getMyOrders: () => set((state) => ({
    myOrders: state.orders.filter(order => 
      order.status === '已接单' || order.status === '配送中' || order.status === '已完成'
    )
  })),
  
  // 服务状态
  services: [
    { id: '1', name: '加入派单', icon: '📦' },
    { id: '2', name: '保障商城', icon: '🛡️' },
    { id: '3', name: '联系客服', icon: '🤙' },
    { id: '4', name: '会员中心', icon: '✅' },
    { id: '5', name: '推荐有奖', icon: '💰' },
    { id: '6', name: '收入排行', icon: '🏆' },
    { id: '7', name: '月入过万', icon: '💸' },
    { id: '8', name: '买车租车', icon: '🚗' },
    { id: '9', name: '加油充电', icon: '⛽' },
    { id: '10', name: '赤兔养车', icon: '🚙' },
    { id: '11', name: '全部服务', icon: '📱' }
  ],
  
  // 导航状态
  navigation: {
    currentLocation: { latitude: 39.9042, longitude: 116.4074 },
    destination: null as { latitude: number; longitude: number } | null,
  },
  setCurrentLocation: (location) => set((state) => ({
    navigation: {
      ...state.navigation,
      currentLocation: location
    }
  })),
  setDestination: (destination) => set((state) => ({
    navigation: {
      ...state.navigation,
      destination
    }
  })),
  
  // 标签页状态
  currentTab: 'home',
  setCurrentTab: (tab) => set({ currentTab: tab }),
  
  // 消息状态
  messages: [
    {
      id: '1',
      title: '订单提醒',
      content: '您有一个新的订单，请及时查看',
      time: '10:30',
      read: false,
    },
    {
      id: '2',
      title: '系统通知',
      content: '平台将于今晚进行系统维护，请提前做好准备',
      time: '09:15',
      read: false,
    },
    {
      id: '3',
      title: '活动通知',
      content: '新用户专享优惠，首单立减20元',
      time: '昨天',
      read: true,
    },
  ],
  markMessageAsRead: (messageId) => set((state) => ({
    messages: state.messages.map(message => 
      message.id === messageId ? { ...message, read: true } : message
    )
  })),
  deleteMessage: (messageId) => set((state) => ({
    messages: state.messages.filter(message => message.id !== messageId)
  })),
}))