import styled from "styled-components";

export const StyledHeader = styled.header`
    width: 100%;
    height: 7rem;
    padding: 0 1.6rem;
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};
`;

export const StyledHeaderInner = styled.div<{ $isSignup?: boolean }>`
    max-width: ${({ theme }) => theme.breakpoints.desktop};
    height: 100%;
    margin: 0 auto;

    display: flex;
    justify-content: ${({ $isSignup }) => $isSignup ? "center" : "space-between"};
    align-items: center;
`;

export const StyledLogo = styled.img`
    width: 12.4rem;
`;

export const StyledActions = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 0 2rem;
`;

export const StyledNavList = styled.ul`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 4rem;
    font-size: ${({ theme }) => theme.fontSize.md};
    margin-right: 2rem;
`;

export const StyledSearchForm = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;

    background-color: ${({ theme }) => theme.colors.gray100};
    width: 32rem;
    height: 4.2rem;
    padding: 0 1.6rem;
    border-radius: ${({ theme }) => theme.radius.md};
    
    transition: outline 0.1s;

    &:focus-within {
        outline: 0.2rem solid ${({ theme }) => theme.colors.primary300};
    }
`;

export const StyledSearchInput = styled.input.attrs({ type: 'search' })`
    flex: 1;
    height: 100%;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;

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

export const StyledSearchBtn = styled.button`
    width: 2.4rem;
    aspect-ratio: 1 / 1;
    padding: 0.15rem;

    svg {
        width: 100%;
        height: 100%;
        vertical-align: bottom;

        path {
            fill: ${({ theme }) => theme.colors.gray400};
            transition: fill 0.1s;
        }
    }

    &:hover {
        cursor: pointer;
        svg path {
            fill: ${({ theme }) => theme.colors.primary300}
        }
    }
`;