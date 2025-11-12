import styled from "styled-components";

import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import CourseCard from "../components/CourseCard/CourseCard";
import SvgAlert from "../assets/icons/icon-status-alert.svg?react";
import EmptyState from "../components/EmptyState/EmptyState";
import { Button } from "../components/Button";
import { ROUTES } from "../router/RouteConfig";
import ScrollToTopButton from "./ScrollToTopButton";
import { fetchCourses, fetchMyEnrollments } from "../api/coursesApi";
import type { CategoryType, CourseItem, CoursesApiParams, CourseType, DifficultyType, MyEnrollmentItem, PriceType } from "../types/CourseType";
import { LoadingSpinner } from "./HelperComponents";

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
    filterFn?: (item: T) => boolean;
    sortFn?: (a: T, b: T) => number;
    courseCard: (item: T) => React.ReactNode;
    onCountChange? : (count: number) => void;
    isLoading?: boolean;
}

const BaseCourseList = <T,>({
    data,
    filterFn,
    sortFn,
    courseCard,
    onCountChange,
    isLoading,
}: BaseCourseListProps<T>) => {
    const courseList = data;
    const filteredList = filterFn ? courseList.filter(filterFn) : courseList;
    const sortedList = sortFn ? filteredList.sort(sortFn) : filteredList;
    const refinedList = sortedList;
    
    useEffect(() => {
        onCountChange?.(refinedList.length);
    }, [refinedList, onCountChange])

    return (
        <div className="card-list">
            {(!isLoading && refinedList.length === 0)
            ? 
            <NoResultPage/>
            : 
            <>
                <StyledCardGrid>
                    {refinedList.map(courseCard)}
                </StyledCardGrid>
                <ScrollToTopButton/>
            </>
            }
        </div>
    )
}

export const FilterCourseList = ({ 
    courseTypeOpt,
    sortOpt, 
    cardCount, 
    onCountChange,
}: CourseFilter ) => {
    const [searchParams] = useSearchParams();

    const [courses, setCourses] = useState<CourseItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                setIsLoading(true);

                // searchParams에서 params 가져오기
                const searchParamsObj: Record<string, string | string[]> = {};
                searchParams.forEach((value, key) => {
                    if (searchParamsObj[key]) {
                        searchParamsObj[key] = Array.isArray(searchParamsObj[key])
                        ? [...searchParamsObj[key], value]
                        : [searchParamsObj[key], value];
                    } else {
                        searchParamsObj[key] = value;
                    }
                });
                const params: CoursesApiParams = (cardCount !== undefined) 
                    ? {...searchParamsObj, page_size: cardCount} 
                    : searchParamsObj;
                const coursesData = await fetchCourses(params);

                setCourses(coursesData);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        loadCourses();
    }, [searchParams]);

    // filterfn
    const filterFn = ((course: CourseItem) => {
        const matchCourseType = !courseTypeOpt || course.course_type === courseTypeOpt;
        return matchCourseType;
    })

    // sortFn
    const sortFn = (a: CourseItem, b: CourseItem) => {
        if (sortOpt === "DATE_ASC") {
            return a.created_at.localeCompare(b.created_at);
        } else {
            return b.created_at.localeCompare(a.created_at);
        }
    };

    const courseCardItem = (course: CourseItem) => (
        <li key={course.id}>
            {isLoading 
            ? <LoadingSpinner/>
            : <CourseCard
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
            }
        </li>
    )

    return (
        <BaseCourseList
            data={courses}
            filterFn={filterFn}
            sortFn={sortFn}
            courseCard={courseCardItem}
            onCountChange={onCountChange}
            isLoading={isLoading}
        />
    )
}

export const FilterMyCourseList = ({ 
    sortOpt,
    onCountChange,
}: CourseFilter ) => {
    const [searchParams] = useSearchParams();
    const [myEnrollments, setMyEnrollments] = useState<MyEnrollmentItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {   
        const loadMyEnrollments = async () => {
            try {
                setIsLoading(true);
                const data = await fetchMyEnrollments({});
                setMyEnrollments(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        loadMyEnrollments();
    }, [searchParams]);
    
    
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

    const myCourseCardItem = (course: MyCourseItem) => (
        <li key={course.course_id}>{
            isLoading 
            ? <LoadingSpinner/>
            : <CourseCard
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
        }
        </li>
     );

    return (
        <BaseCourseList
            data={myEnrollments}
            filterFn={filterFn}
            sortFn={sortFn}
            courseCard={myCourseCardItem}
            onCountChange={onCountChange}
        />
    )
}