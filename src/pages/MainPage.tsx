
import Button from "../components/Button";
import Profile from "../components/Profile";

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
import { StyledCategoryBtn, StyledCategoryIcon, StyledSection, StyledSectionHead, StyledShowMore, StyledBannerWrapper, StyledBannerArticle, StyledPofileCard, StyledCategoryList } from "./MainPage.styled";
import FilterCardList, { type CourseType } from "../components/FilterCardList";


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
            <Link to={ROUTES.LECTURE_LIST}>
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

    return (
        <>
            <StyledBannerWrapper>
                <StyledBannerArticle>
                    <h2 className="sr-only">메인 배너</h2>
                    <span>수강생 모집중</span>
                    <p>견고한 파이썬 <br/> 부스트 커뮤니티 1기</p>
                    <p>
                        위니브와 함께하는 파이썬 완전 정복 온라인 강의가 출시되었습니다.<br/>
                        <span>얼리버드 20% 할인 혜택을 놓치지 마세요!</span>
                    </p>
                </StyledBannerArticle>
                <StyledPofileCard>
                    <Profile size={10}/>
                    <p>호기심 많은 개발자님</p>
                    <p>부트런에 로그인 후<br/>커뮤니티와 함께 성장하세요.</p>
                    <Button fullWidth>로그인</Button>
                </StyledPofileCard>
            </StyledBannerWrapper>
            
            <StyledCategoryList>
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