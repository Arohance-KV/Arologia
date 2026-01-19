import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useHorizontalScroll = (sectionRef, containerRef, trackRef) => {
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;

    if (!section || !container || !track) return;

    // Skip if already initialized
    if (track.hasAttribute("data-scroll-initialized")) {
      return;
    }

    track.setAttribute("data-scroll-initialized", "true");

    const calculateDimensions = () => {
      const lastCard = track.lastElementChild;
      const lastCardWidth = lastCard ? lastCard.offsetWidth : 0;
      const containerCenterOffset = container.offsetWidth / 2;
      const lastCardCenterOffset = lastCardWidth / 2;

      return track.scrollWidth - containerCenterOffset - lastCardCenterOffset;
    };

    let totalWidth = calculateDimensions();

    gsap.set(track, {
      x: 0,
      willChange: "transform",
    });

    const horizontalScroll = gsap.to(track, {
      x: () => -Math.max(0, totalWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(100, totalWidth)}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: () => {
          const maxTransform = -Math.max(0, totalWidth);
          const currentX = gsap.getProperty(track, "x");
          if (currentX < maxTransform) {
            gsap.set(track, { x: maxTransform });
          }
        },
        onRefresh: () => {
          const newTotalWidth = calculateDimensions();
          if (Math.abs(newTotalWidth - totalWidth) > 10) {
            totalWidth = newTotalWidth;
            horizontalScroll.progress(horizontalScroll.progress());
          }
        },
      },
    });

    // Animate cards
    const cards = track.querySelectorAll(".testimonial-card");
    cards.forEach((card) => {
      gsap.set(card, {
        opacity: 0,
        y: 50,
        scale: 0.9,
      });

      ScrollTrigger.create({
        trigger: card,
        containerAnimation: horizontalScroll,
        start: "left 70%",
        end: "right 30%",
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        },
        onLeave: () => {
          gsap.to(card, {
            opacity: 0.7,
            scale: 0.95,
            duration: 0.5,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(card, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    });

    return () => {
      horizontalScroll.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.containerAnimation === horizontalScroll) {
          trigger.kill();
        }
      });
    };
  }, [sectionRef, containerRef, trackRef]);
};