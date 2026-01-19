import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useHeroGsap({
  heroTheRef,
  heroTechTeamRef,
  heroDescriptionRef,
}) {
  useEffect(() => {
    // ✅ GSAP context = clean + scoped animations
    const ctx = gsap.context(() => {
      // ✅ Helper to avoid repeating same ScrollTrigger code
      const createScrollTrigger = ({
        element,
        onEnter,
        onLeave,
        onEnterBack,
        onLeaveBack,
      }) => {
        if (!element) return;

        ScrollTrigger.create({
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          onEnter,
          onLeave,
          onEnterBack,
          onLeaveBack,
        });
      };

      const heroTheEl = heroTheRef?.current;
      const heroTechTeamEl = heroTechTeamRef?.current;
      const heroDescEl = heroDescriptionRef?.current;

      // ✅ Initial states (same as your code)
      if (heroTheEl) gsap.set(heroTheEl, { y: 100, opacity: 0, scale: 0.9 });
      if (heroTechTeamEl)
        gsap.set(heroTechTeamEl, { y: 100, opacity: 0, scale: 0.9 });
      if (heroDescEl) gsap.set(heroDescEl, { y: 50, opacity: 0 });

      // ✅ AROLOGIA
      createScrollTrigger({
        element: heroTheEl,
        onEnter: () => {
          gsap.to(heroTheEl, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          });
        },
        onLeave: () => {
          gsap.to(heroTheEl, {
            y: -50,
            opacity: 0.3,
            scale: 0.95,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(heroTheEl, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(heroTheEl, {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });

      // ✅ Tech Team
      createScrollTrigger({
        element: heroTechTeamEl,
        onEnter: () => {
          gsap.to(heroTechTeamEl, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          });
        },
        onLeave: () => {
          gsap.to(heroTechTeamEl, {
            y: -50,
            opacity: 0.3,
            scale: 0.95,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(heroTechTeamEl, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(heroTechTeamEl, {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });

      // ✅ Description
      createScrollTrigger({
        element: heroDescEl,
        onEnter: () => {
          gsap.to(heroDescEl, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          });
        },
        onLeave: () => {
          gsap.to(heroDescEl, {
            y: -30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(heroDescEl, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(heroDescEl, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });
    });

    // ✅ Cleanup (kills only what this hook created)
    return () => ctx.revert();
  }, [heroTheRef, heroTechTeamRef, heroDescriptionRef]);
}
