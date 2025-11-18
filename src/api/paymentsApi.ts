import { API_URL } from "../constants/apiConfig";
import type { MyRefundItem, PaymentCancelResponse, PaymentConfirmResponse, PaymentDetailItem, PaymentRefundBodyData, PaymentRefundResponse, PaymentsBodyData, PaymentsItem, PaymentsParams, PaymentsResponse } from "../types/PaymentsType";
import { apiClient } from "./client";

/**
 * POST /payments
 * 결제 생성
 */
export const postPayments = async (bodyData: PaymentsBodyData): Promise<PaymentsResponse | null> => {
    try {
        const response = await apiClient.post(API_URL.PAYMENT.PAYMENTS, bodyData);
        if(response) {
            console.log('[API 요청 성공] 결제 생성');
            return response.data.data;
        }
        console.log('[API 데이터 없음] 결제 생성');
        return null;
    } catch (err) {
        console.error('[API 요청 실패] 결제 생성', err);
        throw err;
    }
};

/**
 * GET /payments
 * 결제 목록 조회
 */
export const fetchPayments = async (
    params: PaymentsParams,
): Promise<PaymentsItem[] | null> => {
    try {
        const response = await apiClient.get(API_URL.PAYMENT.PAYMENTS, { params });
        if (response.data.items) {
            console.log('[API 요청 성공] 결제 목록 조회');
            return response.data.items;
        }
        console.warn('[API 데이터 없음]');
        return null;
    } catch (err) {
        console.error('[API 요청 실패]', err);
        return null;
    }
};

/**
 * GET /payments/{payment_id}
 * 결제 상세 조회
 */
export const fetchPaymentDetail = async (
    payment_id: number,
): Promise<PaymentDetailItem | null> => {
    try {
        const response = await apiClient.get(API_URL.PAYMENT.PAYMENT_DETAIL(payment_id));
        if (response.data.data) {
            console.log('[API 요청 성공] 결제 상세 조회');
            return response.data.data;
        }
        console.warn('[API 데이터 없음]');
        return null;
    } catch (err) {
        console.error('[API 요청 실패]', err);
        return null;
    }
};

/**
 * POST /payments/{payment_id}/confirm
 * 결제 확인
 */
export const postPaymentConfirm = async (
    payment_id: number,
    transaction_id: string,
): Promise<PaymentConfirmResponse | null> => {
    try {
        const response = await apiClient.post(API_URL.PAYMENT.CONFIRM_PAYMENT(payment_id), { transaction_id });
        if(response.data.data) {
            console.log('[API 요청 성공] 결제 확인');
            return response.data.data;
        }
        console.log('[API 데이터 없음]');
        return null;
    } catch (err) {
        console.error('[API 요청 실패]', err);
        return null;
    }
};

/**
 * POST /payments/{payment_id}/confirm
 * 결제 취소
 */
export const postPaymentCancel= async (
    payment_id: number
): Promise<PaymentCancelResponse | null> => {
    try {
        const response = await apiClient.post(API_URL.PAYMENT.CANCEL_PAYMENT(payment_id));

        if (response.data.success) {
            console.log('[API 요청 성공] 결체 취소');
            return response.data;
        } else {
            console.log('[API 요청 성공] 결체 취소 실패', response);
            return null;
        }
    } catch (err) {
        console.error('[API 요청 실패] 결제 취소', err);
        return null;
    }
};

/**
 * POST /payments/refunds
 * 환불 요청
 */
export const postPaymentRefund = async (
    bodyData: PaymentRefundBodyData
): Promise<PaymentRefundResponse | null> => {
    try {
        const response = await apiClient.post(API_URL.REFUND.REQUEST_REFUND, bodyData);

        if(response.data) {
            console.log('[API 요청 성공] 환불 요청');
            return response.data;
        }
        console.log('[API 데이터 없음] 환불 요청');
        return null;
    } catch (err) {
        console.error('[API 요청 실패] 환불 요청', err);
        throw err;
    }
};

/**
 * POST /payments/refunds/my
 * 내 환불 요청 목록
 */
export const fetchMyRefunds = async (): Promise<MyRefundItem[] | null> => {
    try {
        const response = await apiClient.get(API_URL.REFUND.MY_REFUNDS);

        if(response.data) {
            console.log('[API 요청 성공] 내 환불 목록');
            return response.data.data;
        }
        console.log('[API 데이터 없음] 내 환불 목록');
        return [];
    } catch (err) {
        console.error('[API 요청 실패] 내 환불 목록', err);
        throw err;
    }
};