import { StyledBodyContainer, StyledSubBodyContainer1, StyledSubBodyContainer2 } from "../Styles/StyledBody";
import * as Constants from "../Constraints/constants";
import { AccordionItemDirective, AccordionItemsDirective,} from "@syncfusion/ej2-react-navigations";
import { StyledAccordionComponent } from "../Styles/StyledAccordion";
import { StyledEditButton, StyledEditButtonContainer,StyledEditContainer, StyledEditInnerContainer} from "../Styles/StyledEditContainer";
import { StyledAccordionContainer, StyledAccordionMissingContainer} from "../Styles/StyledAccordionContainer";
import { StyledRichTextEditor } from "../Styles/StyledTextArea";
import TestText from "../testText.json"
import testSkillsInfo from '../testSkilsInfo'
import React, { useEffect, useState } from "react";
import { HtmlEditor, Inject, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import skillsInterface from "../Interfaces/SkillsInterface";
import SkillCarousel from "./SkillCarousel";
import SkillSelector from "./SkillSelector";

function Home() {

  const colours  = [
    "#B1E1B7",
    "#E5F9B5",
    "#F9ADF5",
    "#B3EEFB",
    "#B5D6D3"
  ]

  const fetchedText = TestText.test;
  // const parser = new DOMParser();
  // const startingText =  parser.parseFromString(fetchedText, "text/html")

  //So far it only adds marks to strings. We need to further develop this.

  const [text, setText] = useState("");
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [presentingText, setPresentingText] = useState(fetchedText);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  const skillData = testSkillsInfo[skillsInterface[selectedSkill]]; //Use Interface to get Skills Level and Description

  const createHighlight = () => {
    const updatedHighlights = [...highlightedWords, text];
    setHighlightedWords(updatedHighlights);
    
    // Update the highlighted text
    highlightText(updatedHighlights); //.body.innerHTML
    
  };

  const nextSkill = () => {
    const allSkills = Object.keys(testSkillsInfo);
    setSelectedSkill(selectedSkill + 1);

    if (checkedBoxes.length < allSkills.length) {
      setCheckedBoxes(prev => [...prev, allSkills[prev.length]]);
    }
  } 

  const highlightText = (highlights) => {
    // Skip existing <mark> tags
    const regex = new RegExp(`(<mark[^>]*>[^<]*</mark>|${highlights.join("|")})`, "gi");
    const annotatedText = fetchedText.replace(regex, (match) => 
      match.startsWith('<mark') ? match : `<mark class="highlight" style="background-color: ${colours[generateRandomColour()]}; cursor: pointer;" data-highlight">${match}</mark>`
    );

    //Update the presenting text
    setPresentingText(annotatedText);
    //Resets the getText back to default
    setText("");
  };

  const deleteHighlight = (element) => {
    if (element && element.parentNode) {
      const text = element.textContent;
      const textNode = document.createTextNode(text);
      element.parentNode.replaceChild(textNode, element);

      setHighlightedWords(prevHighlightedWords => {
      const newArray = prevHighlightedWords.filter(word => word !== text);
      highlightText(newArray);
      return newArray;
    });
    }
    
  }

  const generateRandomColour = () => { //Select colour
    return Math.floor(Math.random() * colours.length);
  }

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
      if (event.target.matches(".highlight") || event.target.matches("[data-highlight]")) {
        deleteHighlight(event.target);
      }
    };
  
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener("click", handleDeleteHighlight);
  
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener("click", handleDeleteHighlight);
    };
  }, [deleteHighlight, highlightedWords]);

  return (
    <StyledBodyContainer>
      <StyledSubBodyContainer1>
      <SkillSelector skillData={testSkillsInfo} nextSkill={nextSkill} checkedBoxes={checkedBoxes}/>
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
                onClick={() => text !== "" && createHighlight()}
                // isToggle={true}
                iconCss="e-icons e-edit-2"
              ></StyledEditButton>
            </StyledEditButtonContainer>
            <StyledEditButtonContainer color={Constants.ORANGE}>
              <h6>Delete</h6>
              <StyledEditButton
                // isToggle={true}
                iconCss="e-icons e-delete-2"
              ></StyledEditButton>
            </StyledEditButtonContainer>
          </StyledEditInnerContainer>
        </StyledEditContainer>
      </StyledSubBodyContainer2>
    </StyledBodyContainer>
  )
}

export default Home;
