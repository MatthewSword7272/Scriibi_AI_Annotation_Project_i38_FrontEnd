import axios from "axios";
import React from "react";
import { StyledButtonComponent } from "Styles/StyledButton";
import {
  StyledRadioButton,
  StyledRadioButtonContainer,
  StyledSkillButtonContainer,
  StyledSkillContainer,
} from "Styles/StyledRadioButton";

const SkillSelector = ({ handleSkillChange, selectedSkill, skillData, text }) => {

  const pronounURL = `${process.env.REACT_APP_API_URL}?code=${process.env.REACT_APP_API_CODE}`;

  const sendText = async () => {
    axios({
      method: 'post',
      url: pronounURL,
      headers: {
        "Content-Type": 'application/JSON'
      },
      data: {
        text: text
      },
    }).then( res => {
      console.log(res);
    }).catch( err => {
      console.log()
    })
  }

  console.log(text)

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
