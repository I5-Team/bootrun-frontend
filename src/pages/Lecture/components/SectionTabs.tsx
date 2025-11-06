import React, { useState } from 'react';
import type { RefObject } from 'react';
import type { SectionRefs } from '../../../types/LectureType'; 
import { NavContent, NavItem, StickyNavWrapper, NavCta } from "../LectureDetailPage.styled";

interface StickyNavProps {
  refs: SectionRefs;
}

export const SectionTabs: React.FC<StickyNavProps> = ({ refs }) => {
  const [activeTab, setActiveTab] = useState('강의 소개');

  const navItems = [
    { name: '강의 소개', ref: refs.introRef, id: 'description' },
    { name: '수강생 후기', ref: refs.reviewsRef, id: 'reviews' },
    { name: '커리큘럼', ref: refs.curriculumRef, id: 'curriculum' },
    { name: '강사 소개', ref: refs.instructorRef, id: 'instructor' },
    { name: 'FAQ', ref: refs.faqRef, id: 'faq' },
  ];
  
  const ctaItem = { name: '수강신청', href: '/payment/1' }; 

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
        <NavCta
          key={ctaItem.name}
          href={ctaItem.href} // 실제 링크로 이동
          // onClick={handleCtaClick} (페이지 이동이므로 onClick 제거)
        >
          {ctaItem.name}
        </NavCta>
      </NavContent>
    </StickyNavWrapper>
  );
}