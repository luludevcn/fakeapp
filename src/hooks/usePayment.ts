import { useState, useCallback } from 'react';
import paymentService, { PaymentMethod, PaymentResult } from '../services/paymentService';

export default function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pay = useCallback(
    async (
      amount: number,
      orderId: string,
      method: PaymentMethod,
      userBalance?: number
    ): Promise<PaymentResult> => {
      setLoading(true);
      setError(null);

      try {
        const result = await paymentService.pay(amount, orderId, method, userBalance);
        
        if (!result.success && result.error) {
          setError(result.error);
        }
        
        return result;
      } catch (err) {
        const errorMessage = '支付失败，请稍后重试';
        setError(errorMessage);
        return {
          success: false,
          orderId,
          error: errorMessage,
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const refund = useCallback(
    async (transactionId: string, amount: number) => {
      setLoading(true);
      setError(null);

      try {
        const result = await paymentService.refund(transactionId, amount);
        
        if (!result.success && result.error) {
          setError(result.error);
        }
        
        return result;
      } catch (err) {
        const errorMessage = '退款失败，请稍后重试';
        setError(errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const checkPaymentMethods = useCallback(async () => {
    return paymentService.checkPaymentMethods();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    pay,
    refund,
    checkPaymentMethods,
    clearError,
  };
}