import { useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { LectureRoomContext } from '../contexts/LectureRoomContext';
import Header from '../components/Header/Header';

type RightSidebarType = null | 'materials' | 'qna';

export default function LectureRoomLayout() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [rightSidebarType, setRightSidebarType] = useState<RightSidebarType>(null);

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const toggleRightSidebar = (type: RightSidebarType) => {
    setRightSidebarType((prev) => (prev === type ? null : type));
  };

  const contextValue = {
    isLeftSidebarOpen,
    rightSidebarType,
    toggleLeftSidebar,
    toggleRightSidebar,
  };

  return (
    <LectureRoomContext.Provider value={contextValue}>
      <Wrapper>
        <Header />
        <Outlet context={contextValue} />
      </Wrapper>
    </LectureRoomContext.Provider>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;
