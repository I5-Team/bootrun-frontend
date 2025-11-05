import styled, { css } from "styled-components";
import BannerImg1 from "../assets/images/banner-main-1.png";
import useMediaQuery from "../hooks/useMediaQuery";

// banner
const StyledBannerArticle = styled.article<{ $bgColor: string, $bgImageSrc?: string }>`
    flex: 1;
    height: 100%;
    width: 100%;
    min-width: 50%;
    border-radius: ${({ theme }) => theme.radius.md};
    padding-block: clamp(4.2rem, 4vw, 5.2rem);
    padding-inline: clamp(2.4rem, 4vw, 5.2rem);

    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: 1.2rem;

    background-color: ${(p) => p.$bgColor};
    background-image: ${(p) => `url(${p.$bgImageSrc})` };
    background-repeat: no-repeat;
    background-position: 100% 50%;
    background-size: 50%;


    @media ${({ theme }) => theme.devices.tablet} {
        background-position: 100% 90%;
    }

    @media ${({ theme }) => theme.devices.mobile} {
        justify-content: end;
        background-position: center;
        background-size: cover;
        ${({ theme, $bgImageSrc }) => css`
            background-image: 
                linear-gradient(to top, ${theme.colors.white}80, ${theme.colors.white}00),
                url(${$bgImageSrc});
        `}  
    }
`;

const StyledTag = styled.span`
    color: ${({ theme }) => theme.colors.primary300};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 700;
    text-align: center;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0.4rem;

    background-color: ${({ theme }) => theme.colors.white};


    @media ${({ theme }) => theme.devices.mobile} {
        background-position: center;
        background-size: cover;
    }
`;

const StyledTitle = styled.p`
    font-size: ${({ theme }) => theme.fontSize.xxl};
    font-style: normal;
    font-weight: 700;
    line-height: 1.2;
    white-space: pre-line;


    @media ${({ theme }) => theme.devices.mobile} {
        font-size: ${({ theme }) => `clamp(${theme.mobileFontSize.xl}, 5vw, ${theme.fontSize.lg})`};
    }
`;

const StyledDesc = styled.p`
    width: 74%;
    font-weight: 500;
    line-height: 1.4;
    word-break: keep-all;
    white-space: pre-line;
`;

const StyledStrong = styled.span`
    font-weight: 700;
`; 

export default function Banner() {
    const { isMobile } = useMediaQuery();

    const bannerDatas = [
        {
            color: "#B6F187",
            imgSrc: BannerImg1,
            tag: '수강생 모집중',
            title: "견고한 파이썬\n부스트 커뮤니티 1기",
            desc: "위니브와 함께하는 파이썬 완전 정복 온라인 강의가 출시되었습니다.\n",
            highlight: "얼리버드 20% 할인 혜택을 놓치지 마세요!",
        }
    ]
    return (
            <StyledBannerArticle 
                aria-label="메인 배너:" 
                $bgImageSrc={bannerDatas[0].imgSrc}
                $bgColor={bannerDatas[0].color}
                >
                <StyledTag>{bannerDatas[0].tag}</StyledTag>
                
                <StyledTitle>{bannerDatas[0].title}</StyledTitle>
                { !isMobile && 
                    <StyledDesc>
                        {bannerDatas[0].desc}
                        <StyledStrong>{bannerDatas[0].highlight}</StyledStrong>
                    </StyledDesc>
                }
            </StyledBannerArticle>
    );
}