import sendOriginalTextSample from "api/sendHumanAnnotation";
import axios from "axios";
import React, { useState } from "react";
import { StyledButtonComponent } from "Styles/StyledButton";
import {
  StyledRadioButton,
  StyledRadioButtonContainer,
  StyledSkillButtonContainer,
  StyledSkillContainer,
} from "Styles/StyledRadioButton";

const API_KEY = process.env.REACT_APP_CONTENT_FUNCTION_KEY;
const API_URL = process.env.REACT_APP_CONTENT_FUNCTION_URL;

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
      console.log(err)
    })
  }

  const annotate = () => {
    setIsAnnotated(true);

    let reqBody = {
      text: text,
      skillLevelId: selectedSkill,
    }
    
    sendOriginalTextSample(API_URL, reqBody, API_KEY)
    .then((res) => res.data)
    .then((data) => {
      console.log('Inserted ID: ', data);
    })
    .catch((err) => {
      console.log(err);
    })
    //This will annotate the text and switch between the Buttons between Annotate to Save
  }

  return (
    <StyledSkillContainer>
    <StyledRadioButtonContainer>
    {skillData.map((skill, index) => (
       <StyledRadioButton
        label={skill.name}
        key={index + 1}
        name="skill"
        value={(index + 1).toString()}
        checked={selectedSkill === (index + 1)}
        onChange={handleSkillChange}
     />
    ))}
    </StyledRadioButtonContainer>
    <StyledSkillButtonContainer>
      {isAnnotated 
        ? <StyledButtonComponent onClick={sendText}>Save</StyledButtonComponent> 
        : <StyledButtonComponent onClick={annotate}>Annotate</StyledButtonComponent>
      }
    </StyledSkillButtonContainer>
  </StyledSkillContainer>
  );
};

export default SkillSelector;
