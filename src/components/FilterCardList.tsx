import styled from "styled-components";
import sampleCourses from "../assets/data/sampleCourses.json";
import CourseCard from "../components/CourseCard/CourseCard";
import { ROUTES } from "../router/RouteConfig";
import { Link, useSearchParams } from "react-router-dom";
import SvgAlert from "../assets/icons/icon-status-alert.svg?react";

export type CourseType = 'boost_community' | 'vod' | 'kdc';

export type CategoryType = 'frontend' | 'backend' | 'data_analysis' | 'ai' | 'design' | 'other';

export type PriceType = 'free' | 'paid' | 'national_support';
 
export type DifficultyType = "beginner" | "intermediate" | "advanced";

export type CourseData = {
    "id": number,
    "category_type": CategoryType,
    "course_type": CourseType,
    "price_type": PriceType,
    "difficulty": DifficultyType,
    "title": string,
    "description": string,
    "thumbnail_url": string,
    "instructor_name": string,
    "instructor_bio": string,
    "instructor_image": string,
    "price": number,
    "faq"?: string,
    "enrollment_count"?: number,
    "is_published": boolean,
    "created_at": string,
    "updated_at": string,
}

export type CourseFilter = {
    courseTypeOpt?: CourseType,
    categoryOpt?: CategoryType,
    difficultyOpt?: DifficultyType,
    priceTypeOpt?: PriceType,
    sortOpt?: 'DATE_ASC' | 'DATE_DESC',
    cardCount?: number,
}

const courseTypeLabel : Record<CourseType, string> = {
    boost_community : '부스트 커뮤니티',
    vod : 'VOD',
    kdc : 'KDC', 
}

const categoryLabel : Record<CategoryType, string> = {
    frontend : '프론트엔드',
    backend : '백엔드',
    data_analysis : '데이터 분석', 
    ai: 'AI',
    design: '디자인', 
    other: '기타',
}

const difficultyLabel : Record<DifficultyType, string> = {
    beginner : '초급',
    intermediate : '중급',
    advanced : '실무', 
}

// styled
const StyledCardGrid = styled.ul`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    
    row-gap: clamp(2.4rem, 2vw, 4rem);
    column-gap: clamp(1.4rem, 2vw, 2.5rem);

    @media ${({ theme }) => theme.devices.laptop} {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media ${({ theme }) => theme.devices.tablet} {
        grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
    }

    @media ${({ theme }) => theme.devices.mobile} {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;

const StyledNoResult = styled.div`
    width: 100%;
    height: 36rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    font-weight: 600;

    svg {
        width: 8.8rem;
        height: 8.8rem;
    }
`;

const NoResultPage = () => { 
    return (
        <StyledNoResult>
            <SvgAlert/>
            <p>찾는 조건의 강의가 없습니다.</p>
        </StyledNoResult>
    )
}

export const FilterCardList = ({ courseTypeOpt, categoryOpt, difficultyOpt, priceTypeOpt, sortOpt, cardCount }: CourseFilter) => {
    const [searchParams] = useSearchParams();

    // query params
    const courseTypeParam = searchParams.getAll('courseType') as CourseType[];
    const categoryParam = searchParams.getAll('category') as CategoryType[];
    const difficultyParam = searchParams.getAll('difficulty') as DifficultyType[];
    const priceTypeParam = searchParams.getAll('priceType') as PriceType[];
    const keywordParam = searchParams.get('keyword') || '';

    const courseTypeFilter 
        = courseTypeOpt || courseTypeParam.length > 0 ? courseTypeParam : null;
    const categoryFilter 
        = categoryOpt || categoryParam.length > 0 ? categoryParam : null;
    const difficultyFilter 
        = difficultyOpt || difficultyParam.length > 0 ? difficultyParam : null;
    const priceTypeFilter 
        = priceTypeOpt || priceTypeParam.length > 0 ? priceTypeParam : null;
    const keywordFilter 
        = keywordParam.toLowerCase().split(/\s+/).filter(Boolean);

    // refine
    const courseList = sampleCourses as CourseData[];
    const filteredList = [...courseList].filter(course => { 
        const matchCourseType = !courseTypeFilter || courseTypeFilter.includes(course.course_type);
        const matchCategory = !categoryFilter || categoryFilter.includes(course.category_type);
        const matchDifficulty = !difficultyFilter || difficultyFilter.includes(course.difficulty);
        const matchPrice = !priceTypeFilter || priceTypeFilter.includes(course.price_type);
        const MatchKeyword = 
            keywordFilter.length === 0 || 
            keywordFilter.every(keyword => 
                [course.title, course.instructor_name].some(content =>
                    content.toLowerCase().includes(keyword)
                )
            );

        return matchDifficulty && matchCourseType && matchCategory && matchPrice && MatchKeyword;
    })

    const sortedCourseList = [...filteredList].sort((a, b) => {
        if (sortOpt === "DATE_ASC") {
            return a.created_at.localeCompare(b.created_at);
        } else {
            return b.created_at.localeCompare(a.created_at);
        }
    })

    const refinedCourseList = cardCount
        ? sortedCourseList.slice(0, cardCount)
        : sortedCourseList;


    return (
        <>
            {refinedCourseList.length === 0 
            ? 
            <NoResultPage/>
            : 
            <StyledCardGrid>
                { refinedCourseList
                .map((course) => (
                    <Link
                        key={course.id}
                        to={`${ROUTES.LECTURE_LIST}/${course.id}`} 
                        aria-label={`${course.title} 강의 상세 보기`}
                        >
                        <CourseCard
                            thumbnail={course.thumbnail_url}
                            tags={[
                                {'label': courseTypeLabel[course.course_type], 'variant': 'dark'}, 
                                {'label': categoryLabel[course.category_type] || "기타"}, 
                                {'label': difficultyLabel[course.difficulty]},
                            ]}
                            title={course.title}
                            teacherName={course.instructor_name}
                            teacherRole={course.instructor_bio}
                            teacherImage={course.instructor_image}
                            description={course.description}
                            price={course.price}
                            onLike={() => console.log(course.title)}
                        />
                    </Link>
                ))
                }
            </StyledCardGrid>
            }
            

        </>
    )
}

export default FilterCardList;