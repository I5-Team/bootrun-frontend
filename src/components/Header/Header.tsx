import {
  StyledHeader,
  StyledHeaderInner,
  StyledLogo,
  StyledActionList,
  StyledNavList,
  StyledHeaderInnerLecture,
  StyledHeaderInnerLogo,
  StyledIconBtn,
} from "./Header.styled.ts";

import Button from "../Button.tsx";
import Profile from "../Profile.tsx";

import logo from "../../assets/logos/logo-typo.svg";
import SvgHamberger from "../../assets/icons/icon-hambuger.svg?react";
import SvgDownload from "../../assets/icons/icon-download-folder.svg?react";
import SvgMemo from "../../assets/icons/icon-memo.svg?react";
import SvgHomeBack from "../../assets/icons/icon-home-back.svg?react";
import SvgDiscord from "../../assets/icons/icon-sns-discord.svg?react";
import SvgChapter from "../../assets/icons/icon-chapter.svg?react";
import SvgSearch from "../../assets/icons/icon-search.svg?react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/RouteConfig.ts";
import useMediaQuery from "../../hooks/useMediaQuery.ts";
import ButtonIcon from "../ButtonIcon.tsx";
import SearchForm from "../SearchForm.tsx";

const HeaderLogo = () => {
    return(
        <Link to={ROUTES.HOME} aria-label="부트런 홈으로 이동">
            <h1 className="sr-only">bootRun</h1>
            <StyledLogo src={logo} alt="" />
        </Link>
    )
}

const NavList = () => {
    return (
        <StyledNavList>
            <li><Link to="*">부트런 소개</Link></li> 
            <li><Link to="*">수강생 이야기</Link></li>
        </StyledNavList>
    )
}

const SearchOpenBtn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname.includes(ROUTES.LECTURE_LIST_SEARCH);

    const handleOpenSearch = () => {
        navigate(ROUTES.LECTURE_LIST_SEARCH);
    }

    return (
        <ButtonIcon 
            ariaLabel="검색창 열기"
            active={isActive}
            onClick={handleOpenSearch}
        >
            <SvgSearch/>
        </ButtonIcon>
    )
}


const MenuOpenBtn = () => {
    return (
        <ButtonIcon ariaLabel="메뉴 열기">
            <SvgHamberger/>
        </ButtonIcon>
    )
}

const UserActions = () => {
    let isLoggedIn = false;

    return (
        <>
            {isLoggedIn ?
                <Link to={ROUTES.PROFILE}>
                    <Profile size={4.2}/>
                </Link>
                : 
                <Link to={ROUTES.LOGIN}>
                    <Button>로그인</Button>
                </Link>
            } 
        </>    
    )
}

const ActionLists = () => {
    const { isTablet } = useMediaQuery();

    return (
        <StyledActionList>
            {isTablet ?
                <>
                    <SearchOpenBtn/>
                    <MenuOpenBtn/>
                </>
            : 
                <>
                    <NavList/>
                    <SearchForm/>
                   <UserActions/>
                </>
            }

        </StyledActionList>
    )
}

// lectureRoom
const DownloadBtn = () => {
    const hasAlert = true;

    return (
        <ButtonIcon ariaLabel="다운로드" variant="light" hasAlert={hasAlert}>
            <SvgDownload/>
        </ButtonIcon>
    )
}

const MemoBtn = () => {
    return (
        <ButtonIcon ariaLabel="메모" variant="light">
            <SvgMemo/>
        </ButtonIcon>
    )
}

const HomeBackBtn = () => {
    return (
        <ButtonIcon ariaLabel="홈으로 돌아가기" variant="light">
            <SvgHomeBack/>
        </ButtonIcon>
    )
}

const DiscordBtn = () => {
    return (
        <ButtonIcon ariaLabel="디스코드 참여하기" variant="discord">
            <SvgDiscord/>
        </ButtonIcon>
    )
}

const ChapterBtn = () => {
    return (
        <StyledIconBtn>
            <SvgChapter/>
        </StyledIconBtn>
    )
}

// render components
const DefaultHeader = () => {

    return (
        <StyledHeaderInner>
            <HeaderLogo/>
            <ActionLists/>
        </StyledHeaderInner>
    )
}

const OnlyLogoHeader = () => {
    return (
        <StyledHeaderInnerLogo>
            <HeaderLogo/>
        </StyledHeaderInnerLogo>    
    )
}

const LectureRoomHeader = () => {
    const { isMobile } = useMediaQuery();
    
    return (
        <StyledHeaderInnerLecture>
            {isMobile ? <ChapterBtn/> : <HeaderLogo/>}
            <StyledActionList>
                <DownloadBtn/>
                <MemoBtn/>
                <HomeBackBtn/>
                <DiscordBtn/>                        
                <Link to={ROUTES.PROFILE}><Profile/></Link>
            </StyledActionList>
        </StyledHeaderInnerLecture>
        
    )
}

export default function Header() {
    const location = useLocation();
    const isLoginPage = location.pathname === ROUTES.LOGIN;
    const isSignupPage = location.pathname === ROUTES.SIGNUP;
    const isLectureRoomPage = location.pathname === ROUTES.LECTURE_ROOM;
    const isErrorPage = location.pathname === ROUTES.NOT_FOUND;
    
    const renderHeader = () => {
        if (isSignupPage || isLoginPage || isErrorPage) return <OnlyLogoHeader />;
        if (isLectureRoomPage) return <LectureRoomHeader />;
        return <DefaultHeader />;
    };
    return (
        <StyledHeader>
            {renderHeader()}
        </StyledHeader>
    );
}