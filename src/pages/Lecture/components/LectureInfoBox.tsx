import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../router/RouteConfig';
import styled, { css } from 'styled-components';
import useMediaQuery from '../../../hooks/useMediaQuery';

import Button from '../../../components/Button';
import ShareIcon from '../../../assets/icons/icon-share.svg?react';
import { categoryLabel, courseTypeLabel, difficultyLabel } from '../../../types/CourseType';
import type { CoursesDetailItem } from '../../../types/CourseType';
import { formatDate } from '../LectureDetailPage';


export const InfoBoxContent = ({ data, recruitmentStatus }: { data: CoursesDetailItem, recruitmentStatus?: boolean }) => {
  const { course_type, category_type, difficulty } = data;
  const { recruitment_end_date, course_start_date, course_end_date } = data;
    const { access_duration_days, max_students } = data;


  const calculateDdayFrom = (targetDateString: string) => {
    const targetDate = new Date(targetDateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) return `D-${diffDays}`;
    if (diffDays === 0) return 'D-Day';
    return `D+${Math.abs(diffDays)}`;
};

  return (
      <S.Content>
        {data &&
        <>
          <S.LectureInfoList>
            <li>
              <S.InfoLabel>강의 유형</S.InfoLabel>
              <S.InfoValue>{courseTypeLabel[course_type]}</S.InfoValue>
            </li>
            <li>
              <S.InfoLabel>주제</S.InfoLabel>
              <S.InfoValue>{categoryLabel[category_type]}</S.InfoValue>
            </li>
            <li>
              <S.InfoLabel>난이도</S.InfoLabel>
              <S.InfoValue>{difficultyLabel[difficulty]}</S.InfoValue>
            </li>
            <li>
              <S.InfoLabel>수강 기한</S.InfoLabel>
              <S.InfoValue>{access_duration_days}일</S.InfoValue>
            </li>
            <li>
              <S.InfoLabel>모집 인원</S.InfoLabel>
              <S.InfoValue>{max_students}명</S.InfoValue>
            </li>
            <li>
              <S.InfoLabel>모집 기간</S.InfoLabel>
              <S.InfoValue>
                <span>~ {recruitment_end_date ? formatDate(recruitment_end_date) : '미정'}</span>
                {(course_end_date && course_start_date) && 
                  <>
                    {recruitmentStatus
                    ? <S.DdayTag $variant="open">{calculateDdayFrom(course_start_date)}</S.DdayTag>
                    : <S.DdayTag $variant="closed">모집마감</S.DdayTag>
                    }
                  </>
                }
              </S.InfoValue>
            </li>
            <li>
              <S.InfoLabel>교육 기간</S.InfoLabel>
              <S.InfoValue>
                { course_start_date && course_end_date
                  ? <span>{formatDate(course_start_date)} ~ {formatDate(course_end_date).slice(5)}</span>
                  : <span>미정</span>
                }
              </S.InfoValue>
              
            </li>

          </S.LectureInfoList>
          <S.Price>₩{data.price.toLocaleString()}</S.Price>
        </>
        }
      </S.Content>
  )
}

export const InfoBoxButtons = ({ recruitmentStatus }: { recruitmentStatus?: boolean }) => {
  const { isLaptop } = useMediaQuery();
  const navigate = useNavigate();
  const { id } = useParams<{id: string}>();

  const handleEnrollCourse = () => {
    const path = ROUTES.LECTURE_PAYMENT.replace(':id', String(id));
    navigate(path);
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    .then(() => alert('주소가 복사되었습니다.'))
    .catch(() => alert('주소 복사를 실패하였습니다.'));
  }

  return (
    <S.ButtonContainer>
      {recruitmentStatus
        ? <Button size="lg" fullWidth={!isLaptop} onClick={handleEnrollCourse}>수강신청 하기</Button>
        : <Button size="lg" fullWidth={!isLaptop} disabled={true}>수강신청 마감</Button>  
      } 
      <Button variant='outline' size="lg" fullWidth={!isLaptop} iconSvg={<ShareIcon/>} onClick={handleShare}>공유하기</Button>
    </S.ButtonContainer>
  )
}

export const LectureInfoBox = ({ data }: { data: CoursesDetailItem }) => {
  const { recruitment_end_date } = data;

    const recruitmentStatus = recruitment_end_date 
      ? (new Date(recruitment_end_date.replace('T', ''))) > new Date() ? true : false
      : false;

  return (
    <S.FloatingCardWrapper>
      {data && (
        <>
          <S.Title>강의 정보</S.Title>

          <InfoBoxContent data={data} recruitmentStatus={recruitmentStatus}/>

          <InfoBoxButtons recruitmentStatus={recruitmentStatus}/>
        </>
      )}
    </S.FloatingCardWrapper>
  );
};

// --- Styles  ---
const S = {
  FloatingCardWrapper: styled.aside`
    grid-area: infoBox;
    height: fit-content;

    display: flex;
    flex-direction: column;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.lg};
    padding: 3.2rem;

    background: ${({ theme }) => theme.colors.white};
    position: sticky;
    top: calc(7rem + 1.6rem);

    @media ${({ theme }) => theme.devices.laptop} {
      display: none;
      position: relative;
      top: 0;
    }
  `,
  Title: styled.p`
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 0.1rem;
      border-top: 0.1rem solid ${({ theme }) => theme.colors.gray200};
      margin-block: 2.4rem;
    }
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
  `,
  LectureInfoList: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 0.1rem;
      border-top: 0.1rem solid ${({ theme }) => theme.colors.gray200};
      margin-block: 2.4rem;
    }
  `,
  InfoLabel: styled.span`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray300};
  `,
  InfoValue: styled.span`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray400};
    display: flex;
    align-items: center;
    gap: 0.8rem;
  `,
  DdayTag: styled.span<{ $variant : "open" | "closed"}>`
    white-space: nowrap;
    font-size: ${({ theme }) => theme.fontSize.caption};
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem 0.8rem;
    height: 2.4rem;
    border-radius: ${({ theme }) => theme.radius.xs};

  ${({ $variant, theme }) => {
    const variants = {
      open: css`
        color: ${theme.colors.white};
        background-color: ${theme.colors.primary300};
      `,
      closed: css`
        color: ${theme.colors.gray300};
        background-color: ${theme.colors.gray200};
      `,
    };
    return variants[$variant];
  }}
  `,
  Price: styled.p`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary300};;
    text-align: left;
    margin-bottom: 2.4rem;

    @media ${({ theme }) => theme.devices.laptop} {
      margin-bottom: 0;
    }
  `,
  ButtonContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    @media ${({ theme }) => theme.devices.laptop} {
    width: 100%;
    padding-block: 1.1rem 2.8rem;
    padding-inline: 1.6rem; 
    flex-direction: row;

    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1000;

    border-top: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    background-color: ${({ theme }) => theme.colors.white};
      
    & > button:nth-child(1) {
      flex: 1 1 70%;
    }
    & > button:nth-child(2) {
      flex: 1 1 30%;
    }
    }
  `,
};

export default LectureInfoBox;