import { useEffect } from "react";

export const useButtonClickAnimation = (
    ref: React.RefObject<HTMLButtonElement | HTMLAnchorElement>
) => {
    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;

        // Apply CSS transition for smooth animation
        el.style.transition = "transform 0.1s ease-out";

        const handleDown = () => {
            el.style.transform = "translateY(2px)";
        };

        const handleUp = () => {
            el.style.transform = "translateY(0)";
        };

        const handleLeave = () => {
            el.style.transform = "translateY(0)";
        };

        el.addEventListener('mousedown', handleDown);
        el.addEventListener('mouseup', handleUp);
        el.addEventListener('mouseleave', handleLeave); // 마우스가 버튼 밖으로 나갔을 때도 복귀

        return () => {
            el.removeEventListener('mousedown', handleDown);
            el.removeEventListener('mouseup', handleUp);
            el.removeEventListener('mouseleave', handleLeave);
        }
    }, [ref]);
}