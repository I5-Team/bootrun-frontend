/**
 * 회원가입 폼 로직을 관리하는 커스텀 훅
 * - 폼 필드 상태 관리 (이메일, 비밀번호, 이름, 인증코드)
 * - 유효성 검증 및 에러 상태 관리
 * - 이메일 인증 상태 관리
 */
import { useState, useEffect } from 'react';

/**
 * 입력값에서 공백을 제거하는 유틸 함수
 * 공백 문자를 입력하려고 하면 빈 문자열로 변환
 */
const removeWhitespace = (value: string): string => {
  return value.replace(/\s/g, '');
};

/**
 * 이메일 입력값에서 공백만 제거
 * (한글은 입력을 허용하되, 유효성 검사에서 에러 처리)
 */
const sanitizeEmail = (value: string): string => {
  // 공백만 제거
  return value.replace(/\s/g, '');
};

// 이메일 유효성 검증 함수
export const validateEmail = (email: string): boolean => {
  // 영문 대소문자, 숫자, 특수문자(., -, _, +, %)만 허용
  // 한글 및 기타 문자는 허용하지 않음
  const emailRegex = /^[a-zA-Z0-9._+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // test() 메서드는 정규표현식 패턴과 문자열이 일치하는지 검사
  // 일치하면 true, 일치하지 않으면 false를 반환
  return emailRegex.test(email);
};

// 비밀번호 유효성 검증 함수 (8~16자, 영문 대/소문자, 숫자, 특수문자)
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  return passwordRegex.test(password);
};

// 이름 유효성 검증 함수 (한글 완성형 또는 영문만 허용, 2~20자)
// 한글 자모(ㅇ, ㅏ 등)는 완성형이 아니므로 제외
export const validateName = (name: string): boolean => {
  // 한글 완성형(가-힣) 또는 영문 대소문자(a-z, A-Z)만 허용
  // 공백, 숫자, 특수문자, 한글 자모는 제외
  const nameRegex = /^[가-힣a-zA-Z]{2,20}$/;
  return nameRegex.test(name);
};

// 폼 필드 상태 타입
interface FormState {
  email: string;
  verificationCode: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

// 에러 상태 타입
interface ErrorState {
  email: string | boolean;
  password: string | boolean;
  passwordConfirm: string | boolean;
  name: string | boolean;
}

// 이메일 인증 상태 타입
interface EmailVerificationState {
  isEmailSent: boolean;
  isEmailVerified: boolean;
  showEmailHelp: boolean;
}

// useSignUpForm 훅의 반환 타입
interface UseSignUpFormReturn {
  // 폼 상태
  formState: FormState;
  errorState: ErrorState;
  emailVerification: EmailVerificationState;

  // 핸들러 함수들
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVerificationCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailVerification: () => void;
  handleVerificationCodeSubmit: () => void;
  handleResendCode: () => void;
  setShowEmailHelp: (show: boolean) => void;

  // 회원가입 가능 여부
  isSignUpEnabled: boolean;

