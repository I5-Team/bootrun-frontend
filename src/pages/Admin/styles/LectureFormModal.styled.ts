import styled from 'styled-components';

export const LectureFormModalStyles = {
  Overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 4rem 2rem;
    overflow-y: auto;
  `,
  ModalContainer: styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    width: 100%;
    max-width: 80rem;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    margin: 0 auto;
    margin-top: 5rem;
  `,
  ModalHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.4rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  `,
  ModalTitle: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
  `,
  CloseButton: styled.button`
    width: 3.2rem;
    height: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.gray300};
    cursor: pointer;
    border-radius: ${({ theme }) => theme.radius.sm};

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  StepIndicator: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.4rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  `,
  StepItem: styled.div<{ $active: boolean; $completed: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  `,
  StepNumber: styled.div<{ $active: boolean }>`
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 600;
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.primary300 : theme.colors.gray200};
    color: ${({ theme }) => theme.colors.white};
  `,
  StepLabel: styled.span`
    font-size: 1.3rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray400};
  `,
  StepDivider: styled.div`
    width: 6rem;
    height: 0.2rem;
    background-color: ${({ theme }) => theme.colors.gray200};
    margin: 0 1.6rem;
  `,
  ModalBody: styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 2.4rem;
  `,
  ModalFooter: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
    padding: 2.4rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  `,
  Spacer: styled.div`
    flex: 1;
  `,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,
  // ========== 섹션 분리 스타일 ==========
  SectionBox: styled.div`
    padding: 2rem;
    background: ${({ theme }) => theme.colors.gray100};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  SectionTitle: styled.h3`
    margin: 0 0 0.8rem 0;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
    display: flex;
    align-items: center;
    gap: 0.8rem;
  `,
  FormRow: styled.div`
    display: flex;
    gap: 1.6rem;

    @media ${({ theme }) => theme.devices.tablet} {
      flex-direction: column;
    }
  `,
  FormGroup: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `,
  Label: styled.label`
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray400};
  `,
  Required: styled.span`
    color: ${({ theme }) => theme.colors.alert};
  `,
  Input: styled.input`
    height: 4.2rem;
    padding: 0 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    background-color: ${({ theme }) => theme.colors.white};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.gray400};
      cursor: not-allowed;
    }
  `,
  Textarea: styled.textarea`
    padding: 1.2rem 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    font-family: 'Pretendard', sans-serif;
    resize: vertical;
    background-color: ${({ theme }) => theme.colors.white};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.gray400};
      cursor: not-allowed;
    }
  `,
  Select: styled.select`
    height: 4.2rem;
    padding: 0 1.2rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.gray400};
      cursor: not-allowed;
    }
  `,
  CheckboxGroup: styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
  `,
  Checkbox: styled.input`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 2px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.xs};
    background-color: ${({ theme }) => theme.colors.white};
    accent-color: ${({ theme }) => theme.colors.primary300};

    &:checked {
      background-color: ${({ theme }) => theme.colors.primary300};
      border-color: ${({ theme }) => theme.colors.primary300};
    }

    &:checked::after {
      content: '✓';
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `,
  CheckboxLabel: styled.label`
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray400};
    cursor: pointer;
  `,
  PlaceholderContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    text-align: center;
  `,
  PlaceholderText: styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray400};
    margin: 0 0 1.2rem 0;
  `,
  PlaceholderSubText: styled.p`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray300};
    margin: 0;
  `,
  LoadingContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    text-align: center;
  `,
  LoadingText: styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray400};
    margin: 0;
  `,
  // FAQ 관련 스타일
  FaqHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  AddFaqButton: styled.button`
    padding: 0.8rem 1.6rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary300};
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.primary300};
    border-radius: ${({ theme }) => theme.radius.sm};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.primary300};
      color: ${({ theme }) => theme.colors.white};
    }
  `,
  EmptyFaqMessage: styled.p`
    text-align: center;
    color: ${({ theme }) => theme.colors.gray300};
    font-size: 1.4rem;
    padding: 2rem 4rem 4rem;
  `,
  FaqList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  FaqItem: styled.div`
    padding: 1.6rem;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
  FaqItemHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  `,
  FaqItemNumber: styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
  `,
  RemoveFaqButton: styled.button`
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.alert};
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.alert};
    border-radius: ${({ theme }) => theme.radius.xs};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 52, 64, 0.05);
    }
  `,
  // 챕터 관련 스타일
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
};

export default LectureFormModalStyles;
