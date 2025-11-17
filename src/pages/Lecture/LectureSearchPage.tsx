import { ROUTES } from "../../router/RouteConfig";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { FilterCourseList } from "../../components/CourseList";
import useMediaQuery from "../../hooks/useMediaQuery";
import SearchForm from "../../components/SearchForm";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState/EmptyState";
import SvgAlert from "../../assets/icons/icon-status-alert.svg?react";

const StyledTitleWrapper = styled.div`
    margin-top: 6rem;
    margin-bottom: 3.2rem;

    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.2rem;

    @media ${({ theme }) => theme.devices.tablet} {
        margin-top: 3.2rem;

        flex-direction: column;
        justify-content: start;
        align-items: start;
    }
`;

const StyledTitle = styled.div`
    font-size: ${({ theme }) => theme.fontSize.xxl};
    font-weight: 700;

    word-break: keep-all;
    line-height: 1.3;

    @media ${({ theme }) => theme.devices.tablet} {
        font-size: ${({ theme }) => theme.fontSize.xl};
    }
`;

const StyledResult = styled.span`
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;

    @media ${({ theme }) => theme.devices.tablet} {
        font-size: ${({ theme }) => theme.mobileFontSize.xl};
    }
`;

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

export default function LectureSearchPage() {
    const [searchParams] = useSearchParams();
    const [keyword, setKeyword] = useState("");
    const [resultCount, setResultCount] = useState(0);
    const { isTablet } = useMediaQuery();

    useEffect(() => {
        const queryKeyword = searchParams.get("keyword") || "";
        setKeyword(queryKeyword);
    }, [searchParams]);

    return (
        <>  
            {isTablet && <SearchForm/>}
            <StyledTitleWrapper>
                <h2 className="sr-only">강의 목록 검색 결과 페이지</h2>
                {!(isTablet && keyword === "") && 
                    <>
                        <StyledTitle>{keyword}</StyledTitle>
                        <StyledResult>검색 결과: {resultCount}건</StyledResult>
                    </>
                }
            </StyledTitleWrapper>
            {keyword === ""
                ? <NoResultPage/>
                : <FilterCourseList onCountChange={setResultCount}/>
            }
        </>
    );
}