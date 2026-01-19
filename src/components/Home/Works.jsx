import React from "react";
import { ContainerScroll, Header, Card } from "../Home/ScrollComponents";
import { WorkCard } from "../Home/WorkCard";
import { worksData } from "../../utils/worksData";

export const WorksSection = () => {
  return (
    <section className="bg-black text-white relative z-20">
      <div className="flex justify-center lg:py-12 md:py-5 sm:py-3">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
          WORKS
        </h2>
      </div>

      <div className="relative">
        {worksData.map((work) => (
          <ContainerScroll key={work.id}>
            <WorkCard work={work} />
          </ContainerScroll>
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
export { ContainerScroll, Header, Card };
export { WorkCard };