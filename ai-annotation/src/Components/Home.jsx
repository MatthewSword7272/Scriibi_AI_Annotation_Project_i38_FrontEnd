import { StyledBodyContainer, StyledSubBodyContainer2 } from "../Styles/StyledBody";
import * as Constants from "../constants";
import { AccordionItemDirective, AccordionItemsDirective,} from "@syncfusion/ej2-react-navigations";
import { StyledAccordionComponent } from "../Styles/StyledAccordion";
import { StyledEditButton, StyledEditButtonContainer,StyledEditContainer, StyledEditInnerContainer} from "../Styles/StyledEditContainer";
import { StyledAccordionContainer, StyledAccordionMissingContainer,} from "../Styles/StyledAccordionContainer";
import { StyledRadioButtonContainer, StyledRadioButton, StyledSkillButtonContainer, StyledSkillContainer} from "../Styles/StyledRadioButton";
import { StyledRichTextEditor } from "../Styles/StyledTextArea";
import { StyledButtonComponent } from "../Styles/StyledButton";
import TestText from "../testText.json"
import testSkillsInfo from '../testSkilsInfo'
import React, { useEffect, useState } from "react";
import { HtmlEditor, Inject, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import skillsInterface from "../Interfaces/SkillsInterface";

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

  const skillData = testSkillsInfo[skillsInterface[selectedSkill]]; //Use Interface to get Skills Level and Description

  const saveHighlight = () => {
    const updatedHighlights = [...highlightedWords, text];
    setHighlightedWords(updatedHighlights);
    
    // Update the highlighted text
    const highlightedText = highlightText(presentingText, updatedHighlights); //.body.innerHTML
    //Update the presenting text
    setPresentingText(highlightedText);
    //Resets the getText back to default
    setText("");
  };

  const highlightText = (text, highlights) => {
    // Skip existing <mark> tags
    const regex = new RegExp(`(<mark[^>]*>[^<]*</mark>|${highlights.join("|")})`, "gi");
    return text.replace(regex, (match) => 
      match.startsWith('<mark') ? match : `<mark style="background-color: ${colours[generateRandomColour()]}">${match}</mark>`
    );
  };

  const generateRandomColour = () => {
    return Math.floor(Math.random() * colours.length);
  }

  const aspContent = () => {
    return (
      <div>
        Microsoft ASP.NET is a set of technologies in the Microsoft .NET
        Framework for building Web applications and XML Web services.
      </div>
    );
  };

  const handleSkillChange = (event) => {
    setSelectedSkill(parseInt(event.target.value));
  };

  useEffect(() => {
    const handleSelectionChange = (event) => {
      //Get Highlighted text and save State
      const activeSelection = document.getSelection();
      const selectedText = activeSelection.toString();
      setText(selectedText);
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <StyledBodyContainer>
      <div>
        <StyledSkillContainer>
          <StyledRadioButtonContainer>
            <StyledRadioButton
              label="Punctuation"
              name="skill"
              value="0"
              checked={true}
              onChange={handleSkillChange}
            />
            <StyledRadioButton
              label="Vocabulary"
              name="skill"
              value="1"
              onChange={handleSkillChange}
            />
            <StyledRadioButton
              label="Cohesion"
              value="2"
              name="skill"
              onChange={handleSkillChange}
            />
            <StyledRadioButton
              label="Sentence Type and Structure"
              value="3"
              name="skill"
              onChange={handleSkillChange}
            />
            <StyledRadioButton
              label="Developing & Elaborating Ideas"
              value="4"
              name="skill"
              onChange={handleSkillChange}
            />
          </StyledRadioButtonContainer>
          <StyledSkillButtonContainer>
            <StyledButtonComponent>Save</StyledButtonComponent>
          </StyledSkillButtonContainer>
        </StyledSkillContainer>

        <div>
          {Object.keys(skillData)
            .filter((key) => key.startsWith("Level"))
            .map((levelKey) => (
              <div key={levelKey}>
                <h2>{skillData[levelKey].title}</h2>
                <div>
                  <ul>
                    {skillData[levelKey].description.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>

        <StyledRichTextEditor value={presentingText}>
          {/* .body.innerHTML */}
          <Inject services={[Toolbar, HtmlEditor]} />
        </StyledRichTextEditor>
      </div>
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
                onClick={() => text !== "" && saveHighlight()}
                // isToggle={true}
                iconCss="e-icons e-edit-2"
              ></StyledEditButton>
            </StyledEditButtonContainer>
            <StyledEditButtonContainer color={Constants.RED}>
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
  );
}

export default Home;
