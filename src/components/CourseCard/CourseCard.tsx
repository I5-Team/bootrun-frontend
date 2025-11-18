import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/RouteConfig';
import { useIsEnrolled } from '../../hooks/useIsEnrolled';

// import - components
import {
  StyledButtonList,
  StyledCardArticle,
  StyledContentWrapper,
  StyledDescriptionBox,
  StyledLectureContentWrapper,
  StyledLikeButton,
  StyledPrice,
  StyledTagList,
  StyledTeacherDetails,
  StyledTeacherInfo,
  StyledTeacherName,
  StyledTeacherRole,
  StyledTeacherSection,
  StyledThumbnailImage,
  StyledThumbnailWrapper,
  StyledTitle,
  StyledThumbnailLink,
  StlyedThumbnailNotice,
  StyledLearning,
} from './CourseCard.styled';
import Tag from '../Tag';
import Profile from '../Profile';
import ProgressBar from '../ProgressBar';
import Button from '../Button';

// import - assets
import SvgHeart from '../../assets/icons/icon-heart.svg?react';
import SvgPlay from '../../assets/icons/icon-play.svg?react';
import SvgPlayDark from '../../assets/icons/icon-play-dark.svg?react';
import SvgCertificate from '../../assets/icons/icon-certificate.svg?react';

// import - utils
import { getFullImageUrl } from '../../utils/imageUtils';

// types
type CourseCardProps = BaseProps & (InfoContentProps | StudyContentProps);
type VariantType = 'info' | 'study';

type BaseProps = {
  courseId: number;
  thumbnail: string;
  tags: Array<{ label: string; variant?: 'dark' | 'light' }>;
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
};

type InfoContentProps = {
  courseId: number;
  variant: 'info';
  teacherName: string;
  teacherRole: string;
  teacherImage: string;
  description: string;
  price: number;
};

type StudyContentProps = {
  variant: 'study';
  value: number;
  max: number;
};

// components
const CardHeader = ({
  courseId,
  title,
  thumbnail,
  tags,
  variant,
  isActive,
  isCompleted,
}: BaseProps & { variant: VariantType }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const linkTo =
    variant === 'info'
      ? `${ROUTES.LECTURE_LIST}/${courseId}`
      : `${ROUTES.LECTURE_LIST}/${courseId}/room`;

  const linkLabel = variant === 'info' ? `${title} 강의상세 바로가기` : `${title} 강의실 바로가기`;

  return (
    <>
      <StyledThumbnailWrapper>
        {isActive === false && (
          <StlyedThumbnailNotice>수강 기간이 종료되었습니다.</StlyedThumbnailNotice>
        )}
        <StyledThumbnailLink
          to={linkTo}
          aria-label={linkLabel}
          onClick={(e) => isActive === false && e.preventDefault()}
        >
          <StyledThumbnailImage
            src={getFullImageUrl(thumbnail)}
            alt=""
            onLoad={() => setImgLoaded(true)}
            style={{ display: imgLoaded ? 'block' : 'none' }}
          />
        </StyledThumbnailLink>
        {variant === 'info' && <LikeButton courseId={courseId} />}
        {variant === 'study' && isCompleted && (
          <Button iconSvg={<SvgCertificate />} variant="outline" size="sm">
            수료증
          </Button>
        )}
      </StyledThumbnailWrapper>

      <CardTagList tags={tags} />

      {variant === 'info' ? (
        <Link to={linkTo}>
          <StyledTitle $size="lg">{title}</StyledTitle>
        </Link>
      ) : (
        <StyledTitle $size="sm">{title}</StyledTitle>
      )}
    </>
  );
};

const CardTagList = ({ tags }: { tags: BaseProps['tags'] }) => {
  return (
    <StyledTagList role="list" aria-label="강의 태그">
      {tags.map((tag) => (
        <li key={tag.label}>
          <Tag variant={tag.variant}>{tag.label}</Tag>
        </li>
      ))}
    </StyledTagList>
  );
};

const LikeButton = ({ courseId }: { courseId: number }) => {
  const handleClickLike = () => {
    console.log(courseId);
  };

  return (
    <StyledLikeButton onClick={handleClickLike} aria-label="강의 좋아요 추가" type="button">
      <SvgHeart />
    </StyledLikeButton>
  );
};

const CardInfoContent = ({
  courseId,
  teacherImage,
  teacherName,
  teacherRole,
  description,
  price,
}: InfoContentProps) => {
  const { isEnrolled } = useIsEnrolled(Number(courseId));

  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  return (
    <StyledContentWrapper>
      <StyledTeacherSection>
        <StyledTeacherInfo>
          <Profile
            size={4.6}
            src={getFullImageUrl(teacherImage)}
            alt={`${teacherName} 강사 프로필`}
          />
          <StyledTeacherDetails>
            <StyledTeacherName>{teacherName}</StyledTeacherName>
            <StyledTeacherRole>{teacherRole}</StyledTeacherRole>
          </StyledTeacherDetails>
        </StyledTeacherInfo>

        <StyledDescriptionBox>
          <p>{description}</p>
        </StyledDescriptionBox>
      </StyledTeacherSection>

      {isEnrolled ? (
        <StyledLearning>
          <SvgPlayDark />
          <StyledPrice>학습중</StyledPrice>
        </StyledLearning>
      ) : (
        <StyledPrice aria-label="강의 가격">{formatPrice(price)}</StyledPrice>
      )}
    </StyledContentWrapper>
  );
};

const CardStudyContent = ({
  value = 0,
  max = 1,
  courseId,
  isActive,
}: StudyContentProps & { courseId: number; isActive?: boolean }) => {
  const navigate = useNavigate();

  const goLectureRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`${ROUTES.LECTURE_LIST}/${courseId}/room`);
  };

  const goLectureDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`${ROUTES.LECTURE_LIST}/${courseId}`);
  };

  return (
    <StyledLectureContentWrapper>
      <ProgressBar value={value} max={max} />
      <StyledButtonList>
        {isActive ? (
          <>
            <Button iconSvg={<SvgPlay />} onClick={goLectureRoom}>
              학습하기
            </Button>
            <Button variant="outline" onClick={goLectureDetail}>
              강의 상세
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={goLectureDetail}>
            다시 수강신청 하기
          </Button>
        )}
      </StyledButtonList>
    </StyledLectureContentWrapper>
  );
};

export const CourseCard: React.FC<CourseCardProps> = (props) => {
  const { variant, courseId, thumbnail, tags, title, isActive, isCompleted } = props;
  return (
    <StyledCardArticle>
      <CardHeader
        variant={variant}
        courseId={courseId}
        thumbnail={thumbnail}
        tags={tags}
        title={title}
        isActive={isActive}
        isCompleted={isCompleted}
      />

      {variant === 'info' ? (
        <CardInfoContent
          courseId={courseId}
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
          courseId={courseId}
          isActive={isActive}
        />
      )}
    </StyledCardArticle>
  );
};

export default CourseCard;
