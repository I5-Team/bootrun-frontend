import gsap from "gsap";

interface LogoTimelineProps {
    rocket: SVGGElement;
    dotTop: SVGPathElement;
    dotBottom: SVGPathElement;
}

export default function createLogoTimeline({
    rocket,
    dotTop,
    dotBottom,
}: LogoTimelineProps) {
    // 초기 상태
    gsap.set(rocket, {
        scale: 0,
        rotate: 0,
        x: 0,
        y: 0,
        transformOrigin: '50% 50%',
    });
    gsap.set(dotTop, {
        scale: 1,
        y: 0,
        transformOrigin: '50% 50%',
    });
    gsap.set(dotBottom, {
        scale: 1,
        y: 0,
        transformOrigin: '50% 50%',
    });   
        

    const tl = gsap.timeline({
        paused: true,
        defaults: {
            overwrite: 'auto',
        },
    });

    // 타임라인 애니메이션
    tl
    .addLabel('dots-out')
    .to(dotTop, {
        y: 40,
        scale: 0,
        duration: 0.4,
        ease: "power3.in",
    }, 'dots-out')
    .to(dotBottom, {
        scale: 0,
        duration: 0.1,
        ease: "power3.in",
    }, ">-0.1")
    
    .addLabel('rocket-in')
    .to(rocket, {
        y: -110,
        x: 20,
        scale: 3.5,
        rotation: 45,
        duration: 0.6,
        ease: "power3.out",
    }, ">")

    .addLabel('rocket-out')
    .to(rocket, {
        y: 0,
        scale: 0,
        duration: 0.4,
        rotation: 0,
        ease: "power3.in",
    },"rocket-out")
    .to([dotTop, dotBottom], {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power3.in",
    }, ">-0.3")      

    return tl;
}