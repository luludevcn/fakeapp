export type PaymentMethod = 'wechat' | 'alipay' | 'balance';

export interface PaymentResult {
  success: boolean;
  orderId?: string;
  error?: string;
  transactionId?: string;
}

class PaymentService {
  private isWechatInstalled: boolean = true;
  private isAlipayInstalled: boolean = true;

  async checkPaymentMethods(): Promise<{ wechat: boolean; alipay: boolean }> {
    return {
      wechat: this.isWechatInstalled,
      alipay: this.isAlipayInstalled,
    };
  }

  async payWithWechat(amount: number, orderId: string): Promise<PaymentResult> {
    try {
      // 模拟微信支付流程
      console.log(`发起微信支付：金额=${amount}, 订单号=${orderId}`);
      
      // 模拟支付延迟
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // 模拟支付结果
      const success = Math.random() > 0.1; // 90% 成功率
      
      if (success) {
        return {
          success: true,
          orderId,
          transactionId: `WX${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
        };
      } else {
        return {
          success: false,
          orderId,
          error: '微信支付失败，请稍后重试',
        };
      }
    } catch (error) {
      return {
        success: false,
        orderId,
        error: '微信支付异常',
      };
    }
  }

  async payWithAlipay(amount: number, orderId: string): Promise<PaymentResult> {
    try {
      // 模拟支付宝支付流程
      console.log(`发起支付宝支付：金额=${amount}, 订单号=${orderId}`);
      
      // 模拟支付延迟
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // 模拟支付结果
      const success = Math.random() > 0.1; // 90% 成功率
      
      if (success) {
        return {
          success: true,
          orderId,
          transactionId: `ALI${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
        };
      } else {
        return {
          success: false,
          orderId,
          error: '支付宝支付失败，请稍后重试',
        };
      }
    } catch (error) {
      return {
        success: false,
        orderId,
        error: '支付宝支付异常',
      };
    }
  }

  async payWithBalance(
    amount: number,
    orderId: string,
    userBalance: number
  ): Promise<PaymentResult> {
    try {
      console.log(`发起余额支付：金额=${amount}, 订单号=${orderId}, 余额=${userBalance}`);
      
      // 模拟支付延迟
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (userBalance < amount) {
        return {
          success: false,
          orderId,
          error: '余额不足，请选择其他支付方式',
        };
      }
      
      return {
        success: true,
        orderId,
        transactionId: `BAL${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
      };
    } catch (error) {
      return {
        success: false,
        orderId,
        error: '余额支付异常',
      };
    }
  }

  async pay(
    amount: number,
    orderId: string,
    method: PaymentMethod,
    userBalance?: number
  ): Promise<PaymentResult> {
    switch (method) {
      case 'wechat':
        return this.payWithWechat(amount, orderId);
      case 'alipay':
        return this.payWithAlipay(amount, orderId);
      case 'balance':
        return this.payWithBalance(amount, orderId, userBalance || 0);
      default:
        return {
          success: false,
          orderId,
          error: '不支持的支付方式',
        };
    }
  }

  async refund(
    transactionId: string,
    amount: number
  ): Promise<{ success: boolean; error?: string }> {
    try {
      console.log(`发起退款：交易号=${transactionId}, 金额=${amount}`);
      
      // 模拟退款延迟
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const success = Math.random() > 0.05; // 95% 成功率
      
      if (success) {
        return { success: true };
      } else {
        return { success: false, error: '退款失败，请稍后重试' };
      }
    } catch (error) {
      return { success: false, error: '退款异常' };
    }
  }
}

export default new PaymentService();