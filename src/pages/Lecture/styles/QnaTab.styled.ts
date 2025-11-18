/**
 * Q&A 탭 스타일
 */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

export const SearchBar = styled.div`
  margin: 0.2rem 0.5rem;
  position: relative;
  margin-bottom: 1.6rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1.2rem 4rem 1.2rem 1.6rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.surface};
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary300};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  right: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.8rem;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const QuestionList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
`;

export const QuestionCard = styled.div`
  margin: 0.2rem 0.5rem;
  padding: 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
    border-color: ${({ theme }) => theme.colors.primary200};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0.2rem;
  }
`;

export const QuestionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const QuestionContent = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray300};
  line-height: 1.5;
  margin-bottom: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const QuestionMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  font-size: ${({ theme }) => theme.fontSize.caption};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.caption};
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

export const Author = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.gray400};
`;

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.gray300};
`;

export const MetaSeparator = styled.span`
  color: ${({ theme }) => theme.colors.gray200};
`;

export const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

export const WriteButton = styled.button`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 1.6rem;
  background-color: ${({ theme }) => theme.colors.primary300};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.md};
  text-align: center;
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0.2rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  overflow-y: auto;
  padding: 1.6rem;
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.surface};
`;

export const CloseButton = styled.button`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray300};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.surface};
  }
`;

export const WarningBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.primary100};
  filter: opacity(0.8);
  border-radius: ${({ theme }) => theme.radius.sm};
`;

export const WarningIcon = styled.span`
  flex-shrink: 0;
  img {
    width: 3rem;
    height: 3rem;
    object-fit: contain;
  }
`;

export const WarningText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.surface};
  line-height: 1.5;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const FormSectionExpanded = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & > textarea {
    flex: 1;
  }
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const TitleInput = styled.input`
  padding: 1.2rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.surface};
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary300};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

export const ContentTextarea = styled.textarea`
  min-height: 20rem;
  padding: 1.2rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-family: 'Pretendard', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.surface};
  resize: none;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary300};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
`;
