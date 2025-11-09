import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../router/RouteConfig";

// profile dropdown
export const StyledDropdownWrapper = styled.div`
    position: relative;
    cursor: pointer;
`

const StyledProfileDropdown = styled.div`
    position: absolute;
    top: calc(100% + 0.4rem);
    right: 0;
    width: 24rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.colors.shadow};

    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 500;
`;

const StyledItem = styled.div`
    width: 100%;
    padding: 0.8rem 0;

    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;

    &:not(:last-child) {
        border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    }
`;

const StyledLink = styled(Link)`
    width: 100%;
    padding: 1rem 2rem;
    line-height: 2rem;
`;

const StyledButton = styled.button`
    width: 100%;
    padding: 1rem 2rem;
    line-height: 2rem;
`;

const StyledCaption = styled.p`
    width: 100%;
    padding: 0.4rem 1.6rem;
    line-height: 1.6rem;
    font-size: ${({ theme }) => theme.fontSize.caption};
    color: ${({ theme }) => theme.colors.gray300};

`;

export const ProfileDropdown = () => {
    const handleLogout = () => {
        console.log("로그아웃");
    }

    return (
        <StyledProfileDropdown>
            <StyledItem>
                <StyledLink to={ROUTES.MY_LECTURES}>내 강의 목록</StyledLink>
                <StyledLink to={ROUTES.MYPAGE}>마이페이지</StyledLink>
            </StyledItem>

            <StyledItem>
                <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
            </StyledItem>

            <StyledItem>
                <StyledCaption>
                    제보 및 문의: <a href="mailto:">boot-run@bootrun.com</a>
                </StyledCaption>
            </StyledItem>
        </StyledProfileDropdown>
    )
}
