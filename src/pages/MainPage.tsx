import SvgArrowRight from "../assets/icons/icon-arrow-right.svg?react";
import SvgAll from "../assets/icons/icon-category-all.svg?react";
import SvgFE from "../assets/icons/icon-category-FE.svg?react";
import SvgBE from "../assets/icons/icon-category-BE.svg?react";
import SvgDA from "../assets/icons/icon-category-DA.svg?react";
import SvgAI from "../assets/icons/icon-category-AI.svg?react";
import SvgDesign from "../assets/icons/icon-category-design.svg?react";
import SvgMore from "../assets/icons/icon-category-more.svg?react";

import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../router/RouteConfig";
import { StyledCategoryBtn, StyledCategoryIcon, StyledSection, StyledSectionHead, StyledShowMore, StyledCategoryList, StyledHeroWrapper, StyledTitle } from "./MainPage.styled";
import { FilterCourseList } from "../components/CourseList";
import { ProfileCard } from "../components/ProfileCard";
import Banner from "../components/Banner";
import useMediaQuery from "../hooks/useMediaQuery";
import ScrollToTopButton from "../components/ScrollToTopButton";
import type { CourseType } from "../types/CourseType";
import { useState } from "react";


const CategoryBtn = ({ icon, title, onClick }: { 
    icon: React.ReactNode, 
    title: string,
    onClick?: () => void
}) => {
    return (
        <StyledCategoryBtn onClick={onClick}>
            <StyledCategoryIcon>
                {icon}
            </StyledCategoryIcon>
            <p>{title}</p>
        </StyledCategoryBtn>
    )
}

const SectionHead = ({ title }: { title:string }) => {
    return (
        <StyledSectionHead>
            <StyledTitle>{title}</StyledTitle>
            <Link to={ROUTES.LECTURE_LIST} aria-label={`${title} 강의 리스트 더보기`}>
                <StyledShowMore>
                    더 보기
                    <SvgArrowRight/>
                </StyledShowMore>
            </Link>
        </StyledSectionHead>
    )
}

const SectionByType = ({ courseType }:{ courseType: CourseType }) => {
    const [resultCount, setResultCount] = useState(0);
    const { isLaptop } = useMediaQuery();
    const cardCount = isLaptop ? 4 : 3;

    const titleByType : Record<CourseType, string> = {
        'boost_community' : "부스트 커뮤니티에서 소통하며 학습",
        'vod' : "VOD로 원하는 시간에 자유롭게 학습",
        'kdc' : "KDC를 통해 실무 역량으로 도약"
    }

    return (
        <StyledSection $isVisible={resultCount > 0 ? true : false}>
            <SectionHead title={titleByType[courseType]}/>
            <FilterCourseList 
                courseTypeOpt={courseType}
                cardCount={cardCount}
                onCountChange={setResultCount}
            />
        </StyledSection>
    )
}

export default function MainPage() {
    const { isTablet } = useMediaQuery();
    const navigate = useNavigate();

    const goCategoryList = (categry?: string) => {
        const queryString = categry ? `?category_types=${categry}` : "";
        navigate(ROUTES.LECTURE_LIST + queryString);
    }

    return (
        <>
            <StyledHeroWrapper>
                <Banner/>
                {!isTablet && <ProfileCard/>}
            </StyledHeroWrapper>

            <StyledCategoryList role="group" aria-label="카테고리별 강의 보러가기:">
                <CategoryBtn icon={<SvgAll/>} 
                    title="전체 보기" 
                    onClick={() => goCategoryList()}
                />
                <CategoryBtn icon={<SvgFE/>} 
                    title="프론트엔드"
                    onClick={() => goCategoryList("frontend")}
                />
                <CategoryBtn icon={<SvgBE/>} 
                    title="백엔드"
                    onClick={() => goCategoryList("backend")}
                />
                <CategoryBtn icon={<SvgDA/>}
                    title="데이터 분석"
                    onClick={() => goCategoryList("data_analysis")}
                />
                <CategoryBtn icon={<SvgAI/>}
                    title="AI"
                    onClick={() => goCategoryList("ai")}
                />
                <CategoryBtn icon={<SvgDesign/>}
                    title="디자인"
                    onClick={() => goCategoryList("design")}
                />
                <CategoryBtn icon={<SvgMore/>}
                    title="기타"
                    onClick={() => goCategoryList("other")}
                />
            </StyledCategoryList>

            <SectionByType courseType="boost_community"/>
            <SectionByType courseType="vod"/>
            <SectionByType courseType="kdc"/>

            <ScrollToTopButton/>
        </>
    );
}