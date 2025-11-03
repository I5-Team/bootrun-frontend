import styled from "styled-components";

export const StyledHeader = styled.header`
    flex-shrink: 0;
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

export const StyledHeaderInner = styled.div<{ $isSignup?: boolean }>`
    max-width: ${({ theme }) => theme.breakpoints.desktop};
    width: calc(100% - 3.2rem);
    margin: 0 auto;
    height: 100%;

    display: flex;
    justify-content: ${({ $isSignup }) => $isSignup ? "center" : "space-between"};
    align-items: center;
`;

export const StyledLogo = styled.img`
    width: 12.4rem;
    vertical-align: bottom;

    @media ${({ theme }) => theme.devices.tablet} {
        width: 10rem;
    }
`;

export const StyledActionList = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 0 clamp(1.2rem, 1vw, 2rem);
`;

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

const StyledBtnWithSVG = styled.button`
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

export const StyledSearchBtn = styled(StyledBtnWithSVG)`
    flex-shrink: 0;
    width: 2.4rem;
    padding: 0.15rem;
`;

export const StyledActionBtn = styled(StyledBtnWithSVG)`
    width: auto;
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 0.7rem;

    svg {
        width: 2.4rem;
        height: 2.4rem;
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary100};
    }
`;