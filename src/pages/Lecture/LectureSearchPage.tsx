import styled from "styled-components";
import FilterCardList from "../../components/FilterCardList";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import SearchForm from "../../components/SearchForm";

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

const TempNoResultPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

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
                ? <TempNoResultPage>검색 키워드를 입력하세요</TempNoResultPage>
                : <FilterCardList onCountChange={setResultCount}/>
            }
        </>
    );
}