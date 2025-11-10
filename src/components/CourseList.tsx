import styled from "styled-components";

import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import sampleCourses from "../assets/data/sampleCourses.json";
import sampleEnrollmentMy from "../assets/data/sampleEnrollmentMy.json";

import CourseCard from "../components/CourseCard/CourseCard";
import SvgAlert from "../assets/icons/icon-status-alert.svg?react";
import EmptyState from "../components/EmptyState/EmptyState";
import { Button } from "../components/Button";
import { ROUTES } from "../router/RouteConfig";

// type
export type CourseType = 'boost_community' | 'vod' | 'kdc';

export type CategoryType = 'frontend' | 'backend' | 'data_analysis' | 'ai' | 'design' | 'other';

export type PriceType = 'free' | 'paid' | 'national_support';
 
export type DifficultyType = "beginner" | "intermediate" | "advanced";

export type CourseItem = {
    id: number,
    category_type: CategoryType,
    course_type: CourseType,
    price_type: PriceType,
    difficulty: DifficultyType,
    title: string,
    description: string,
    thumbnail_url: string,
    instructor_name: string,
    instructor_bio: string,
    instructor_image: string,
    price: number,
    faq?: string,
    enrollment_count?: number,
    is_published: boolean,
    created_at: string,
    updated_at: string,
}

export type MyCourseItem = {
    id: number;
    user_id: number;
    course_id: number;
    course_type: CourseType,
    course_title: string;
    course_thumbnail: string;
    category_name: CategoryType;
    difficulty: DifficultyType;
    enrolled_at: string;
    expires_at: string;
    is_active: boolean;
    progress_rate: number;
    days_until_expiry: number;
    total_lectures: number;
    completed_lectures: number;
}

