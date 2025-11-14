import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * 401 오류 시, 토큰 갱신 재시도를 했는지 여부를
     * 확인하기 위한 커스텀 플래그
     */
    _retry?: boolean;
  }
}