  // 회원가입 처리 함수
  handleSignUp: () => void;
}

/**
 * 회원가입 폼 로직을 관리하는 커스텀 훅
 *
 * 이 훅은 다음을 관리합니다:
 * - 폼 필드 값 (이메일, 비밀번호, 비밀번호 확인, 이름, 인증코드)
 * - 각 필드의 유효성 검증 및 에러 상태
 * - 이메일 인증 상태 관리
 * - 회원가입 버튼 활성화 조건 확인
 */
export const useSignUpForm = (): UseSignUpFormReturn => {
  // 입력 필드 상태 관리
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');

  // 유효성 검증 상태
  const [emailError, setEmailError] = useState<string | boolean>(false);
  const [passwordError, setPasswordError] = useState<string | boolean>(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | boolean>(false);
  const [nameError, setNameError] = useState<string | boolean>(false);

  // 인증 상태
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showEmailHelp, setShowEmailHelp] = useState(false);

  // 이메일 변경 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 공백만 제거 (한글은 입력 허용, 유효성 검사에서 에러 처리)
    const sanitizedValue = sanitizeEmail(value);
    setEmail(sanitizedValue);

    // 이메일을 수정하면 인증 상태 리셋
    if (isEmailSent || isEmailVerified) {
      setIsEmailSent(false);
      setIsEmailVerified(false);
      setVerificationCode('');
      setShowEmailHelp(false);
    }

    // 유효성 검증
    if (sanitizedValue && !validateEmail(sanitizedValue)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else if (sanitizedValue) {
      // TODO: API 호출 - 이메일 중복 확인
      // 임시로 이메일이 가입되어 있는 경우의 예시
      // if (이메일이 이미 가입되어 있음) {
      //   setEmailError('이미 가입된 이메일입니다.');
      // }
      setEmailError(false);
    } else {
      setEmailError(false);
    }
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 공백 입력 제거
    const sanitizedValue = removeWhitespace(value);
    setPassword(sanitizedValue);

    // 유효성 검증
    if (sanitizedValue && !validatePassword(sanitizedValue)) {
      setPasswordError('8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해야 합니다.');
    } else {
      setPasswordError(false);
    }
  };

  // 비밀번호와 비밀번호 확인 일치 검증 (비밀번호가 변경될 때)
  useEffect(() => {
    if (passwordConfirm && password && password !== passwordConfirm) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
    } else if (passwordConfirm && password && password === passwordConfirm) {
      setPasswordConfirmError(false);
    }
  }, [password, passwordConfirm]);

  // 비밀번호 확인 변경 핸들러
  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 공백 입력 제거
    const sanitizedValue = removeWhitespace(value);
    setPasswordConfirm(sanitizedValue);

    // 유효성 검증
    if (sanitizedValue && sanitizedValue !== password) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmError(false);
    }
  };

  // 이름 변경 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 공백 입력 제거
    const sanitizedValue = removeWhitespace(value);
    setName(sanitizedValue);

    // 유효성 검증
    if (sanitizedValue && sanitizedValue.length < 2) {
      setNameError('이름은 2자 이상 입력해주세요.');
    } else if (sanitizedValue && !validateName(sanitizedValue)) {
      setNameError('이름은 한글 단어 혹은 영문만 입력 가능합니다. (예: 홍길동, Kim)');
    } else {
      setNameError(false);
    }
  };

  // 인증코드 변경 핸들러
  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  // 이메일 인증 요청
  const handleEmailVerification = () => {
    if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    // TODO: API 호출 - 이메일 중복 확인 및 인증 메일 발송
    setIsEmailSent(true);
  };

  // 인증번호 확인
  const handleVerificationCodeSubmit = () => {
    // TODO: API 호출 - 인증번호 확인
    // 임시로 인증 완료 처리
    setIsEmailVerified(true);
  };

  // 인증번호 재전송
  const handleResendCode = () => {
    // TODO: API 호출 - 인증번호 재전송
    console.log('인증번호 재전송');
  };

  // 회원가입 버튼 활성화 조건
  const isSignUpEnabled =
    !!email &&
    isEmailVerified &&
    !!password &&
    !!passwordConfirm &&
    !!name &&
    !passwordError &&
    !passwordConfirmError &&
    !nameError;

  // 회원가입 처리
  const handleSignUp = () => {
    if (!isSignUpEnabled) return;

    // TODO: API 호출 - 회원가입
    console.log('회원가입:', { email, password, name });
  };

  return {
    formState: {
      email,
      verificationCode,
      password,
      passwordConfirm,
      name,
    },
    errorState: {
      email: emailError,
      password: passwordError,
      passwordConfirm: passwordConfirmError,
      name: nameError,
    },
    emailVerification: {
      isEmailSent,
      isEmailVerified,
      showEmailHelp,
    },
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleNameChange,
    handleVerificationCodeChange,
    handleEmailVerification,
    handleVerificationCodeSubmit,
    handleResendCode,
    setShowEmailHelp,
    isSignUpEnabled,
    handleSignUp,
  };
};
