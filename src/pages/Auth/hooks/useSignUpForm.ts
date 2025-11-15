/**
 * 회원가입 폼 로직을 관리하는 커스텀 훅
 * - 폼 필드 상태 관리 (이메일, 비밀번호, 닉네임, 인증코드)
 * - 유효성 검증 및 에러 상태 관리
 * - 이메일 인증 상태 관리
 */
import { useState, useEffect } from 'react';
import {
  useConfirmEmailVerification,
  useRegister,
  useRequestEmailVerification,
} from '../../../queries/useAuthQueries';
import type { ResponseError } from '../../../types/api';

import {
  removeWhitespace,
  sanitizeEmail,
  validateEmail,
  validatePassword,
  validateNickName,
} from '../../../utils/validation';

// 폼 필드 상태 타입
interface FormState {
  email: string;
  verificationCode: string;
  password: string;
  passwordConfirm: string;
  nickName: string;
}

// 에러 상태 타입
interface ErrorState {
  email: string | boolean;
  password: string | boolean;
  passwordConfirm: string | boolean;
  nickName: string | boolean;
}

// 이메일 인증 상태 타입
interface EmailVerificationState {
  isEmailSent: boolean;
  isEmailVerified: boolean;
  showEmailHelp: boolean;
}

interface ApiMessageState {
  type: 'success' | 'error' | null;
  message: string | null;
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
  handleNickNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVerificationCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailVerification: () => void;
  handleVerificationCodeSubmit: () => void;
  handleResendCode: () => void;
  setShowEmailHelp: (show: boolean) => void;
  // API 메시지 상태
  apiMessage: ApiMessageState;

  // 회원가입 가능 여부
  isSignUpEnabled: boolean;

  // 회원가입 처리 함수
  handleSignUp: () => void;
}

