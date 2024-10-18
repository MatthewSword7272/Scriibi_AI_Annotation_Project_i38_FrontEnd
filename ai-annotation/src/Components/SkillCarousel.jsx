import React, { useEffect, useState } from "react";
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
  const [selectedLevel, setSelectedLevel] = useState(null); 
  const [carouselLimit, setCarouselLimit] = useState({
    leftLimit: 4,
    rightLimit: 6,
  });

  const [filteredData, setFilterData] = useState([]);
  const moveLeft = () => {
    setCarouselLimit((prev) => {
      return {
        leftLimit: prev.leftLimit--,
        rightLimit: prev.rightLimit--,
      }
    });
  };

  const moveRight = () => {
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
        <StyledCarouselRow>
          {filteredData.map((detail, index) => (
            <React.Fragment key={index}>
              <StyledH4 key={(parseInt(detail.level_id) - 1)/2}>{(parseInt(detail.level_id) - 1)/2}</StyledH4>
            </React.Fragment>
          ))}
        </StyledCarouselRow>
        <StyledCarouselRow>
          <StyledDotContainer>
            <StyledDotInnerContainer>
            {filteredData.map((_, index) => (
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
    </StyledCarouselInnerContainer>
  </StyledCarouselContainer>
  );
};

export default SkillCarousel;
