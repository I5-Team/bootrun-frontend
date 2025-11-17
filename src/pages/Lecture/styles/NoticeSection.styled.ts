import styled from 'styled-components';
const Notice = {
  NoticeWrapper: styled.div`
    width: 100%;
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.xl};
    padding: 3.2rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray400};
  `,
  NoticeTitle: styled.strong`
    font-weight: 500;
    display: block;
    margin-bottom: 1.2rem;
    color: ${({ theme }) => theme.colors.gray300};
  `,
  NoticeList: styled.ul`
    list-style: disc;
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `,
};

export default Notice;
