import styled from 'styled-components';
import userProfileDefault from '../assets/images/profile-default.jpg';
import { getProfileImageUrl } from '../utils/imageUtils';

type ProfileProps = {
  src?: string;
  size?: number; // rem
  alt?: string;
  isActive?: boolean;
};

const StyledProfileImg = styled.img<{ $size: number; $isActive: boolean }>`
  width: ${({ $size }) => $size}rem;
  height: ${({ $size }) => $size}rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  vertical-align: bottom;

  border: ${({ $isActive, theme }) =>
    $isActive ? `0.2rem solid ${theme.colors.primary300}` : `0.1rem solid ${theme.colors.gray200}`};
`;

export default function Profile({
  src,
  size = 4.2,
  alt = '프로필',
  isActive = false,
}: ProfileProps) {
  const imageSrc = src ? src : getProfileImageUrl();

  return (
    <>
      <StyledProfileImg
        src={imageSrc || userProfileDefault}
        $size={size}
        alt={alt}
        $isActive={isActive}
      />
    </>
  );
}
