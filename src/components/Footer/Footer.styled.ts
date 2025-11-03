import styled from "styled-components";

export const StyledFooter = styled.footer`
    width: 100%;
    padding-block: 6rem;
    padding-inline: 2.4rem;

    background-color: ${({ theme }) => theme.colors.gray100};
    border-top: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    margin-top: clamp(8rem, 10vw, 14rem);

    @media ${({ theme }) => theme.devices.mobile } {
        padding-block: 4rem;
    }
`;

export const StyledInnerFooter = styled.div`
    margin: 0 auto;
    max-width: ${({ theme }) => theme.breakpoints.desktop};

    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.8rem 2rem;
    flex-wrap: wrap;

    @media ${({ theme }) => theme.devices.mobile } {
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 2.4rem 0;
    }
`;

export const StyledColumnGroup = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 1.8rem 0;
`;

export const StyledCopyright = styled.div`
    flex: 1 0 100%;
    width: 100%;

    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.6rem;

    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray300};

    svg {
        width: clamp(10rem, 10vw, 13rem);
    }

    svg path {
        fill: currentColor;
    }

    @media ${({ theme }) => theme.devices.mobile } {
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1.4rem;

        font-size: ${({ theme }) => theme.fontSize.caption};
    }
`;

export const StyledAddress = styled.address`
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    font-size: ${({ theme }) => theme.fontSize.caption};
    color: ${({ theme }) => theme.colors.gray400};

    p {
        display: inline-block;
        margin-bottom: 0.4rem;

        &:not(:last-child):after {
            content: "|";
            padding: 0.4rem;
        }
    }

    @media ${({ theme }) => theme.devices.mobile } {
        justify-content: center;
    }
`;

export const StyledLinksList = styled.ul`
    display: inline-flex;
    gap: 0.8rem;
`;

export const StyledLinkItem = styled.li`
    a {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 3.6rem;
        height: 3.6rem;
        background-color: ${({ theme }) => theme.colors.gray300};
        border-radius: 50%;
    }

    svg {
        width: 48%;
        height: 50%;
        path {
            fill: ${({ theme }) => theme.colors.gray200};
        }
    }

    &:hover {
        cursor: pointer;
        svg path {
            fill: ${({ theme }) => theme.colors.white};
        }
    }   
`;

export const StyledAddressOpen = styled.div<{ $isOpen: boolean }>`
    color: ${({ theme }) => theme.colors.gray400};
    font-size: ${({ theme }) => theme.fontSize.caption};
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.68rem;

    svg {
        width: 1rem;
        height: auto;
        transform: rotate(${({ $isOpen }) => $isOpen ? "180deg" : "0deg"});
        path {
            fill: currentColor;
        }
    }

    &:hover {
        cursor: pointer;
    }
`;