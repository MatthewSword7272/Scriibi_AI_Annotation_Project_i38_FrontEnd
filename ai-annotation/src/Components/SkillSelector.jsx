import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import axios from "axios";
import React, { useRef } from "react";
import { StyledButtonComponent } from "Styles/StyledButton";
import {
  StyledRadioButton,
  StyledRadioButtonContainer,
  StyledSkillButtonContainer,
  StyledSkillContainer,
} from "Styles/StyledRadioButton";

const SkillSelector = ({ handleSkillChange, selectedSkill, skillData, text, skillAnnotated, setSkillAnnotated, setFirstTime, firstTime }) => {

  const pronounURL = `${process.env.REACT_APP_API_URL}?code=${process.env.REACT_APP_API_CODE}`;
  const toastInstance = useRef(null);
  const TOAST_POSITION = { X: 'center', Y: 'top' };

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
      showToast('Text has been saved', 'Success', 'success', 'e-check');
    }).catch( err => {
      console.log(err);
      showToast('Text was not saved', 'Error', 'danger', 'e-circle-close');
      
    })
  }

  const annotate = () => {
    if (!firstTime) {
      setFirstTime(true);
    }
    setSkillAnnotated(prevState => ({ ...prevState, [selectedSkill]: true })) //This will annotate the text and switch between the Buttons between Annotate to Save
  }

  const showToast = (message, title, toastClass, icon) => {
    if (toastInstance.current) {
      toastInstance.current.show({ title: title, content: message, cssClass: `e-toast-${toastClass}`, icon: `e-icons ${icon}` });
    }
  };

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
      {skillAnnotated[selectedSkill]
        ? <StyledButtonComponent onClick={sendText}>Save</StyledButtonComponent> 
        : <StyledButtonComponent onClick={annotate}>Annotate</StyledButtonComponent>
      }
    </StyledSkillButtonContainer>

    <ToastComponent
      ref={toastInstance}
      position={TOAST_POSITION}
    />
  </StyledSkillContainer>
  );
};

export default SkillSelector;
