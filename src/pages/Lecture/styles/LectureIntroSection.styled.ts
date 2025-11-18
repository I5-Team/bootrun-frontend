import styled from 'styled-components';

import { StyledBaseSection as S } from "./LectureDetailPage.styled";
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
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    color: ${({ theme }) => theme.colors.gray400};
    text-align: center;
    line-height: 1.6;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  `,
};



export default Intro;
