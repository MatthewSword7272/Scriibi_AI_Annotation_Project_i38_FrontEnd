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
  StyledH4,
  StyledCarouselDescriptionContainer,
  StyledLevelHeadingContainer,
} from "../Styles/StyledCarousel";

const SkillCarousel = ({ skillData }) => {
  const [activeIndex, setActiveIndex] = useState(1); //Start at the Middle Carousel Item

  const nextSlide = () => {
    activeIndex !== Object.keys(skillData).length - 1 &&
      setActiveIndex(activeIndex + 1);
  };

  const prevSlide = () => {
    activeIndex !== 0 && setActiveIndex(activeIndex - 1);
  };

  const levels = Object.keys(skillData).filter((key) =>
    key.startsWith("Level")
  );

  return (
    <StyledCarouselContainer>
      <StyledCarouselInnerContainer>
        
          <StyledArrowButtonLeft onClick={prevSlide} />
          <StyledLevelHeadingContainer>
            {levels.map((levelKey, index) => (
              <StyledH4 index={index} activeIndex={activeIndex}>
                {skillData[levelKey].title}
              </StyledH4>
            ))}
          </StyledLevelHeadingContainer>
          <StyledArrowButtonRight onClick={nextSlide} />
        
        <StyledDotContainer>
          {levels.map((_, index) => (
            <StyledCarouselDot activeIndex={activeIndex} currentIndex={index} />
          ))}
        </StyledDotContainer>

        <StyledCarouselDescriptionContainer>
          {levels.map((levelKey, index) => (
            <StyledCarouselDescription
              activeIndex={activeIndex}
              currentIndex={index}
            >
              <ul>
                {skillData[levelKey].description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </StyledCarouselDescription>
          ))}
        </StyledCarouselDescriptionContainer>
      </StyledCarouselInnerContainer>
    </StyledCarouselContainer>
  );
};

export default SkillCarousel;
