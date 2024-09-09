import axios from "axios";
import React, { useState } from "react";
import { StyledButtonComponent } from "Styles/StyledButton";
import {
  StyledRadioButton,
  StyledRadioButtonContainer,
  StyledSkillButtonContainer,
  StyledSkillContainer,
} from "Styles/StyledRadioButton";

const SkillSelector = ({ handleSkillChange, selectedSkill, skillData, text }) => {

  const pronounURL = `${process.env.REACT_APP_API_URL}?code=${process.env.REACT_APP_API_CODE}`;
  const [isAnnotated, setIsAnnotated] = useState(false);

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

  const annotate = () => {
    setIsAnnotated(true); //This will annotate the text and switch between the Buttons between Annotate to Save
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
      <StyledButtonComponent onClick={annotate} disabled={isAnnotated}>Annotate</StyledButtonComponent>
    </StyledSkillButtonContainer>
    <StyledSkillButtonContainer>
      <StyledButtonComponent onClick={sendText} disabled={!isAnnotated}>Save</StyledButtonComponent>
    </StyledSkillButtonContainer>
  </StyledSkillContainer>
  );
};

export default SkillSelector;
