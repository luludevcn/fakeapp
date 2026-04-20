import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Function[]> = new Map();

  connect(userId: string, userType: 'user' | 'driver') {
    // 这里使用模拟的 socket 服务器地址，实际开发中需要替换为真实的服务器地址
    this.socket = io('http://localhost:3000', {
      query: {
        userId,
        userType,
      },
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.emitEvent('connected', { userId, userType });
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    // 监听订单相关事件
    this.socket.on('order:created', (order) => {
      this.emitEvent('order:created', order);
    });

    this.socket.on('order:updated', (order) => {
      this.emitEvent('order:updated', order);
    });

    this.socket.on('order:accepted', (order) => {
      this.emitEvent('order:accepted', order);
    });

    this.socket.on('order:completed', (order) => {
      this.emitEvent('order:completed', order);
    });

    // 监听司机位置更新
    this.socket.on('driver:location', (data) => {
      this.emitEvent('driver:location', data);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  off(event: string, callback: Function) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  private emitEvent(event: string, data: any) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      if (callbacks) {
        callbacks.forEach(callback => {
          try {
            callback(data);
          } catch (error) {
            console.error('Error in event listener:', error);
          }
        });
      }
    }
  }

  // 发送司机位置
  sendDriverLocation(driverId: string, latitude: number, longitude: number) {
    this.emit('driver:location', {
      driverId,
      latitude,
      longitude,
      timestamp: new Date().toISOString(),
    });
  }

  // 创建订单
  createOrder(order: any) {
    this.emit('order:create', order);
  }

  // 接受订单
  acceptOrder(orderId: string, driverId: string) {
    this.emit('order:accept', {
      orderId,
      driverId,
    });
  }

  // 完成订单
  completeOrder(orderId: string, driverId: string) {
    this.emit('order:complete', {
      orderId,
      driverId,
    });
  }
}

export default new SocketService();