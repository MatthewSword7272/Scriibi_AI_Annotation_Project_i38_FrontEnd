import React, { useState } from "react";
import {
  StyledArrowButtonLeft,
  StyledArrowButtonRight,
  StyledCarouselContainer,
  StyledCarouselDot,
  StyledDotContainer,
  StyledCarouselDescription,
  StyledH4,
  StyledCarouselDescriptionContainer,
  StyledLevelHeadingInnerContainer,
  StyledLevelHeadingContainer
} from "../Styles/StyledCarousel";

const SkillCarousel = ({ skillData }) => {
  const levels = Object.keys(skillData).filter((key) => key.startsWith("Level"));
  const [activeIndex, setActiveIndex] = useState(1); //Start at the Middle Carousel Item

  const nextSlide = () => {
    activeIndex !== Object.keys(skillData).length - 1 &&
      setActiveIndex(activeIndex + 1);
  };

  const prevSlide = () => {
    activeIndex !== 0 && setActiveIndex(activeIndex - 1);
  };


  return (
    <StyledCarouselContainer>
        <StyledLevelHeadingContainer>
          <StyledArrowButtonLeft onClick={prevSlide} />
          <StyledLevelHeadingInnerContainer>
            {levels.map((levelKey, index) => (
              <StyledH4 index={index} activeIndex={activeIndex}>
                {skillData[levelKey].title}
              </StyledH4>
            ))}
          </StyledLevelHeadingInnerContainer>
          <StyledArrowButtonRight onClick={nextSlide} />
          </StyledLevelHeadingContainer>
        
        <StyledDotContainer activeIndex={activeIndex} totalItems={levels.length}>
          {levels.map((_, index) => (
            <StyledCarouselDot key={index} activeIndex={activeIndex} currentIndex={index} />
          ))}
        </StyledDotContainer>

        <StyledCarouselDescriptionContainer>
          {levels.map((levelKey, index) => (
            <StyledCarouselDescription activeIndex={activeIndex} currentIndex={index}>
              <ul>
                {skillData[levelKey].description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </StyledCarouselDescription>
          ))}
        </StyledCarouselDescriptionContainer>
    </StyledCarouselContainer>
  );
};

export default SkillCarousel;
