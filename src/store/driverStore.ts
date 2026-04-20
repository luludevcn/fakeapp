import { create } from 'zustand';

interface Driver {
  id: string;
  name: string;
  phone: string;
  avatar: string | null;
  rating: number;
  completedOrders: number;
  balance: number;
  vehicle: string;
  vehicleType: string;
}

interface Order {
  id: string;
  pickup: string;
  dropoff: string;
  price: number;
  customerName: string;
  status: 'pending' | 'accepted' | 'enroute' | 'completed' | 'cancelled';
}

interface DriverState {
  driver: Driver | null;
  isLoggedIn: boolean;
  isOnline: boolean;
  currentOrder: Order | null;
  login: (driver: Driver) => void;
  logout: () => void;
  setOnlineStatus: (isOnline: boolean) => void;
  updateDriver: (driver: Partial<Driver>) => void;
  setCurrentOrder: (order: Order | null) => void;
  updateOrderStatus: (status: Order['status']) => void;
  updateBalance: (amount: number) => void;
  updateRating: (rating: number) => void;
}

export const useDriverStore = create<DriverState>((set) => ({
  driver: null,
  isLoggedIn: false,
  isOnline: false,
  currentOrder: null,
  login: (driver) => set({ driver, isLoggedIn: true }),
  logout: () => set({ driver: null, isLoggedIn: false, isOnline: false, currentOrder: null }),
  setOnlineStatus: (isOnline) => set({ isOnline }),
  updateDriver: (driver) => set((state) => ({
    driver: state.driver ? { ...state.driver, ...driver } : null,
  })),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  updateOrderStatus: (status) => set((state) => ({
    currentOrder: state.currentOrder ? { ...state.currentOrder, status } : null,
  })),
  updateBalance: (amount) => set((state) => ({
    driver: state.driver ? { ...state.driver, balance: state.driver.balance + amount } : null,
  })),
  updateRating: (rating) => set((state) => ({
    driver: state.driver ? { ...state.driver, rating } : null,
  })),
}));