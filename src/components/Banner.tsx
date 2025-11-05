import styled, { css } from "styled-components";
import useMediaQuery from "../hooks/useMediaQuery";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import BannerImg1 from "../assets/images/banner-main-1.png";
import BannerImg2 from "../assets/images/banner-main-2.png";
import BannerImg3 from "../assets/images/banner-main-3.png";
import { ROUTES } from "../router/RouteConfig";
import { useNavigate } from "react-router-dom";

// type
interface BannerItem {
    id: number;
    imgSrc: string;
    title:string;
    tag?: string;
    desc?: string;
    highlight?: string;
    linkTo?: string;
}

// style
const StyledBannerSwiper = styled.article`
    flex: 1;
    width: 100%;
    height: 100%;
    min-width: 50%;
    border-radius: ${({ theme }) => theme.radius.md};
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;

    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-pagination {
        bottom: 1.6rem;
    }

    .swiper-pagination-bullet {
        width: 1rem;
        height: 1rem;
        background: ${({ theme }) => theme.colors.white};
        opacity: 0.8;
        margin: 0 0.6rem !important;
    }

    .swiper-pagination-bullet-active {
        background: ${({ theme }) => theme.colors.primary300};
        opacity: 1;
    }
`;

const StyledSwiperSlide = styled(SwiperSlide)<{ $bgImageSrc?: string }>`
    width: 100%;
    min-width: 100%;
    height: 100%;
    padding-block: clamp(4.2rem, 4vw, 5.2rem);
    padding-inline: clamp(2.4rem, 4vw, 5.2rem);


    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: 1.2rem;

    background-color: ${({ theme }) => theme.colors.primary200};
    background-repeat: no-repeat;
    background-position: 100% 100%;
    background-size: cover;
    ${({ theme, $bgImageSrc }) => css`
        background-image: 
            linear-gradient(to top, ${theme.colors.primary200}60, ${theme.colors.primary200}00),
            url(${$bgImageSrc});
    `}

    @media ${({ theme }) => theme.devices.mobile} {
        justify-content: end;
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

// components
export default function Banner() {
    const { isMobile } = useMediaQuery();
    const navigate = useNavigate();

    const goBannerLink = (url: string | null | undefined) => {
        const path = url ?? ROUTES.HOME;
        navigate(path);
    }

    const calculateDdayFrom = (targetDateString: string) => {
        const targetDate = new Date(targetDateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        targetDate.setHours(0, 0, 0, 0);
        
        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 0) return `D-${diffDays}`;
        if (diffDays === 0) return 'D-Day';
        return `D+${Math.abs(diffDays)}`;
    };

    const bannerDatas: BannerItem[] = [
        {
            id: 1,
            imgSrc: BannerImg1,
            tag: '수강생 모집중',
            title: "견고한 파이썬\n부스트 커뮤니티 1기",
            desc: "위니브와 함께하는 파이썬 완전 정복 온라인 강의가 출시되었습니다.\n",
            highlight: "얼리버드 20% 할인 혜택을 놓치지 마세요!",
            linkTo: `${ROUTES.LECTURE_LIST}`,
        }, 
        {
            id: 2,
            imgSrc: BannerImg2,
            tag: '부트런 사이트 오픈예정!',
            title: `부트런 사이트 오픈까지\n${calculateDdayFrom('2025-11-19')}`,
            desc: "김규호, 김민주, 김채현, 신가람, 장민경\n아자아자 파이팅 🔥",
        }, 
        {
            id: 3,
            imgSrc: BannerImg3,
            tag: '수상을 축하합니다',
            title: "김채현님 수상을\n진심으로 축하드립니다",
            desc: "무슨상인진 모르지만 축하드립니다~\n",
            highlight: "짱짱",
        }
    ]

    return (
        <StyledBannerSwiper>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
            >
                {bannerDatas.map((bannerItem) => (
                    <StyledSwiperSlide onClick={() => goBannerLink(bannerItem.linkTo)}
                        key={bannerItem.id}
                        aria-label="메인 배너:" 
                        $bgImageSrc={bannerItem.imgSrc}
                        >
                        {bannerItem.tag && 
                            <StyledTag>{bannerItem.tag}</StyledTag>
                        }
                        
                        <StyledTitle>{bannerItem.title}</StyledTitle>
                        { !isMobile && 
                            <StyledDesc>
                                {bannerItem.desc}
                                {bannerItem.highlight &&
                                    <StyledStrong>{bannerItem.highlight}</StyledStrong>
                                }
                            </StyledDesc>
                        }
                    </StyledSwiperSlide>
                ))}
            </Swiper>
        </StyledBannerSwiper>
    );
}