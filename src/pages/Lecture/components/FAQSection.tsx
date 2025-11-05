// src/components/FAQSection.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockFaqData } from '../../../data/mockData';
import type { FaqData } from '../../../types/LectureType';
import { LoadingSpinner, ErrorMessage } from './HelperComponents';
import ArrowDownIcon from '../../../assets/icons/icon-arrow-down.svg?react';

const FAQSection = React.forwardRef<HTMLElement>((props, ref) => {
  const { data, loading, error } = useApiData<FaqData>(mockFaqData, 1000);
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  const ArrowIcon = ({ open }: { open: boolean }) => (
    <S.FAQArrowIcon $open={open}>
      <ArrowDownIcon />
    </S.FAQArrowIcon>
  );
  
  return (
    <S.Section ref={ref} id="faq">
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && (
        <>
          <S.SectionHeader>
            <S.SectionTitle>{data.title}</S.SectionTitle>
          </S.SectionHeader>

          <S.FAQContainer>
            {data.items.map((item) => {
              const isOpen = openItemId === item.id;
              return (
                <S.FAQItem key={item.id} $open={isOpen}>
                  <S.FAQQuestion onClick={() => toggleItem(item.id)}>
                    <S.FAQQuestionTitle>
                      <span className="prefix">{item.prefix}</span>
                      <span>{item.question}</span>
                    </S.FAQQuestionTitle>
                    <S.FAQToggleButton>
                      <ArrowIcon open={isOpen} />
                    </S.FAQToggleButton>
                  </S.FAQQuestion>
                  {isOpen && (
                    <S.FAQAnswer>
                      {/* HTML 마크다운을 렌더링하려면 dangerouslySetInnerHTML을 사용해야 하지만, 
                          간단한 텍스트로 처리합니다. */}
                      <p>{item.answer}</p>
                    </S.FAQAnswer>
                  )}
                </S.FAQItem>
              );
            })}
          </S.FAQContainer>
        </>
      )}
    </S.Section>
  );
});


const S = {
  Section: styled.section`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    scroll-margin-top: 100px;
  `,
  SectionHeader: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  `,
  SectionTitle: styled.h2`
    font-weight: 700;
    font-size: 32px;
    color: #121314;
    margin: 0;
  `,
  FAQContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 790px;
  `,
  FAQItem: styled.div<{ $open: boolean }>`
    width: 100%;
    background: #ffffff;
    border: 1px solid #d9dbe0;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.2s ease-out;
    ${({ $open }) => $open && `box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.04);`}
  `,
  FAQQuestion: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 24px 24px 28px;
    cursor: pointer;
  `,
  FAQQuestionTitle: styled.p`
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    color: #121314;
    span.prefix {
      font-weight: 700;
      font-size: 20px;
      color: #2e6ff2;
      margin-right: 12px;
    }
  `,
  FAQToggleButton: styled.button`
    border: none;
    background: none;
    padding: 0;
  `,
  FAQArrowIcon: styled.div<{ $open: boolean }>`
    width: 16px;
    height: 16px;
    color: #47494D;
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s ease;
  `,
  FAQAnswer: styled.div`
    padding: 0 28px 24px 28px;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #47494D;
    white-space: pre-wrap;
    p { margin: 0; }
  `,
};

export default FAQSection;
