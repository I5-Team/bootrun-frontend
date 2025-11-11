import { useState, useEffect } from "react";
import styled from "styled-components";
import SvgArrowUp from "../assets/icons/icon-arrow-up.svg?react";
import useMediaQuery from "../hooks/useMediaQuery";

// style 
const StyledCircleButton = styled.button<{ $isVisible: boolean }>`
    position: fixed;
    bottom: 1.6rem;
    right: 1.6rem;

    width: 5rem;
    height: 5rem;
    padding: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    box-shadow: ${({ theme }) => theme.colors.shadow};

    z-index: 1000;

    svg {
        width: auto;
        height: 100%;
    }

    visibility: ${({ $isVisible }) => $isVisible ? 'visible' : 'hidden'};
    opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
    transition: opacity 0.2s ease, visibility 0.2s ease;
`;

const ScrollToTopButton = () => {
    const { isTablet } = useMediaQuery();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const onScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        const handleShowButton = () => {
            if (isTablet && window.scrollY > window.innerHeight / 2) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
        window.addEventListener('scroll', handleShowButton);
        return () => window.removeEventListener('scroll', handleShowButton);
    }, [isTablet])
    
    return (
        <StyledCircleButton
            $isVisible={isVisible}
            type="button"
            aria-label="페이지 상단으로 이동"
            onClick={onScrollToTop}
        >
            <SvgArrowUp/>
        </StyledCircleButton>
    )
}

export default ScrollToTopButton;