import styled from "styled-components";
import useMediaQuery from "../hooks/useMediaQuery";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import BannerImg1 from "../assets/images/banner-main-1-desktop.webp";
import BannerImg1Mobile from "../assets/images/banner-main-1-mobile.webp";
import BannerImg2 from "../assets/images/banner-main-2-desktop.webp";
import BannerImg2Mobile from "../assets/images/banner-main-2-mobile.webp";
import BannerImg3 from "../assets/images/banner-main-3-desktop.webp";
import BannerImg3Mobile from "../assets/images/banner-main-3-mobile.webp";
import { Link } from "react-router-dom";

// type
interface BannerItem {
    id: number;
    imgSrc: string;      // Desktop WebP
    mobileImgSrc: string; // Mobile WebP
    title: string;
    tag?: string;
    desc?: string;
    highlight?: string;
    linkTo?: string;
}

// style
// 메인 배너 슬라이더 스타일 (Swiper 라이브러리 커스텀)
const StyledBannerSwiper = styled(Swiper)`
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
    &:focus-within {
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus}
    }
`;

// 개별 슬라이드 스타일 (이미지 래퍼 및 텍스트 레이아웃)
const StyledSwiperSlide = styled(SwiperSlide)`
    width: 100%;
    min-width: 100%;
    height: 100%;
    position: relative; // 자식 요소(이미지)의 절대 위치 기준

    @media ${({ theme }) => theme.devices.mobile} {
        justify-content: end;
    }
`;

// 이미지 컨테이너 (CLS 방지 및 위치 잡기)
const ImageWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    
    // 로딩 전 영역 확보를 위한 aspect-ratio 설정 (데스크탑 기준 예시, 필요 시 조정)
    // 모바일/데스크탑 비율이 다르다면 media query로 분기 필요
    // aspect-ratio: 16 / 9; 

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, ${({ theme }) => theme.colors.primary100}20, ${({ theme }) => theme.colors.primary100}00);
        z-index: ${({ theme }) => theme.zIndex.base};
    }
`;

const StyledPicture = styled.picture`
    width: 100%;
    height: 100%;
    display: block;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 100% 100%;
    }
`;

const StyledLink = styled(Link)`
    width: 100%;
    height: 100%;
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.above}; // 이미지 위에 텍스트 표시

    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: 1.2rem;

    padding-block: clamp(4.2rem, 4vw, 5.2rem);
    padding-inline: clamp(2.4rem, 4vw, 5.2rem);
`;

const StyledTag = styled.span`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.focus};

    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 700;
    text-align: center;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0.4rem;

    @media ${({ theme }) => theme.devices.mobile} {
        background-position: center;
        background-size: cover;
    }
`;

const StyledTitle = styled.p`
    font-size: ${({ theme }) => theme.fontSize.headingXl};
    font-style: normal;
    font-weight: 700;
    line-height: 1.2;
    white-space: pre-line;

    @media ${({ theme }) => theme.devices.mobile} {
        font-size: ${({ theme }) => `clamp(${theme.fontSize.lg}, 5vw, ${theme.fontSize.headingMd})`};
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
// 메인 배너 컴포넌트
export default function Banner() {
    const { isMobile } = useMediaQuery();

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
            imgSrc: BannerImg2,
            mobileImgSrc: BannerImg2Mobile,
            tag: '부트런 사이트 오픈!',
            title: `부트런 사이트\n오픈했습니다!`,
            desc: "김규호, 김민주, 김채현, 신가람, 장민경\n다들 수고하셨습니다. 🔥",
        },
        {
            id: 2,
            imgSrc: BannerImg1,
            mobileImgSrc: BannerImg1Mobile,
            tag: '부트캠프 수료',
            title: "부트캠프 수료를\n진심으로 축하드립니다",
            desc: '수료한지 오늘로부터 ',
            highlight: calculateDdayFrom('2025-11-19'),
        },
        {
            id: 3,
            imgSrc: BannerImg3,
            mobileImgSrc: BannerImg3Mobile,
            tag: '생일을 축하합니다',
            title: "11월 9일은\n채현님의 생일",
            desc: "지났지만 축하드립니다 🎉",
        }
    ]

    return (
        <StyledBannerSwiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            loop={true}
            wrapperTag="ul"
            aria-label="메인 배너"
        >
            {bannerDatas.map((bannerItem, index) => (
                <StyledSwiperSlide
                    key={bannerItem.id}
                    tag="li"
                >
                    <ImageWrapper>
                        <StyledPicture>
                            <source media="(max-width: 768px)" srcSet={bannerItem.mobileImgSrc} type="image/webp" />
                            <img
                                src={bannerItem.imgSrc}
                                alt=""
                                fetchPriority={index === 0 ? "high" : "auto"}
                                loading={index === 0 ? "eager" : "lazy"}
                            />
                        </StyledPicture>
                    </ImageWrapper>
                    <StyledLink to={bannerItem.linkTo ? bannerItem.linkTo : '#'}>
                        {bannerItem.tag && <StyledTag>{bannerItem.tag}</StyledTag>}

                        <StyledTitle>{bannerItem.title}</StyledTitle>
                        {!isMobile &&
                            <StyledDesc>
                                {bannerItem.desc}
                                {bannerItem.highlight &&
                                    <StyledStrong>{bannerItem.highlight}</StyledStrong>
                                }
                            </StyledDesc>
                        }
                    </StyledLink>
                </StyledSwiperSlide>
            ))}
        </StyledBannerSwiper>
    );
}