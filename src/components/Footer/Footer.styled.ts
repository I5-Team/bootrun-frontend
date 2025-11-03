import styled from "styled-components";

export const StyledFooter = styled.footer`
    width: 100%;
    padding: 6rem 2.4rem;
    background-color: ${({ theme }) => theme.colors.gray100};
    border-top: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    margin-top: clamp(8rem, 10vw, 14rem);
`;

export const StyledInnerFooter = styled.div`
    margin: 0 auto;
    max-width: ${({ theme }) => theme.breakpoints.desktop};

    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.8rem 2rem;
    flex-wrap: wrap;
`;


export const StyledColumnGroup = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 1.8rem 0;
`;

export const StyledCopyright = styled.div`
    flex: 0 0 50%;
    display: inline-flex;
    justify-content: start;
    align-items: center;
    gap: 1.6rem;

    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray300};


    svg path {
        fill: currentColor;
    }
`;

export const StyledAddress = styled.address`
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
`;

export const StyledLinksList = styled.ul`
    display: inline-flex;
    gap: 0.8rem;

    li {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 3.6rem;
        height: 3.6rem;
        background-color: ${({ theme }) => theme.colors.gray300};
        border-radius: 50%;

        svg {
            width: 50%;
            height: 50%;
            path {
                fill: ${({ theme }) => theme.colors.gray200};
            }
        }

        &:hover {
            svg path {
                fill: ${({ theme }) => theme.colors.white};
            }
        }   
    }
`;