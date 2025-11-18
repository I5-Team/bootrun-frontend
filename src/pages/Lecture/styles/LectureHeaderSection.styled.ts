import styled from 'styled-components';
const S = {
  HeaderWrapper: styled.section`
    grid-area: header;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  `,
  LectureInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  TagList: styled.ul`
    display: flex;
    gap: 0.8rem;
  `,
  Title: styled.h2`
    word-break: keep-all;
    font-size: ${({ theme }) => theme.fontSize.xxl};
    line-height: 1.4;
    font-weight: 700;

    @media ${({ theme }) => theme.devices.tablet} {
      font-size: ${({ theme }) => theme.fontSize.xl};
    }
  `,
  Description: styled.p`
    color: ${({ theme }) => theme.colors.gray400};
    word-break: keep-all;
    width: 90%;
    line-height: 1.4;
  `,
  InstructorContainer: styled.div`
    display: flex;
  `,
  Profile: styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
  `,
  ProfileInfo: styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 0.4rem;
  `,
  ProfileName: styled.p`
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    line-height: 2.2rem;
    color: ${({ theme }) => theme.colors.surface};
  `,
  ProfileRole: styled.p`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray400};
  `,
  ScheduleContainer: styled.div`
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.lg};
    padding: 3.2rem;
  `,
  ScheduleTitle: styled.p`
    display: block;
    line-height: 2.4rem;
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    margin-bottom: 1.2rem;
  `,
  ScheduleList: styled.dl`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
  ScheduleItem: styled.div`
    display: flex;
    line-height: 2.2rem;
    font-size: 1.6rem;
    font-weight: 500;
    flex-wrap: wrap;
    gap: 0.8rem 0;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
  ScheduleLabel: styled.dt`
    color: ${({ theme }) => theme.colors.gray300};
    width: 8rem;
    flex-shrink: 0;
  `,
};

export default S;
