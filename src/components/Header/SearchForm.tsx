import styled from "styled-components";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/RouteConfig.ts";

import { StyledIconBtn } from "./Header.styled.ts";
import SvgSearch from "../../assets/icons/icon-search.svg?react";
import ButtonIcon from "../ButtonIcon.tsx";

const StyledSearchForm = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;

    background-color: ${({ theme }) => theme.colors.gray100};
    width: clamp(26rem, 30vw, 32rem);
    height: 4.2rem;
    padding: 0 1.6rem;
    border-radius: ${({ theme }) => theme.radius.md};
    
    transition: outline 0.1s;

    &:focus-within {
        outline: 0.2rem solid ${({ theme }) => theme.colors.primary300};
    }
`;

const StyledSearchInput = styled.input.attrs({ type: 'search' })`
    flex: 1;
    min-width: 0;
    height: 100%;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &::placeholder {
        color: ${({ theme }) => theme.colors.gray300};
        font-size: ${({ theme }) => theme.fontSize.md};
        font-weight: 500;
    }

    &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance:none;

    height: 2rem;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.gray300};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath stroke='white' stroke-width='2' stroke-linecap='round' d='M6 6l12 12M18 6L6 18'/%3E%3C/svg%3E");
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
    }
`;


export const SearchForm = () => {
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const queryString = `?keyword=${searchValue}`;
        navigate(ROUTES.LECTURE_LIST_SEARCH + queryString);

        inputRef.current?.blur();
    }

    useEffect(() => {
        setSearchValue("");
    }, [location.pathname]);

    return (
        <StyledSearchForm onSubmit={handleSubmit}>
            <label htmlFor="search" className="sr-only">검색어 입력</label>
            <StyledSearchInput
                ref={inputRef}
                id="search" 
                type="search" 
                placeholder="검색어를 입력하세요."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                />
            <StyledIconBtn type="submit" aria-label="검색 실행">
                <SvgSearch/>
            </StyledIconBtn>
        </StyledSearchForm>
    )
}

export const SearchOpenBtn = () => {
    return (
        <ButtonIcon ariaLabel="검색창 열기">
            <SvgSearch/>
        </ButtonIcon>
    )
}

export default SearchForm;