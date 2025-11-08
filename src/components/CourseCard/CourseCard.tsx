import React from 'react';
import Tag from '../Tag';
import IconHeart from '../../assets/icons/icon-heart.svg?react';
import Profile from '../Profile';
import { ButtonList, CardContainer, ContentWrapper, DescriptionBox, LectureContentWrapper, LikeButton, Price, ProgressWrapper, TagList, TeacherDetails, TeacherInfo, TeacherName, TeacherRole, TeacherSection, ThumbnailImage, ThumbnailWrapper, Title } from './CourseCard.styled';
import ProgressBar from '../ProgressBar';
import Button from '../Button';
import SvgPlay from "../../assets/icons/icon-play.svg?react";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/RouteConfig';

type CourseCardProps = 
  | (HeadProps & { variant?: "list"} & ContentProps)
  | (HeadProps & {variant: "myLecture"} & LectureContentProps)


type HeadProps = {
  thumbnail: string;
  tags: Array<{ label: string; variant?: 'dark' | 'light' }>;
  title: string;
  onLike?: () => void;
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
  isActive: boolean;
  isCompleted: boolean;
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

const CardContentMyLecture = ({ value = 0, max = 1, lectureId }: LectureContentProps) => {
  const navigate = useNavigate();

  const goLectureRoom = () => {
      const path = ROUTES.LECTURE_ROOM.replace(':id', lectureId.toString());
      navigate(path);
  }

    const goLectureDetail= () => {
      const path = ROUTES.LECTURE_DETAIL.replace(':id', lectureId.toString());
      navigate(path);
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
          <Button iconSvg={<SvgPlay/>} onClick={goLectureRoom}>학습하기</Button>
          <Button variant='outline' onClick={goLectureDetail}>강의 상세</Button>
        </ButtonList>
    </LectureContentWrapper>
  )
}

export const CourseCard: React.FC<CourseCardProps> = (props) => {
  const {variant, thumbnail, tags, title, onLike } = props;
  return (
    <CardContainer>
      <CardHead thumbnail={thumbnail} title={title} tags={tags} onLike={onLike}/>
      
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
          isActive={props.isActive || false}
          isCompleted = {props.isCompleted || false}
      />}
    </CardContainer>
  );
};

export default CourseCard;
