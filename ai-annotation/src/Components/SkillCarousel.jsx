import React, { useState } from "react";
import {
  StyledArrowButtonLeft,
  StyledArrowButtonRight,
  StyledCarouselContainer,
  StyledCarouselDesc,
  StyledCarouselInnerContainer,
  StyledCarouselDot,
  StyledDotContainer,
} from "../Styles/StyledCarousel";

const SkillCarousel = ({ skillData }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const nextSlide = () => {
    activeIndex !== (Object.keys(skillData).length - 1) && setActiveIndex(activeIndex + 1);
  };

  const prevSlide = () => {
    activeIndex !== 0 && setActiveIndex(activeIndex - 1);
  };

  return (
    <StyledCarouselContainer>
      <StyledArrowButtonLeft onClick={prevSlide} />
      <StyledCarouselInnerContainer>
        {Object.keys(skillData).filter((key) => key.startsWith("Level")).map((levelKey, index) => (
            <StyledCarouselDesc key={levelKey}
              // @ts-ignore
              index={index} activeIndex={activeIndex}>
              <h4>{skillData[levelKey].title}</h4>
              <StyledDotContainer>
                
                <StyledCarouselDot activeIndex={activeIndex} currentIndex={index}/>
                  
              </StyledDotContainer>
              <div>
                <ul>
                  {skillData[levelKey].description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            </StyledCarouselDesc>
          ))}
      </StyledCarouselInnerContainer>
      <StyledArrowButtonRight onClick={nextSlide} />
    </StyledCarouselContainer>
  );
};

export default SkillCarousel;
