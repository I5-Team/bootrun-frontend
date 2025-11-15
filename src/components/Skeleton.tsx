import styled, { css, keyframes } from "styled-components";

import { StyledCardArticle, StyledThumbnailWrapper } from "./CourseCard/CourseCard.styled";

export const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const skeletonShimmer = css`
    background: ${({ theme }) => (`linear-gradient(90deg, 
    ${theme.colors.gray100} 0%,
    ${theme.colors.gray200}80 50%,
    ${theme.colors.gray100} 100%
    )`
    )};

    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite linear;
    border-radius: ${({ theme }) => theme.radius.sm};
    margin: 0;
    padding: 0;
`;

export const SkeletonImage = styled.div`
    ${skeletonShimmer}
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export const SkeletonCardArticle = styled(StyledCardArticle)`
    width: 100%;
`;

export const SkeletonThumbnail = styled(StyledThumbnailWrapper)`
    ${skeletonShimmer}
    display: block;
    border: none;
`;

export const SkeletonTag = styled.div`
    ${skeletonShimmer}
    width: 6rem;
    height: 3.2rem;
`;


export const SkeletonRowWapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.2rem;
`;

export const SkeletonProfile = styled.div`
    ${skeletonShimmer}
    width: 4.6rem;
    height: 4.6rem;
    border-radius: 50%;

`;
export const SkeletonTitle = styled.div`
    ${skeletonShimmer} 
    height: 3.6rem;
`;
export const SkeletonText = styled.div`
    ${skeletonShimmer} 
    height: 2.4rem;
`;
export const SkeletonTextShort = styled(SkeletonText)`
    ${skeletonShimmer} 
    width: 10rem;
`;

export const SkeletonBox = styled.div<{ $height?: number }>`
    ${skeletonShimmer} 
    height: ${({ $height }) => $height ? `${$height}rem` : '8.4rem'};
`;

export const SkeletonButton = styled.div`
    ${skeletonShimmer}
    width: 11.2rem;
    height: 4.2rem;
`;

export function SkeletonCard() {
    return (
        <SkeletonCardArticle>
            <SkeletonThumbnail/>

            <SkeletonRowWapper>
                <SkeletonTag/>
                <SkeletonTag/>
                <SkeletonTag/>
            </SkeletonRowWapper>
            

            <SkeletonTitle/>

            <SkeletonRowWapper>
                <SkeletonProfile/>
                <SkeletonTextShort/>
            </SkeletonRowWapper>

            <SkeletonBox/>

            <SkeletonTextShort/>
        </SkeletonCardArticle>
    );
}

export function SkeletonMyCourseCard() {
    return (
        <SkeletonCardArticle>
            <SkeletonThumbnail/>

            <SkeletonRowWapper>
                <SkeletonTag/>
                <SkeletonTag/>
                <SkeletonTag/>
            </SkeletonRowWapper>
            

            <SkeletonText/>

            <SkeletonBox $height={4.4} />

            <SkeletonRowWapper>
                <SkeletonButton/>
                <SkeletonButton/>
            </SkeletonRowWapper>
        </SkeletonCardArticle>
    );
}