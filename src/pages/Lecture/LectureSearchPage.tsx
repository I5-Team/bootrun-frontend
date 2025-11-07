import styled from "styled-components";
import FilterCardList from "../../components/FilterCardList";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const StyledTitleWrapper = styled.div`
    margin-top: 6rem;
    margin-bottom: 3.2rem;

    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.2rem;
`;

const StyledTitle = styled.div`
    font-size: ${({ theme }) => theme.fontSize.xxl};
    font-weight: 600;

    word-break: keep-all;
    line-height: 1.3;

    @media ${({ theme }) => theme.devices.mobile} {
        font-size: ${({ theme }) => theme.fontSize.xl};
    }
`;

const StyledResult = styled.span`
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;
`;

const TempNoResultPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function LectureSearchPage() {
    const [searchParams] = useSearchParams();
    const [keyword, setKeyword] = useState("");
    const [resultCount, setResultCount] = useState(0);
    console.log("[resultCount]", resultCount);

    useEffect(() => {
        const queryKeyword = searchParams.get("keyword") || "";
        setKeyword(queryKeyword);
    }, [searchParams]);

    return (
        <>  
            <StyledTitleWrapper>
                <h2 className="sr-only">강의 목록 검색 결과 페이지</h2>
                <StyledTitle>{keyword}</StyledTitle>
                <StyledResult>검색 결과: {resultCount}건</StyledResult>
            </StyledTitleWrapper>
            {keyword === ""
                ? <TempNoResultPage>검색 결과가 없어요</TempNoResultPage>
                : <FilterCardList onCountChange={setResultCount}/>
            }
        </>
    );
}