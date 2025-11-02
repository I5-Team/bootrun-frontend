import styled from "styled-components";


const StyledHeader = styled.header`
    border: 1px solid red;
    width: 100%;
    height: 7rem;
    padding: 0 4.5rem;
`;

const StyledHeaderInner = styled.div`
    border: 1px solid blue;
    max-width: ${({ theme }) => theme.breakpoints.desktop};
    height: 100%;
    margin: 0 auto;
`;

export default function Header() {


    return (
        <>
            <StyledHeader>
                <StyledHeaderInner>
                    <h1>헤더입니다</h1>
                </StyledHeaderInner>
            </StyledHeader>
        </>
    );
}