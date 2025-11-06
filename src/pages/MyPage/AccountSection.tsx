import React from 'react';
import styled from 'styled-components';
import { useApiData } from '../../hooks/useApiData';
import { mockAccountData } from '../../data/mockData';
import { LoadingSpinner, ErrorMessage } from '../../components/HelperComponents';

const AccountSection: React.FC = () => {
  const { data, loading, error } = useApiData(mockAccountData, 400);

  const handlePasswordReset = () => {
    alert("비밀번호 재설정 메일을 발송합니다.");
  };

  const handleGithubLink = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("GitHub 계정 연동 페이지로 이동합니다.");
  };

  if (loading) return <S.PageWrapper><LoadingSpinner /></S.PageWrapper>;
  if (error) return <S.PageWrapper><ErrorMessage message={error.message} /></S.PageWrapper>;
  if (!data) return null;
  
  return (
    <S.PageWrapper>
      <S.Title>계정 관리</S.Title>
      <S.Container>
        <S.FormGroup>
          <label htmlFor="email">이메일</label>
          <S.EmailInput 
            id="email" 
            disabled 
            readOnly 
            type="email" 
            value={data.email} 
          />
        </S.FormGroup>

        <S.FormGroup>
          <label>GitHub 계정</label>
          {data.githubEmail ? (
            <S.GithubLinked>
              <span>{data.githubEmail}</span>
              <button type="button" onClick={handleGithubLink}>연동 해제</button>
            </S.GithubLinked>
          ) : (
            <S.GithubLink href="#" onClick={handleGithubLink}>
              * GitHub 계정 로그인
            </S.GithubLink>
          )}
        </S.FormGroup>
        
        <S.FormGroup>
          <label>비밀번호</label>
          <S.PasswordButton type="button" onClick={handlePasswordReset}>
            비밀번호 재설정
          </S.PasswordButton>
        </S.FormGroup>
      </S.Container>
    </S.PageWrapper>
  );
};

// --- Styles (시안 반영, rem/theme 적용) ---
const S = {
  PageWrapper: styled.div`
    width: 100%;
    max-width: 72rem;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.lg}; /* 1.2rem */
    box-shadow: 0 0.4rem 1.2rem rgba(0,0,0,0.05);
  `,
  Title: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.lg}; /* 2.4rem */
    font-weight: 700;
    padding: 2.4rem;
    margin: 0;
  `,
  Container: styled.div`
    padding: 2.4rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,
  FormGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    
    label {
      font-size: ${({ theme }) => theme.fontSize.sm}; /* 1.4rem */
      font-weight: 500;
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  EmailInput: styled.input`
    height: 4.8rem;
    padding: 0 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: ${({ theme }) => theme.fontSize.md}; /* 1.6rem */
    background: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray300};
  `,
  GithubLink: styled.a`
    font-size: ${({ theme }) => theme.fontSize.sm}; /* 1.4rem */
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary300};
    text-decoration: none;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  `,
  GithubLinked: styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    
    span {
      font-size: ${({ theme }) => theme.fontSize.md}; 
      color: ${({ theme }) => theme.colors.surface};
    }
    
    button {
      font-size: ${({ theme }) => theme.fontSize.sm}; 
      color: ${({ theme }) => theme.colors.gray300};
      background: none;
      border: none;
      text-decoration: underline;
      cursor: pointer;
    }
  `,
  PasswordButton: styled.button`
    width: fit-content;
    padding: 1.4rem 2.4rem;
    font-size: ${({ theme }) => theme.fontSize.md}; /* 1.6rem */
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary300};
    border: none;
    border-radius: ${({ theme }) => theme.radius.md};
    cursor: pointer;
    
    &:hover {
      opacity: 0.9;
    }
  `,
};

export default AccountSection;