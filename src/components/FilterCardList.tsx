import sampleCourses from "../assets/data/sampleCourses.json";
import CourseCard from "../components/CourseCard/CourseCard";
import useMediaQuery from "../hooks/useMediaQuery";
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
    courseType?: CourseType,
    category?: CategoryType,
    difficulty?: difficultyType,
    priceType?: PriceType
}

const FilterCardList = ({ courseType, category, difficulty, priceType }: CourseFilter) => {
    const { isLaptop } = useMediaQuery();
    const cardCount = isLaptop ? 4 : 3;

    const courseList = sampleCourses as CourseData[];

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

    const filteredList = courseList.filter(course => { 
        const matchCourseType = !courseType || course.course_type === courseType;
        const matchCategory = !category || course.category_type === category;
        const matchDifficulty = !difficulty || course.difficulty === difficulty;
        const matchPrice = !priceType || course.price_type === priceType;

        return matchDifficulty && matchCourseType && matchCategory && matchPrice;
    })

    return (
        <StyledCardGrid>
            { filteredList
            .sort((a, b) => b.created_at.localeCompare(a.created_at))
            .slice(0, cardCount)
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