import { useEffect, useRef, type SetStateAction } from "react";
import type React from "react";
import styled from "styled-components";
import ProfileCard from "../ProfileCard";
import SvgClose from "../../assets/icons/icon-x.svg?react";
import { ProfileDropdown } from "../ProfileDropdown";

const StyledSidebar = styled.aside<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    width: 29rem;
    height: 100vh;
    z-index: 1000;

    background-color: ${({ theme }) => theme.colors.white};
    border-left: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    box-shadow: ${({ theme }) => theme.colors.shadow};
    
    transition: transform 0.3s ease, visibility 0.3s ease;
    transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(100%)'};
    visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
`;

const StyledSidebarInner = styled.div`
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    margin-top: 2.4rem;
`;

const StyledCloseBtn = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.6rem;
    margin: 1.2rem;
    z-index: 100;


    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray300};
    svg { 
        width: 1.6rem;
        height: 1.6rem;

        path {
            fill: currentColor;
        }
    }
`;

const StyledDimmed = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #0000004d;
`;

export default function HeaderSidebar({ isOpen, setIsOpen }: { 
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
    const sidebarRef = useRef<HTMLElement | null>(null);
    const dimmedRef = useRef<HTMLDivElement | null>(null);

    const handleClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        }
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!dimmedRef.current || !sidebarRef.current) return;
            if (dimmedRef.current.contains(target) || target.tagName === "BUTTON" || target.tagName === "A") {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("mouseup", handleClickOutside);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mouseup", handleClickOutside);
        }
    }, [isOpen]);

    return (
        <>
            <StyledSidebar $isOpen={isOpen} ref={sidebarRef}>
                <StyledSidebarInner>
                    <StyledCloseBtn 
                        aria-label="사이드바 닫기"
                        onClick={handleClose}
                    >
                        <SvgClose/>
                    </StyledCloseBtn>
                    <ProfileCard variant="sidebar"/>
                    <ProfileDropdown variant="sidebar"/>
                </StyledSidebarInner>
            </StyledSidebar>
            {isOpen && <StyledDimmed ref={dimmedRef}></StyledDimmed>}
        </>
    );
}