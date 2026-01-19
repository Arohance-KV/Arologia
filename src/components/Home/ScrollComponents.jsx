import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 1, 0.7] : [0.8, 1, 0.8];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -5, 0, 5, 0]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <div
      className="relative h-[150vh] flex items-center justify-center p-0 overflow-hidden"
      ref={containerRef}
    >
      <div className="relative w-full h-full top-0" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} opacity={opacity} />
        <Card rotate={rotate} rotateY={rotateY} translate={translate} scale={scale} opacity={opacity}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent, opacity }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        opacity: opacity,
        position: "absolute",
      }}
      className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, rotateY, scale, translate, opacity, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        rotateY: rotateY,
        scale,
        translateY: translate,
        opacity: opacity,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        boxShadow:
          "0 0 #0000004d, 0 3px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="border-0 rounded-sm overflow-hidden"
    >
      <div className="h-full w-full overflow-hidden rounded-sm bg-gray-100 dark:bg-zinc-900 flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
};