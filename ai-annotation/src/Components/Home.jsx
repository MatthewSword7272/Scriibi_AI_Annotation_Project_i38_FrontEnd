import { StyledBodyContainer, StyledSubBodyContainer2 } from "../Styles/StyledBody";
import * as Constants from "../constants";
import { AccordionItemDirective, AccordionItemsDirective,} from "@syncfusion/ej2-react-navigations";
import { StyledAccordionComponent } from "../Styles/StyledAccordion";
import { StyledEditButton, StyledEditButtonContainer,StyledEditContainer, StyledEditInnerContainer} from "../Styles/StyledEditContainer";
import { StyledAccordionContainer, StyledAccordionMissingContainer,} from "../Styles/StyledAccordionContainer";
import { StyledRadioButtonContainer, StyledRadioButton, StyledSkillButtonContainer, StyledSkillContainer} from "../Styles/StyledRadioButton";
import { StyledTextAreaWrapper } from "../Styles/StyledTextArea";
import { StyledButtonComponent } from "../Styles/StyledButton";
import TestText from "../testText.json"
import React, { useEffect, useState } from "react";
import { HtmlEditor, Inject, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

function Home() {

  const fetchedText = TestText.test;

  const [text, setText] = useState("");
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [presentingText, setPresentingText] = useState(fetchedText);

  const saveHighlight = () => {
    const updatedHighlights = [...highlightedWords, text];
    setHighlightedWords(updatedHighlights);
    
    // Update the highlighted text
    const highlightedText = highlightText(fetchedText, updatedHighlights);
    setPresentingText(highlightedText);
    setText("");
  };

  const highlightText = (text, highlights) => {
    const regex = new RegExp(`(${highlights.join("|")})`, "gi");
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
  }

  const aspContent = () => {
    return (
      <div>
        Microsoft ASP.NET is a set of technologies in the Microsoft .NET
        Framework for building Web applications and XML Web services.
      </div>
    );
  };

  useEffect(() => {
    const handleSelectionChange = () => {
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
            <StyledRadioButton label="Skill 1" name="skill" />
            <StyledRadioButton label="Skill 2" name="skill" />
            <StyledRadioButton label="Skill 3" name="skill" />
            <StyledRadioButton label="Skill 4" name="skill" />
            <StyledRadioButton label="Skill 5" name="skill" />
          </StyledRadioButtonContainer>
          <StyledSkillButtonContainer>
            <StyledButtonComponent>Save</StyledButtonComponent>
          </StyledSkillButtonContainer>
        </StyledSkillContainer>

       <StyledTextAreaWrapper>
          <RichTextEditorComponent value={presentingText}>
            <Inject services={[Toolbar, HtmlEditor]}/>
          </RichTextEditorComponent>
        </StyledTextAreaWrapper>
        
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
