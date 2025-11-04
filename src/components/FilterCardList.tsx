import sampleCourses from "../assets/data/sampleCourses.json"
import sampleCategories from "../assets/data/sampleCategories.json";
import CourseCard from "../components/CourseCard/CourseCard";
import  { StyledCardGrid } from "../pages/MainPage.styled";

export type Difficulties = "beginner" | "intermediate" | "advanced";

export type CourseType = '부스트 커뮤니티' | 'VOD' | 'KDC';

export type CourseData = {
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
    "course_type": CourseType, // 임의로 추가
}

export type CourseFilter = {
    courseType?: string,
    category?: string, 
    difficulty?: string, 
    priceType?: '무료' | '유료' | '국비지원',
}



const FilterCardList = ({ courseType, category, difficulty, priceType }: CourseFilter) => {
    const courseList = sampleCourses as CourseData[];
    const categories = sampleCategories;

    const difficultyName : Record<Difficulties, string> = {
        beginner : '초급',
        intermediate : '중급',
        advanced : '실무', 
    }

    const filteredList = courseList.filter(course => { 
        const targetCategory = category
            ? categories.find(c => c.display_name === category)
            : undefined;

        const matchDifficulty = !difficulty || course.difficulty === difficulty;
        const matchCourseType = !courseType || course.course_type === courseType;
        const matchCategory = !category || (targetCategory && course.category_id === targetCategory.id);
        let matchPrice = true;

        if (priceType) {
            if (priceType === "무료") matchPrice = course.price === 0;
            else if (priceType === "유료") matchPrice = course.price > 0;
            else if (priceType === "국비지원") matchPrice = course.course_type === "KDC";
        }

        return matchDifficulty && matchCourseType && matchCategory && matchPrice;
    })

    return (
        <StyledCardGrid>
            { filteredList
            // .slice(0, 3)
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
    )
}

export default FilterCardList;