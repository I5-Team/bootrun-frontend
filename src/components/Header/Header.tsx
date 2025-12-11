import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/RouteConfig.ts';
import useMediaQuery from '../../hooks/useMediaQuery.ts';
import { useTheme } from 'styled-components';
import { useLectureRoom } from '@/pages/Lecture/contexts/LectureRoomContext.tsx';
import { useProfile } from '../../queries/useUserQueries.ts';
import { getFullImageUrl } from '../../utils/imageUtils.ts';

// svg
import logo from '@/assets/logos/logo-typo.svg';
import SvgHamberger from '@/assets/icons/icon-hambuger.svg?react';
import SvgDownload from '@/assets/icons/icon-download-folder.svg?react';
import SvgHomeBack from '@/assets/icons/icon-home-back.svg?react';
import SvgDiscord from '@/assets/icons/icon-sns-discord.svg?react';
import SvgChapter from '@/assets/icons/icon-chapter.svg?react';
import SvgSearch from '@/assets/icons/icon-search.svg?react';
import SvgQnA from '@/assets/icons/icon-qna.svg?react';

// components
import {
  StyledHeader,
  StyledHeaderInner,
  StyledLogo,
  StyledNavList,
  StyledHeaderInnerLecture,
  StyledHeaderInnerLogo,
  StyledIconBtn,
  StyledHeaderInnerAdmin,
  StyledDevBadge,
  StyledActionList,
} from './Header.styled.ts';

import Button from '../Button.tsx';
import IconButton from '@/components/IconButton.tsx';
import Profile from '../Profile.tsx';
import SearchForm from '../SearchForm.tsx';
import HeaderSidebar from './HeaderSidebar.tsx';
import { ProfileDropdown, StyledDropdownBtn } from '../ProfileDropdown.tsx';

const APP_ENV = import.meta.env.VITE_APP_ENV;

// ==================================
// default Header Components
// ==================================

// 헤더 로고 컴포넌트 (환경 배지 포함)
const HeaderLogo = () => {
  const isDev = APP_ENV && (APP_ENV.includes('dev') || APP_ENV.includes('local'));

  return isDev ? (
    <span style={{ display: 'flex' }}>
      <Link to={ROUTES.HOME}>
        <h1 className="sr-only">bootRun</h1>
        <StyledLogo src={logo} alt="" width={124} height={24} />
      </Link>
      <StyledDevBadge>{APP_ENV}</StyledDevBadge>
    </span>
  ) : (
    <Link to={ROUTES.HOME}>
      <h1 className="sr-only">bootRun</h1>
      <StyledLogo src={logo} alt="" width={124} height={24} />
    </Link>
  );
};

const NavList = () => {
  return (
    <StyledNavList>
      <li>
        <Link to={ROUTES.ABOUT}>부트런 소개</Link>
      </li>
      <li>
        <Link to={ROUTES.REVIEW}>수강생 이야기</Link>
      </li>
    </StyledNavList>
  );
};

const SearchOpenBtn = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const theme = useTheme();

  return (
    <IconButton
      iconSvg={<SvgSearch />}
      ariaLabel="검색창 열기"
      active={isActive}
      onClick={onClick}
      iconColor={theme.colors.surface}
    />
  );
};

const SidebarOpenBtn = ({
  isActive,
  onClick,
}: {
  isActive?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const theme = useTheme();

  return (
    <IconButton
      iconSvg={<SvgHamberger />}
      ariaLabel="메뉴 열기"
      active={isActive}
      onClick={onClick}
      iconColor={theme.colors.surface}
    />
  );
};

// 사용자 프로필 버튼 및 드롭다운 메뉴
const UserProfileBtn = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);
  const { data: userProfile } = useProfile();
  const isLoggedIn = !!userProfile;

  let profileImageUrl = getFullImageUrl(userProfile?.profile_image);

  const handleOpenDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!dropdownRef.current) return;

      if (dropdownRef.current.contains(target)) {
        if (target.tagName === 'BUTTON' || target.tagName === 'A') {
          setTimeout(() => setIsDropdownOpen(false), 0);
          setIsDropdownOpen(false);
        }
        return;
      }

      setIsDropdownOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.addEventListener('mouseup', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  return (
    <>
      {isLoggedIn ? (
        <StyledDropdownBtn ref={dropdownRef} onClick={handleOpenDropdown}>
          <Profile size={4.2} isActive={isDropdownOpen} src={profileImageUrl} />
          <ProfileDropdown isOpen={isDropdownOpen} />
        </StyledDropdownBtn>
      ) : (
        <Button as={Link} to={ROUTES.LOGIN} type="">
          로그인
        </Button>
      )}
    </>
  );
};

const ActionLists = () => {
  const { isTablet } = useMediaQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchActive = location.pathname.includes(ROUTES.LECTURE_LIST_SEARCH);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleOpenSearch = () => {
    navigate(ROUTES.LECTURE_LIST_SEARCH);
  };

  const handleSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <StyledActionList>
      {isTablet ? (
        <>
          <SearchOpenBtn isActive={isSearchActive} onClick={handleOpenSearch} />
          <SidebarOpenBtn onClick={handleSidebarOpen} />
          <HeaderSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </>
      ) : (
        <>
          <NavList />
          <SearchForm />
          <UserProfileBtn />
        </>
      )}
    </StyledActionList>
  );
};