export type CourseFilter = {
    courseTypeOpt?: CourseType,
    categoryOpt?: CategoryType,
    difficultyOpt?: DifficultyType,
    priceTypeOpt?: PriceType,
    sortOpt?: 'DATE_ASC' | 'DATE_DESC',
    cardCount?: number,
    onCountChange?: (count: number) => void,
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
    
    row-gap: 4rem;
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

// components
const NoResultPage = () => {
    const navigate = useNavigate();

    const handleGoToLectures = () => {
        navigate(ROUTES.LECTURE_LIST);
    };

    return (
        <EmptyState
            icon={<SvgAlert />}
            title="검색 결과가 없어요"
            description="다른 키워드로 다시 검색해보세요."
            buttons={
                <Button
                    variant="primary"
                    size="md"
                    onClick={handleGoToLectures}
                    ariaLabel="강의 보러가기"
                >
                    강의 보러가기
                </Button>
            }
        />
    );
}

type BaseCourseListProps<T> = {
    data: T[];
    filterFn: (item: T) => boolean;
    sortFn?: (a: T, b: T) => number;
    sliceFn?: (list: T[]) => T[];
    courseCard: (item: T) => React.ReactNode;
    onCountChange? : (count: number) => void;
}

const BaseCourseList = <T,>({
    data,
    filterFn,
    sortFn,
    sliceFn,
    courseCard,
    onCountChange,
}: BaseCourseListProps<T>) => {
    const courseList = data;
    const filteredList = courseList.filter(filterFn);
    const sortedList = sortFn ? filteredList.sort(sortFn) : filteredList;
    const slicedList = sliceFn ? sliceFn(sortedList) : sortedList;
    const refinedList = slicedList;
    
    useEffect(() => {
        onCountChange?.(refinedList.length);
    }, [refinedList, onCountChange])

    return (
        <div className="card-list">
            {refinedList.length === 0 
            ? 
            <NoResultPage/>
            : 
            <StyledCardGrid>
                {refinedList.map(courseCard)}
            </StyledCardGrid>
            }
        </div>
    )
}

export const FilterCourseList = ({ 
    courseTypeOpt, 
    categoryOpt, 
    difficultyOpt, 
    priceTypeOpt, 
    sortOpt, 
    cardCount, 
    onCountChange,
}: CourseFilter ) => {
    const [searchParams] = useSearchParams();

    // query params
    const courseTypeParam = searchParams.getAll('courseType') as CourseType[];
    const categoryParam = searchParams.getAll('category') as CategoryType[];
    const difficultyParam = searchParams.getAll('difficulty') as DifficultyType[];
    const priceTypeParam = searchParams.getAll('priceType') as PriceType[];
    const keywordParam = searchParams.get('keyword') || '';

    const courseTypeFilter 
        = courseTypeOpt || (courseTypeParam.length > 0 ? courseTypeParam : null);
    const categoryFilter 
        = categoryOpt || (categoryParam.length > 0 ? categoryParam : null);
    const difficultyFilter 
        = difficultyOpt || (difficultyParam.length > 0 ? difficultyParam : null);
    const priceTypeFilter 
        = priceTypeOpt || (priceTypeParam.length > 0 ? priceTypeParam : null);
    const keywordFilter 
        = keywordParam.toLowerCase().split(/\s+/).filter(Boolean);

    // filterFn
    const filterFn = ((course: CourseItem) => { 
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

    // sortFn
    const sortFn = (a: CourseItem, b: CourseItem) => {
        if (sortOpt === "DATE_ASC") {
            return a.created_at.localeCompare(b.created_at);
        } else {
            return b.created_at.localeCompare(a.created_at);
        }
    };

    // sliceFn
    const sliceFn = (list: CourseItem[]) => {
        return cardCount ? list.slice(0, cardCount) : list;
    }

    const courseCard = (course: CourseItem) => (
        <CourseCard
            key={course.id}
            variant="info"
            lectureId={course.id}
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
        />
    )

    return (
        <BaseCourseList
            data={sampleCourses as CourseItem[]}
            filterFn={filterFn}
            sortFn={sortFn}
            sliceFn={sliceFn}
            courseCard={courseCard}
            onCountChange={onCountChange}
        />
    )
}

export const FilterMyCourseList = ({ 
    sortOpt,
    cardCount,
    onCountChange,
}: CourseFilter ) => {
    const [searchParams] = useSearchParams();
    
    // query params
    const courseTypeParam = searchParams.get('courseType');
    const isActiveParam = searchParams.get('is_active');
    const progressParam = searchParams.get('progress');

    const courseTypeFilter = courseTypeParam !== "all" ? courseTypeParam : null;
    const isActiveFilter = isActiveParam !== "all" ? isActiveParam : null;
    const progressFilter = progressParam !== "all" ? progressParam : null;

    // filterFn
    const filterFn = (course: MyCourseItem) => { 
        const matchCourseType = !courseTypeFilter || courseTypeFilter === course.course_type;
        const matchIsActive = !isActiveFilter ||  isActiveFilter === (course.days_until_expiry ? "true" : "false");
        const matchProgress = !progressFilter! 
        || progressFilter === (course.progress_rate === 100 ? "completed" : course.progress_rate > 0 ? "in_progress" : "not_started");

        return matchCourseType && matchIsActive && matchProgress;
    }

    // sortFn
    const sortFn = (a: MyCourseItem, b: MyCourseItem) => {
        if (sortOpt === "DATE_ASC") {
            return a.enrolled_at.localeCompare(b.enrolled_at);
        } else {
            return b.enrolled_at.localeCompare(a.enrolled_at);
        }
    }

    // sliceFn
    const sliceFn = (list: MyCourseItem[]) => {
        return cardCount ? list.slice(0, cardCount) : list;
    }

    const myCourseCard = (course: MyCourseItem) => (
        <CourseCard 
            key={course.course_id}
            variant="study"
            thumbnail={course.course_thumbnail}
            title={course.course_title}
            tags={[
                {'label': courseTypeLabel[course.course_type], 'variant': 'dark'}, 
                {'label': categoryLabel[course.category_name] || "기타"}, 
                {'label': difficultyLabel[course.difficulty]},
            ]}

            value={course.completed_lectures || 0} 
            max={course.total_lectures || 0} 
            lectureId={course.course_id}
            
            isActive={course.days_until_expiry !== 0 ? true: false}
            isCompleted={course.progress_rate === 100 ? true : false}
        />
     );

    return (
        <BaseCourseList
            data={sampleEnrollmentMy.items as MyCourseItem[]}
            filterFn={filterFn}
            sortFn={sortFn}
            sliceFn={sliceFn}
            courseCard={myCourseCard}
            onCountChange={onCountChange}
        />
    )
}