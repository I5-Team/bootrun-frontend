import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';
import IconHeart from '../assets/icons/icon-heart.svg?react';
import Profile from './Profile';

type CourseCardProps = {
  thumbnail: string;
  tags: Array<{ label: string; variant?: 'dark' | 'primary' }>;
  title: string;
  teacherName: string;
  teacherRole: string;
  teacherImage: string;
  description: string;
  price: number;
  onLike?: () => void;
};

const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 38rem;
  min-width: 0;

  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 100%;
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 380 / 200;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const LikeButton = styled.button`
  position: absolute;
  top: clamp(1rem, 6%, 1.6rem);
  right: clamp(0.8rem, 4%, 1.4rem);
  width: clamp(2.4rem, 8%, 2.8rem);
  height: auto;
  
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;

  & svg {
    width: 100%;
    height: 100%;
  }

  & path {
    stroke: ${({ theme }) => theme.colors.white};
    fill: transparent;
  }

  &:hover path {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const TagList = styled.ul`
  display: flex;
  gap: 1.2rem;
`;

const TagItem = styled.li`
  min-width: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  min-width: 0;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  line-height: 3.2rem;
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
    line-height: 2.4rem;
    height: 4.8rem;
  }
`;

const TeacherSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  min-width: 0;
`;

const TeacherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  min-width: 0;
`;

const TeacherDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 0;
  flex: 1;
  overflow: hidden;
`;

const TeacherName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;
  white-space: nowrap;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

const TeacherRole = styled.p`
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

const DescriptionBox = styled.div`
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

const Price = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.surface};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const CourseCard: React.FC<CourseCardProps> = ({
  thumbnail,
  tags,
  title,
  teacherName,
  teacherRole,
  teacherImage,
  description,
  price,
  onLike,
}) => {
  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  return (
    <CardContainer>
      <ThumbnailWrapper>
        <ThumbnailImage src={thumbnail} alt="" />
        <LikeButton onClick={onLike} aria-label="강의 좋아요 추가" type="button">
          <IconHeart />
        </LikeButton>
      </ThumbnailWrapper>

      <TagList role="list" aria-label="강의 태그">
        {tags.map((tag, index) => (
          <TagItem key={index}>
            <Tag variant={tag.variant}>{tag.label}</Tag>
          </TagItem>
        ))}
      </TagList>

      <ContentWrapper>
        <Title>{title}</Title>

        <TeacherSection>
          <TeacherInfo>
            <Profile size={4.6} src={teacherImage} alt={`${teacherName} 강사 프로필`}/>
            <TeacherDetails>
              <span className="sr-only">강사</span>
              <TeacherName>{teacherName}</TeacherName>
              <TeacherRole aria-label="강사 소속">{teacherRole}</TeacherRole>
            </TeacherDetails>
          </TeacherInfo>

          <DescriptionBox role="blockquote" aria-label="강의 소개">
            <p>{description}</p>
          </DescriptionBox>
        </TeacherSection>

        <Price aria-label="강의 가격">{formatPrice(price)}</Price>
      </ContentWrapper>
    </CardContainer>
  );
};

export default CourseCard;
