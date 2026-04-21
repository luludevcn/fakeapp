import { create } from 'zustand';

interface Order {
  id: string;
  from: string;
  to: string;
  price: number;
  distance: string;
  type: '实时' | '预约';
 补贴?: number;
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
  addOrder: (order: Order) => void;
  setOrders: (orders: Order[]) => void;
  
  // 服务状态
  services: {
    id: string;
    name: string;
    icon: string;
  }[];
  
  // 导航状态
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // 用户状态
  user: null,
  setUser: (user) => set({ user }),
  
  // 订单状态
  orders: [
    {
      id: '1',
      from: '东小口森林公园 (东门)(北京市昌平区)',
      to: '大兴区安定镇后安定 (大兴北京市大...)',
      price: 328.85,
      distance: '10公里',
      type: '实时'
    },
    {
      id: '2',
      from: '聚发大串 (北七家镇燕丹村 86号)',
      to: '潞苑东路 (通州区)',
      price: 74.40,
      distance: '4公里',
      type: '实时',
     补贴: 15
    },
    {
      id: '3',
      from: '东小口森林公园 (东门)(北京市昌平区)',
      to: '大兴区安定镇后安定 (大兴北京市大...)',
      price: 328.85,
      distance: '10公里',
      type: '预约'
    },
    {
      id: '4',
      from: '聚发大串 (北七家镇燕丹村 86号)',
      to: '潞苑东路 (通州区)',
      price: 74.40,
      distance: '4公里',
      type: '预约',
     补贴: 15
    },
    {
      id: '5',
      from: '东小口森林公园 (东门)(北京市昌平区)',
      to: '大兴区安定镇后安定 (大兴北京市大...)',
      price: 328.85,
      distance: '10公里',
      type: '预约'
    },
    {
      id: '6',
      from: '聚发大串 (北七家镇燕丹村 86号)',
      to: 'LU苑东路 (通州区)',
      price: 74.40,
      distance: '4公里',
      type: '预约',
     补贴: 15
    },
    {
      id: '7',
      from: '东小口森林公园 (东门)(北京市昌平区)',
      to: '大兴区安定镇后安定 (大兴北京市大...)',
      price: 328.85,
      distance: '10公里',
      type: '预约'
    },
    {
      id: '8',
      from: '聚发大串 (北七家镇燕丹村 86号)',
      to: 'LU苑东路 (通州区)',
      price: 74.40,
      distance: '4公里',
      type: '预约',
     补贴: 15
    },
  ],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  setOrders: (orders) => set({ orders }),
  
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
  currentTab: 'home',
  setCurrentTab: (tab) => set({ currentTab: tab })
}));
