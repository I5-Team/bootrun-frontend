/**
 * 강의 폼 - Step 3: 미션 (임시 구현)
 */
import React from 'react';
import type { Mission } from '../../../types/AdminCourseType';
import S from '../styles/LectureFormMission.styled.ts';

interface LectureFormMissionProps {
  missions: Mission[];
  setMissions: React.Dispatch<React.SetStateAction<Mission[]>>;
  disabled?: boolean;
}

const LectureFormMission: React.FC<LectureFormMissionProps> = ({ disabled = false }) => {
  return (
    <S.PlaceholderContainer>
      <S.PlaceholderText>미션 추가 기능은 추후 구현 예정입니다.</S.PlaceholderText>
      <S.PlaceholderSubText>
        현재는 '기본 정보', '커리큘럼' 추가/수정/삭제 기능을 사용할 수 있습니다.
      </S.PlaceholderSubText>
    </S.PlaceholderContainer>
  );
};

export default LectureFormMission;
