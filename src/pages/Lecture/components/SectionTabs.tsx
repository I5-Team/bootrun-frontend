import React, { useState } from 'react';
import type { RefObject } from 'react';
import type { SectionRefs } from '../../../types/LectureType'; 
import { NavContent, NavItem, StickyNavWrapper, NavCta } from "../LectureDetailPage.styled";
import useMediaQuery from '../../../hooks/useMediaQuery';
import { ROUTES } from '../../../router/RouteConfig';
import { useNavigate } from 'react-router-dom';
import { useLectureContext } from '../LectureDetailPage';

interface StickyNavProps {
  refs: SectionRefs;
}

export const SectionTabs: React.FC<StickyNavProps> = ({ refs }) => {
  const { courseId, data } = useLectureContext();
  const navigate = useNavigate();
  const { isTablet } = useMediaQuery();
  const [activeTab, setActiveTab] = useState('강의 소개');

  const navItems = [
    { name: '강의 소개', ref: refs.introRef, id: 'description' },
    { name: '수강생 후기', ref: refs.reviewsRef, id: 'reviews' },
    { name: '커리큘럼', ref: refs.curriculumRef, id: 'curriculum' },
    { name: '강사 소개', ref: refs.instructorRef, id: 'instructor' },
    { name: 'FAQ', ref: refs.faqRef, id: 'faq' },
  ];
  
  const ctaItem = { name: '수강신청', href: '#' }; 

    const recruitmentStatus = data.recruitment_end_date 
      ? (new Date(data.recruitment_end_date.replace('T', ''))) > new Date() ? true : false
      : false;

  const handleNavClick = (
    e: React.MouseEvent, 
    name: string, 
    ref: RefObject<HTMLElement>
  ) => {
    e.preventDefault();
    setActiveTab(name);
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start', 
    });
  };

  const handleEnrollCourse = (e: React.MouseEvent) => {
    e.preventDefault();
    const path = ROUTES.LECTURE_PAYMENT.replace(':id', String(courseId));
    console.log(path);
    navigate(path);
  }
  
  return (
    <StickyNavWrapper>
      <NavContent>
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            href={`#${item.id}`} // HTML의 id와 일치
            $active={activeTab === item.name}
            onClick={(e) => handleNavClick(e, item.name, item.ref)}
          >
            {item.name}
          </NavItem>
        ))}
        
        {/* 수강신청 CTA 버튼 (별도 스타일링) */}
        {(recruitmentStatus && isTablet) && 
          <NavCta
            key={ctaItem.name}
            href='#'
            onClick={handleEnrollCourse}
          >
            {ctaItem.name}
          </NavCta>
        }
      </NavContent>
    </StickyNavWrapper>
  );
}