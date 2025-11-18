import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContentWrapper = styled.div`
  max-width: 119rem;
  margin: 0 auto;
  padding: 6rem 0rem 0rem;
  display: flex;
  gap: 4rem;

  @media ${({ theme }) => theme.devices.desktop} {
    flex-direction: column;
    padding: 4rem 2rem 6rem;
    gap: 3rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 3rem 1.6rem 5rem;
    gap: 2.4rem;
  }
`;

export const LeftSection = styled.section`
  flex: 1;
  max-width: 75rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media ${({ theme }) => theme.devices.desktop} {
    max-width: 100%;
  }
`;

export const RightSection = styled.section`
  width: 40rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media ${({ theme }) => theme.devices.desktop} {
    width: 100%;
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  line-height: 3.2rem;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    line-height: 2.4rem;
  }
`;

export const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 2.4rem;

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 2.2rem 1.8rem;
  }
  @media ${({ theme }) => theme.devices.mobile} {
    padding: 2rem 1.6rem;
  }
`;

export const LectureCard = styled(Card)`
  display: flex;
  gap: 3rem;
  align-items: stretch;

  @media ${({ theme }) => theme.devices.desktop} {
    gap: 2.2rem;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    gap: 2rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 1.2rem;
  }
`;

export const LectureThumbnail = styled.div<{ $thumbnailUrl?: string }>`
  width: 20rem;
  max-width: 20rem;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  aspect-ratio: 16/9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    width: 100%;
  }
`;

export const LectureInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.8rem;
  min-width: 0;
  overflow: hidden;
`;

export const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  background-color: ${({ theme }) => theme.colors.gray400};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 2rem;
  border-radius: ${({ theme }) => theme.radius.xs};
  width: fit-content;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const LectureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.lg};
    line-height: 2rem;
    -webkit-line-clamp: 3;
  }
`;

export const LectureInstructor = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.gray300};
  margin: 0;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const LecturePrice = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.colors.primary300};
  margin: 0;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.lg};
  }
`;

export const PaymentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 2rem;
  }
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  line-height: 2.2rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const PriceLabel = styled.span`
  color: ${({ theme }) => theme.colors.gray300};
`;

export const PriceValue = styled.span`
  color: ${({ theme }) => theme.colors.gray400};
`;

export const Divider = styled.div`
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.gray200};
  margin: 0;
`;

export const TotalPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TotalLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.gray300};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const TotalPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  line-height: 3.2rem;
  color: ${({ theme }) => theme.colors.primary300};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    line-height: 2.4rem;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

// 브라우저 기본 체크박스 숨김
export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:focus-visible + span {
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0.2rem;
  }
`;

export const CustomCheckbox = styled.span<{ $checked: boolean }>`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s ease;
  cursor: pointer;

  svg {
    width: 2rem;
    height: 2rem;
    display: block;
    transition: opacity 0.1s ease;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.gray400};
  cursor: pointer;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const CheckboxLabelText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.gray400};
  cursor: pointer;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
`;

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

// 쿠폰 관련 스타일
export const CouponRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  line-height: 2.2rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const CouponLabel = styled.span`
  color: ${({ theme }) => theme.colors.gray300};
`;

export const CouponButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xs};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.gray400};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary300};
    color: ${({ theme }) => theme.colors.primary300};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0.1rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
    padding: 0.5rem 1rem;
  }
`;

export const SelectedCouponInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.primary100};
  border: 0.1rem solid ${({ theme }) => theme.colors.primary300};
  border-radius: ${({ theme }) => theme.radius.xs};
  margin-top: 0.8rem;
`;

export const SelectedCouponText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.primary300};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const RemoveCouponButton = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 0.1rem solid ${({ theme }) => theme.colors.primary300};
  border-radius: ${({ theme }) => theme.radius.xs};
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary300};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary300};
    color: ${({ theme }) => theme.colors.white};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0.1rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.caption};
  }
`;

// 결제 수단 선택 관련 스타일
export const PaymentMethodSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const PaymentMethodOption = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  height: 5.2rem; 
  border: 0.1rem solid
    ${({ theme, $selected }) => ($selected ? theme.colors.primary300 : theme.colors.gray200)};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary100 : theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary300};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.4rem;
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const PaymentMethodIcon = styled.img`
  width: 2.2rem;
  height: 2.2em;
  flex-shrink: 0;
  object-fit: contain;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 2rem;
    height: 2rem;
  }
`;

export const PaymentDivider = styled.div`
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.gray200};
  margin: 2rem 0;
`;
