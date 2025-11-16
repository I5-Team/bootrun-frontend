import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPaymentDetail, fetchPayments, postPaymentConfirm, postPayments } from "../api/paymentsApi";
import type { PaymentsParams, PaymentsItem, PaymentsBodyData } from "../types/PaymentsType";

const useToken = () => localStorage.getItem('accessToken');

/**
 * POST /payments
 * 결제 생성
 */
export const usePostPayments = () => {
  const queryClient = useQueryClient();
  const token = useToken();

  return useMutation({
    mutationFn: (bodyData: PaymentsBodyData) => {           
        if (!token) throw new Error('로그인이 필요합니다');
        return postPayments(bodyData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments']});
    },
  });
};

/**
 * GET /payments
 * 결제 목록 조회
 */
export const usePaymentsQuery = (params: PaymentsParams) => {
  const token = useToken();

  return useQuery<PaymentsItem[] | null>({
    queryKey: ["payments", params],
    queryFn: () => fetchPayments(params),
    placeholderData: [],
    enabled: !!token,
  });
};

/**
 * GET /payments/{payment_id}
 * 결제 상세 조회
 */
export const usePaymentDetailQuery = (payment_id: number) => {
  const token = useToken();

  return useQuery({
    queryKey: ["paymentDetail", payment_id],
    queryFn: () => fetchPaymentDetail(payment_id),
    placeholderData: [],
    enabled: !!token && !!payment_id,
  });
};

/**
 * POST /payments/{payment_id}/confirm
 * 결제 확인
 */
export const usePostPaymentConfirm = () => {
  const queryClient = useQueryClient();
  const token = useToken();

  return useMutation({
    mutationFn: (payment_id: number) => {
        if (!token) throw new Error('로그인이 필요합니다');
        return postPaymentConfirm(payment_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentDetail']});
    },
  });
};