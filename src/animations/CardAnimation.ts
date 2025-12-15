import gsap from "gsap";
import { useEffect } from "react"

export const useCardHoverAnimation = (
    ref: React.RefObject<HTMLElement>
) => {
    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;

        const handleEnter = () => {
            gsap.to(el, { 
                scale: 1.02,
                duration: 0.4,
                ease: 'power3.out',
                overwrite: 'auto',
            })
        }

        const handleLeave = () => {
            gsap.to(el, { 
                scale: 1,
                duration: 0.4,
                ease: 'power3.out',
                overwrite: 'auto',
            })        }

        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);

        return () => {
            el.removeEventListener('mouseenter', handleEnter);
            el.removeEventListener('mouseleave', handleLeave);
        }
    }, [ref]);
}