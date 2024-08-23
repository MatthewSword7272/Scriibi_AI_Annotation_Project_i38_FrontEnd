import { 
  StyledBodyContainer, 
  StyledSubBodyContainer1, 
  StyledSubBodyContainer2 
} from "../Styles/StyledBody";
import * as Constants from "../Constraints/constants";
import { AccordionItemDirective, AccordionItemsDirective,} from "@syncfusion/ej2-react-navigations";
import { StyledAccordionComponent } from "../Styles/StyledAccordion";
import { 
  StyledEditButton, 
  StyledEditButtonContainer,
  StyledEditContainer, 
  StyledEditInnerContainer
} from "../Styles/StyledEditContainer";
import { StyledAccordionContainer, StyledAccordionMissingContainer} from "../Styles/StyledAccordionContainer";
import { StyledRichTextEditor } from "../Styles/StyledTextArea";
import TestText from "../testText.json"
import testSkillsInfo from '../testSkilsInfo'
import React, { useCallback, useEffect, useState } from "react";
import { HtmlEditor, Inject, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import skillsInterface from "../Interfaces/SkillsInterface";
import SkillCarousel from "./SkillCarousel";
import SkillSelector from "./SkillSelector";
import { COLOURS } from "Constraints/colours";

function Home() {

  const colours = shuffleArray(COLOURS);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const fetchedText = TestText.test;
  // const parser = new DOMParser();
  // const startingText =  parser.parseFromString(fetchedText, "text/html")

  //So far it only adds marks to strings. We need to further develop this.

  const [text, setText] = useState("");
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [presentingText, setPresentingText] = useState(fetchedText);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const skillData = testSkillsInfo[skillsInterface[selectedSkill]]; //Use Interface to get Skills Level and Description

  const createHighlight = () => {
    if (text) {
      const updatedHighlights = [...highlightedWords, text];
      setHighlightedWords(updatedHighlights);
    
      // Update the highlighted text
      highlightText(updatedHighlights); //.body.innerHTML
      setText(""); //Resets the getText back to default
    }
  };

  const handleSkillChange = (event) => {
    var skill = parseInt(event.target.value)
    setSelectedSkill(skill);
  };


  // const generateRandomColour = useCallback(() => { //Select colour
  //   return Math.floor(Math.random() * colours.length);
  // }, [colours.length])

  const highlightText = useCallback((highlights) => {
    let index = 0;
    const regex = new RegExp(`(<mark[^>]*>[^<]*</mark>|${highlights.join("|")})`, "gi");
    const annotatedText = fetchedText.replace(regex, (match) => {
      const color = colours[index % colours.length];
      index++;
      return `<mark class="highlight" style="background-color: ${color}; cursor: pointer;" data-highlight">${match}</mark>`
    });

    //Update the presenting text
    setPresentingText(annotatedText);
  }, [colours, fetchedText]);

  const deleteHighlight = useCallback((element) => {
    if (element && element.parentNode) {
      const textContent = element.textContent;
      element.parentNode.replaceChild(document.createTextNode(textContent), element);

      setHighlightedWords(prevHighlightedWords => {
        const newArray = prevHighlightedWords.filter(word => word !== textContent);
        highlightText(newArray);
        return newArray;
      });
    }
  }, [highlightText])

  

  const aspContent = () => { //Dummy Data
    return (
      <div>
        Microsoft ASP.NET is a set of technologies in the Microsoft .NET
        Framework for building Web applications and XML Web services.
      </div>
    );
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      // Get highlighted text and save state
      const selectedText = document.getSelection().toString();
      setText(selectedText.trim());
    };
  
    const handleDeleteHighlight = (event) => {
      if (isDeleteMode && (event.target.matches(".highlight") || event.target.matches("[data-highlight]"))) {
        deleteHighlight(event.target);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isAddingMode) {
          setIsAddingMode(false);
        }
        else if (isDeleteMode) {
          setIsDeleteMode(false);
        }
      }
    }
  
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener("click", handleDeleteHighlight);
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener("click", handleDeleteHighlight);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [deleteHighlight, isAddingMode, isDeleteMode]);

  return (
    <StyledBodyContainer>
      <StyledSubBodyContainer1>
      <SkillSelector handleSkillChange={handleSkillChange} selectedSkill={selectedSkill} skillData={testSkillsInfo}/>
        <SkillCarousel skillData={skillData}/>
        <StyledRichTextEditor value={presentingText}>
           {/* .body.innerHTML  */}
          <Inject services={[Toolbar, HtmlEditor]} />
        </StyledRichTextEditor>
      </StyledSubBodyContainer1>
      <StyledSubBodyContainer2>
        <StyledAccordionContainer>
          <h2>Notes</h2>
          <StyledAccordionComponent expandMode="Multiple" color={Constants.CAM}>
            <AccordionItemsDirective>
              <AccordionItemDirective
                expanded={false}
                header="ASP.NET"
                content={aspContent}
              />
              <AccordionItemDirective
                expanded={false}
                header="ASP.NET2"
                content={aspContent}
              />
            </AccordionItemsDirective>
          </StyledAccordionComponent>
        </StyledAccordionContainer>

        <StyledAccordionContainer>
          <h2>Annotation</h2>
          <StyledAccordionComponent expandMode="Multiple" color={Constants.CAM}>
            <AccordionItemsDirective>
              <AccordionItemDirective
                expanded={false}
                header="ASP.NET"
                content={aspContent}
              />
              <AccordionItemDirective
                expanded={false}
                header="ASP.NET2"
                content={aspContent}
              />
            </AccordionItemsDirective>
          </StyledAccordionComponent>
          <StyledAccordionMissingContainer>
            <h3>Missing</h3>

            <StyledAccordionComponent
              expandMode="Multiple"
              color={Constants.CAM}
            >
              <AccordionItemsDirective>
                <AccordionItemDirective
                  expanded={false}
                  header="ASP.NET3"
                  content={aspContent}
                />
                <AccordionItemDirective
                  expanded={false}
                  header="ASP.NET4"
                  content={aspContent}
                />
              </AccordionItemsDirective>
            </StyledAccordionComponent>
          </StyledAccordionMissingContainer>
        </StyledAccordionContainer>

        <StyledEditContainer>
          <h2>Edit</h2>
          <StyledEditInnerContainer>
            <StyledEditButtonContainer color={Constants.GREEN}>
              <h6>Add</h6>
              <StyledEditButton
                onClick={() => (text !== "" && !isDeleteMode) && createHighlight()}
                // isToggle={true}
                iconCss="e-icons e-edit-2"
              ></StyledEditButton>
            </StyledEditButtonContainer>
            <StyledEditButtonContainer color={Constants.ORANGE}>
              <h6>Delete</h6>
              <StyledEditButton
                isToggle={true}
                iconCss="e-icons e-delete-2"
                onClick={() => !isAddingMode && setIsDeleteMode(prevState => !prevState)}
              ></StyledEditButton>
            </StyledEditButtonContainer>
          </StyledEditInnerContainer>
        </StyledEditContainer>
      </StyledSubBodyContainer2>
    </StyledBodyContainer>
  )
}

export default Home;
