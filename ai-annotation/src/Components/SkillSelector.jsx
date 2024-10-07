import sendOriginalTextSample from "api/sendOriginalTextSample";
import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import axios from "axios";
import React, { useRef, useState } from "react";
import { StyledButtonComponent } from "Styles/StyledButton";
import {
  StyledRadioButton,
  StyledRadioButtonContainer,
  StyledSkillButtonContainer,
  StyledSkillContainer,
} from "Styles/StyledRadioButton";
import processText from "api/processText";

const API_KEY = process.env.REACT_APP_CONTENT_FUNCTION_KEY;
const API_URL = process.env.REACT_APP_CONTENT_FUNCTION_URL;

const ANNOTATE_URL = process.env.REACT_APP_TEXTPROCESSING_URL
const ANNOTATE_KEY = process.env.REACT_APP_TEXTPROCESSING_FUNCTION_KEY

const SkillSelector = ({ handleSkillChange, selectedSkill, skillData, text, skillAnnotated, setSkillAnnotated, firstTime, setFirstTime, setPresentingText, setComponents}) => {
  const pronounURL = `${process.env.REACT_APP_API_URL}?code=${process.env.REACT_APP_API_CODE}`;
  const toastInstance = useRef(null);
  const TOAST_POSITION = { X: 'center', Y: 'top' };
  const [sampleId, setSampleId] = useState(0);

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

    processText(ANNOTATE_URL, {
      skillID: selectedSkill + 1,
      text: text[selectedSkill]
    }, ANNOTATE_KEY)
    .then((res) => res.data)
    .then((data) => {
      if (Object.keys(data).length > 0) {
        const highlightedText = data.annotations?.highlighted_text
        const componentsList = data['components_list']

        console.log("Components list", data.components_list.present)

        // if (highlightedText) {
        //   setPresentingText(highlightedText)
        // }

        // setComponents(prev => {
        //   console.log("previous comps", prev)
        //   return {
        //     textComps: {
        //       ...prev.textComps,
        //       ...componentsList.present
        //     },
        //     missingComps: {
        //       ...prev.missingComps,
        //       ...componentsList.missing
        //     }
        //   }
        // });
      

        if (data.annotations.note) {
        }

        console.log(data);
      }      
    })
    .catch((error) => {
      console.log(error);
    })
    
    
    setSkillAnnotated(prevState => ({ ...prevState, [selectedSkill]: true }))

    let reqBody = {
      text: text[selectedSkill],
    }

    sendOriginalTextSample(API_URL, reqBody, API_KEY)
    .then((res) => res.data)
    .then((data) => {
      console.log('Inserted ID: ', data);
      setSampleId(data);
    })
    .catch((err) => {
      console.log(err);
    })
    //This will annotate the text and switch between the Buttons between Annotate to Save
  }

  const showToast = (message, title, toastClass, icon) => {
    if (toastInstance.current) {
      toastInstance.current.show({ title: title, content: message, cssClass: `e-toast-${toastClass}`, icon: `e-icons ${icon}` });
    }
  };

  return (
    <StyledSkillContainer>

    <StyledRadioButtonContainer>
    {skillData.map((skill, index) => (
       <StyledRadioButton
        label={skill.name}
        key={index}
        name="skill"
        value={(index).toString()}
        checked={selectedSkill === (index)}
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
