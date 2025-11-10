import React from 'react';
import styled from 'styled-components';
import { StyledBaseSection as S } from "../LectureDetailPage.styled";

const LectureIntroSection = React.forwardRef<HTMLElement>((_, ref) => {
  return (
    <Intro.Section ref={ref} id="description">
        <S.SectionTitle className="sr-only">강의 소개</S.SectionTitle>
      
      <Intro.StaticContentWrapper>
          <Intro.Title>대 AI 시대,<br/>개발을 어떻게 배워야 할까요?</Intro.Title>
          <Intro.Desc>부트런은 단순한 문법 강의가 아닌<br/>'배우는 방법' 자체를 바꿉니다</Intro.Desc>
          <Intro.ContentContainer>
            강의 소개에 대한 섹션
          </Intro.ContentContainer>
      </Intro.StaticContentWrapper>
    </Intro.Section>
  );
});

// --- Styles ---
const Intro = {
  Section: styled(S.Section)`
    background-color: ${({ theme }) => theme.colors.gray100};
  `,
  StaticContentWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
  `,
  Title: styled.p`
    font-size: ${({ theme }) => theme.fontSize.xl}; 
    font-weight: 700;
    text-align: center;
  `,
  Desc: styled.p`
    font-size: ${({ theme }) => theme.fontSize.lg}; 
    color: ${({ theme }) => theme.colors.gray400}; 
    text-align: center;
    line-height: 1.4;
  `,
  ContentContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40rem;
  `,
};

export default LectureIntroSection;