// ==================================
// lectureRoom Components
// ==================================
const DownloadBtn = () => {
  const { toggleRightSidebar, rightSidebarType, currentLectureMaterialUrl, currentLectureId } =
    useLectureRoom();
  const [materialViewed, setMaterialViewed] = useState<boolean>(false);

  // 강의 변경 시 자료 본 상태 확인
  useEffect(() => {
    if (!currentLectureId) return;

    const getMaterialViewedKey = (id: number) => `material_viewed_lecture_${id}`;
    const viewed = localStorage.getItem(getMaterialViewedKey(currentLectureId)) === 'true';
    setMaterialViewed(viewed);
  }, [currentLectureId]);

  const handleClick = () => {
    // 자료 다운로드 버튼 클릭 시 자료를 본 상태로 저장
    if (currentLectureId && !materialViewed) {
      const getMaterialViewedKey = (id: number) => `material_viewed_lecture_${id}`;
      localStorage.setItem(getMaterialViewedKey(currentLectureId), 'true');
      setMaterialViewed(true);
    }
    toggleRightSidebar('materials');
  };

  // 자료가 있고 아직 보지 않았을 때만 알림 뱃지 표시
  const hasMaterial = !!currentLectureMaterialUrl?.trim();
  const showAlert = hasMaterial && !materialViewed;

  return (
    <IconButton
      iconSvg={<SvgDownload />}
      ariaLabel="자료 다운로드"
      hasAlert={showAlert}
      onClick={handleClick}
      className={rightSidebarType === 'materials' ? 'active' : ''}
      tooltip="자료 다운로드"
    />
  );
};

const QnaBtn = () => {
  const { toggleRightSidebar, rightSidebarType } = useLectureRoom();

  const handleClick = () => {
    toggleRightSidebar('qna');
  };

  return (
    <IconButton
      iconSvg={<SvgQnA />}
      ariaLabel="Q&A"
      onClick={handleClick}
      className={rightSidebarType === 'qna' ? 'active' : ''}
      tooltip="Q&A"
    />
  );
};

const HomeBackBtn = () => {
  const location = useLocation();
  // URL에서 강의 ID 추출: /lectures/:id/room -> :id
  const lectureId = location.pathname.split('/')[2];

  return (
    <Link to={`/lectures/${lectureId}`}>
      <IconButton
        iconSvg={<SvgHomeBack />}
        ariaLabel="강의 상세 페이지로 돌아가기"
        tooltip="강의 상세보기"
      />
    </Link>
  );
};

const DiscordBtn = () => {
  return (
    <a
      href="https://discord.com/"
      target="_blank"
      rel="noopener noreferrer" // 보안을 위한 코드(새 창에서 원본 페이지에 접근 못하게 할 수 있는 속성 - 개인정보 보호, 피싱 방지)
    >
      <IconButton
        iconSvg={<SvgDiscord />}
        ariaLabel="디스코드 참여하기"
        variant="dark"
        tooltip="디스코드 참여하기"
      />
    </a>
  );
};

const ChapterBtn = () => {
  const { toggleLeftSidebar } = useLectureRoom();

  return (
    <StyledIconBtn onClick={toggleLeftSidebar} aria-label="커리큘럼 열기">
      <SvgChapter />
    </StyledIconBtn>
  );
};

// ==================================
// render components
// ==================================
const DefaultHeader = () => {
  return (
    <StyledHeaderInner>
      <HeaderLogo />
      <ActionLists />
    </StyledHeaderInner>
  );
};

const OnlyLogoHeader = () => {
  return (
    <StyledHeaderInnerLogo>
      <HeaderLogo />
    </StyledHeaderInnerLogo>
  );
};

const LectureRoomHeader = () => {
  const { isMobile } = useMediaQuery();
  const { isLeftSidebarOpen } = useLectureRoom();

  return (
    <StyledHeaderInnerLecture>
      {isMobile ? <ChapterBtn /> : !isLeftSidebarOpen ? <ChapterBtn /> : <HeaderLogo />}
      <StyledActionList>
        <DownloadBtn />
        <QnaBtn />
        <HomeBackBtn />
        <DiscordBtn />
        <UserProfileBtn />
      </StyledActionList>
    </StyledHeaderInnerLecture>
  );
};

const AdminHeader = () => {
  return (
    <StyledHeaderInnerAdmin>
      <HeaderLogo />
      <ActionLists />
    </StyledHeaderInnerAdmin>
  );
};

// 메인 헤더 컴포넌트 (페이지 타입에 따라 다른 헤더 렌더링)
export default function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === ROUTES.LOGIN;
  const isSignupPage = location.pathname === ROUTES.SIGNUP;
  const isLectureRoomPage = /^\/lectures\/\d+\/room/.test(location.pathname);

  const isErrorPage = location.pathname === ROUTES.NOT_FOUND;
  const isAdminPage = location.pathname.startsWith(ROUTES.ADMIN_DASHBOARD);

  const renderHeader = () => {
    if (isSignupPage || isLoginPage || isErrorPage) return <OnlyLogoHeader />;
    if (isLectureRoomPage) return <LectureRoomHeader />;
    if (isAdminPage) return <AdminHeader />;
    return <DefaultHeader />;
  };
  return <StyledHeader>{renderHeader()}</StyledHeader>;
}
