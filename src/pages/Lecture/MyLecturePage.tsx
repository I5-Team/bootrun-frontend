import FilterForm from "../../components/FilterForm";
import { FilterMyCourseList } from "../../components/CourseList";
import { StyledTitle } from "../Lecture/LectureListPage"

export default function MyLecturePage() {
const filterData = [
    {
        label: "상태",
        queryName: "enrollment_status",
        options: [
            { label: "전체", value: "None"},
            { label: "학습 가능", value: "available"},
            { label: "만료", value: "expired"},
        ],
    },
    {
        label: "학습",
        queryName: "learning_status",
        options: [
            { label: "전체", value: "None"},
            { label: "학습 예정", value: "not_started"},
            { label: "학습중", value: "in_progress"},
            { label: "학습 완료", value: "completed"},
        ],
    },
    {
        label: "유형",
        queryName: "course_type",
        options: [
            { label: "전체", value: "None"},
            { label: "VOD", value: "vod"},
            { label: "부스트 커뮤니티", value: "boost_community"},
            { label: "KDC", value: "kdc"},
        ],
    }
];

    return (
        <>
            <StyledTitle>내 강의 목록</StyledTitle>
            <FilterForm filterData={filterData} inputType="radio" hasTags={false} />
            <FilterMyCourseList/>
        </>
    );
}