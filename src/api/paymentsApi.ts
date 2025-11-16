import { API_URL } from "../constants/apiConfig";
import type { PaymentConfirmResponse, PaymentDetailItem, PaymentsBodyData, PaymentsItem, PaymentsParams, PaymentsResponse } from "../types/PaymentsType";
import { apiClient } from "./client";

/**
 * POST /payments
 * 결제 생성
 */
export const postPayments = async (bodyData: PaymentsBodyData): Promise<PaymentsResponse | null> => {
    try {
        const response = await apiClient.post(API_URL.PAYMENT.PAYMENTS, bodyData);
        if(response) {
            console.log('[API 요청 성공]');
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
 * GET /payments
 * 결제 목록 조회
 */
export const fetchPayments = async (
    params: PaymentsParams,
): Promise<PaymentsItem[] | null> => {
    try {
        const response = await apiClient.get(API_URL.PAYMENT.PAYMENTS, { params });
        if (response.data.items) {
            console.log('[API 요청 성공]');
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
): Promise<PaymentDetailItem[] | null> => {
    try {
        const response = await apiClient.get(API_URL.PAYMENT.PAYMENT_DETAIL(payment_id));
        if (response.data.data) {
            console.log('[API 요청 성공]');
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
    payment_id: number
): Promise<PaymentConfirmResponse | null> => {
    try {
        const response = await apiClient.post(API_URL.PAYMENT.CONFIRM_PAYMENT(payment_id));
        if(response.data.data) {
            console.log('[API 요청 성공]');
            return response.data.data;
        }
        console.log('[API 데이터 없음]');
        return null;
    } catch (err) {
        console.error('[API 요청 실패]', err);
        return null;
    }
};