import React, { useEffect, useRef } from "react";

const Lamp = ({ children, className = "" }) => {
  const lampRef = useRef(null);
  const refsMap = useRef({
    leftCone: null,
    rightCone: null,
    centerGlow: null,
    beam: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animations = [
              { ref: "leftCone", animation: "lampLeftExpand 0.8s ease-out forwards" },
              { ref: "rightCone", animation: "lampRightExpand 0.8s ease-out forwards" },
              { ref: "centerGlow", animation: "lampGlowExpand 0.8s ease-out 0.3s forwards" },
              { ref: "beam", animation: "lampBeamExpand 0.8s ease-out 0.3s forwards" },
            ];

            animations.forEach(({ ref, animation }) => {
              if (refsMap.current[ref]) {
                refsMap.current[ref].style.animation = animation;
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (lampRef.current) {
      observer.observe(lampRef.current);
    }

    return () => {
      if (lampRef.current) {
        observer.unobserve(lampRef.current);
      }
    };
  }, []);

  const maskStyles = `
    @keyframes lampLeftExpand {
      from { opacity: 0.5; width: 15rem; }
      to { opacity: 1; width: 30rem; }
    }

    @keyframes lampRightExpand {
      from { opacity: 0.5; width: 15rem; }
      to { opacity: 1; width: 30rem; }
    }

    @keyframes lampGlowExpand {
      from { width: 8rem; opacity: 0.3; }
      to { width: 16rem; opacity: 0.5; }
    }

    @keyframes lampBeamExpand {
      from { width: 15rem; opacity: 0.5; }
      to { width: 30rem; opacity: 1; }
    }

    @keyframes contentFadeUp {
      from { opacity: 0.5; transform: translateY(100px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .lamp-content {
      animation: contentFadeUp 0.8s ease-out 0.3s both;
    }

    .lamp-gradient-conic-left {
      background: conic-gradient(from 70deg at center top, #ffffff, transparent, transparent);
    }

    .lamp-gradient-conic-right {
      background: conic-gradient(from 290deg at center top, transparent, transparent, #ffffff);
    }

    .lamp-mask {
      mask-image: linear-gradient(to top, white, transparent);
      -webkit-mask-image: linear-gradient(to top, white, transparent);
    }

    .lamp-mask-right {
      mask-image: linear-gradient(to right, white, transparent);
      -webkit-mask-image: linear-gradient(to right, white, transparent);
    }

    .lamp-mask-left {
      mask-image: linear-gradient(to left, white, transparent);
      -webkit-mask-image: linear-gradient(to left, white, transparent);
    }
  `;

  const Cone = ({ isLeft, refCallback }) => (
    <div
      ref={refCallback}
      className={`absolute inset-auto h-56 w-[15rem] text-white overflow-visible ${
        isLeft ? "right-1/2 lamp-gradient-conic-left" : "left-1/2 lamp-gradient-conic-right"
      }`}
      style={{ opacity: 0.5 }}
    >
      <div className={`absolute bg-black h-40 bottom-0 z-20 lamp-mask ${isLeft ? "left-0 w-[100%]" : "right-0 w-[100%]"}`} />
      <div className={`absolute h-[100%] bg-black bottom-0 z-20 ${isLeft ? "lamp-mask-right left-0 w-40" : "lamp-mask-left right-0 w-40"}`} />
    </div>
  );

  return (
    <>
      <style>{maskStyles}</style>

      <div
        ref={lampRef}
        className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black w-full z-0 ${className}`}
      >
        {/* Lamp Structure */}
        <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
          <Cone isLeft refCallback={(el) => (refsMap.current.leftCone = el)} />
          <Cone refCallback={(el) => (refsMap.current.rightCone = el)} />

          {/* Background blur effects */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl"></div>
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>

          {/* Center glow */}
          <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-white opacity-50 blur-3xl"></div>

          {/* Animated center glow */}
          <div
            ref={(el) => (refsMap.current.centerGlow = el)}
            className="absolute inset-auto z-30 h-36 w-[8rem] -translate-y-[6rem] rounded-full bg-gray-100 blur-2xl"
            style={{ opacity: 0.3 }}
          />

          {/* Light beam */}
          <div
            ref={(el) => (refsMap.current.beam = el)}
            className="absolute inset-auto z-50 h-0.5 w-[15rem] -translate-y-[7rem] bg-gray-100"
            style={{ opacity: 0.5 }}
          />

          {/* Top mask */}
          <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-black"></div>
        </div>

        {/* Content Area */}
        <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5 lamp-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default Lamp;