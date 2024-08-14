import React from "react";
import { StyledButtonComponent } from "Styles/StyledButton";
import {
  StyledCheckBox,
  StyledCheckBoxContainer,
  StyledSkillButtonContainer,
  StyledSkillContainer,
} from "Styles/StyledCheckBox";

const SkillSelector = ({ skillData, nextSkill, checkedBoxes }) => {

  return (
    <StyledSkillContainer>
    <StyledCheckBoxContainer>
    {Object.keys(skillData).map((skillName, index) => (
       <StyledCheckBox
        label={skillName}
        key={index}
        value={skillName}
        checked={checkedBoxes.includes(skillName)}
     />
    ))}
    </StyledCheckBoxContainer>
    <StyledSkillButtonContainer>
      <StyledButtonComponent onClick={nextSkill}>Save</StyledButtonComponent>
    </StyledSkillButtonContainer>
  </StyledSkillContainer>
  );
};

export default SkillSelector;
