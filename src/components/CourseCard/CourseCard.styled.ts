import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledCardArticle = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  min-width: 0;

  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 100%;
  }

  button {
    z-index: 10;
  }
`;

// CardHeader
export const StyledThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 380 / 200;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;

  display: flex;
  justify-content: start;
  align-items: end;
  flex-direction: column;
  padding: clamp(1rem, 3.3%, 1.4rem);
`;

export const StyledThumbnailLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100;
`;

export const StyledThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const StlyedThumbnailNotice = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface}90;
`;

export const StyledLikeButton = styled.button`
  width: clamp(2.6rem, 100%, 2.8rem);
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

export const StyledTagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1rem, 1vw, 1.2rem);

  li {
    min-width: 0;
  }
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  min-width: 0;
`;

export const StyledTitle = styled.h3<{ $size?: "sm" | "lg" }>` 
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;
  width: 100%;
  min-width: 0;

  word-break: break-all;
  overflow-wrap: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: ${({ $size, theme }) => $size === "sm" ? theme.mobileFontSize.xl : theme.fontSize.lg};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ $size, theme }) => $size === "sm" ?  theme.mobileFontSize.xl : theme.mobileFontSize.xxl};
  }
  `;

// CardContent
export const StyledTeacherSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  min-width: 0;
`;

export const StyledTeacherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  min-width: 0;
`;

export const StyledTeacherDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 0;
  flex: 1;
  overflow: hidden;
`;

export const StyledTeacherName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;
  white-space: nowrap;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.lg};
  }
`;

export const StyledTeacherRole = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray300};
  line-height: 1.4;

  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const StyledDescriptionBox = styled.div`
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
      font-size: ${({ theme }) => theme.mobileFontSize.lg};
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

export const StyledPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.surface};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.lg};
  }
`;

// CardContentMyLecture
export const StyledLectureContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`
export const StyledProgressWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    span {
    color: ${({ theme }) => theme.colors.gray400};
    }
`
export const StyledButtonList = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.2rem;
`;