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
    // ✅ Initial states
    if (heroTheRef.current) {
      gsap.set(heroTheRef.current, { y: 100, opacity: 0, scale: 0.9 });
    }

    if (heroTechTeamRef.current) {
      gsap.set(heroTechTeamRef.current, { y: 100, opacity: 0, scale: 0.9 });
    }

    if (heroDescriptionRef.current) {
      gsap.set(heroDescriptionRef.current, { y: 50, opacity: 0 });
    }

    // ✅ AROLOGIA
    if (heroTheRef.current) {
      ScrollTrigger.create({
        trigger: heroTheRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.to(heroTheRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          });
        },
        onLeave: () => {
          gsap.to(heroTheRef.current, {
            y: -50,
            opacity: 0.3,
            scale: 0.95,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(heroTheRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(heroTheRef.current, {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });
    }

    // ✅ Tech Team
    if (heroTechTeamRef.current) {
      ScrollTrigger.create({
        trigger: heroTechTeamRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.to(heroTechTeamRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          });
        },
        onLeave: () => {
          gsap.to(heroTechTeamRef.current, {
            y: -50,
            opacity: 0.3,
            scale: 0.95,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(heroTechTeamRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(heroTechTeamRef.current, {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });
    }

    // ✅ Description
    if (heroDescriptionRef.current) {
      ScrollTrigger.create({
        trigger: heroDescriptionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.to(heroDescriptionRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          });
        },
        onLeave: () => {
          gsap.to(heroDescriptionRef.current, {
            y: -30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(heroDescriptionRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(heroDescriptionRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });
    }

    // ✅ Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
