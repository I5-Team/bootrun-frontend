import { useState, useEffect } from 'react';
import type {
  PaymentApiParams,
  PaymentListItem,
  RefundApiParams,
  RefundListItem,
} from '../../../types/AdminPaymentType';
import { fetchPayments, fetchRefunds } from '../../../api/adminApi';

interface UsePaymentDataLoaderReturn {
  // 결제 데이터
  payments: PaymentListItem[];
  paymentLoading: boolean;
  paymentPagination: { total: number; totalPages: number };

  // 환불 데이터
  refunds: RefundListItem[];
  refundLoading: boolean;
  refundPagination: { total: number; totalPages: number };
}

export const usePaymentDataLoader = (
  activeTab: 'payments' | 'refunds',
  paymentParams: PaymentApiParams,
  refundParams: RefundApiParams
): UsePaymentDataLoaderReturn => {
  // 결제 데이터
  const [payments, setPayments] = useState<PaymentListItem[]>([]);
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [paymentPagination, setPaymentPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  // 환불 데이터
  const [refunds, setRefunds] = useState<RefundListItem[]>([]);
  const [refundLoading, setRefundLoading] = useState(true);
  const [refundPagination, setRefundPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  // 결제 데이터 로드
  useEffect(() => {
    if (activeTab !== 'payments') return;

    const loadPayments = async () => {
      setPaymentLoading(true);
      try {
        const response = await fetchPayments(paymentParams);
        setPayments(response.items);
        setPaymentPagination({
          total: response.total,
          totalPages: response.total_pages,
        });
      } catch (error) {
        console.error('결제 내역 로딩 실패:', error);
      } finally {
        setPaymentLoading(false);
      }
    };
    loadPayments();
  }, [paymentParams, activeTab]);

  // 환불 데이터 로드
  useEffect(() => {
    if (activeTab !== 'refunds') return;

    const loadRefunds = async () => {
      setRefundLoading(true);
      try {
        const response = await fetchRefunds(refundParams);
        setRefunds(response.items);
        setRefundPagination({
          total: response.total,
          totalPages: response.total_pages,
        });
      } catch (error) {
        console.error('환불 내역 로딩 실패:', error);
      } finally {
        setRefundLoading(false);
      }
    };
    loadRefunds();
  }, [refundParams, activeTab]);

  return {
    payments,
    paymentLoading,
    paymentPagination,
    refunds,
    refundLoading,
    refundPagination,
  };
};
