import styled from "styled-components";

// header
export const StyledHeader = styled.header`
    flex-shrink: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 7rem;
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    background-color: ${({ theme }) => theme.colors.white};

    position: sticky;
    top: 0;
    z-index: 10000;

    @media ${({ theme }) => theme.devices.tablet} {
        height: 5.6rem;
    }
`;

// headerInner
export const StyledHeaderInner = styled.div<{ $isSignup?: boolean }>`
    max-width: ${({ theme }) => theme.breakpoints.desktop};
    width: calc(100% - 3.2rem);
    margin: 0 auto;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledHeaderInnerLogo = styled(StyledHeaderInner)`
    justify-content: center;
`;

export const StyledHeaderInnerLecture = styled(StyledHeaderInner)`
    max-width: calc(100% - 4rem);
    justify-content: space-between;
`;

// logo
export const StyledLogo = styled.img`
    width: 12.4rem;
    vertical-align: bottom;

    @media ${({ theme }) => theme.devices.tablet} {
        width: 10rem;
    }
`;

// list
export const StyledNavList = styled.ul`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: clamp(2rem, 3vw, 4rem);
    font-size: ${({ theme }) => theme.fontSize.md};
    margin-right: clamp(0rem, 1vw, 2rem);

    li {
        white-space: nowrap;
    }
`;

export const StyledActionList = styled.div`
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 0 clamp(1.2rem, 1vw, 2rem);
`;


// search - form / input / button
export const StyledSearchForm = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;

    background-color: ${({ theme }) => theme.colors.gray100};
    width: clamp(20rem, 25vw, 32rem);
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

export const StyledIconBtn = styled.button`
    flex-shrink: 0;
    width: 2.4rem;
    padding: 0.15rem;
    aspect-ratio: 1 / 1;

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