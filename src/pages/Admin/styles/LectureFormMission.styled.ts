import styled from 'styled-components';

export const LectureFormMissionStyles = {
  PlaceholderContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    text-align: center;
  `,
  PlaceholderText: styled.p`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray400};
    margin: 0 0 1rem 0;
  `,
  PlaceholderSubText: styled.p`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray300};
    margin: 0;
  `,
};

export default LectureFormMissionStyles;
