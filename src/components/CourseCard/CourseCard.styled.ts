import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const CardArticle = styled.article<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  min-width: 0;

  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 100%;
  }

  ${({ $isActive }) => 
    $isActive === false && css`
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  `
  }
`;

// CardHeader
export const CardHeadLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 380 / 200;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const LikeButton = styled.button`
  position: absolute;
  top: clamp(1.2rem, 6%, 1.6rem);
  right: clamp(0.8rem, 4%, 1.4rem);
  width: clamp(2.4rem, 6%, 2.8rem);
  height: auto;
  
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & svg {
    width: 100%;
    height: 100%;
  }

  & path {
    stroke: ${({ theme }) => theme.colors.white};
    fill: ${({ theme }) => theme.colors.gray100}80;
  }

  &:hover path {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.6rem, 1vw, 1.2rem);

  li {
    min-width: 0;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  min-width: 0;
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;
  width: 100%;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
  }
`;

// CardContent
export const TeacherSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  min-width: 0;
`;

export const TeacherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  min-width: 0;
`;

export const TeacherDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 0;
  flex: 1;
  overflow: hidden;
`;

export const TeacherName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;
  white-space: nowrap;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const TeacherRole = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray300};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const DescriptionBox = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  width: 100%;
  min-width: 0;

  p {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 400;
    line-height: 2.2rem;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
    width: 100%;
    min-width: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.mobileFontSize.md};
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: -0.6rem;
    left: 2.28rem;
    transform: translateX(-50%) rotate(45deg);
    
    width: 1.2rem; 
    height: 1.2rem;

    background-color: ${({ theme }) => theme.colors.gray100};
    border-radius: 0.25rem;
  }
`;

export const Price = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.surface};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

// CardContentMyLecture
export const LectureContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`
export const ProgressWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    span {
    color: ${({ theme }) => theme.colors.gray400};
    }
`
export const ButtonList = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.2rem;
`;