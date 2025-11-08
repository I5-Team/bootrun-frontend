import styled from "styled-components";
import FilterForm from "../../components/FilterForm";
import { FilterMyCourseList } from "../../components/FilterCardList";

const StyledTitle = styled.h2`
    font-size: ${({ theme }) => theme.fontSize.xxl};
    font-weight: 600;
    margin-top: 6rem;
    word-break: keep-all;
    line-height: 1.3;

    @media ${({ theme }) => theme.devices.mobile} {
        font-size: ${({ theme }) => theme.fontSize.xl};
    }
`;


export default function MyLecturePage() {
const filterData = [
    {
        label: "상태",
        queryName: "is_active",
        options: [
            { label: "학습 가능", value: "true"},
            { label: "만료", value: "false"},
        ],
    },
    {
        label: "학습",
        queryName: "progress",
        options: [
            { label: "학습 예정", value: "not_started"},
            { label: "학습중", value: "in_progress"},
            { label: "학습 완료", value: "completed"},
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
    }
];

    return (
        <>
            <StyledTitle>내 강의 목록</StyledTitle>
            <FilterForm filterData={filterData}/>
            <FilterMyCourseList/>
        </>
    );
}