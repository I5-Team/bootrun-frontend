/**
 * 입력값에서 공백을 제거하는 유틸 함수
 */
export const removeWhitespace = (value: string): string => {
  return value.replace(/\s/g, '');
};

/**
 * 이메일 입력값에서 공백만 제거
 * (한글은 입력을 허용하되, 유효성 검사에서 에러 처리)
 */
export const sanitizeEmail = (value: string): string => {
  return value.replace(/\s/g, '').toLowerCase();
};

/**
 * 이메일 유효성 검증 함수
 * 영문 대소문자, 숫자, 특수문자(., -, _, +, %)만 허용
 * 한글 및 기타 문자는 허용하지 않음
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // test() 메서드는 정규표현식 패턴과 문자열이 일치하는지 검사
  // 일치하면 true, 일치하지 않으면 false를 반환
  return emailRegex.test(email);
};

/**
 * 비밀번호 유효성 검증 함수 (8~32자, 영문 대/소문자, 숫자, 특수문자, 공백 제외)
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
  return passwordRegex.test(password);
};

/**
 * 닉네임 유효성 검증 함수 (한글 완성형 또는 영문만 허용, 2~18자)
 * 한글 자모(ㅇ, ㅏ 등)는 완성형이 아니므로 제외
 * 한글 완성형(가-힣) 또는 영문 대소문자(a-z, A-Z)만 허용
 * 공백, 숫자, 특수문자, 한글 자모는 제외
 */
export const validateNickName = (nickName: string): boolean => {
  const nickNameRegex = /^[가-힣a-zA-Z]{2,18}$/;
  return nickNameRegex.test(nickName);
};
