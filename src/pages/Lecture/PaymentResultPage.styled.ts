import styled from 'styled-components';

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
