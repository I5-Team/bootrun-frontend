import styled from 'styled-components';

// 공통 스타일은 LectureFormModal.styled.ts에서 import
import LectureFormModalStyles from './LectureFormModal.styled';

export const LectureFormCurriculumStyles = {
  // 공통 스타일 재사용
  FormGroup: LectureFormModalStyles.FormGroup,
  FormRow: LectureFormModalStyles.FormRow,
  Label: LectureFormModalStyles.Label,
  Input: LectureFormModalStyles.Input,
  Textarea: LectureFormModalStyles.Textarea,
  Select: LectureFormModalStyles.Select,

  // 커리큘럼 전용 스타일
  CurriculumContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,
  AccordionHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-size: 1.8rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  AccordionList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  AccordionCard: styled.div`
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.white};
    overflow: hidden;
  `,
  AccordionCardHeader: styled.div`
    padding: 1.6rem 2rem;
    background: ${({ theme }) => theme.colors.gray100};
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.02);
    }
  `,
  AccordionTitleRow: styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
  `,
  AccordionNumber: styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary300};
  `,
  AccordionTitle: styled.span`
    flex: 1;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
  `,
  LectureCount: styled.span`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray300};
  `,
  ExpandIcon: styled.span<{ $expanded: boolean }>`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.gray300};
    transform: rotate(${({ $expanded }) => ($expanded ? '180deg' : '0deg')});
    transition: transform 0.3s ease;
  `,
  AccordionContent: styled.div`
    padding: 2rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  `,
  AccordionEditSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin-bottom: 2.4rem;
    padding: 2rem;
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.md};
  `,
  DeleteChapterButton: styled.button`
    align-self: flex-start;
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.alert};
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.alert};
    border-radius: ${({ theme }) => theme.radius.sm};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 52, 64, 0.05);
    }
  `,
  LectureSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  LectureSectionHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      font-size: 1.6rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  LectureList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  LectureItem: styled.div`
    padding: 1.6rem;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
  `,
  LectureHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;

    span {
      font-size: 1.4rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  DeleteButton: styled.button`
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.alert};
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.alert};
    border-radius: ${({ theme }) => theme.radius.xs};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 52, 64, 0.05);
    }
  `,
  LectureForm: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
  EmptyMessage: styled.p`
    padding: 2rem 4rem 4rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray300};
    font-size: 1.4rem;
  `,
  ReadOnlyGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem 1.6rem;
    background-color: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
  `,
  ReadOnlyValue: styled.div`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray400};
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  InfoMessage: styled.div`
    padding: 1rem 1.2rem;
    background-color: ${({ theme }) => theme.colors.gray100};
    border-left: 3px solid ${({ theme }) => theme.colors.primary300};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.primary300};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  `,
};

export default LectureFormCurriculumStyles;
