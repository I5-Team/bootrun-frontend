import { createContext, useContext } from 'react';

type RightSidebarType = null | 'materials' | 'qna';

interface LectureRoomContextType {
  isLeftSidebarOpen: boolean;
  rightSidebarType: RightSidebarType;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: (type: RightSidebarType) => void;
}

export const LectureRoomContext = createContext<LectureRoomContextType | null>(null);

export const useLectureRoom = () => {
  const context = useContext(LectureRoomContext);
  if (!context) {
    return {
      isLeftSidebarOpen: false,
      rightSidebarType: null as RightSidebarType,
      toggleLeftSidebar: () => {},
      toggleRightSidebar: () => {},
    };
  }
  return context;
};
