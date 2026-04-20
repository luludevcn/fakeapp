import { useState, useCallback, useEffect } from 'react';
import storage from '../services/storage';
import secureStorage from '../services/secureStorage';

export function useSecureStorage() {
  const [isLoading, setIsLoading] = useState(false);

  const setToken = useCallback(async (token: string) => {
    setIsLoading(true);
    try {
      await secureStorage.setToken(token);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getToken = useCallback(async () => {
    return await secureStorage.getToken();
  }, []);

  const removeToken = useCallback(async () => {
    await secureStorage.removeToken();
  }, []);

  const setUserId = useCallback(async (userId: string) => {
    await secureStorage.setUserId(userId);
  }, []);

  const getUserId = useCallback(async () => {
    return await secureStorage.getUserId();
  }, []);

  const setUserType = useCallback(async (userType: 'user' | 'driver' | 'admin') => {
    await secureStorage.setUserType(userType);
  }, []);

  const getUserType = useCallback(async () => {
    return await secureStorage.getUserType();
  }, []);

  const clear = useCallback(async () => {
    await secureStorage.clear();
  }, []);

  return {
    isLoading,
    setToken,
    getToken,
    removeToken,
    setUserId,
    getUserId,
    setUserType,
    getUserType,
    clear,
  };
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    setIsLoading(true);
    try {
      const data = await storage.getUserPreferences();
      setPreferences(data);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = useCallback(async (updates: any) => {
    await storage.updateUserPreferences(updates);
    await loadPreferences();
  }, []);

  return {
    preferences,
    isLoading,
    updatePreferences,
  };
}

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const data = await storage.getSearchHistory();
      setHistory(data);
    } finally {
      setIsLoading(false);
    }
  };

  const addQuery = useCallback(async (query: string) => {
    await storage.addSearchHistory(query);
    await loadHistory();
  }, []);

  const clearHistory = useCallback(async () => {
    await storage.clearSearchHistory();
    await loadHistory();
  }, []);

  return {
    history,
    isLoading,
    addQuery,
    clearHistory,
  };
}

export function useFavoriteAddresses() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    setIsLoading(true);
    try {
      const data = await storage.getFavoriteAddresses();
      setAddresses(data);
    } finally {
      setIsLoading(false);
    }
  };

  const addAddress = useCallback(async (address: any) => {
    await storage.addFavoriteAddress(address);
    await loadAddresses();
  }, []);

  const removeAddress = useCallback(async (id: string) => {
    await storage.removeFavoriteAddress(id);
    await loadAddresses();
  }, []);

  return {
    addresses,
    isLoading,
    addAddress,
    removeAddress,
  };
}

export default storage;