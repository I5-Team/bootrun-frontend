// src/components/FAQSection.tsx
import React, { useRef, useState } from 'react';
import FAQ from '../styles/FAQSection.styled';
import { StyledBaseSection as S } from '../styles/LectureDetailPage.styled';
import SvgArrowDown from '../../../assets/icons/icon-arrow-down.svg?react';
import { useLectureContext } from '../../../layouts/LectureDetailLayout';

type FaqItem = {
  question: string;
  answer: string;
};

const FAQSection = React.forwardRef<HTMLElement>((_, ref) => {
  const [openItemIndex, setOpenItemIndex] = useState<number[]>([0]);
  const answerRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const { data } = useLectureContext();
  let FAQDataArr: FaqItem[] = [];

  try {
    const rawFAQ = data?.faq ?? '[]';
    const parsedFAQ = JSON.parse(rawFAQ);
    FAQDataArr = Array.isArray(parsedFAQ) ? parsedFAQ : [];
  } catch (e) {
    FAQDataArr = [];
  }

  const toggleItem = (index: number) => {
    setOpenItemIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <S.Section ref={ref} id="faq">
      <S.SectionHeader>
        <S.SectionTitle>FAQ</S.SectionTitle>
      </S.SectionHeader>

      <FAQ.Container>
        {!data || FAQDataArr.length === 0 ? (
          <FAQ.Item $open={false}>
            <FAQ.QuestionButton style={{ cursor: 'default' }}>
              <FAQ.QuestionTitle>
                <span className="prefix">Q</span>
                <span>아직 등록된 FAQ가 없습니다.</span>
              </FAQ.QuestionTitle>
            </FAQ.QuestionButton>
            <FAQ.AnswerWrapper>
              <FAQ.Answer>
                궁금한 점이 있다면 <FAQ.Anchor href="mailto:">고객센터</FAQ.Anchor>로 문의해주세요.
              </FAQ.Answer>
            </FAQ.AnswerWrapper>
          </FAQ.Item>
        ) : (
          FAQDataArr.map((item: FaqItem, index: number) => {
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
                    <span>{item.question}</span>
                  </FAQ.QuestionTitle>
                  <FAQ.ToggleIcon $open={isOpen}>
                    <SvgArrowDown />
                  </FAQ.ToggleIcon>
                </FAQ.QuestionButton>

                <FAQ.AnswerWrapper
                  id={`faq-panel-${index}`}
                  aria-labelledby={`faq-button-${index}`}
                  aria-hidden={!isOpen}
                  ref={(el) => {
                    answerRefs.current[index] = el;
                  }}
                  style={{
                    height: isOpen ? answerRefs.current[index]?.scrollHeight + 'px' : 0,
                  }}
                >
                  <FAQ.Answer>{item.answer}</FAQ.Answer>
                </FAQ.AnswerWrapper>
              </FAQ.Item>
            );
          })
        )}
      </FAQ.Container>
    </S.Section>
  );
});

export default FAQSection;
