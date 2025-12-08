import React, { useEffect } from 'react';
import styled, { keyframes, type DefaultTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/RouteConfig';


const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white}; 
  color: ${({ theme }) => theme.colors.primary300}; 
  font-family: 'Fira Code', monospace; 
  overflow: hidden;
  font-weight: 700;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const TerminalPrompt = styled.span`
  color: ${({ theme }) => theme.colors.surface}; 
  margin-right: 0.5rem;
  font-size: 4rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blinkCaret = (theme: DefaultTheme) => keyframes`
  from, to { border-color: transparent }    
  50% { border-color: ${theme.colors.primary300}; }
`;

const TypewriterText = styled.div`
  overflow: hidden;
  border-right: .15em solid ${({ theme }) => theme.colors.primary300}; 
  white-space: nowrap; 
  margin: 0 auto;
  letter-spacing: .15em;
  font-size: 4rem;
  width: 0;
  display: inline-block; 
  
  /* 애니메이션 적용: 타이핑(1s) + 커서 깜빡임(무한) */
  animation: 
    ${typing} 1s steps(8, end) forwards,
    ${({ theme }) => blinkCaret(theme)} .75s step-end infinite;
    
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const RunHighlight = styled.span`
  color: ${({ theme }) => theme.colors.surface}; 
  font-weight: bold;
`;

const TerminalScene = styled.div`
  display: flex;
  align-items: center;
  
`;

const TerminalWindow = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: 6rem 8rem;
  position: relative;
  
  @media (max-width: 768px) {
    min-width: 100%;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MacWindowHeader = styled.div`
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  display: flex;
  gap: 0.6rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MacWindowDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const WindowsWindowHeader = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;

const WindowsBtn = styled.div<{ isClose?: boolean }>`
  width: 46px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.surface};
  cursor: default;
  transition: background-color 0.2s;
  border-top-right-radius: ${({ isClose, theme }) => (isClose ? theme.radius.lg : '0')};

  &:hover {
    background-color: ${({ isClose }) => (isClose ? '#E81123' : '#E5E5E5')};
    color: ${({ isClose }) => (isClose ? 'white' : 'inherit')};
  }
`;

// OS 감지 유틸리티
const getOS = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.includes('win')) return 'windows';
  if (userAgent.includes('mac')) return 'mac';
  return 'mac'; // 기본값
};

const IntroPage: React.FC = () => {
  const navigate = useNavigate();
  const [os, setOs] = React.useState<'mac' | 'windows'>('mac');

  useEffect(() => {
    setOs(getOS());

    // 2.5초 후 메인 페이지로 이동 (애니메이션 1s + 대기 1.5s)
    const timer = setTimeout(() => {
      navigate(ROUTES.HOME);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Container>
        <TerminalWindow>
          {os === 'mac' ? (
            <MacWindowHeader>
              <MacWindowDot color="#FF5F56" /> {/* Red */}
              <MacWindowDot color="#FFBD2E" /> {/* Yellow */}
              <MacWindowDot color="#27C93F" /> {/* Green */}
            </MacWindowHeader>
          ) : (
            <WindowsWindowHeader>
              <WindowsBtn>&#9472;</WindowsBtn> {/* Minimize */}
              <WindowsBtn>&#9633;</WindowsBtn> {/* Maximize */}
              <WindowsBtn isClose>&#10005;</WindowsBtn> {/* Close */}
            </WindowsWindowHeader>
          )}
          <TerminalScene>
            <TerminalPrompt>&gt;_</TerminalPrompt>
            <TypewriterText>
              boot<RunHighlight>:run</RunHighlight>
            </TypewriterText>
          </TerminalScene>
        </TerminalWindow>
      </Container>
    </>
  );
};

export default IntroPage;
