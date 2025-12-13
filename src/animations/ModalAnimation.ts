import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";

export const useModalAnimation = (
    modalRef: React.RefObject<HTMLDivElement>,
    backdropRef: React.RefObject<HTMLDivElement>, 
    isOpen: boolean,
) => {
    const tl = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        if (!modalRef.current || !backdropRef.current) return;
        const modal = modalRef.current;
        const backdrop = backdropRef.current;

        gsap.set(backdrop, { 
            autoAlpha: 0,
        });
        gsap.set(modal, { 
            autoAlpha: 0, 
            y: 10,
            scale: 0.96,
        });

        tl.current = gsap.timeline({ paused: true })
            .addLabel('modal-in')
            .to(backdrop, {
                autoAlpha: 1,
                duration: 0.35,
                ease: 'power3.out',
            }, 'modal-in')
            .to(modal, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.35,
                ease: 'power3.out',
            }, 'modal-in');

            return () => {
                tl.current?.kill();
            }
    }, []);

    useEffect(() => {
        if (!tl.current) return;

        if (isOpen) {
            tl.current.play(0)
        } else {
            tl.current.reverse();
        }
    }, [isOpen]);
}