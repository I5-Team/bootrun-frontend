import styled from 'styled-components';
import { getFullImageUrl } from '../utils/imageUtils';
import { DEFAULT_INSTRUCTOR_IMAGE } from '../constants/apiConfig';

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
  object-fit: cover;

  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  border: ${({ $isActive, theme }) =>
    $isActive ? `0.2rem solid ${theme.colors.primary300}` : `0.1rem solid ${theme.colors.gray200}`};
`;

export default function Profile({
  src,
  size = 4.2,
  alt = '프로필',
  isActive = false,
}: ProfileProps) {
  const imageSrc = src ? src : getFullImageUrl();

  return (
    <>
      <StyledProfileImg
        src={imageSrc || DEFAULT_INSTRUCTOR_IMAGE}
        $size={size}
        alt={alt}
        $isActive={isActive}
      />
    </>
  );
}
