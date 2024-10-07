import React, { useCallback, useEffect, useState } from "react";
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
  // const [gridCentre, setGridCentre] = useState(0); //Start at the Middle Carousel Item
  const [carouselLimit, setCarouselLimit] = useState({
    leftLimit: 4,
    rightLimit: 6,
  });
  const MOVE_LIMIT = 1;

  const [filteredData, setFilterData] = useState([]);
  const moveLeft = () => {
    // setGridCentre((prevIndex) => 
    //   prevIndex < MOVE_LIMIT ? prevIndex + 1 : prevIndex
    // );

    setCarouselLimit((prev) => {
      return {
        leftLimit: prev.leftLimit--,
        rightLimit: prev.rightLimit--,
      }
    });
  };

  const moveRight = () => {
    // setGridCentre((prevIndex) => 
    //   prevIndex > -MOVE_LIMIT ? prevIndex - 1 : prevIndex
    // );

    setCarouselLimit((prev) => {
      return {
        leftLimit: prev.leftLimit++,
        rightLimit: prev.rightLimit++,
      }
    });
  };

  useEffect(() => {
      setFilterData(skillData.filter(criterion => (criterion.level_id <= (carouselLimit.rightLimit*2 + 1) && criterion.level_id >= (carouselLimit.leftLimit*2 + 1))))
  }, [carouselLimit.leftLimit, carouselLimit.rightLimit, skillData]);

  useEffect(() => {
    setCarouselLimit({
      leftLimit: 4,
      rightLimit: 6
    });
  }, [skillData])

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
        <StyledCarouselRow >
          {filteredData.map((detail, _) => (
            <>
              <StyledH4 key={(parseInt(detail.level_id) - 1)/2}>{(parseInt(detail.level_id) - 1)/2}</StyledH4>
            </>
          ))}
        </StyledCarouselRow>
        <StyledCarouselRow>
          <StyledDotContainer>
            <StyledDotInnerContainer>
            {filteredData.map((detail, index) => (
              <StyledCarouselDot 
                key={index}
                isActive={index === selectedLevel}
                onClick={() => chooseLevel(index)}
              />
            ))}
            </StyledDotInnerContainer>
          </StyledDotContainer>
        </StyledCarouselRow>
        <StyledCarouselRow>
          {filteredData.map((detail, index) => (
            index % 2 === 0 && (
              <StyledCarouselDescription key={index/2}>
                <ul>
                  {
                    detail.criteria.split('\n').filter(criterion => criterion !== "").map((criterion, index) =>
                      (<li key={index}>{criterion}</li>)
                    )
                  }
                </ul>
              </StyledCarouselDescription>
            )
          ))}
        </StyledCarouselRow>
        {/* Another approach
        {skillData.map((detail, index) => (
          <StyledCarouselInnerContainer>
            <StyledCarouselRow gridCentre={gridCentre}>
              <StyledH4 key={(parseInt(detail.level_id) - 1)/2}>{(parseInt(detail.level_id) - 1)/2}</StyledH4>
            </StyledCarouselRow>
            <StyledCarouselDot 
                key={index}
                isActive={((index - 1)/2) === selectedLevel}
                onClick={() => chooseLevel((parseInt(detail.level_id) - 1)/2)}
              />
            <StyledCarouselDescription key={index/2}>
                <ul>
                  {
                    detail.criteria.split('\n').map((criterion, index) =>
                      (<li key={index}>{criterion}</li>)
                    )
                  }
                </ul>
            </StyledCarouselDescription>
          </StyledCarouselInnerContainer>
        ))} */}
    </StyledCarouselInnerContainer>
  </StyledCarouselContainer>
  );
};

export default SkillCarousel;
