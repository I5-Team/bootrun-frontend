import gsap from "gsap";
import { useEffect } from "react";

export const useButtonClickAnimation = (
    ref: React.RefObject<HTMLButtonElement | HTMLAnchorElement>
) => {
    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;

        const handleDown = () => {
            gsap.to(el, {
                y: 2,
                duration: 0.25,
                ease: "power3.out",
                overwrite: 'auto'
            });
        };

        const handleUp = () => {
            gsap.to(el, {
                y: 0,
                duration: 0.25,
                ease: "power3.out",
                overwrite: 'auto'
            });
        };

        el.addEventListener('mousedown', handleDown);
        el.addEventListener('mouseup', handleUp);

        return () => {
            el.removeEventListener('mousedown', handleDown);
            el.removeEventListener('mouseup', handleUp);
        }
    }, [ref]);
}