/**
 * 회원가입 폼 로직을 관리하는 커스텀 훅
 *
 * 이 훅은 다음을 관리합니다:
 * - 폼 필드 값 (이메일, 비밀번호, 비밀번호 확인, 닉네임, 인증코드)
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
  const [nickName, setNickName] = useState('');

  // 유효성 검증 상태
  const [emailError, setEmailError] = useState<string | boolean>(false);
  const [passwordError, setPasswordError] = useState<string | boolean>(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | boolean>(false);
  const [nickNameError, setNickNameError] = useState<string | boolean>(false);

  // 인증 상태
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showEmailHelp, setShowEmailHelp] = useState(false);

  // API 메시지 상태
  const [apiMessage, setApiMessage] = useState<ApiMessageState>({
    type: null,
    message: null,
  });

  // 이메일 인증 요청 훅
  const { mutate: requestVerifyMutate, isPending: isSendingCode } = useRequestEmailVerification();
  const { mutate: confirmVerifyMutate, isPending: isConfirmingCode } =
    useConfirmEmailVerification();
  const { mutate: registerMutate, isPending: isRegistering } = useRegister();

  // 이메일 처리 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 공백만 제거 (한글은 입력 허용, 유효성 검사에서 에러 처리)
    const sanitizedValue = sanitizeEmail(value);
    setEmail(sanitizedValue);

    setApiMessage({ type: null, message: null });

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

  // 비밀번호 처리 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 공백 입력 제거
    const sanitizedValue = removeWhitespace(value);
    setPassword(sanitizedValue);

    // 유효성 검증
    if (sanitizedValue && !validatePassword(sanitizedValue)) {
      setPasswordError('8~32자의 영문 대/소문자, 숫자, 특수문자를 사용해야 합니다.');
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

  // 닉네임 변경 핸들러
  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 공백 입력 제거
    const sanitizedValue = removeWhitespace(value);
    setNickName(sanitizedValue);

    // 유효성 검증
    if (sanitizedValue && sanitizedValue.length < 2) {
      setNickNameError('닉네임은 2자 이상 입력해주세요.');
    } else if (sanitizedValue && !validateNickName(sanitizedValue)) {
      setNickNameError('닉네임은 한글 단어 혹은 영문만 입력 가능합니다. (예: 홍길동, Kim)');
    } else {
      setNickNameError(false);
    }
  };

  // 인증코드 변경 핸들러
  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const sanitizedValue = removeWhitespace(value);
    setVerificationCode(sanitizedValue);
  };

  // 이메일 인증 요청
  const handleEmailVerification = () => {
    if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    setApiMessage({ type: null, message: null });

    // TODO: API 호출 - 이메일 중복 확인 및 인증 메일 발송
    requestVerifyMutate(
      { email },
      {
        onSuccess: (data) => {
          setIsEmailSent(true);
          const code = data.detail.split(': ')[1] || '???';
          setApiMessage({
            type: 'success',
            message: `인증 코드가 발송되었습니다. (코드: ${code})`,
          });
        },
        onError: (error) => {
          const errorResponse = error as ResponseError;
          const detail = errorResponse.response?.data?.detail.detail;
          console.error('이메일 인증 요청 오류:', detail);

          setApiMessage({ type: 'error', message: detail || '인증 코드 발송에 실패했습니다.' });
        },
      }
    );
  };

  // 인증번호 확인
  const handleVerificationCodeSubmit = () => {
    setApiMessage({ type: null, message: null });
    // TODO: API 호출 - 인증번호 확인
    // 임시로 인증 완료 처리
    confirmVerifyMutate(
      { email, verification_code: verificationCode },
      {
        onSuccess: () => {
          setIsEmailVerified(true);
          setApiMessage({ type: 'success', message: '이메일 인증이 완료되었습니다.' });
          alert('이메일 인증이 완료되었습니다.');
        },
        onError: (error) => {
          const errorResponse = error as ResponseError;
          const detail = errorResponse.response?.data?.detail.detail;
          setApiMessage({ type: 'error', message: detail || '인증 코드가 올바르지 않습니다.' });
        },
      }
    );
  };

  // 인증번호 재전송
  const handleResendCode = () => {
    setApiMessage({ type: null, message: null });
    // TODO: API 호출 - 인증번호 재전송
    console.log('인증번호 재전송');
    requestVerifyMutate(
      { email },
      {
        onSuccess: (data) => {
          setIsEmailSent(true);
          const code = data.detail.split(': ')[1] || '???';
          setApiMessage({
            type: 'success',
            message: `인증 코드가 재전송되었습니다. (코드: ${code})`,
          });
        },
        onError: (error) => {
          const errorResponse = error as ResponseError;
          const detail = errorResponse.response?.data?.detail.detail;
          console.error('이메일 인증 재전송 오류:', detail);

          setApiMessage({ type: 'error', message: detail || '인증 코드 재전송에 실패했습니다.' });
        },
      }
    );
  };

  // 회원가입 버튼 활성화 조건
  const isSignUpEnabled =
    !!email &&
    isEmailVerified &&
    !!password &&
    !!passwordConfirm &&
    !!nickName &&
    !passwordError &&
    !passwordConfirmError &&
    !nickNameError &&
    !isSendingCode &&
    !isConfirmingCode &&
    !isRegistering;

  // 회원가입 처리
  const handleSignUp = () => {
    if (!isSignUpEnabled) return;

    // TODO: API 호출 - 회원가입
    console.log('회원가입:', { email, password, nickName });
    registerMutate({
      email,
      password,
      password_confirm: passwordConfirm,
      nickname: nickName,
    });
  };

  return {
    formState: {
      email,
      verificationCode,
      password,
      passwordConfirm,
      nickName,
    },
    errorState: {
      email: emailError,
      password: passwordError,
      passwordConfirm: passwordConfirmError,
      nickName: nickNameError,
    },
    emailVerification: {
      isEmailSent,
      isEmailVerified,
      showEmailHelp,
    },
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleNickNameChange,
    handleVerificationCodeChange,
    handleEmailVerification,
    handleVerificationCodeSubmit,
    handleResendCode,
    setShowEmailHelp,
    isSignUpEnabled,
    handleSignUp,
    apiMessage,
  };
};
