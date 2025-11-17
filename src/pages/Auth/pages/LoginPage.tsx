import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { InputLogin } from '../../../components/InputLogin.tsx';
import { Button } from '../../../components/Button.tsx';
import { ROUTES } from '../../../router/RouteConfig.ts';
import LogoSymbol from '../../../assets/logos/logo-symbol.svg?react';
import GithubIcon from '../../../assets/icons/icon-oatuth-github.svg?react';
import GoogleIcon from '../../../assets/icons/icon-oauth-google.svg?react';
import {
  PageContainer,
  LoginContainer,
  LogoContainer,
  LogoIcon,
  Title,
  LoginForm,
  InputGroup,
  InputWrapper,
  InputLabel,
  LinkGroup,
  StyledLink,
  LinkText,
  LinkDivider,
  Divider,
  DividerLine,
  DividerText,
  SocialLoginSection,
  SocialButtonGroup,
  OriginalColorIcon,
} from '../styles/LoginPage.styled.ts';
import { useLogin } from '../../../queries/useAuthQueries.ts';

const LoginPage: React.FC = () => {
  const { mutate: login, isPending } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | boolean>(false);
  const [passwordError, setPasswordError] = useState<string | boolean>(false);

  // 이메일 유효성 검사
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 초기화
    setEmailError(false);
    setPasswordError(false);

    let hasError = false;

    // 이메일 유효성 검사
    if (!email.trim()) {
      setEmailError('이메일을 입력하세요.');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      hasError = true;
    }

    // 비밀번호 유효성 검사
    if (!password.trim()) {
      setPasswordError('비밀번호를 입력하세요.');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
      hasError = true;
    }

    if (hasError) return;

    // TODO: 실제 로그인 API 호출
    console.log('로그인 시도:', { email, password });

    login({ email, password }); // 로그인 뮤테이션 호출
  };

  // 이메일 변경 핸들러
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(false);
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(false);
  };

  // 소셜 로그인 핸들러
  const handleGithubLogin = () => {
    // TODO:(선택) GitHub 로그인 구현
    console.log('GitHub 로그인');
  };

  const handleGoogleLogin = () => {
    // TODO:(선택) Google 로그인 구현
    console.log('Google 로그인');
  };

  // 로그인 버튼 활성화 여부
  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <PageContainer>
      <LoginContainer>
        <LogoContainer>
          <LogoIcon>
            <LogoSymbol />
          </LogoIcon>
        </LogoContainer>

        <Title>
          부트런에 로그인 후
          <br />
          커뮤니티와 함께 성장해보세요.
        </Title>

        <LoginForm onSubmit={handleSubmit} noValidate>
          <InputGroup>
            <InputWrapper>
              <InputLabel htmlFor="email">이메일</InputLabel>
              <InputLogin
                id="email"
                type="email"
                placeholder="이메일을 입력하세요."
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                fullWidth
                autoComplete="email"
                aria-required="true"
              />
            </InputWrapper>

            <InputWrapper>
              <InputLabel htmlFor="password">비밀번호</InputLabel>
              <InputLogin
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                fullWidth
                autoComplete="current-password"
                aria-required="true"
              />
            </InputWrapper>
          </InputGroup>

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            disabled={!isFormValid || isPending}
          >
            로그인
          </Button>
        </LoginForm>

        <LinkGroup>
          <StyledLink to={ROUTES.SIGNUP}>이메일로 회원가입</StyledLink>
          <LinkDivider>|</LinkDivider>
          <LinkText>비밀번호 찾기</LinkText>
        </LinkGroup>

        <SocialLoginSection>
          <Divider>
            <DividerLine />
            <DividerText>또는</DividerText>
            <DividerLine />
          </Divider>

          <SocialButtonGroup>
            <Button
              type="button"
              variant="outline"
              size="md"
              fullWidth
              onClick={handleGithubLogin}
              iconSvg={
                <OriginalColorIcon>
                  <GithubIcon />
                </OriginalColorIcon>
              }
            >
              GitHub 계정으로 로그인
            </Button>

            <Button
              type="button"
              variant="outline"
              size="md"
              fullWidth
              onClick={handleGoogleLogin}
              iconSvg={
                <OriginalColorIcon>
                  <GoogleIcon />
                </OriginalColorIcon>
              }
            >
              Google 계정으로 로그인
            </Button>
          </SocialButtonGroup>
        </SocialLoginSection>
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;
