import { loadTossPayments } from '@tosspayments/payment-sdk';

const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;

export const requestTossPayment = async ({
  amount,
  orderId,
  orderName,
  successUrl,
  failUrl,
  customerName,
  customerEmail,
}: {
  amount: number;
  orderId: string;
  orderName: string;
  successUrl: string;
  failUrl: string;
  customerName: string;
  customerEmail: string;
}) => {
  const tossPayments = await loadTossPayments(clientKey);
  await tossPayments.requestPayment('카드', {
    amount,
    orderId,
    orderName,
    successUrl,
    failUrl,
    customerName,
    customerEmail,
  });
};

export const getTossPaymentResult = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    paymentKey: urlParams.get('paymentKey'),
    orderId: urlParams.get('orderId'),
    amount: parseInt(urlParams.get('amount') ?? '0'),
  };
};
