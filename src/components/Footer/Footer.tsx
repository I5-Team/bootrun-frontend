import { StyledAddress, StyledColumnGroup, StyledCopyright, StyledFooter, StyledInnerFooter, StyledLinksList } from "./Footer.styled";

import SvgHome from "../../assets/icons/icon-sns-home.svg?react";
import SvgInflearn from "../../assets/icons/icon-sns-inflearn.svg?react";
import SvgYoutube from "../../assets/icons/icon-sns-youtube.svg?react";
import SvgBlog from "../../assets/icons/icon-sns-blog.svg?react";
import SvgInstagram from "../../assets/icons/icon-sns-instagram.svg?react";
import SvgDiscord from "../../assets/icons/icon-sns-discord.svg?react";
import SvgLogo from "../../assets/logos/logo-typo.svg?react";

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
        <StyledAddress>
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
        <StyledLinksList>
            <li><SvgHome/></li>
            <li><SvgInflearn/></li>
            <li><SvgYoutube/></li>
            <li><SvgBlog/></li>
            <li><SvgInstagram/></li>
            <li><SvgDiscord/></li>
        </StyledLinksList>
    )
}

export default function Footer() {
    return (
        <>
            <StyledFooter>
                <StyledInnerFooter>
                    <StyledColumnGroup>
                        <LogoCopyright/>
                        <Address/>
                    </StyledColumnGroup>
                    <Links/>
                </StyledInnerFooter>
            </StyledFooter>
        </>
    );
}