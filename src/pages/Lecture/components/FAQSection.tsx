// src/components/FAQSection.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledBaseSection as S } from "../LectureDetailPage.styled";
import SvgArrowDown from '../../../assets/icons/icon-arrow-down.svg?react';
import type { CoursesDetailItem } from '../../../types/CourseType';

type FAQSectionProps = {
  data: CoursesDetailItem,
}

type FaqItem = {
  id: number;
  prefix: string;
  question: string;
  answer: string;
};

const FAQSection = React.forwardRef<HTMLElement, FAQSectionProps>(({ data }, ref) => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  if (!data) return null;

  const faqData: FaqItem[] = [];
  
  if (data.faq) {
    try {
      const parsed = JSON.parse(data.faq);

      Object.keys(parsed)
        .filter((key) => key.startsWith('Q'))
        .forEach((qKey, index) => {
          const aKey = qKey.replace('Q', 'A');

          faqData.push({
            id: index,
            prefix: qKey,
            question: parsed[qKey],
            answer: parsed[aKey] || '',
          });
        });
    } catch (e) {
      console.error('FAQ parsing error', e);
    }
  }

  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <S.Section ref={ref} id="faq">
        <>
          <S.SectionHeader>
            <S.SectionTitle>FAQ</S.SectionTitle>
          </S.SectionHeader>

          <FAQ.Container>
            {faqData.length === 0
            ? <FAQ.Item $open={openItemId === 1234}>
                <FAQ.Question onClick={() => toggleItem(1234)}>
                  <FAQ.QuestionTitle>
                    <span className="prefix">Q</span>
                    <span>아직 등록된 FAQ가 없습니다.</span>
                  </FAQ.QuestionTitle>
                  <FAQ.ToggleButton $open={openItemId === 1234}><SvgArrowDown/></FAQ.ToggleButton>
                </FAQ.Question>
                {openItemId === 1234 && (
                  <FAQ.Answer>
                    <p>궁금한 점이 있다면 <FAQ.Anchor href="mailto:">고객센터</FAQ.Anchor>로 문의해주세요.</p>
                  </FAQ.Answer>
                )}
              </FAQ.Item>
            :
              <>
                {faqData.map((item: any) => {
                  const isOpen = openItemId === item.id;
                  return (
                    <FAQ.Item key={item.id} $open={isOpen}>
                      <FAQ.Question onClick={() => toggleItem(item.id)}>
                        <FAQ.QuestionTitle>
                          <span className="prefix">{item.prefix}</span>
                          <span>{item.question}</span>
                        </FAQ.QuestionTitle>
                        <FAQ.ToggleButton $open={isOpen}><SvgArrowDown/></FAQ.ToggleButton>
                      </FAQ.Question>
    
                      {isOpen && (
                        <FAQ.Answer>
                          <p>{item.answer}</p>
                        </FAQ.Answer>
                      )}
    
                    </FAQ.Item>
                  );
                })}
              </>
            }

          </FAQ.Container>
        </>
    </S.Section>
  );
});


const FAQ = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 100%;
  `,
  Item: styled.div<{ $open: boolean }>`
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.xl};
    overflow: hidden;
    transition: all 0.2s ease-out;
    ${({ $open, theme }) => $open && theme.colors.shadow};
  `,
  Question: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.4rem;
    padding-left: 2.8rem;
    cursor: pointer;

    @media ${({ theme }) => theme.devices.mobile} {
      padding: 1.6rem;
      padding-right: 1.2rem;
    }
  `,
  QuestionTitle: styled.p`
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize.md};
    display: flex;
    align-items: center;
    gap: 1.2rem;

    .prefix {
      font-size: ${({ theme }) => theme.fontSize.lg};
      font-weight: 600;
      color: ${({ theme }) => theme.colors.primary300};

      @media ${({ theme }) => theme.devices.mobile} {
        font-size: ${({ theme }) => theme.mobileFontSize.xl};
      }
    }

      @media ${({ theme }) => theme.devices.mobile} {
        font-size: ${({ theme }) => theme.fontSize.sm};
      }
  `,
  ToggleButton: styled.button<{ $open: boolean }>`
    width: 3.2rem;
    height: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: 50%;
    
      transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
      transition: transform 0.2s ease;
    
    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  `,
  Answer: styled.div`
    padding: 2.8rem 2.4rem;
    padding-top: 0;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.gray400};
    white-space: pre-wrap;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
  Anchor: styled.a`
    font-weight: 500; 
    cursor: pointer;
  `
};

export default FAQSection;
