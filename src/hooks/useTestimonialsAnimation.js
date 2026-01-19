import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useTestimonialsAnimation = (
  sectionRef,
  containerRef,
  titleRef,
  trackRef,
  typingRef
) => {
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;
    const title = titleRef.current;
    const typingContainer = typingRef.current;

    if (!section || !container || !track || !title || !typingContainer) return;

    // Prevent re-initialization if already done
    if (typingContainer.hasAttribute("data-initialized")) {
      return;
    }

    typingContainer.setAttribute("data-initialized", "true");

    // Create individual character spans
    const text = "TESTIMONIALS";
    const charSpans = text.split("").map((char) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      return span;
    });

    typingContainer.innerHTML = "";
    charSpans.forEach((span) => typingContainer.appendChild(span));

    const chars = typingContainer.querySelectorAll(".char");

    // Set initial states
    gsap.set(title, { opacity: 0 });
    gsap.set(chars, { opacity: 0, x: -20 });

    // Title animation
    const titleAnimation = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      onEnter: () => {
        gsap.to(title, {
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.to(chars, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        });
      },
      onLeave: () => {
        gsap.to(title, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      onEnterBack: () => {
        gsap.to(title, {
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        });
        gsap.to(chars, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
        });
      },
      onLeaveBack: () => {
        gsap.to(title, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.set(chars, {
          opacity: 0,
          x: -20,
        });
      },
    });

    return () => {
      // Kill animations and triggers
      titleAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [sectionRef, containerRef, titleRef, trackRef, typingRef]);
};