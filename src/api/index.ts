import useSWR from 'swr';

// API基础URL
const API_BASE_URL = 'https://api.example.com';

// 通用请求函数
const fetcher = async (url: string) => {
  const response = await fetch(`${API_BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error('API请求失败');
  }
  return response.json();
};

// 获取订单列表
export const useOrders = () => {
  const { data, error, isLoading } = useSWR('/orders', fetcher);
  return { orders: data, error, isLoading };
};

// 获取用户信息
export const useUserInfo = () => {
  const { data, error, isLoading } = useSWR('/user', fetcher);
  return { user: data, error, isLoading };
};

// 获取服务列表
export const useServices = () => {
  const { data, error, isLoading } = useSWR('/services', fetcher);
  return { services: data, error, isLoading };
};
