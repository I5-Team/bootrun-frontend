import type { Developer } from '../../../types/AboutTeamType';
import rocketImage from '../../../assets/images/easter-egg-rocket.png';
import spaghettiImage from '../../../assets/images/easter-egg-spaghetti.png';
import kirbyImage from '../../../assets/images/easter-egg-kirby.png';
import musicImage from '../../../assets/images/easter-egg-music.png';
import catImage from '../../../assets/images/easter-egg-cat.png';

export const developers: Developer[] = [
  {
    id: 1,
    name: '김규호(팀장)',
    role: 'Frontend Developer',
    description: '프로젝트 총괄, 인증(로그인/회원가입), 마이페이지 개발, CI/CD 구축 및 관리',
    github: 'https://github.com/kyuhokim11',
    story: '1) 팀 내 유일한 MBTI F형입니다.',
    story2: '2) 마라톤 러너로 강철 체력을 보유하고 있습니다.',
    emojiImage: rocketImage,
  },
  {
    id: 2,
    name: '김민주',
    role: 'Frontend Developer',
    description:
      '강의 목록, 강의 상세 페이지, UI/UX 디자인 시스템, SEO 및 웹 접근성 구축, 사용자 결제 관리',
    github: 'https://github.com/891km',
    story: '1) 저는 왼손잡이입니다.',
    story2: '2)  김민주 = 커비. 커비를 좋아합니다.',
    emojiImage: spaghettiImage,
  },
  {
    id: 3,
    name: '김채현',
    role: 'Frontend Developer',
    description:
      '강의실 페이지, 학습 관리(진행률) 기능, 관리자(대시보드, 강의관리, 결제관리, 사용자관리) 페이지, 토스 결제 연동',
    github: 'https://github.com/jgkim1027',
    story: '1) 제가 작업하면서 가장 많이 들은 노래는 어반자카파의 [Stay]입니다.',
    story2: '2) 최근엔 메가커피 메가미숫커피에 빠졌습니다. 그리고 저는 오른손잡이입니다.',
    emojiImage: kirbyImage,
  },
  {
    id: 4,
    name: '신가람',
    role: 'Backend Developer',
    description: 'DB 설계, 인증/사용자/강의/학습 진행/관리자(강의) API 개발, 서버 배포',
    github: 'https://github.com/b1351b1',
    story: '1) 프로젝트 기간에 새벽 5시든, 몇 시든 항상 온라인이어서 팀원들이 놀랐습니다.',
    story2: '2) 조용하고 차분한 성격이지만 엄청난 책임감을 가지고 있습니다.',
    emojiImage: musicImage,
  },
  {
    id: 5,
    name: '장민경',
    role: 'Backend Developer',
    description:
      '환경 설정(env/config), 결제/관리자(사용자·결제·대시보드) API 개발, 로컬 서버 구축',
    github: 'https://github.com/jangmingyeong',
    story: '1) 프로젝트 중간에 독감을 이겨냈습니다.',
    story2: '2) 팀원 5명 중에서 가장 밝은 에너지가 있는 사람입니다.',
    emojiImage: catImage,
  },
];
