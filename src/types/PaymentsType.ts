export type PaymentMethod = 'card' | 'transfer' | 'toss';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refuned';

// POST /payments
export interface PaymentsBodyData {
  course_id: number,
  payment_method: PaymentMethod,
}

export type PaymentsResponse = {
    id: number,
    user_id: number,
    course_id: number,
    course_title: string,
    amount: number,
    discount_amount?: number,
    final_amount: number,
    payment_method: PaymentMethod,
    status: string,
    transaction_id: string,
    receipt_url: string | null,
    paid_at: string | null,
    created_at: string,
}

// GET /payments
export interface PaymentsParams {
    status?: string | null,
    payment_method?: PaymentMethod,
    start_date?: string | null,
    end_date?: string | null,
    keyword?: string | null,
    page?: number,
    page_size?: number,
}

export type PaymentsItem = PaymentsResponse;


// GET /payments/{payment_id}
export type PaymentDetailItem = {
    id: number,
    user_id: number,
    user_nickname: string,
    user_email: string,
    course_id: number,
    course_title: string,
    amount: number,
    discount_amount: number,
    final_amount: number,
    payment_method: PaymentMethod,
    status: PaymentStatus,
    transaction_id: string,
    receipt_url: string | null,
    paid_at: string,
    created_at: string,
    can_refund?: boolean,
    refund_reason?: string | null,
}

// POST /payments/{payment_id}/confirm
export type PaymentConfirmResponse = {
    id: number,
    user_id: number,
    course_id: number,
    course_title: string,
    amount: number,
    discount_amount: number,
    final_amount: number,
    payment_method: PaymentMethod,
    status: PaymentStatus,
    transaction_id: string,
    receipt_url: string | null,
    paid_at: string | null,
    created_at: string
}

// POST /payments/{payment_id}/cancel
export type PaymentCancelResponse = {
    success?: boolean,
    error?: string,
    message: string,
    detail: string,
}

// POST /payments/refunds
export interface PaymentRefundBodyData {
  payment_id: number,
  reason: string,
}

export type PaymentRefundResponse = {
    idi: number,
    payment_idi: number,
    user_idi: number,
    user_nickname: string,
    amounti: number,
    reason: string,
    statusExpand: string,
    admin_noteExpand: string | null,
    requested_at: string,
    processed_at: string | null,
    payment_date: string,
    course_title: string,
    progress_rate: number,
}

// POST /payments/refunds/my
export type MyRefundItem = {
    id: number,
    payment_id: number,
    user_id: number,
    user_nickname: string,
    amount: number,
    reason: string,
    status: PaymentStatus,
    admin_note: string,
    requested_at: string, 
    processed_at: string, 
    payment_date: string, 
    course_title: string,
    progress_rate: number,
}