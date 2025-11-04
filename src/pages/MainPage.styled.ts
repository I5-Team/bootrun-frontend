import styled from "styled-components";

// banner
export const StyledBannerWrapper = styled.div`
    height: 33rem;
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 2rem;
    margin-top: 4rem;
`;

export const StyledBannerArticle = styled.article`
    flex: 1;
    height: 100%;
    width: 100%;
    min-width: 50%;
    background-color: #B6F187;
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 5.2rem;
`;

// profileCard
export const StyledPofileCard = styled.article`
    width: 29rem;
    height: 100%;
    padding: 4rem 3.2rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.6rem;
    text-align: center;
`;

// categoryList
export const StyledCategoryList = styled.div`
    width: 80%;
    margin: clamp(3.2rem, 5vw, 6rem) auto;

    display: flex;
    justify-content: center;
    align-items: center;
    row-gap: clamp(2rem, 2.4vw, 3.2rem);
    column-gap: clamp(1.2rem, 2.4vw, 3.2rem);
    flex-wrap: wrap;

    @media ${({ theme }) => theme.devices.mobile} {
        font-size: ${({ theme }) => theme.fontSize.sm};
        width: 100%;
    }
`;

export const StyledCategoryIcon = styled.div`
    width: clamp(8rem, 8vw, 10rem);
    height: clamp(8rem, 8vw, 10rem);

    display: flex;
    justify-content: center;
    align-items: center;
    padding: clamp(0.72rem, 1rem, 0.9rem);

    border-radius: ${({ theme }) => theme.radius.lg};
    background-color: ${({ theme }) => theme.colors.gray100};
    border: 0.2rem solid transparent;

    svg {
        transform: scale(1.1);
    }

    &:hover,
    &:active {
        background-color: ${({ theme }) => theme.colors.primary100};
    }

    &:active {
        border: 0.2rem solid ${({ theme }) => theme.colors.primary300};
    }
`;

export const StyledCategoryBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.6rem;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;

    &:hover {
        color: ${({ theme }) => theme.colors.primary300};
        font-weight: 600;
    }

    @media ${({ theme }) => theme.devices.mobile} {
        font-size: ${({ theme }) => theme.fontSize.sm};
    }
`;

// section
export const StyledSection = styled.section`
    width: 100%;
    &:not(:last-child) {
        margin-bottom: 6rem;
    }
`;

export const StyledSectionHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 3.2rem;

    h2 {
        font-size: ${({ theme }) => theme.fontSize.xl};
        font-weight: 600;
        line-height: 1.2;
        word-break: keep-all;
    }
`;

export const StyledShowMore = styled.span`
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray300};
    white-space: nowrap;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0.4rem;

    svg {
        height: 1.2rem;
        width: auto;
    }
`;

// cardGrid
export const StyledCardGrid = styled.ul`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
    
    row-gap: clamp(2.4rem, 2vw, 4rem);
    column-gap: clamp(1.4rem, 2vw, 2.5rem);

    @media ${({ theme }) => theme.devices.mobile} {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;