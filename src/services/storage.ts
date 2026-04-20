import * as SecureStore from 'expo-secure-store';

const USER_PREFERENCES_KEY = 'user_preferences';
const SEARCH_HISTORY_KEY = 'search_history';
const ORDER_HISTORY_KEY = 'order_history';
const FAVORITE_ADDRESSES_KEY = 'favorite_addresses';

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'zh' | 'en';
  notifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

interface FavoriteAddress {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

class Storage {
  // 用户偏好设置
  async setUserPreferences(preferences: UserPreferences): Promise<void> {
    await SecureStore.setItemAsync(USER_PREFERENCES_KEY, JSON.stringify(preferences));
  }

  async getUserPreferences(): Promise<UserPreferences | null> {
    const data = await SecureStore.getItemAsync(USER_PREFERENCES_KEY);
    return data ? JSON.parse(data) : null;
  }

  async updateUserPreferences(updates: Partial<UserPreferences>): Promise<void> {
    const current = await this.getUserPreferences();
    const updated = { ...current, ...updates } as UserPreferences;
    await this.setUserPreferences(updated);
  }

  // 搜索历史
  async addSearchHistory(query: string): Promise<void> {
    const history = await this.getSearchHistory();
    const filtered = history.filter((item) => item !== query);
    const updated = [query, ...filtered].slice(0, 20);
    await SecureStore.setItemAsync(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  }

  async getSearchHistory(): Promise<string[]> {
    const data = await SecureStore.getItemAsync(SEARCH_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  }

  async clearSearchHistory(): Promise<void> {
    await SecureStore.deleteItemAsync(SEARCH_HISTORY_KEY);
  }

  // 订单历史
  async addOrderHistory(order: any): Promise<void> {
    const history = await this.getOrderHistory();
    const updated = [order, ...history].slice(0, 100);
    await SecureStore.setItemAsync(ORDER_HISTORY_KEY, JSON.stringify(updated));
  }

  async getOrderHistory(): Promise<any[]> {
    const data = await SecureStore.getItemAsync(ORDER_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  }

  async clearOrderHistory(): Promise<void> {
    await SecureStore.deleteItemAsync(ORDER_HISTORY_KEY);
  }

  // 常用地址
  async addFavoriteAddress(address: FavoriteAddress): Promise<void> {
    const addresses = await this.getFavoriteAddresses();
    const existing = addresses.find((item) => item.id === address.id);
    if (!existing) {
      const updated = [...addresses, address];
      await SecureStore.setItemAsync(FAVORITE_ADDRESSES_KEY, JSON.stringify(updated));
    }
  }

  async getFavoriteAddresses(): Promise<FavoriteAddress[]> {
    const data = await SecureStore.getItemAsync(FAVORITE_ADDRESSES_KEY);
    return data ? JSON.parse(data) : [];
  }

  async removeFavoriteAddress(id: string): Promise<void> {
    const addresses = await this.getFavoriteAddresses();
    const updated = addresses.filter((item) => item.id !== id);
    await SecureStore.setItemAsync(FAVORITE_ADDRESSES_KEY, JSON.stringify(updated));
  }

  async updateFavoriteAddress(address: FavoriteAddress): Promise<void> {
    const addresses = await this.getFavoriteAddresses();
    const updated = addresses.map((item) => (item.id === address.id ? address : item));
    await SecureStore.setItemAsync(FAVORITE_ADDRESSES_KEY, JSON.stringify(updated));
  }

  // 通用方法
  async setItem(key: string, value: any): Promise<void> {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }

  async getItem<T>(key: string): Promise<T | null> {
    const data = await SecureStore.getItemAsync(key);
    return data ? JSON.parse(data) : null;
  }

  async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }

  async clear(): Promise<void> {
    await this.clearOrderHistory();
    await this.clearSearchHistory();
    await SecureStore.deleteItemAsync(USER_PREFERENCES_KEY);
    await SecureStore.deleteItemAsync(FAVORITE_ADDRESSES_KEY);
  }
}

export default new Storage();