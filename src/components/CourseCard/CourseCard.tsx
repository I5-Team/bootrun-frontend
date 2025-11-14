import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/RouteConfig';

// import - components
import { StyledButtonList, StyledCardArticle, StyledContentWrapper, StyledDescriptionBox, StyledLectureContentWrapper, StyledLikeButton, StyledPrice, StyledProgressWrapper, StyledTagList, StyledTeacherDetails, StyledTeacherInfo, StyledTeacherName, StyledTeacherRole, StyledTeacherSection, StyledThumbnailImage, StyledThumbnailWrapper, StyledTitle, StyledThumbnailLink, StlyedThumbnailNotice } from './CourseCard.styled';
import Tag from '../Tag';
import Profile from '../Profile';
import ProgressBar from '../ProgressBar';
import Button from '../Button';

// import - assets
import SvgHeart from '../../assets/icons/icon-heart.svg?react';
import SvgPlay from "../../assets/icons/icon-play.svg?react";
import SvgCertificate from "../../assets/icons/icon-certificate.svg?react";

// types
type CourseCardProps = BaseProps & (InfoContentProps | StudyContentProps);
type VariantType = 'info' | 'study';

type BaseProps = {
  lectureId: number;
  thumbnail: string;
  tags: Array<{ label: string; variant?: 'dark' | 'light' }>;
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

type InfoContentProps = {
  variant: 'info';
  teacherName: string;
  teacherRole: string;
  teacherImage: string;
  description: string;
  price: number;
}

type StudyContentProps = {
  variant: 'study';
  value: number;
  max: number;
}

// components
const CardHeader = ({ lectureId, title, thumbnail, tags, variant, isActive, isCompleted }: BaseProps & { variant: VariantType }) => {
const linkTo = variant === 'info' 
    ? `${ROUTES.LECTURE_LIST}/${lectureId}`
    : `${ROUTES.LECTURE_LIST}/${lectureId}/room`;

  const linkLabel = variant === 'info'
    ? `${title} 강의상세 바로가기`
    : `${title} 강의실 바로가기`;

  return (
    <>
      <StyledThumbnailWrapper>
          {isActive === false && 
            <StlyedThumbnailNotice>수강 기간이 종료되었습니다.</StlyedThumbnailNotice>
          }
          <StyledThumbnailLink
            to={linkTo}
            aria-label={linkLabel}
            onClick={(e) => (isActive === false) && e.preventDefault()}
          >
            <StyledThumbnailImage src={thumbnail} alt=""/>
          </StyledThumbnailLink>
          {variant === "info" && 
            <LikeButton lectureId={lectureId}/>
          }
          {(variant === "study" && isCompleted) && 
          <Button iconSvg={<SvgCertificate/>} variant="outline" size="sm">수료증</Button>
          }
      </StyledThumbnailWrapper>

      <CardTagList tags={tags}/>

      {variant === "info" ? (
        <Link to={linkTo}>
          <StyledTitle $size="lg">{title}</StyledTitle>
        </Link>
      ) : (
          <StyledTitle $size="sm">{title}</StyledTitle>
      )}     
    </>

  )
}

const CardTagList = ({ tags }: {tags: BaseProps["tags"] }) => {
  return (
      <StyledTagList role="list" aria-label="강의 태그">
        {tags.map((tag) => (
          <li key={tag.label}>
            <Tag variant={tag.variant}>{tag.label}</Tag>
          </li>
        ))}
      </StyledTagList>
  )
}


const LikeButton = ({ lectureId }: { lectureId: number }) => {
  const handleClickLike = () => {
    console.log(lectureId);
  }

  return (
    <StyledLikeButton onClick={handleClickLike} aria-label="강의 좋아요 추가" type="button">
        <SvgHeart />
    </StyledLikeButton>
  ) 
}

const CardInfoContent = ({ teacherImage, teacherName, teacherRole, description, price }: InfoContentProps) => {
  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  return (
    <StyledContentWrapper>
      <StyledTeacherSection>
        <StyledTeacherInfo>
          <Profile size={4.6} src={teacherImage} alt={`${teacherName} 강사 프로필`}/>
          <StyledTeacherDetails>
            <span className="sr-only">강사</span>
            <StyledTeacherName>{teacherName}</StyledTeacherName>
            <StyledTeacherRole aria-label="강사 전문 분야:">{teacherRole}</StyledTeacherRole>
          </StyledTeacherDetails>
        </StyledTeacherInfo>

        <StyledDescriptionBox role="blockquote" aria-label="강의 소개:">
          <p>{description}</p>
        </StyledDescriptionBox>
      </StyledTeacherSection>

      <StyledPrice aria-label="강의 가격">{formatPrice(price)}</StyledPrice>
    </StyledContentWrapper>
  )
}

const CardStudyContent = ({ value = 0, max = 1, lectureId, isActive }: StudyContentProps & { lectureId: number, isActive?: boolean }) => {
  const navigate = useNavigate();

  const goLectureRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      navigate(`${ROUTES.LECTURE_LIST}/${lectureId}/room`);
  }

    const goLectureDetail= (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      navigate(`${ROUTES.LECTURE_LIST}/${lectureId}`);
  }

  const formatPercent = (percent: number) => {
    return Math.round(percent * 100);
  }

  return (
    <StyledLectureContentWrapper>
        <StyledProgressWrapper>
          <ProgressBar value={value} max={max}/>
          <span>{value}/{max}강 ({isNaN(value/max) ? 0 : formatPercent(value/max)}%)</span>
        </StyledProgressWrapper>
        <StyledButtonList>
          {isActive ? (
            <>
              <Button iconSvg={<SvgPlay/>} onClick={goLectureRoom}>학습하기</Button>
              <Button variant='outline' onClick={goLectureDetail}>강의 상세</Button> 
            </>
          ) : (
            <Button variant="outline" onClick={goLectureDetail}>다시 수강신청 하기</Button>
          )}
        </StyledButtonList>
    </StyledLectureContentWrapper>
  )
}

export const CourseCard: React.FC<CourseCardProps> = (props) => {
  const { variant, lectureId, thumbnail, tags, title, isActive, isCompleted } = props;

  return (
    <StyledCardArticle>
      <CardHeader 
        variant={variant}
        lectureId={lectureId} 
        thumbnail={thumbnail} 
        tags={tags} 
        title={title}
        isActive={isActive}
        isCompleted={isCompleted}
      />

      {variant === "info" ? (
      <CardInfoContent
        variant={variant}
        teacherName={props.teacherName} 
        teacherRole={props.teacherRole} 
        teacherImage={props.teacherImage} 
        description={props.description} 
        price={props.price}
      />
      ) : (
      <CardStudyContent 
        variant={variant}
        value={props.value} 
        max={props.max} 
        lectureId={lectureId}
        isActive={isActive}
      />
      )
      }
    </StyledCardArticle>
  );
};

export default CourseCard;