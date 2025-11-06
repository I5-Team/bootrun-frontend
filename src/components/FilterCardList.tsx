import sampleCourses from "../assets/data/sampleCourses.json";
import CourseCard from "../components/CourseCard/CourseCard";
import  { StyledCardGrid } from "../pages/MainPage.styled";
import { ROUTES } from "../router/RouteConfig";
import { Link } from "react-router-dom";

export type CourseType = 'boost_community' | 'vod' | 'kdc';

export type CategoryType = 'frontend' | 'backend' | 'data_analysis' | 'ai' | 'design' | 'other';

export type PriceType = 'free' | 'paid' | 'national_support';
 
export type difficultyType = "beginner" | "intermediate" | "advanced";

export type CourseData = {
    "id": number,
    "category_type": CategoryType,
    "course_type": CourseType,
    "price_type": PriceType,
    "difficulty": difficultyType,
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
    difficultyOpt?: difficultyType,
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

const difficultyLabel : Record<difficultyType, string> = {
    beginner : '초급',
    intermediate : '중급',
    advanced : '실무', 
}

export const FilterCardList = ({ courseTypeOpt, categoryOpt, difficultyOpt, priceTypeOpt, sortOpt, cardCount }: CourseFilter) => {
    const courseList = sampleCourses as CourseData[];

    const filteredList = [...courseList].filter(course => { 
        const matchCourseType = !courseTypeOpt || course.course_type === courseTypeOpt;
        const matchCategory = !categoryOpt || course.category_type === categoryOpt;
        const matchDifficulty = !difficultyOpt || course.difficulty === difficultyOpt;
        const matchPrice = !priceTypeOpt || course.price_type === priceTypeOpt;

        return matchDifficulty && matchCourseType && matchCategory && matchPrice;
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
    )
}

export default FilterCardList;