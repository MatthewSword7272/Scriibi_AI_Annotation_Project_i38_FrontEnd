import sendOriginalTextSample from "api/sendOriginalTextSample";
import { ToastComponent } from "@syncfusion/ej2-react-notifications";
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
import sendHumanAnnotatedSample from "api/sendHumanAnnotation";
import sendTextSample from "api/sendTextSample";
import sendMachineAnnotation from "api/sendMachineAnnotation";
import makeText from "function/makeText";

const CONTENT_API_KEY = process.env.REACT_APP_CONTENT_FUNCTION_KEY;
const CONTENT_API_URL = process.env.REACT_APP_CONTENT_FUNCTION_URL;

const ANNOTATE_URL = process.env.REACT_APP_TEXTPROCESSING_URL;
const ANNOTATE_KEY = process.env.REACT_APP_TEXTPROCESSING_FUNCTION_KEY;
// let sampleId = 0; // Sample ID.

const SkillSelector = ({ handleSkillChange, setHighlightedWords, selectedSkill, skillData, text, skillAnnotated, setSkillAnnotated, firstTime, setFirstTime, setPresentingTexts, setComponents, skillLevel, setDialogText}) => {
  const toastInstance = useRef(null);
  const TOAST_POSITION = { X: 'center', Y: 'top' };
  const [isLoading, setIsLoading] = useState(false);
  const [sampleId, setSampleId] = useState(0); // Sample ID.

  const sendText = async () => {
    let reqBody = {
      sampleId: sampleId,
      // text: makeText(text[selectedSkill]), // Temporary wait for back-end to included embedded data attr in <mark>
      text: text[selectedSkill],
      skillLevelId: skillLevel,
    }

    if(skillLevel) {
      await sendHumanAnnotatedSample(CONTENT_API_URL, reqBody, CONTENT_API_KEY)
      .then((res) => res.data)
      .then((data) => {
        showToast(`Text has been saved ${data}`, 'Success', 'success', 'e-check');
      })
      .catch(err => {
        showToast('Fail to save text, please contact your admin', 'danger', 'danger', 'e-circle-remove-2');
      })
    }
    else showToast('Please select a grade', 'Warning', 'warning', 'e-warning')
  }

  const annotate = async () => {
    let textSampleId = sampleId; // A local variable store the latest state of sampleId

    setIsLoading(true);

    if (!firstTime) {
      setFirstTime(true);
    }

    // send text sample and send original text sample (run only once at the start)
    if(sampleId === 0) {
      await sendTextSample(CONTENT_API_URL, "", CONTENT_API_KEY)
      .then((res) => res.data)
      .then((data) => {
        setSampleId((prev) => data); // Set state
        textSampleId = data; // Get the latest value of sampleId

        let reqBody = {
          text: text[0],
          sampleId: data,
        }
    
        sendOriginalTextSample(CONTENT_API_URL, reqBody, CONTENT_API_KEY)
        .then((res) => res.data)
        .then((data) => {
          console.info('Inserted ID: ', data);
        })
        .catch((err) => {
          console.error(err);
          showToast('Fail to save text, please contact your admin', 'danger', 'danger', 'e-circle-remove-2');
        })
      })
      .catch((err) => {
        console.error(err);
        showToast('Fail to save text, please contact your admin', 'danger', 'danger', 'e-circle-remove-2');
      })
      .finally(() => {
        showToast(`Orginal Text saved successfully, sample ID: ${textSampleId}`, 'Success', 'success', 'e-check');
      })
    }

    await processText(ANNOTATE_URL, {
      skillID: selectedSkill + 1,
      text: text[selectedSkill],
    }, ANNOTATE_KEY)
    .then((res) => res.data)
    .then((data) => {

      // Handle response from back-end to highlight the writing piece
      if (Object.keys(data).length > 0) {
        const highlightedText = data.annotations?.highlighted_text;
        const componentsList = data['components_list'];

        // Debugging
        console.log("Components list", data.components_list.present)

        if (highlightedText) {
          setPresentingTexts(prev => ({...prev, [selectedSkill]: highlightedText}))

          setHighlightedWords(prev => ({
            ...prev,
            [selectedSkill]: parseHighlightedText(highlightedText)
          }));
        }

        if (Object.keys(componentsList).length > 0) {
          console.log(data.missing);
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

        if (data.annotations.notes) {
          setDialogText(prev => ({
            ...prev,
            [selectedSkill]: data.annotations.notes
          })); // Send note to dialogs
        }
        else {
          setDialogText("No notes"); // Handle empty notes
        }

        // Send data to DB
        const reqBody = {
          text: highlightedText,
          // text: makeText(highlightedText), // Temporary wait for back-end to included embedded data attr in <mark>
          sampleId: textSampleId,
        }
        sendMachineAnnotation(CONTENT_API_URL, reqBody, CONTENT_API_KEY)
        .then((res) => res.data)
        .then((data) => {
          showToast(`Machine annotation save successfully, ID: ${data}`, 'Success', 'success', 'e-check');
        })
        .catch(err => { console.error(err) })
      }      
    })
    .catch((error) => {
      console.error(error);
    }).finally(() => {
      setIsLoading(false);
      showToast(`Machine annotated successfully`, 'Success', 'success', 'e-check');
    });
    
    
    setSkillAnnotated(prevState => ({ ...prevState, [selectedSkill]: true }))
  }

  const parseHighlightedText = (text) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const highlights = [];
    let currentIndex = 0;

    doc.body.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        currentIndex += node.textContent.length;

      } else if (node.nodeName === 'MARK') {
      
        highlights.push({
          text: node.textContent,
          // @ts-ignore
          component: node.dataset.componentName,
          index: currentIndex,
          subComponent: {
            // @ts-ignore
            subText: node.dataset.subcomponentText || "",
            // @ts-ignore
            subBackground: node.style.getPropertyValue('--subcomponent-background') || ""
          }
        });
        currentIndex += node.textContent.length;
      }
    });
  
    return highlights;
  };

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
