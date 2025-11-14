// import type { OrderData } from '../types/ProfileType';
// import { apiClient } from './client';
// import { mockOrderData } from '../data/mockMyPageData';
// // (OrderData, OrderResponse 타입 필요)

// const USE_MOCK = true;

// export const fetchOrderHistory = async (): Promise<OrderData> => {
//   // (타입 수정 필요)
//   if (USE_MOCK) {
//     console.warn('[MOCK API] fetchOrderHistory');
//     return new Promise((resolve) => setTimeout(() => resolve(mockOrderData), 500));
//   }
//   const response = await apiClient.get<OrderResponse>('/orders/history');
//   return response.data;
// };
