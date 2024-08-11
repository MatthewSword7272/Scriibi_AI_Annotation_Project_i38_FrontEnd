import React from "react";
import { StyledButtonComponent } from "Styles/StyledButton";
import {
  StyledRadioButton,
  StyledRadioButtonContainer,
  StyledSkillButtonContainer,
  StyledSkillContainer,
} from "Styles/StyledRadioButton";

const SkillSelector = ({ handleSkillChange }) => {
  return (
    <StyledSkillContainer>
      <StyledRadioButtonContainer>
        <StyledRadioButton
          label="Punctuation"
          name="skill"
          value="0"
          checked={true}
          onChange={handleSkillChange}
        />
        <StyledRadioButton
          label="Vocabulary"
          name="skill"
          value="1"
          onChange={handleSkillChange}
        />
        <StyledRadioButton
          label="Cohesion"
          value="2"
          name="skill"
          onChange={handleSkillChange}
        />
        <StyledRadioButton
          label="Sentence Type and Structure"
          value="3"
          name="skill"
          onChange={handleSkillChange}
        />
        <StyledRadioButton
          label="Developing & Elaborating Ideas"
          value="4"
          name="skill"
          onChange={handleSkillChange}
        />
      </StyledRadioButtonContainer>
      <StyledSkillButtonContainer>
        <StyledButtonComponent>Save</StyledButtonComponent>
      </StyledSkillButtonContainer>
    </StyledSkillContainer>
  );
};

export default SkillSelector;
