import styled from "styled-components";

import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import CourseCard from "../components/CourseCard/CourseCard";
import SvgAlert from "../assets/icons/icon-status-alert.svg?react";
import EmptyState from "../components/EmptyState/EmptyState";
import ScrollToTopButton from "./ScrollToTopButton";
import { categoryLabel, courseTypeLabel, difficultyLabel, type CategoryType, type CourseItem, type CoursesApiParams, type CourseType, type DifficultyType, type MyEnrollmentItem, type MyEnrollmentsApiParams, type PriceType } from "../types/CourseType";
import { SkeletonCard, SkeletonMyCourseCard } from "./Skeleton";
import { useCoursesQuery } from "../queries/useCourseQueries";
import { useMyEnrollmentQuery } from "../queries/useEnrollmentQueries";

export type CourseFilter = {
    courseTypeOpt?: CourseType,
    categoryOpt?: CategoryType,
    difficultyOpt?: DifficultyType,
    priceTypeOpt?: PriceType,
    sortOpt?: 'DATE_ASC' | 'DATE_DESC',
    cardCount?: number,
    onCountChange?: (count: number) => void,
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
    return (
        <EmptyState
            icon={<SvgAlert />}
            subTitle="찾는 조건의 강의가 없습니다."
        />
    );
}

type BaseCourseListProps<T> = {
    variant: 'info' | 'study';
    data: T[];
    filterFn?: (item: T) => boolean;
    sortFn?: (a: T, b: T) => number;
    sliceFn?: (list: T[]) => T[];
    courseCard: (item: T) => React.ReactNode;
    onCountChange? : (count: number) => void;
    isLoading?: boolean;
}

const BaseCourseList = <T,>({
    variant = 'info',
    data,
    filterFn,
    sortFn,
    sliceFn,
    courseCard,
    onCountChange,
    isLoading,
}: BaseCourseListProps<T>) => {
    const courseList = data;
    const filteredList = filterFn ? courseList.filter(filterFn) : courseList;
    const sortedList = sortFn ? [...filteredList].sort(sortFn) : filteredList;
    const slicedList = sliceFn ? sliceFn(sortedList) : sortedList;
    const refinedList = slicedList;
    
    useEffect(() => {
        onCountChange?.(refinedList.length);
    }, [refinedList, onCountChange])

    return (
        <div className="card-list">
            {isLoading || !refinedList ? (
                <StyledCardGrid>
                    {Array(9).fill(0).map((_, index) => 
                        variant === "info"
                            ? <SkeletonCard key={index}/>
                            : <SkeletonMyCourseCard key={index}/>
                    )}
                </StyledCardGrid>
            ) : (
                refinedList.length === 0  
                ? <NoResultPage/>
                : <>
                    <StyledCardGrid>
                        {refinedList.map(courseCard)}
                    </StyledCardGrid>
                    <ScrollToTopButton/>
                 </>
                
            )}            
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

    const filterParams: CoursesApiParams = {
        course_types: courseTypeOpt 
            ? [courseTypeOpt] 
            : searchParams.getAll('course_types').length > 0 ? searchParams.getAll('course_types') as CourseType[] : [],
        category_types: searchParams.getAll('category_types') as CategoryType[],
        difficulties: searchParams.getAll('difficulties') as DifficultyType[],
        price_types: searchParams.getAll('price_types') as PriceType[],
        keyword: searchParams.get('keyword') || undefined,
        page_size: cardCount && cardCount > 20 ? cardCount : undefined,
    };

    const { data: courses = [], isLoading } = useCoursesQuery(filterParams);

    // sliceFn
    const sliceFn = (list: CourseItem[]) => {
        return cardCount ? list.slice(0, cardCount) : list;
    }

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
             <CourseCard
                variant="info"
                courseId={course.id}
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
        </li>
    )

    return (
        <BaseCourseList
            variant="info"
            data={courses}
            sortFn={sortFn}
            sliceFn={sliceFn}
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

    const filterParams: Partial<MyEnrollmentsApiParams> = {};
    searchParams.forEach((value, key) => {
    if (value) {
        filterParams[key as keyof MyEnrollmentsApiParams] = value as any;
    }
    });
    const { data: myEnrollments = [], isLoading } = useMyEnrollmentQuery(filterParams);

    // sortFn
    const sortFn = (a: MyEnrollmentItem, b: MyEnrollmentItem) => {
        if (sortOpt === "DATE_ASC") {
            return a.enrolled_at.localeCompare(b.enrolled_at);
        } else {
            return b.enrolled_at.localeCompare(a.enrolled_at);
        }
    }

    const myCourseCardItem = (course: MyEnrollmentItem) => (
        <li key={course.id}>
            <CourseCard
                variant="study"
                thumbnail={course.thumbnail_url}
                title={course.title}
                tags={[
                    {'label': courseTypeLabel[course.course_type], 'variant': 'dark'}, 
                    {'label': categoryLabel[course.category_type]}, 
                    {'label': difficultyLabel[course.difficulty]},
                ]}
                value={course.completed_lectures || 0} 
                max={course.total_lectures || 0} 
                courseId={course.id}
                
                isActive={course.enrollment_status === 'available' ? true: false}
                isCompleted={course.learning_status === 'completed' ? true : false}
            />
        </li>
     );

    return (
        <BaseCourseList
            variant="study"
            data={myEnrollments}
            sortFn={sortFn}
            courseCard={myCourseCardItem}
            onCountChange={onCountChange}
            isLoading={isLoading}
        />
    )
}