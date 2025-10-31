import styled from 'styled-components';
import { Button } from '../components/Button';

// SVG Icon > Component로 불러옴 : IconReset -> <IconReset />
import IconReset from "../assets/icons/icon-reset.svg?react";
import IconPlay from "../assets/icons/icon-play.svg?react";
import IconShare from "../assets/icons/icon-share.svg?react";
import IconGithub from "../assets/icons/icon-oatuth-github.svg?react";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  width: 30vw;
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
            비활성화
          </Button>
          <Button variant="primary" size="lg">
            lg 버튼
          </Button>
          <Button variant="primary" size="md">
            md 버튼
          </Button>
          <Button variant="primary" size="sm">
            sm 버튼 (태그)
          </Button>
          <Button variant="primary" iconSvg={<IconReset/>}>
            아이콘이 있는 버튼
          </Button>
        </Group>

        <Group>
          <Title>outline</Title>
          <Button variant="outline">강의 상세</Button>
          <Button variant="outline" disabled>
            비활성화
          </Button>
          <Button variant="outline" size="lg">
            lg 버튼
          </Button>
          <Button variant="outline" size="md">
            md 버튼
          </Button>
          <Button variant="outline" size="sm">
            sm 버튼
          </Button>
          <Button variant="outline" iconSvg={<IconPlay/>}>
            아이콘이 있는 버튼
          </Button>
        </Group>


        <Group>
          <Title>Full width</Title>
          <Button variant="primary" size="lg" fullWidth>
            fullWidth 버튼
          </Button>
          <Button variant="outline" size="lg" fullWidth iconSvg={<IconReset/>}>
            아이콘이 있는 fullWidth 버튼
          </Button>
          <Button variant="outline" size="lg" fullWidth iconSvg={<IconPlay/>}>
            아이콘이 있는 fullWidth 버튼
          </Button>
          <Button variant="outline" size="lg" fullWidth iconSvg={<IconShare/>}>
            아이콘이 있는 fullWidth 버튼
          </Button>
          <Button variant="outline" size="lg" fullWidth>
            <IconGithub style={{position: "absolute", left: "1.2rem"}}/>
            Github 계정으로 로그인
          </Button>
        </Group>
      </Wrapper>
    </div>
  );
}
