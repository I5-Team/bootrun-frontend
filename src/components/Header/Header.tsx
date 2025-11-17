import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/RouteConfig.ts';
import useMediaQuery from '../../hooks/useMediaQuery.ts';

// svg
import logo from '../../assets/logos/logo-typo.svg';
import SvgHamberger from '../../assets/icons/icon-hambuger.svg?react';
import SvgDownload from '../../assets/icons/icon-download-folder.svg?react';
import SvgMemo from '../../assets/icons/icon-memo.svg?react';
import SvgHomeBack from '../../assets/icons/icon-home-back.svg?react';
import SvgDiscord from '../../assets/icons/icon-sns-discord.svg?react';
import SvgChapter from '../../assets/icons/icon-chapter.svg?react';
import SvgSearch from '../../assets/icons/icon-search.svg?react';

// components
import {
  StyledHeader,
  StyledHeaderInner,
  StyledLogo,
  StyledActionList,
  StyledNavList,
  StyledHeaderInnerLecture,
  StyledHeaderInnerLogo,
  StyledIconBtn,
} from './Header.styled.ts';

import Button from '../Button.tsx';
import ButtonIcon from '../ButtonIcon.tsx';
import Profile from '../Profile.tsx';
import SearchForm from '../SearchForm.tsx';
import HeaderSidebar from './HeaderSidebar.tsx';
import { ProfileDropdown, StyledDropdownWrapper } from '../ProfileDropdown.tsx';
import { useLectureRoom } from '../../contexts/LectureRoomContext.tsx';

const HeaderLogo = () => {
  return (
    <Link to={ROUTES.HOME} aria-label="부트런 홈으로 이동">
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
  return (
    <ButtonIcon ariaLabel="검색창 열기" active={isActive} onClick={onClick}>
      <SvgSearch />
    </ButtonIcon>
  );
};

const SidebarOpenBtn = ({
  isActive,
  onClick,
}: {
  isActive?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <ButtonIcon ariaLabel="메뉴 열기" active={isActive} onClick={onClick}>
      <SvgHamberger />
    </ButtonIcon>
  );
};

const UserActions = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const token = localStorage.getItem('accessToken');
  const isLoggedIn = Boolean(token);

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
        <StyledDropdownWrapper ref={dropdownRef}>
          <button onClick={handleOpenDropdown}>
            <Profile size={4.2} isActive={isDropdownOpen} />
          </button>
          <ProfileDropdown isOpen={isDropdownOpen} />
        </StyledDropdownWrapper>
      ) : (
        <Link to={ROUTES.LOGIN}>
          <Button>로그인</Button>
        </Link>
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
          <UserActions />
        </>
      )}
    </StyledActionList>
  );
};

// lectureRoom
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

  console.log(
    '[DownloadBtn] 자료 URL:',
    currentLectureMaterialUrl,
    '| 본상태:',
    materialViewed,
    '| 뱃지 표시:',
    showAlert
  );

  return (
    <ButtonIcon
      ariaLabel="자료 다운로드"
      variant="light"
      hasAlert={showAlert}
      onClick={handleClick}
      className={rightSidebarType === 'materials' ? 'active' : ''}
      tooltip="자료 다운로드"
    >
      <SvgDownload />
    </ButtonIcon>
  );
};

const QnaBtn = () => {
  const { toggleRightSidebar, rightSidebarType } = useLectureRoom();

  const handleClick = () => {
    toggleRightSidebar('qna');
  };

  return (
    <ButtonIcon
      ariaLabel="Q&A"
      variant="light"
      onClick={handleClick}
      className={rightSidebarType === 'qna' ? 'active' : ''}
      tooltip="Q&A"
    >
      <SvgMemo />
    </ButtonIcon>
  );
};

const HomeBackBtn = () => {
  const location = useLocation();
  // URL에서 강의 ID 추출: /lectures/:id/room -> :id
  const lectureId = location.pathname.split('/')[2];

  return (
    <Link to={`/lectures/${lectureId}`}>
      <ButtonIcon ariaLabel="강의 상세 페이지로 돌아가기" variant="light" tooltip="강의 상세보기">
        <SvgHomeBack />
      </ButtonIcon>
    </Link>
  );
};

const DiscordBtn = () => {
  return (
    <ButtonIcon ariaLabel="디스코드 참여하기" variant="discord">
      <SvgDiscord />
    </ButtonIcon>
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

// render components
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
        <Link to={ROUTES.PROFILE}>
          <Profile />
        </Link>
      </StyledActionList>
    </StyledHeaderInnerLecture>
  );
};

export default function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === ROUTES.LOGIN;
  const isSignupPage = location.pathname === ROUTES.SIGNUP;
  const isLectureRoomPage = /^\/lectures\/\d+\/room/.test(location.pathname);
  const isErrorPage = location.pathname === ROUTES.NOT_FOUND;

  const renderHeader = () => {
    if (isSignupPage || isLoginPage || isErrorPage) return <OnlyLogoHeader />;
    if (isLectureRoomPage) return <LectureRoomHeader />;
    return <DefaultHeader />;
  };
  return <StyledHeader>{renderHeader()}</StyledHeader>;
}
