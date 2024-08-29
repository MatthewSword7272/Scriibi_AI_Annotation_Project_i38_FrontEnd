import React, { useState } from "react";
import {
  StyledArrowButtonLeft,
  StyledArrowButtonRight,
  StyledArrowContainer,
  StyledCarouselContainer,
  StyledCarouselDescription,
  StyledCarouselDot,
  StyledCarouselInnerContainer,
  StyledCarouselRow,
  StyledDotContainer,
  StyledDotInnerContainer,
  StyledH4,
} from "../Styles/StyledCarousel";

const SkillCarousel = ({ skillData }) => {
  const levels = Object.keys(skillData).filter((key) => key.startsWith("Level"));
  const [selectedLevel, setSelectedLevel] = useState(null); 
  const [gridCentre, setGridCentre] = useState(0); //Start at the Middle Carousel Item

  const moveLeft = () => {
    setGridCentre((prevIndex) => 
      prevIndex < Math.round(levels.length / 2) ? prevIndex + 1 : prevIndex
    );
  };

  const moveRight = () => {
    setGridCentre((prevIndex) => 
      prevIndex > -Math.round(levels.length / 2) ? prevIndex - 1 : prevIndex
    );
  };

  const chooseLevel = (index) => {
    setSelectedLevel(index);
  }


  return (
    <StyledCarouselContainer>
      <StyledArrowContainer>
        <StyledArrowButtonLeft onClick={moveLeft} />
        <StyledArrowButtonRight onClick={moveRight} />
      </StyledArrowContainer>
    <StyledCarouselInnerContainer>
        <StyledCarouselRow gridCentre={gridCentre}>
          {levels.map((levelKey, index) => (
            <StyledH4 key={index}>{skillData[levelKey].title}</StyledH4>
          ))}
        </StyledCarouselRow>
        <StyledCarouselRow>
          <StyledDotContainer>
            <StyledDotInnerContainer gridCentre={gridCentre}>
            {levels.map((_, index) => (
              <StyledCarouselDot 
                key={index}
                isActive={index === selectedLevel}
                onClick={() => chooseLevel(index)}
              />
            ))}
            </StyledDotInnerContainer>
          </StyledDotContainer>
        </StyledCarouselRow>
        <StyledCarouselRow gridCentre={gridCentre}>
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
    </StyledCarouselInnerContainer>
  </StyledCarouselContainer>
  );
};

export default SkillCarousel;
