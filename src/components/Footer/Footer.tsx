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


const LogoCopyright = () => {
    return (
        <StyledCopyright>
            <SvgLogo/>
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
                <a
                    href="/"
                    aria-label="홈으로 이동"
                ><SvgHome /></a>
            </StyledLinkItem>
            <StyledLinkItem>
                <a
                    href="https://www.inflearn.com/" target="_blank"
                    aria-label="인프런으로 이동"
                ><SvgInflearn /></a>
            </StyledLinkItem>
            <StyledLinkItem>
                <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    aria-label="유튜브로 이동"
                ><SvgYoutube /></a>
            </StyledLinkItem>
            <StyledLinkItem>
                <a
                    href="https://section.blog.naver.com/" target="_blank"
                    aria-label="블로그로 이동"
                ><SvgBlog /></a>
            </StyledLinkItem>
            <StyledLinkItem>
                <a
                    href="https://www.instagram.com/" target="_blank"
                    aria-label="인스타그램으로 이동"
                ><SvgInstagram /></a>
            </StyledLinkItem>
            <StyledLinkItem>
                <a
                    href="https://discord.com/"
                    target="_blank"
                    aria-label="디스코드로 이동"
                ><SvgDiscord /></a>
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