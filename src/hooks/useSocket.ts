import { useCallback, useEffect } from 'react';
import socketService from '../services/socketService';
import { useLocationStore } from '../store/locationStore';
import { Order, useOrderStore } from '../store/orderStore';

interface DriverLocationData {
  driverId: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export default function useSocket(userId: string, userType: 'user' | 'driver') {
  const updateDriverLocation = useLocationStore((state) => state.updateDriverLocation);
  const addOrder = useOrderStore((state) => state.addOrder);
  const updateOrder = useOrderStore((state) => state.updateOrder);

  useEffect(() => {
    socketService.connect(userId, userType);

    socketService.on('driver:location', (data: DriverLocationData) => {
      updateDriverLocation(data.driverId, {
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: new Date(data.timestamp).getTime(),
      });
    });

    socketService.on('order:created', (order: Order) => {
      addOrder(order);
    });

    socketService.on('order:updated', (order: Order) => {
      updateOrder(order);
    });

    socketService.on('order:accepted', (order: Order) => {
      updateOrder(order);
    });

    socketService.on('order:completed', (order: Order) => {
      updateOrder(order);
    });

    return () => {
      socketService.disconnect();
    };
  }, [userId, userType, updateDriverLocation, addOrder, updateOrder]);

  // 监听事件
  const on = useCallback((event: string, callback: Function) => {
    socketService.on(event, callback);
    return () => {
      socketService.off(event, callback);
    };
  }, []);

  // 发送事件
  const emit = useCallback((event: string, data: any) => {
    socketService.emit(event, data);
  }, []);

  // 发送司机位置
  const sendDriverLocation = useCallback((driverId: string, latitude: number, longitude: number) => {
    socketService.sendDriverLocation(driverId, latitude, longitude);
  }, []);

  // 创建订单
  const createOrder = useCallback((order: any) => {
    socketService.createOrder(order);
  }, []);

  // 接受订单
  const acceptOrder = useCallback((orderId: string, driverId: string) => {
    socketService.acceptOrder(orderId, driverId);
  }, []);

  // 完成订单
  const completeOrder = useCallback((orderId: string, driverId: string) => {
    socketService.completeOrder(orderId, driverId);
  }, []);

  return {
    on,
    emit,
    sendDriverLocation,
    createOrder,
    acceptOrder,
    completeOrder,
  };
}