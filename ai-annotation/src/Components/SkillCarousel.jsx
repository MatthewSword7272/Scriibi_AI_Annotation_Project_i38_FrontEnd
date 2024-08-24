import React, { useState } from "react";
import {
  StyledArrowButtonLeft,
  StyledArrowButtonRight,
  StyledCarouselContainer,
  StyledCarouselDescription,
  StyledCarouselDot,
  StyledCarouselGrid,
  StyledCarouselInnerContainer,
  StyledCarouselRow,
  StyledDotContainer,
  StyledH4,
} from "../Styles/StyledCarousel";

const SkillCarousel = ({ skillData }) => {
  const levels = Object.keys(skillData).filter((key) => key.startsWith("Level"));
  const [selectedLevel, setSelectedLevel] = useState(null); 
  const [gridCentre, setGridCentre] = useState(0); //Start at the Middle Carousel Item

  const nextSlide = () => {
    setGridCentre((prevIndex) => 
      prevIndex < levels.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = () => {
    setGridCentre((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const chooseLevel = (index) => {
    setSelectedLevel(index);
  }


  return (
    <StyledCarouselContainer>
    <StyledArrowButtonLeft onClick={prevSlide} />
    <StyledCarouselInnerContainer gridCentre={gridCentre}>
      <StyledCarouselGrid>
        <StyledCarouselRow>
          
            {levels.map((levelKey, index) => (
              <StyledH4 key={index}>{skillData[levelKey].title}</StyledH4>
            ))}
            
        </StyledCarouselRow>
        <StyledCarouselRow>
          <StyledDotContainer>
            {levels.map((_, index) => (
              <StyledCarouselDot 
                key={index}
                isActive={index === selectedLevel}
                onClick={() => chooseLevel(index)}
              />
            ))}
          </StyledDotContainer>
        </StyledCarouselRow>
        <StyledCarouselRow>
          {levels.map((levelKey, index) => (
            index % 2 === 0 && (
              <StyledCarouselDescription key={index}>
                <ul>
                  {skillData[levelKey].description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>
              </StyledCarouselDescription>
            )
          ))}
        </StyledCarouselRow>
      </StyledCarouselGrid>
    </StyledCarouselInnerContainer>
    <StyledArrowButtonRight onClick={nextSlide} />
  </StyledCarouselContainer>
  );
};

export default SkillCarousel;
