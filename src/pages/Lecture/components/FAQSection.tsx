// src/components/FAQSection.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockFaqData } from '../../../data/mockLectureData';
import type { FaqData } from '../../../types/LectureType';
import { LoadingSpinner, ErrorMessage } from '../../../components/HelperComponents';
import { StyledBaseSection as S } from "../LectureDetailPage.styled";
import SvgArrowDown from '../../../assets/icons/icon-arrow-down.svg?react';




const FAQSection = React.forwardRef<HTMLElement>((_, ref) => {
  const { data, loading, error } = useApiData<FaqData>(mockFaqData, 1000);
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <S.Section ref={ref} id="faq">
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && (
        <>
          <S.SectionHeader>
            <S.SectionTitle>{data.title}</S.SectionTitle>
          </S.SectionHeader>

          <FAQ.Container>
            {data.items.map((item) => {
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
                      {/* HTML 마크다운을 렌더링하려면 dangerouslySetInnerHTML을 사용해야 하지만, 
                          간단한 텍스트로 처리합니다. */}
                      <p>{item.answer}</p>
                    </FAQ.Answer>
                  )}

                </FAQ.Item>
              );
            })}
          </FAQ.Container>
        </>
      )}
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
};

export default FAQSection;
