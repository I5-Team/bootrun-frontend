import {
  StyledHeader,
  StyledHeaderInner,
  StyledLogo,
  StyledActions,
  StyledNavList,
  StyledSearchForm,
  StyledSearchInput,
  StyledSearchBtn
} from "./Header.style.ts";
import Button from "../Button.tsx";

import logo from "../../assets/logos/logo-typo.svg";
import SvgSearch from "../../assets/icons/icon-search.svg?react";

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
            <label htmlFor="search" className="sr-only">검색</label>
            <StyledSearchInput id="search" type="search" placeholder="검색어를 입력하세요."/>
            <StyledSearchBtn type="submit">
                <SvgSearch/>
            </StyledSearchBtn>
        </StyledSearchForm>
    )
}

const ActionLists = () => {
    return (
        <StyledActions>
            <NavList/>
            <SearchForm/>
            <Button>로그인</Button>
        </StyledActions>
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