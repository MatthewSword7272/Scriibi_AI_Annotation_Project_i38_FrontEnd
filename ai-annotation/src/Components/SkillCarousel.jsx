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

const SkillCarousel = ({ skillData, skillsList}) => {
  const [selectedLevel, setSelectedLevel] = useState(null); 
  const [gridCentre, setGridCentre] = useState(0); //Start at the Middle Carousel Item
  const [carouselLimit, setCarouselLimit] = useState({
    leftLimit: 4,
    rightLimit: 6,
  })
  const MOVE_LIMIT = 1

  const moveLeft = () => {
    setGridCentre((prevIndex) => 
      prevIndex < MOVE_LIMIT ? prevIndex + 1 : prevIndex
    );
    setCarouselLimit((prev) => {
      return {
        leftLimit: prev.leftLimit--,
        rightLimit: prev.rightLimit--,
      }
    });
  };

  const moveRight = () => {
    setGridCentre((prevIndex) => 
      prevIndex > -MOVE_LIMIT ? prevIndex - 1 : prevIndex
    );
    setCarouselLimit((prev) => {
      return {
        leftLimit: prev.leftLimit++,
        rightLimit: prev.rightLimit++,
      }
    });
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
          {skillData.map((detail, _) => (
            <>
              <StyledH4 key={(parseInt(detail.level_id) - 1)/2}>{(parseInt(detail.level_id) - 1)/2}</StyledH4>
              <StyledH4 key={(parseInt(detail.level_id))/2}>{(parseInt(detail.level_id))/2}</StyledH4>
            </>
          ))}
          {/* {skillData.filter((levelDetail) => Math.floor(levelDetail.level_id/2) >= carouselLimit.leftLimit && Math.floor(levelDetail.level_id/2) <= carouselLimit.rightLimit).map((detail, _) => (
            <>
              <StyledH4 key={(parseInt(detail.level_id) - 1)/2}>{(parseInt(detail.level_id) - 1)/2}</StyledH4>
              <StyledH4 key={(parseInt(detail.level_id))/2}>{(parseInt(detail.level_id))/2}</StyledH4>
            </>
          ))} */}
        </StyledCarouselRow>
        <StyledCarouselRow>
          <StyledDotContainer>
            <StyledDotInnerContainer gridCentre={gridCentre}>
            {skillData.map((detail, index) => (
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
          {skillData.map((detail, index) => (
            index % 2 === 0 && (
              <StyledCarouselDescription key={index/2}>
                <ul>
                  {
                    detail.criteria.split('\n').map((criterion, index) =>
                      (<li key={index}>{criterion}</li>)
                    )
                  }
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
