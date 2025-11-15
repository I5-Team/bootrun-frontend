export interface ApiResponse<T> {
  // 공통 응답 형식
  success: boolean;
  message: string;
  data?: T;
}

export interface ResponseError {
  // 오류 응답 형식
  response?: {
    status: number;
    data: {
      detail: {
        detail?: string;
        error?: string;
      };
    };
  };
}
