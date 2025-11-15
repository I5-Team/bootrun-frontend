import React from 'react';
import styled from 'styled-components';
import { StyledBaseSection as S } from "../LectureDetailPage.styled";
import { useLectureContext } from '../LectureDetailPage';

const LectureIntroSection = React.forwardRef<HTMLElement>((_, ref) => {
  const { data } = useLectureContext();
  return (
    <Intro.Section ref={ref} id="description">
        <S.SectionTitle className="sr-only">강의 소개</S.SectionTitle>
      
          <Intro.Title>{data.title}</Intro.Title>
          <Intro.Desc>{data.description}</Intro.Desc>
          <Intro.ContentContainer>
            강의 소개
          </Intro.ContentContainer>
    </Intro.Section>
  );
});

// --- Styles ---
const Intro = {
  Section: styled(S.Section)`
    max-width: 100%;
    background-color: ${({ theme }) => theme.colors.gray100};
    padding-inline: 6rem;
    padding-top: 10rem;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Title: styled.p`
    word-break: keep-all;
    width: 80%;
    font-size: ${({ theme }) => theme.fontSize.xl}; 
    font-weight: 700;
    text-align: center;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  `,
  Desc: styled.p`
    word-break: keep-all;
    font-size: ${({ theme }) => theme.fontSize.lg}; 
    color: ${({ theme }) => theme.colors.gray400}; 
    text-align: center;
    line-height: 1.5;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  `,
  ContentContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 40rem;
  `,
};

export default LectureIntroSection;