import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';

// 자산 경로: 프로젝트 내 아이콘 예시를 사용
import iconReset from '../assets/icons/icon-reset.svg';
import iconYoutube from '../assets/icons/icon-play.svg';
import iconShare from '../assets/icons/icon-share.svg';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  padding: 24px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #47494d;
`;

export default function ButtonGallery() {
  return (
    <div>
      <h2 style={{ padding: '16px 24px', margin: 0 }}>Buttons</h2>
      <Wrapper>
        <Group>
          <Title>Primary</Title>
          <Button variant="primary" disabled>
            로그인
          </Button>
          <Button variant="primary" size="lg">
            로그인
          </Button>
          <Button variant="primary" iconSrc={iconYoutube} iconPosition="left">
            학습하기
          </Button>
          <Button variant="primary" iconSrc={iconYoutube} iconPosition="right">
            학습하기
          </Button>
          <Button variant="primary" disabled>
            비활성화
          </Button>
        </Group>

        <Group>
          <Title>Secondary</Title>
          <Button variant="secondary">강의 상세</Button>
          <Button variant="secondary" size="lg">
            강의 상세
          </Button>
          <Button variant="secondary" iconSrc={iconReset} iconPosition="left">
            필터 초기화
          </Button>
          <Button variant="secondary" iconSrc={iconShare} iconPosition="right">
            공유하기
          </Button>
          <Button variant="secondary" disabled>
            비활성화
          </Button>
        </Group>

        <Group>
          <Title>Ghost</Title>
          <Button variant="ghost">텍스트 버튼</Button>
          <Button variant="ghost" iconSrc={iconShare} iconPosition="left">
            공유하기
          </Button>
        </Group>

        <Group>
          <Title>Full width</Title>
          <Button variant="primary" size="lg" fullWidth>
            수강 신청하기
          </Button>
          <Button variant="secondary" size="lg" fullWidth iconSrc={iconYoutube}>
            유튜브로 보기
          </Button>
        </Group>
      </Wrapper>
    </div>
  );
}
