import React from 'react';
import Tag from '../Tag';
import IconHeart from '../../assets/icons/icon-heart.svg?react';
import Profile from '../Profile';
import { ButtonList, CardArticle, CardHeadLink, ContentWrapper, DescriptionBox, LectureContentWrapper, LikeButton, Price, ProgressWrapper, TagList, TeacherDetails, TeacherInfo, TeacherName, TeacherRole, TeacherSection, ThumbnailImage, ThumbnailWrapper, Title } from './CourseCard.styled';
import ProgressBar from '../ProgressBar';
import Button from '../Button';
import SvgPlay from "../../assets/icons/icon-play.svg?react";
import SvgCertificate from "../../assets/icons/icon-certificate.svg?react";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/RouteConfig';

type CourseCardProps = 
  | (HeadProps & { variant?: "list"} & ContentProps)
  | (HeadProps & {variant: "myLecture"} & LectureContentProps)


type HeadProps = {
  id: number;
  thumbnail: string;
  tags: Array<{ label: string; variant?: 'dark' | 'light' }>;
  title: string;
  onLike?: () => void;
  isActive?: boolean;
}

type ContentProps = {
  teacherName: string;
  teacherRole: string;
  teacherImage: string;
  description: string;
  price: number;
}

type LectureContentProps = {
  value: number;
  max: number;
  lectureId: number;
  isActive?: boolean;
  isCompleted?: boolean;
}

const CardHead = ({ thumbnail, tags, title, onLike }: HeadProps) => {
  return (
    <>
      <ThumbnailWrapper>
        <ThumbnailImage src={thumbnail} alt="" />
          <LikeButton onClick={onLike} aria-label="강의 좋아요 추가" type="button">
            <IconHeart />
        </LikeButton>
      </ThumbnailWrapper>

      <TagList role="list" aria-label="강의 태그">
        {tags.map((tag, index) => (
          <li key={index}>
            <Tag variant={tag.variant}>{tag.label}</Tag>
          </li>
        ))}
      </TagList>
      <Title>{title}</Title>
    </>
  )
}

const CardContent = ({ teacherImage, teacherName, teacherRole, description, price }: ContentProps) => {
  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  return (
    <ContentWrapper>
      <TeacherSection>
        <TeacherInfo>
          <Profile size={4.6} src={teacherImage} alt={`${teacherName} 강사 프로필`}/>
          <TeacherDetails>
            <span className="sr-only">강사</span>
            <TeacherName>{teacherName}</TeacherName>
            <TeacherRole aria-label="강사 전문 분야:">{teacherRole}</TeacherRole>
          </TeacherDetails>
        </TeacherInfo>

        <DescriptionBox role="blockquote" aria-label="강의 소개:">
          <p>{description}</p>
        </DescriptionBox>
      </TeacherSection>

      <Price aria-label="강의 가격">{formatPrice(price)}</Price>
    </ContentWrapper>
  )
}

const CardContentMyLecture = ({ value = 0, max = 1, lectureId, isActive, isCompleted }: LectureContentProps) => {
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
    <LectureContentWrapper>
        <ProgressWrapper>
          <ProgressBar value={value} max={max}/>
          <span>{value}/{max}강 ({formatPercent(value/max)}%)</span>
        </ProgressWrapper>
        <ButtonList>
          <Button iconSvg={<SvgPlay/>} onClick={goLectureRoom} disabled={!isActive}>학습하기</Button>
          <Button variant='outline' onClick={goLectureDetail} disabled={!isActive}>강의 상세</Button>
          {isCompleted && <Button iconSvg={<SvgCertificate/>} variant="outline">수료증</Button>}
        </ButtonList>
    </LectureContentWrapper>
  )
}

export const CourseCard: React.FC<CourseCardProps> = (props) => {
  const { id, variant, thumbnail, tags, title, onLike } = props;
  const { isActive } = props;

  return (
    <CardArticle $isActive={isActive}>
      <CardHeadLink
        to={`${ROUTES.LECTURE_LIST}/${id}/room`} 
        aria-label={`${title} 강의실 바로가기`}
      >
        <CardHead id={id} thumbnail={thumbnail} title={title} tags={tags} onLike={onLike}/>
      </CardHeadLink>

        {(variant === "list" || variant === undefined) && 
          <CardContent 
            teacherName={props.teacherName} 
            teacherRole={props.teacherRole} 
            teacherImage={props.teacherImage} 
            description={props.description} 
            price={props.price}
          />
        }

      {variant === "myLecture" && 
        <CardContentMyLecture 
          value={props.value} 
          max={props.max} 
          lectureId={props.lectureId}
          isCompleted={props.isCompleted}
          isActive={isActive}
      />}
    </CardArticle>
  );
};

export default CourseCard;
