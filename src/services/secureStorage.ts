import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const USER_ID_KEY = 'user_id';
const USER_TYPE_KEY = 'user_type';

class SecureStorage {
  async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  }

  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  }

  async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }

  async setUserId(userId: string): Promise<void> {
    await SecureStore.setItemAsync(USER_ID_KEY, userId);
  }

  async getUserId(): Promise<string | null> {
    return await SecureStore.getItemAsync(USER_ID_KEY);
  }

  async removeUserId(): Promise<void> {
    await SecureStore.deleteItemAsync(USER_ID_KEY);
  }

  async setUserType(userType: 'user' | 'driver' | 'admin'): Promise<void> {
    await SecureStore.setItemAsync(USER_TYPE_KEY, userType);
  }

  async getUserType(): Promise<'user' | 'driver' | 'admin' | null> {
    const type = await SecureStore.getItemAsync(USER_TYPE_KEY);
    return type as 'user' | 'driver' | 'admin' | null;
  }

  async removeUserType(): Promise<void> {
    await SecureStore.deleteItemAsync(USER_TYPE_KEY);
  }

  async setItem(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  async getItem(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  }

  async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }

  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_ID_KEY);
    await SecureStore.deleteItemAsync(USER_TYPE_KEY);
  }
}

export default new SecureStorage();