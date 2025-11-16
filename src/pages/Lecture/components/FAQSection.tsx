// src/components/FAQSection.tsx
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { StyledBaseSection as S } from "../LectureDetailPage.styled";
import SvgArrowDown from '../../../assets/icons/icon-arrow-down.svg?react';
import { useLectureContext } from '../../../layouts/LectureDetailLayout';


type FaqItem = {
  question: string;
  answer: string;
};

const FAQSection = React.forwardRef<HTMLElement>((_, ref) => {
  const { data } = useLectureContext();
  const FAQData = data.faq;

  const [openItemIndex, setOpenItemIndex] = useState<number[]>([]);
  const answerRefs = useRef<Record<number, HTMLDivElement | null>>({});

  if (!FAQData) return null;
  const FAQDataArr = JSON.parse(FAQData);

  const toggleItem = (index: number) => {
    setOpenItemIndex(prev => prev.includes(index) 
      ? prev.filter(i => i !== index) 
      : [...prev, index]);
  };

  return (
    <S.Section ref={ref} id="faq">
        <>
          <S.SectionHeader>
            <S.SectionTitle>FAQ</S.SectionTitle>
          </S.SectionHeader>

          <FAQ.Container>
                {FAQDataArr.map((item: FaqItem, index: number) => {
                  const isOpen = openItemIndex.includes(index);
                  return (
                    <FAQ.Item key={item.question} $open={isOpen}>

                      <FAQ.QuestionButton 
                        onClick={() => toggleItem(index)}
                        id={`faq-button-${index}`}
                        aria-controls={`faq-panel-${index}`}
                        aria-expanded={isOpen}
                      >
                        <FAQ.QuestionTitle>
                          <span className="prefix">Q{index + 1}</span>
                          {FAQDataArr.length === 0 ? (
                            <span>아직 등록된 FAQ가 없습니다.</span>
                          ) : (
                            <span>{item.question}</span>
                          )}
                        </FAQ.QuestionTitle>
                        <FAQ.ToggleIcon $open={isOpen}>
                          <SvgArrowDown/>
                        </FAQ.ToggleIcon>
                      </FAQ.QuestionButton>

                      <FAQ.AnswerWrapper
                        id={`faq-panel-${index}`}
                        aria-labelledby={`faq-button-${index}`}
                        aria-hidden={!isOpen}
                        ref={(el) => {answerRefs.current[index] = el}}
                        style={{
                          height: isOpen ? answerRefs.current[index]?.scrollHeight + 'px' : 0
                        }}
                      >
                        {FAQDataArr.length === 0 ? (
                          <FAQ.Answer>궁금한 점이 있다면 <FAQ.Anchor href="mailto:">고객센터</FAQ.Anchor>로 문의해주세요.</FAQ.Answer>
                        ) : (
                          <FAQ.Answer>{item.answer}</FAQ.Answer>
                        )}
                      </FAQ.AnswerWrapper>

                    </FAQ.Item>
                );
              })}
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
  QuestionButton: styled.button`
    width: 100%;
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
  QuestionTitle: styled.span`
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
  ToggleIcon: styled.span<{ $open: boolean }>`
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
  AnswerWrapper: styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: height 0.3s ease;
  `,
  Answer: styled.span`
    display: block;
    width: 100%;
    
    padding: 0 2.4rem 2.8rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.gray400};
    white-space: pre-wrap;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
      padding-bottom: 2rem;
    }
    
  `,
  Anchor: styled.a`
    font-weight: 500; 
    cursor: pointer;
  `
};

export default FAQSection;
