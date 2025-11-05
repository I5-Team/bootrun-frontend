import styled from 'styled-components';

export const PageContainer = styled.div`
  background: #ffffff;
  font-family: 'Pretendard', sans-serif;
`;

export const LectureDetailContainer = styled.div`
  max-width: 1190px;
  margin: 60px auto 0;
  padding: 0 24px; /* 모바일을 위한 좌우 여백 */
`;

export const LectureMainLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 32px;
  align-items: flex-start;
  margin-top: 40px; /* 배너와 메인 콘텐츠 사이 여백 */
`;

export const ContentWrapper = styled.main`
  flex-grow: 1;
  width: 790px; // HTML 기준 콘텐츠 너비
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px; /* 섹션 간의 기본 간격 */
`;

// --- SectionTabs 스타일 ---
export const StickyNavWrapper = styled.nav`
  position: sticky;
  top: 0px; // 상단에 딱 붙도록 설정
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #d9dbe0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  
  ul {
    display: flex;
    gap: 40px;
    list-style: none;
    margin: 0;
    padding: 0;
    height: 50px;
  }
`;

export const NavContent = styled.ul`
  display: flex;
  gap: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 50px;
  align-items: center;
  width: 790px;
`;

export const NavItem = styled.a<{ $active: boolean }>`
  font-family: 'Pretendard';
  font-size: 16px;
  line-height: 22px;
  text-decoration: none;
  cursor: pointer;
  padding: 14px 0;
  
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active }) => ($active ? '#121314' : '#8D9299')};
  border-bottom: 2px solid ${({ $active }) => ($active ? '#121314' : 'transparent')};
`;

export const NavCta = styled.a`
  font-family: 'Pretendard';
  font-size: 16px;
  line-height: 22px;
  font-weight: 700;
  color: #2e6ff2;
  text-decoration: none;
  margin-left: auto;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

