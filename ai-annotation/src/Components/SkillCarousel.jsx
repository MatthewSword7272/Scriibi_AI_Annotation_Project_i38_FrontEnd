import React from "react";
import { StyledArrowButtonLeft, StyledArrowButtonRight, StyledCarouselContainer, StyledCarouselDesc, StyledCarouselInnerContainer } from "../Styles/StyledCarousel";

const SkillCarousel = (skillData) => {
    return ( 
        <StyledCarouselContainer>
        <StyledArrowButtonLeft/>
        <StyledCarouselInnerContainer>
        {Object.keys(skillData).filter((key) => key.startsWith("Level")).map((levelKey) => (
            <StyledCarouselDesc key={levelKey}>
              <h2>{skillData[levelKey].title}</h2>
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
          <StyledArrowButtonRight/>
      </StyledCarouselContainer>
    );
}
 
export default SkillCarousel;