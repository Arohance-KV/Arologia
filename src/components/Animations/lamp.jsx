import React, { useEffect, useRef } from 'react';

const Lamp = ({ children, className = "" }) => {
  const lampRef = useRef(null);
  const leftConeRef = useRef(null);
  const rightConeRef = useRef(null);
  const centerGlowRef = useRef(null);
  const beamRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animations when component comes into view
            if (leftConeRef.current) {
              leftConeRef.current.style.animation = 'lampLeftExpand 0.8s ease-out forwards';
            }
            if (rightConeRef.current) {
              rightConeRef.current.style.animation = 'lampRightExpand 0.8s ease-out forwards';
            }
            if (centerGlowRef.current) {
              centerGlowRef.current.style.animation = 'lampGlowExpand 0.8s ease-out 0.3s forwards';
            }
            if (beamRef.current) {
              beamRef.current.style.animation = 'lampBeamExpand 0.8s ease-out 0.3s forwards';
            }
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

  return (
    <>
      <style jsx>{`
        @keyframes lampLeftExpand {
          from { 
            opacity: 0.5; 
            width: 15rem; 
          }
          to { 
            opacity: 1; 
            width: 30rem; 
          }
        }

        @keyframes lampRightExpand {
          from { 
            opacity: 0.5; 
            width: 15rem; 
          }
          to { 
            opacity: 1; 
            width: 30rem; 
          }
        }

        @keyframes lampGlowExpand {
          from { 
            width: 8rem; 
            opacity: 0.3; 
          }
          to { 
            width: 16rem; 
            opacity: 0.5; 
          }
        }

        @keyframes lampBeamExpand {
          from { 
            width: 15rem; 
            opacity: 0.5; 
          }
          to { 
            width: 30rem; 
            opacity: 1; 
          }
        }

        @keyframes contentFadeUp {
          from {
            opacity: 0.5;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        .lamp-mask-top {
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
      `}</style>
      
      <div
        ref={lampRef}
        className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black w-full z-0 ${className}`}
      >
        {/* Lamp Structure */}
        <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
          
          {/* Left Cone */}
          <div
            ref={leftConeRef}
            className="absolute inset-auto right-1/2 h-56 overflow-visible w-[15rem] lamp-gradient-conic-left text-white"
            style={{ opacity: 0.5 }}
          >
            <div className="absolute w-[100%] left-0 bg-black h-40 bottom-0 z-20 lamp-mask-top" />
            <div className="absolute w-40 h-[100%] left-0 bg-black bottom-0 z-20 lamp-mask-right" />
          </div>

          {/* Right Cone */}
          <div
            ref={rightConeRef}
            className="absolute inset-auto left-1/2 h-56 w-[15rem] lamp-gradient-conic-right text-white"
            style={{ opacity: 0.5 }}
          >
            <div className="absolute w-40 h-[100%] right-0 bg-black bottom-0 z-20 lamp-mask-left" />
            <div className="absolute w-[100%] right-0 bg-black h-40 bottom-0 z-20 lamp-mask-top" />
          </div>

          {/* Background blur effects */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl"></div>
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
          
          {/* Center glow */}
          <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-white opacity-50 blur-3xl"></div>
          
          {/* Animated center glow */}
          <div
            ref={centerGlowRef}
            className="absolute inset-auto z-30 h-36 w-[8rem] -translate-y-[6rem] rounded-full bg-gray-100 blur-2xl"
            style={{ opacity: 0.3 }}
          ></div>

          {/* Light beam */}
          <div
            ref={beamRef}
            className="absolute inset-auto z-50 h-0.5 w-[15rem] -translate-y-[7rem] bg-gray-100"
            style={{ opacity: 0.5 }}
          ></div>

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