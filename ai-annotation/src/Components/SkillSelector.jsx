import axios from "axios";
import { NLP_URL } from "Constraints/constants";
import React from "react";
import { StyledButtonComponent } from "Styles/StyledButton";
import {
  StyledRadioButton,
  StyledRadioButtonContainer,
  StyledSkillButtonContainer,
  StyledSkillContainer,
} from "Styles/StyledRadioButton";

const SkillSelector = ({ handleSkillChange, selectedSkill, skillData, text }) => {

  const sendText = () => {
    axios({
      method: 'post',
      url: NLP_URL,
      data: {
        text: text
      },
    }).then( res => {
      console.log(res);
    }).catch( err => {
      console.log()
    })
  }

  return (
    <StyledSkillContainer>
    <StyledRadioButtonContainer>
    {Object.keys(skillData).map((skillName, index) => (
       <StyledRadioButton
        label={skillName}
        key={index}
        name="skill"
        value={index.toString()}
        checked={selectedSkill === index}
        onChange={handleSkillChange}
     />
    ))}
    </StyledRadioButtonContainer>
    <StyledSkillButtonContainer>
      <StyledButtonComponent>Annotate</StyledButtonComponent>
    </StyledSkillButtonContainer>
    <StyledSkillButtonContainer>
      <StyledButtonComponent onClick={sendText}>Save</StyledButtonComponent>
    </StyledSkillButtonContainer>
  </StyledSkillContainer>
  );
};

export default SkillSelector;
