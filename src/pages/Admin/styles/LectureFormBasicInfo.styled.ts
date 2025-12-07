import styled from 'styled-components';

// 공통 스타일은 LectureFormModal.styled.ts에서 import
import LectureFormModalStyles from './LectureFormModal.styled';

export const LectureFormBasicInfoStyles = {
  // 공통 스타일 재사용
  FormContainer: LectureFormModalStyles.FormContainer,
  SectionBox: LectureFormModalStyles.SectionBox,
  SectionTitle: LectureFormModalStyles.SectionTitle,
  FormRow: LectureFormModalStyles.FormRow,
  FormGroup: LectureFormModalStyles.FormGroup,
  Label: LectureFormModalStyles.Label,
  Required: LectureFormModalStyles.Required,
  Input: LectureFormModalStyles.Input,
  Textarea: LectureFormModalStyles.Textarea,
  Select: LectureFormModalStyles.Select,
  CheckboxGroup: LectureFormModalStyles.CheckboxGroup,
  Checkbox: LectureFormModalStyles.Checkbox,
  CheckboxLabel: LectureFormModalStyles.CheckboxLabel,
  FileInput: LectureFormModalStyles.FileInput,
  PreviewContainer: LectureFormModalStyles.PreviewContainer,
  PreviewImage: LectureFormModalStyles.PreviewImage,
  SuccessText: LectureFormModalStyles.SuccessText,
  LoadingText: LectureFormModalStyles.LoadingText,
  LabelDescription: LectureFormModalStyles.LabelDescription,

  // FAQ 관련 스타일
  FaqHeader: LectureFormModalStyles.FaqHeader,
  AddFaqButton: LectureFormModalStyles.AddFaqButton,
  EmptyFaqMessage: LectureFormModalStyles.EmptyFaqMessage,
  FaqList: LectureFormModalStyles.FaqList,
  FaqItem: LectureFormModalStyles.FaqItem,
  FaqItemHeader: LectureFormModalStyles.FaqItemHeader,
  FaqItemNumber: LectureFormModalStyles.FaqItemNumber,
  RemoveFaqButton: LectureFormModalStyles.RemoveFaqButton,
};

export default LectureFormBasicInfoStyles;
