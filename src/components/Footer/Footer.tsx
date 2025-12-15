import { useState } from "react";
import { StyledAddress, StyledAddressOpen, StyledCopyright, StyledFooter, StyledInnerFooter, StyledLinkItem } from "./Footer.styled";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Flex } from "../Box";

import SvgHome from "../../assets/icons/icon-sns-home.svg?react";
import SvgInflearn from "../../assets/icons/icon-sns-inflearn.svg?react";
import SvgYoutube from "../../assets/icons/icon-sns-youtube.svg?react";
import SvgBlog from "../../assets/icons/icon-sns-blog.svg?react";
import SvgInstagram from "../../assets/icons/icon-sns-instagram.svg?react";
import SvgDiscord from "../../assets/icons/icon-sns-discord.svg?react";
import SvgLogo from "../../assets/logos/logo-typo.svg?react";
import SvgArrowDown from "../../assets/icons/icon-arrow-down.svg?react";
import { ROUTES } from "@/router/RouteConfig";
import { Link } from "react-router-dom";


const LogoCopyright = () => {
    return (
        <StyledCopyright>
            <SvgLogo />
            <p>© BootRun All rights reserved</p>
        </StyledCopyright>
    )
}
const Address = () => {
    return (
        <StyledAddress aria-label="회사 정보">
            <p>(주)부트런</p>
            <p>대표: 김규호, 김민주, 김채현,  신가람, 장민경</p>
            <p>사업자 번호:  019-11-02025</p>
            <p>정보통신업</p>
            <p>주소: 서울특별시 부트구 런로 11-19</p>
        </StyledAddress>
    )
}

const Links = () => {
    return (
        <Flex as="ul" gap={8}>
            <StyledLinkItem>
                <Link to={ROUTES.HOME}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >

                    <SvgHome />
                </Link>
            </StyledLinkItem>
            <StyledLinkItem>
                <Link to="https://www.inflearn.com/" target="_blank">
                    <SvgInflearn />
                </Link>
            </StyledLinkItem>
            <StyledLinkItem>
                <Link to="https://www.youtube.com/" target="_blank">
                    <SvgYoutube />
                </Link>
            </StyledLinkItem>
            <StyledLinkItem>
                <Link to="https://section.blog.naver.com/" target="_blank">
                    <SvgBlog />
                </Link>
            </StyledLinkItem>
            <StyledLinkItem>
                <Link to="https://www.instagram.com/" target="_blank">
                    <SvgInstagram />
                </Link>
            </StyledLinkItem>
            <StyledLinkItem>
                <Link to="https://discord.com/" target="_blank">
                    <SvgDiscord />
                </Link>
            </StyledLinkItem>
        </Flex>
    )
}

const AddressAccordion = () => {
    const [isAddressOpen, setIsAddressOpen] = useState(false);

    return (
        <>
            <StyledAddressOpen $isOpen={isAddressOpen} onClick={() => setIsAddressOpen(prev => !prev)}>
                (주)부트런 사업자 정보
                <SvgArrowDown />
            </StyledAddressOpen>
            {isAddressOpen &&
                <Address />
            }
        </>
    )
}

// 푸터 컴포넌트 (반응형 레이아웃 적용)
export default function Footer() {
    const { isMobile } = useMediaQuery();

    return (
        <StyledFooter>
            <StyledInnerFooter>
                <Flex direction="column" gap={20} align="flex-start">
                    <LogoCopyright />
                    {isMobile ? <Links /> : <Address />}
                </Flex>
                {isMobile ? <AddressAccordion /> : <Links />}
            </StyledInnerFooter>
        </StyledFooter>
    );
}