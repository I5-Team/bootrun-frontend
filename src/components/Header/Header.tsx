import {
  StyledHeader,
  StyledHeaderInner,
  StyledLogo,
  StyledActionList,
  StyledNavList,
  StyledSearchForm,
  StyledSearchInput,
  StyledSearchBtn,
  StyledHeaderInnerLecture,
  StyledHeaderInnerLogo
} from "./Header.styled.ts";

import Button from "../Button.tsx";
import Profile from "../Profile.tsx";

import logo from "../../assets/logos/logo-typo.svg";
import SvgSearch from "../../assets/icons/icon-search.svg?react";
import SvgHamberger from "../../assets/icons/icon-hambuger.svg?react";
import SvgDownload from "../../assets/icons/icon-download-folder.svg?react";
import SvgMemo from "../../assets/icons/icon-memo.svg?react";
import SvgHomeBack from "../../assets/icons/icon-home-back.svg?react";
import SvgDiscord from "../../assets/icons/icon-sns-discord.svg?react";

import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../router/RouteConfig.ts";
import useMediaQuery from "../../hooks/useMediaQuery.ts";
import ButtonIcon from "../ButtonIcon.tsx";

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

const SearchForm = () => {
    return (
        <StyledSearchForm>
            <label htmlFor="search" className="sr-only">검색어 입력</label>
            <StyledSearchInput id="search" type="search" placeholder="검색어를 입력하세요."/>
            <StyledSearchBtn type="submit" aria-label="검색 실행">
                <SvgSearch/>
            </StyledSearchBtn>
        </StyledSearchForm>
    )
}

const SearchOpenBtn = () => {
    return (
        <ButtonIcon ariaLabel="검색창 열기">
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
    return (
        <StyledHeaderInnerLecture>
            <HeaderLogo/>
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
    const isSignupPage = location.pathname === ROUTES.SIGNUP;
    const isLectureRoomPage = location.pathname === ROUTES.LECTURE_ROOM;
    const isErrorPage = location.pathname === "*";
    
    const renderHeader = () => {
    if (isSignupPage) return <OnlyLogoHeader />;
    if (isErrorPage) return <DefaultHeader/>;
    if (isLectureRoomPage) return <LectureRoomHeader />;
    return <DefaultHeader />;
};
    return (
        <>
            <StyledHeader>
                {renderHeader()}
            </StyledHeader>
        </>
    );
}