import styled, { keyframes } from 'styled-components';

// 성공 아이콘 애니메이션: 확대 + 바운스
const successAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// 실패 아이콘 애니메이션: 좌우 흔들림
const errorAnimation = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: rotate(-8deg);
  }
  20%, 40%, 60%, 80% {
    transform: rotate(8deg);
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
  width: 100%;
  max-width: 56.3rem;
`;

export const IconWrapper = styled.div<{ $isSuccess?: boolean }>`
  width: 10rem;
  height: 10rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: ${({ $isSuccess }) => ($isSuccess ? successAnimation : errorAnimation)} 0.8s ease-out;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    width: 8rem;
    height: 8rem;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 600;
  line-height: 5.6rem;
  color: ${({ theme }) => theme.colors.surface};
  text-align: center;
  margin: 0;

  @media ${({ theme }) => theme.devices.laptop} {
    font-size: ${({ theme }) => theme.fontSize.xl};
    line-height: 4rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xxl};
    line-height: 3rem;
  }
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.gray400};
  text-align: center;
  margin-bottom: 1.2rem;

  @media ${({ theme }) => theme.devices.laptop} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
    line-height: 2rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    margin-bottom: 0.8rem;
  }
`;

export const ButtonGroup = styled.div<{ $isSuccess: boolean }>`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: ${({ $isSuccess }) => ($isSuccess ? 'row' : 'column')};
    width: 100%;

    button {
      ${({ $isSuccess }) => !$isSuccess && 'width: 100%;'}
    }
  }
`;

// 추후 삭제 필요 개발용 토글 버튼(결제 완료 <-> 결제 실패 페이지 이동)
export const DevToggle = styled.button`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  padding: 1.2rem 2rem;
  background-color: ${({ theme }) => theme.colors.gray400};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  z-index: 1000;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    transform: translateY(-0.2rem);
  }
`;
