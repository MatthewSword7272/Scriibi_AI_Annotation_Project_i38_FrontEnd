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
import LoadingScreen from "Styles/StyledLoadingScreen";

const API_KEY = process.env.REACT_APP_CONTENT_FUNCTION_KEY;
const API_URL = process.env.REACT_APP_CONTENT_FUNCTION_URL;

const ANNOTATE_URL = process.env.REACT_APP_TEXTPROCESSING_URL;
const ANNOTATE_KEY = process.env.REACT_APP_TEXTPROCESSING_FUNCTION_KEY;

const SkillSelector = ({ handleSkillChange, selectedSkill, skillData, text, skillAnnotated, setSkillAnnotated, firstTime, setFirstTime, setPresentingTexts, setComponents}) => {
  const toastInstance = useRef(null);
  const TOAST_POSITION = { X: 'center', Y: 'top' };
  const [sampleId, setSampleId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const sendText = async () => {
    // axios({
    //   method: 'post',
    //   url: pronounURL,
    //   headers: {
    //     "Content-Type": 'application/JSON'
    //   },
    //   data: {
    //     text: text
    //   },
    // }).then( res => {
    //   console.log(res);
    //   showToast('Text has been saved', 'Success', 'success', 'e-check');
    // }).catch( err => {
    //   console.log(err);
    //   showToast('Text was not saved', 'Error', 'danger', 'e-circle-close');
    // })
    showToast('Text has been saved', 'Success', 'success', 'e-check');
  }

  const annotate = () => {
    
    setIsLoading(true);

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

        if (highlightedText) {
          setPresentingTexts(prev => ({...prev, [selectedSkill]: highlightedText}))
        }

        if (Object.keys(componentsList).length > 0) {
          console.log(data.missing);
          // console.log(componentsList.present.map(component => console.log("component", component)))
          setComponents(prev => {
            return {
            ...prev, 
            textComps: {
              ...prev.textComps,
              [selectedSkill]: componentsList.present,
            },
            missingComps: {
              ...prev.missingComps,
              [selectedSkill]: componentsList.missing,
            },
            notes: {  
              ...prev.notes,
            }
          }});
        }
        
      

        if (data.annotations.note) {
          console.log(data);
        }
      }      
    })
    .catch((error) => {
      console.log(error);
    }).finally(() => {
      setIsLoading(false);
    });
    
    
    setSkillAnnotated(prevState => ({ ...prevState, [selectedSkill]: true }))

    let reqBody = {
      text: text[0],
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
      {isLoading ? (
          <LoadingScreen text="Annotating..."/>
        ) : skillAnnotated[selectedSkill]
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
