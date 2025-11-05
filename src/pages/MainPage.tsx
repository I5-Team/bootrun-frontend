import SvgArrowRight from "../assets/icons/icon-arrow-right.svg?react";
import SvgAll from "../assets/icons/icon-category-all.svg?react";
import SvgFE from "../assets/icons/icon-category-FE.svg?react";
import SvgBE from "../assets/icons/icon-category-BE.svg?react";
import SvgDA from "../assets/icons/icon-category-DA.svg?react";
import SvgAI from "../assets/icons/icon-category-AI.svg?react";
import SvgDesign from "../assets/icons/icon-category-Design.svg?react";
import SvgMore from "../assets/icons/icon-category-more.svg?react";
import { Link } from "react-router-dom";
import { ROUTES } from "../router/RouteConfig";
import { StyledCategoryBtn, StyledCategoryIcon, StyledSection, StyledSectionHead, StyledShowMore, StyledCategoryList, StyledHeroWrapper } from "./MainPage.styled";
import FilterCardList, { type CourseType } from "../components/FilterCardList";
import { ProfileCard } from "../components/ProfileCard";
import Banner from "../components/Banner";
import useMediaQuery from "../hooks/useMediaQuery";


const CategoryBtn = ({ icon, title }: { icon: React.ReactNode, title: string }) => {
    return (
        <StyledCategoryBtn>
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
            <h2>{title}</h2>
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
    const titleByType : Record<CourseType, string> = {
        '부스트 커뮤니티' : "부스트 커뮤니티에서 소통하며 학습",
        'VOD' : "VOD로 원하는 시간에 자유롭게 학습",
        'KDC' : "KDC를 통해 실무 역량으로 도약"
    }

    return (
        <StyledSection>
            <SectionHead title={titleByType[courseType]}/>
            <FilterCardList courseType={courseType}/>
        </StyledSection>
    )
}

export default function MainPage() {
    const { isTablet } = useMediaQuery();

    return (
        <>
            <StyledHeroWrapper>
                <Banner/>
                {!isTablet && <ProfileCard/>}
            </StyledHeroWrapper>

            <StyledCategoryList role="group" aria-label="카테고리별 강의 보러가기:">
                <CategoryBtn icon={<SvgAll/>} title="전체 보기"/>
                <CategoryBtn icon={<SvgFE/>} title="프론트엔드" />
                <CategoryBtn icon={<SvgBE/>} title="백엔드" />
                <CategoryBtn icon={<SvgDA/>} title="데이터 분석" />
                <CategoryBtn icon={<SvgAI/>} title="AI" />
                <CategoryBtn icon={<SvgDesign/>} title="디자인" />
                <CategoryBtn icon={<SvgMore/>} title="기타" />
            </StyledCategoryList>

            <SectionByType courseType="부스트 커뮤니티"/>
            <SectionByType courseType="VOD"/>
            <SectionByType courseType="KDC"/>
        </>
    );
}