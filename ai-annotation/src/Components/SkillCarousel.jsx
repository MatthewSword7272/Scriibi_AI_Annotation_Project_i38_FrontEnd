import React, { useState } from "react";
import {
  StyledArrowButtonLeft,
  StyledArrowButtonRight,
  StyledCarouselContainer,
  StyledCarouselDesc,
  StyledCarouselInnerContainer,
  StyledCarouselDot,
  StyledDotContainer,
  StyledCarouselDescription,
} from "../Styles/StyledCarousel";

const SkillCarousel = ({ skillData }) => {
  const [activeIndex, setActiveIndex] = useState(1); //Start at the Middle Carousel Item

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
            <StyledCarouselDesc key={index} index={index} activeIndex={activeIndex}>
              <h4>{skillData[levelKey].title}</h4>
              <StyledDotContainer>
  
                <StyledCarouselDot activeIndex={activeIndex} currentIndex={index}/>
    
              </StyledDotContainer>
              <StyledCarouselDescription>
                <ul>
                  {skillData[levelKey].description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </StyledCarouselDescription>
            </StyledCarouselDesc>
          ))}
      </StyledCarouselInnerContainer>
      <StyledArrowButtonRight onClick={nextSlide} />
    </StyledCarouselContainer>
  );
};

export default SkillCarousel;
