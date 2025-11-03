import {
  StyledHeader,
  StyledHeaderInner,
  StyledLogo,
  StyledActionList,
  StyledNavList,
  StyledSearchForm,
  StyledSearchInput,
  StyledSearchBtn,
  StyledActionBtn
} from "./Header.style.ts";

import Button from "../Button.tsx";
import Profile from "../Profile.tsx";

import logo from "../../assets/logos/logo-typo.svg";
import SvgSearch from "../../assets/icons/icon-search.svg?react";
import SvgHamberger from "../../assets/icons/icon-hambuger.svg?react";

import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../router/RouteConfig.ts";
import useMediaQuery from "../../hooks/useMediaQuery.ts";

const HeaderLogo = () => {
    return(
        <Link to={ROUTES.HOME}>
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
        <StyledActionBtn aria-label="검색창 열기">
            <SvgSearch/>
        </StyledActionBtn>
    )
}

const MenuOpenBtn = () => {
    return (
        <StyledActionBtn aria-label="메뉴 열기">
            <SvgHamberger/>
        </StyledActionBtn>
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

export default function Header() {
    const location = useLocation();
    const isSignupPage = location.pathname === ROUTES.SIGNUP;
    const isLectureRoomPage = location.pathname === ROUTES.LECTURE_ROOM;

    return (
        <>
            <StyledHeader>
                <StyledHeaderInner $isSignup={isSignupPage}>
                    <HeaderLogo/>
                    {!isSignupPage &&
                        <ActionLists/>
                    } 
                </StyledHeaderInner>
            </StyledHeader>
        </>
    );
}