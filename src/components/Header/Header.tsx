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

import { useTheme } from "styled-components";
import { useEffect, useState } from "react";

const HeaderLogo = () => {
    // 라우터 작업시 Link로 수정
    return(
        <div>
            <h1 className="sr-only">bootRun</h1>
            <StyledLogo src={logo} alt="" />
        </div>
    )
}

const NavList = () => {
    // 라우터 작업시 Link 추가
    return (
        <StyledNavList>
            <li>부트런 소개</li> 
            <li>수강생 이야기</li>
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
                <Profile size={4.2}/>
                : 
                <Button>로그인</Button>
            } 
        </>    
    )
}

const ActionLists = () => {
    const theme = useTheme();
    const [isUnderDesktop, setIsUnderDesktop] = useState(false);
    
    useEffect(() => {
        const mediaQuery = window.matchMedia(theme.devices.tablet);
        setIsUnderDesktop(mediaQuery.matches);

        const handleMediaChange = (e: MediaQueryListEvent) => setIsUnderDesktop(e.matches);

        mediaQuery.addEventListener("change", handleMediaChange);

        return () => {
            mediaQuery.removeEventListener("change", handleMediaChange);
        }
    }, [theme.devices.tablet]);

    return (
        <StyledActionList>
            {isUnderDesktop ?
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
    // 회원가입 페이지에서는 로고만 보이게 처리
    const isSignupPage = false;
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