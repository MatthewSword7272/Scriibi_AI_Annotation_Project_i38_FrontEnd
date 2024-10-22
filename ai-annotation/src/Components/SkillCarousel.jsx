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
import colorMapping from "function/setColorForCriteria";

const SkillCarousel = ({ skillData, textComponent, setGrade, flags}) => {
  const [selectedLevel, setSelectedLevel] = useState(null); 
  const [carouselLimit, setCarouselLimit] = useState({
    leftLimit: 4,
    rightLimit: 6,
  });

  const [filteredData, setFilterData] = useState([]);
  const moveLeft = () => {
    setCarouselLimit((prev) => {
      return {
        leftLimit: prev.leftLimit > 0? prev.leftLimit-- : prev.leftLimit,
        rightLimit: prev.rightLimit > 0? prev.rightLimit-- : prev.rightLimit,
      }
    });
  };

  const moveRight = () => {
    setCarouselLimit((prev) => {
      return {
        leftLimit: prev.leftLimit < 10? prev.leftLimit++ : prev.leftLimit,
        rightLimit: prev.rightLimit < 10? prev.rightLimit++ : prev.rightLimit,
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
    setGrade(index);
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
            {filteredData.map((criterion, index) => (
              <StyledCarouselDot 
                key={index}
                // @ts-ignore
                isActive={criterion.skill_level_id === selectedLevel}
                onClick={() => chooseLevel(criterion.skill_level_id)}
              />
            ))}
            </StyledDotInnerContainer>
          </StyledDotContainer>
        </StyledCarouselRow>
        <StyledCarouselRow>
          {textComponent.length? filteredData.map((detail, index) => (
            index % 2 === 0 && (
              <StyledCarouselDescription key={index/2} dangerouslySetInnerHTML={{__html: colorMapping(detail.criteria, textComponent)}}>
              </StyledCarouselDescription>
            )
          )) : ""}
        </StyledCarouselRow>
    </StyledCarouselInnerContainer>
  </StyledCarouselContainer>
  );
};

export default SkillCarousel;
