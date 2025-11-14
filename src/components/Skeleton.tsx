import styled, { css, keyframes } from "styled-components";

import { StyledCardArticle, StyledThumbnailWrapper } from "./CourseCard/CourseCard.styled";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const skeletonShimmer = css`
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

const SkeletonCardArticle = styled(StyledCardArticle)`
    width: 100%;
`;

const SkeletonThumbnail = styled(StyledThumbnailWrapper)`
    ${skeletonShimmer}
    display: block;
    border: none;
`;

const SkeletonTag = styled.div`
    ${skeletonShimmer}
    width: 6rem;
    height: 3.2rem;
`;


const SkeletonRowWapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.2rem;
`;

const SkeletonProfile = styled.div`
    ${skeletonShimmer}
    width: 4.6rem;
    height: 4.6rem;
    border-radius: 50%;

`;
const SkeletonTitle = styled.div`
    ${skeletonShimmer} 
    height: 3.6rem;
`;
const SkeletonText = styled.div`
    ${skeletonShimmer} 
    height: 2.4rem;
`;
const SkeletonTextShort = styled(SkeletonText)`
    ${skeletonShimmer} 
    width: 10rem;
`;

const SkeletonBox = styled.div<{ $height?: number }>`
    ${skeletonShimmer} 
    height: ${({ $height }) => $height ? `${$height}rem` : '8.4rem'};
`;

const SkeletonButton = styled.div`
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