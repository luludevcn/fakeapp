import { create } from 'zustand';

export interface Order {
  id: string;
  pickup: string;
  dropoff: string;
  price: number;
  customerName: string;
  driverName?: string;
  driverId?: string;
  status: 'pending' | 'accepted' | 'enroute' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  setCurrentOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  removeOrder: (orderId: string) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  currentOrder: null,
  setOrders: (orders) => set({ orders }),
  addOrder: (order) => set((state) => ({
    orders: [order, ...state.orders],
  })),
  updateOrder: (order) => set((state) => ({
    orders: state.orders.map((o) => o.id === order.id ? order : o),
    currentOrder: state.currentOrder?.id === order.id ? order : state.currentOrder,
  })),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map((o) => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o),
    currentOrder: state.currentOrder?.id === orderId ? { ...state.currentOrder, status, updatedAt: new Date().toISOString() } : state.currentOrder,
  })),
  removeOrder: (orderId) => set((state) => ({
    orders: state.orders.filter((o) => o.id !== orderId),
    currentOrder: state.currentOrder?.id === orderId ? null : state.currentOrder,
  })),
  clearOrders: () => set({ orders: [], currentOrder: null }),
}));