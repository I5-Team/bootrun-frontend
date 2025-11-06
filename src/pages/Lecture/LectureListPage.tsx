import styled from "styled-components";
import FilterCardList from "../../components/FilterCardList";
import FilterForm from "../../components/FilterForm";

const StyledTitle = styled.h2`
    font-size: ${({ theme }) => theme.fontSize.xxl};
    font-weight: 600;
    margin-top: 6rem;
`;

export default function LectureListPage() {
const filterData = [
    {
        label: "주제",
        queryName: "category",
        options: [
            { label: "프론트엔드", value: "frontend"},
            { label: "백엔드", value: "backend"},
            { label: "데이터 분석", value: "data_analysis"},
            { label: "AI", value: "ai"},
            { label: "디자인", value: "design"},
            { label: "기타", value: "other"},
        ],
    },
    {
        label: "유형",
        queryName: "courseType",
        options: [
            { label: "VOD", value: "vod"},
            { label: "부스트 커뮤니티", value: "boost_community"},
            { label: "KDC", value: "kdc"},
        ],
    },
    {
        label: "난이도",
        queryName: "difficulty",
        options: [
            { label: "초급", value: "beginner"},
            { label: "중급", value: "intermediate"},
            { label: "실무", value: "advanced"},
        ],
    },
    {
        label: "가격",
        queryName: "priceType",
        options: [
            { label: "무료", value: "free"},
            { label: "유료", value: "paid"},
            { label: "국비지원", value: "national_support"},
        ],
    }
];

    return (
            <>
                <StyledTitle>어떤 강의를 찾으시나요?</StyledTitle>
                <FilterForm filterData={filterData}/>
                <FilterCardList/>
            </>
    );
    }