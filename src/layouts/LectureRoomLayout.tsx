import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LectureRoomContext } from '../contexts/LectureRoomContext';
import Header from '../components/Header/Header';
import useMediaQuery from '../hooks/useMediaQuery';
import { StyledMainContainer, StyledWrapper } from './MainLayout';

type RightSidebarType = null | 'materials' | 'qna';

export default function LectureRoomLayout() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [rightSidebarType, setRightSidebarType] = useState<RightSidebarType>(null);
  const { isLaptop } = useMediaQuery();

  const toggleLeftSidebar = () => {
    // 왼쪽을 닫는 경우: 반대쪽 사이드바를 열지 않음
    const isClosing = isLeftSidebarOpen;

    // laptop 이하에서 오른쪽 사이드바가 열려있고, 닫는 게 아닐 때만 오른쪽을 닫음
    if (isLaptop && rightSidebarType && !isClosing) {
      setRightSidebarType(null);
    }
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const toggleRightSidebar = (type: RightSidebarType) => {
    // 같은 버튼을 다시 클릭해서 닫는 경우: 반대쪽 사이드바를 열지 않음
    const isClosing = rightSidebarType === type;

    // laptop 이하에서 왼쪽 사이드바가 열려있고, 닫는 게 아닐 때만 왼쪽을 닫음
    if (isLaptop && isLeftSidebarOpen && !isClosing) {
      setIsLeftSidebarOpen(false);
    }
    setRightSidebarType((prev) => (prev === type ? null : type));
  };

  const closeAllSidebars = () => {
    setIsLeftSidebarOpen(false);
    setRightSidebarType(null);
  };

  const contextValue = {
    isLeftSidebarOpen,
    rightSidebarType,
    toggleLeftSidebar,
    toggleRightSidebar,
    closeAllSidebars,
  };

  return (
    <StyledWrapper>
      <LectureRoomContext.Provider value={contextValue}>
        <Header />
        <StyledMainContainer>
            <Outlet context={contextValue} />
        </StyledMainContainer>
      </LectureRoomContext.Provider>
    </StyledWrapper>
  );
}