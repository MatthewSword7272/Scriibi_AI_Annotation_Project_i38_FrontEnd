import processText from "api/processText";
import axios from "axios";
import React, { useState } from "react";
import { StyledButtonComponent } from "Styles/StyledButton";
import {
  StyledRadioButton,
  StyledRadioButtonContainer,
  StyledSkillButtonContainer,
  StyledSkillContainer,
} from "Styles/StyledRadioButton";

const ANNOTATE_URL = process.env.REACT_APP_TEXTPROCESSING_URL
const ANNOTATE_KEY = process.env.REACT_APP_TEXTPROCESSING_FUNCTION_KEY

const SkillSelector = ({ handleSkillChange, selectedSkill, skillData, setPresentingText, setComponents, text }) => {

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
    processText(ANNOTATE_URL, {
      skillID: 1,
      text: text
    }, ANNOTATE_KEY)
    .then((res) => res.data)
    .then((data) => {
      if (Object.keys(data).length > 0) {
        const highlightedText = data.annotations?.highlighted_text
        const componentsList = data['components_list']

        console.log("Components list", data.components_list.present)

        if (highlightedText) {
          setPresentingText(prev => prev = highlightedText)
        }

        setComponents({
          textComps: componentsList.present || [],
          missingComps: componentsList.missing || [],
          noteComps: componentsList.notes || []
        })

        if (data.annotations.note) {

        }

        console.log(data);
      }
      
    })
    .catch((error) => {
      console.log(error);
    })

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
      {isAnnotated 
        ? <StyledButtonComponent onClick={sendText}>Save</StyledButtonComponent> 
        : <StyledButtonComponent onClick={annotate}>Annotate</StyledButtonComponent>
      }
    </StyledSkillButtonContainer>
  </StyledSkillContainer>
  );
};

export default SkillSelector;
