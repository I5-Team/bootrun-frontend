import sampleCourses from "../assets/data/sampleCourses.json"
import sampleCategories from "../assets/data/sampleCategories.json";
import CourseCard from "../components/CourseCard/CourseCard";
import styled from "styled-components";
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

type Difficulties = "beginner" | "intermediate" | "advanced";

const difficultyName : Record<Difficulties, string> = {
    beginner : '초급',
    intermediate : '중급',
    advanced : '실무', 
}

type CourseData = {
    "id": number,
    "category_id": number,
    "title": string,
    "description": string,
    "thumbnail_url": string,
    "instructor_name": string,
    "instructor_bio": string,
    "instructor_image": string,
    "price": number,
    "difficulty": Difficulties,
    "faq"?: string,
    "enrollment_count"?: number,
    "is_published": boolean,
    "created_at": string,
    "updated_at": string,
    "course_type": string, // 임의로 추가
}

const StyledCardGrid = styled.ul`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    
    row-gap: clamp(2.4rem, 2vw, 4rem);
    column-gap: clamp(1.4rem, 2vw, 2.5rem);

    @media ${({ theme }) => theme.devices.tablet} {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media ${({ theme }) => theme.devices.mobile} {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;

const StyledBannerWrapper = styled.div`
    height: 33rem;
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 2rem;
    margin-top: 4rem;
`;

const StyledBannerArticle = styled.article`
    flex: 1;
    height: 100%;
    width: 100%;
    min-width: 50%;
    background-color: #B6F187;
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 5.2rem;
`;

const StyledPofileCard = styled.article`
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

const StyledCategoryList = styled.div`
    width: 80%;
    margin: clamp(3.2rem, 5vw, 6rem) auto;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem clamp(1.2rem, 2vw, 3.2rem);
    flex-wrap: wrap;

    @media ${({ theme }) => theme.devices.mobile} {
        font-size: ${({ theme }) => theme.fontSize.sm};
        width: 100%;
    }
`;

const StyledCategoryIcon = styled.div`
    width: clamp(8rem, 8vw, 10rem);
    height: clamp(8rem, 8vw, 10rem);

    display: flex;
    justify-content: center;
    align-items: center;
    padding: clamp(0.72rem, 1rem, 0.9rem);

    border-radius: ${({ theme }) => theme.radius.lg};
    background-color: ${({ theme }) => theme.colors.gray100};

    svg {
        width: 100%;
        height: auto;
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary100};
        border: ${({ theme }) => theme.colors.primary300};
    }
`;

const StyledCategoryBtn = styled.button`
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

const StyledSection = styled.section`
    width: 100%;
    &:not(:last-child) {
        margin-bottom: 6rem;
    }
`;

const StyledSectionHead = styled.div`
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

const StyledShowMore = styled.span`
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

const SectionByType = ({ title, courseType }:{ title: string, courseType: string }) => {
    const courseList = sampleCourses as CourseData[];
    const categories = sampleCategories;

    return (
        <StyledSection>
            <StyledSectionHead>
                <h2>{title}</h2>
                {/* 쿼리문 추가 */}
                <Link to={ROUTES.LECTURE_LIST}>
                    <StyledShowMore>
                        더 보기
                        <SvgArrowRight/>
                    </StyledShowMore>
                </Link>
            </StyledSectionHead>
            <StyledCardGrid>
                { courseList
                .filter((course) => course.course_type === courseType)
                .slice(0, 3)
                .map((course, id) => (
                    <CourseCard
                        key={id}
                        thumbnail={course.thumbnail_url}
                        tags={[
                            {'label': course.course_type, 'variant': 'dark'}, 
                            {'label': categories.find(c => c.id === course.category_id)?.display_name || "기타"}, 
                            {'label': difficultyName[course.difficulty as Difficulties]},
                        ]}
                        title={course.title}
                        teacherName={course.instructor_name}
                        teacherRole={course.instructor_bio}
                        teacherImage={course.instructor_image}
                        description={course.description}
                        price={course.price}
                        onLike={() => console.log(course.title)}
                    />
                    ))
                }
            </StyledCardGrid>
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

            <SectionByType courseType="부스트 커뮤니티" title="부스트 커뮤니티에서 소통하며 학습" />
            <SectionByType courseType="VOD" title="VOD로 원하는 시간에 자유롭게 학습" />
            <SectionByType courseType="KDC" title="KDC를 통해 실무 역량으로 도약" />
        </>
    );
}