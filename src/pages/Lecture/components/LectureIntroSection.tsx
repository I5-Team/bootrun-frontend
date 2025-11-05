import React from 'react';
import styled from 'styled-components';


const LectureIntroSection = React.forwardRef<HTMLElement>((_, ref) => {
  return (
    <S.Section ref={ref} id="description">
      <S.TitleHeader>
        <h3>강의 소개</h3>
      </S.TitleHeader>
      
      <S.StaticContentWrapper>
        <div>
          <h3>대 AI 시대, 개발을 어떻게 배워야 할까요?</h3>
          <p>위니브는 단순한 문법 강의가 아닌 '배우는 방법' 자체를 바꿉니다...</p>
        </div>
      </S.StaticContentWrapper>

 

    </S.Section>
  );
});

// --- Styles ---
const S = {
  Section: styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    scroll-margin-top: 100px;
  `,
  TitleHeader: styled.div`
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  `,
  StaticContentWrapper: styled.div`
    h3 { font-size: 28px; font-weight: 700; }
    p { font-size: 16px; color: #47494D; line-height: 1.6; }
  `,
  ReviewWrapper: styled.div`
    width: 100%;
    padding-top: 40px;
    border-top: 1px solid #eee;
    
    h3 {
      font-size: 28px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 40px;
    }
  `,
  ReviewList: styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
    
    li {
      border: 1px solid #D9DBE0;
      border-radius: 12px;
      padding: 24px;
    }
  `,
  ReviewHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  `,
  ReviewAuthor: styled.span`
    font-weight: 600;
    font-size: 16px;
  `,
  ReviewRating: styled.span`
    font-size: 14px;
    color: #47494D;
  `,
  ReviewContent: styled.div`
    font-size: 16px;
    color: #47494D;
    line-height: 1.7;
    p { margin: 0; }
  `
};

export default LectureIntroSection;