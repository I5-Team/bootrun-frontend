import styled from "styled-components";
import Button from "../components/Button";
import Profile from "../components/Profile";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../router/RouteConfig";
import { useState } from "react";

import SvgPlay from "../assets/icons/icon-play.svg?react";
import SvgMyPage from "../assets/icons/icon-mypage.svg?react";

// profileCard
const StyledPofileCard = styled.article`
    width: clamp(25rem, 24vw, 29rem);
    min-width: 25rem;
    height: 100%;

    padding: 4rem 3.2rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.6rem;
    text-align: center;

    @media ${({ theme }) => theme.devices.mobile} {
        border: 0.1rem solid transparent;
        min-width: 29rem;
    }
`;

// userInfo - name + email
const StyledUserInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.8rem;
`;

const StyledName = styled.p`
    font-weight: 600;
    text-align: center;
`;

const StyledEmail = styled.p`
    line-height: 1;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray300};
`

// !loggedIn > text
const StyledText = styled.p`
    line-height: 1.3;
`;

// loggedIn > actionList
const StyledActionList = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 1.2rem;
    margin-top: 0.8rem;


    width: 14.8rem;
    min-width: fit-content;
`
const StlyedLink = styled(Link)`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.2rem;

    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray300};

    width: 100%;
    padding-block: 0.4rem;

    &:hover {
        color: ${({ theme }) => theme.colors.surface};
    }

    svg {
        width: 1.8rem;
        height: 1.8rem;
        path {
            fill: currentColor;
        }
    }
`;

// components
const UserActionList = () => {
    return (
        <StyledActionList>
            <StlyedLink to={ROUTES.MY_LECTURES}><SvgPlay/>내 강의 목록 보기</StlyedLink>
            <StlyedLink to={ROUTES.PROFILE}><SvgMyPage/>마이페이지</StlyedLink>
        </StyledActionList>
    )
}

export const ProfileCard = () => {
    const navigate = useNavigate();

    const goLogin = () => {
        navigate(ROUTES.LOGIN);
    }

    const isLoggedIn = false;
    const userInfo = {
        profile_image : 'https://picsum.photos/id/237/200/200',
        nickname: 'S부트런짱2',
        email : 'bootruns2@email.com',
    }

    return (
        <StyledPofileCard>
            {isLoggedIn 
            ? <Profile size={10} src={userInfo.profile_image}/>
            : <Profile size={10}/>
            }
            
            <StyledUserInfo>
                <StyledName>{isLoggedIn ? userInfo.nickname : '호기심 많은 개발자님'}</StyledName>
                {isLoggedIn && <StyledEmail>{userInfo.email}</StyledEmail>}
            </StyledUserInfo>

            {!isLoggedIn && <StyledText>부트런에 로그인 후<br/>커뮤니티와 함께 성장하세요.</StyledText>}

            {isLoggedIn
            ? <UserActionList/>
            : <Button fullWidth onClick={goLogin}>로그인</Button>
            }
        </StyledPofileCard>
    )
}

export default ProfileCard;
