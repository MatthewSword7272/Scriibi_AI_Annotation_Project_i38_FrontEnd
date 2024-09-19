import React, { useCallback, useEffect, useState } from 'react';
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import * as Constants from "../Constraints/constants";
import { StyledSubBodyContainer2 } from 'Styles/StyledBody';
import { StyledAccordionComponent } from 'Styles/StyledAccordion';
import { StyledAccordionContainer, StyledAccordionMissingContainer } from 'Styles/StyledAccordionContainer';
import { StyledEditContainer, StyledEditInnerContainer, StyledEditButtonContainer, StyledEditButton } from 'Styles/StyledEditContainer';
import { StyledNotesButton } from 'Styles/StyledButton';
import { StyledDialogBox } from 'Styles/StyledDialogBox';

const SidePanel = ({
  isDeleteMode,
  isAddingMode,
  components,
  createHighlight,
  setIsAddingMode,
  setIsDeleteMode,
  setHighlightedWords,
  highlightText,
  updateComponents,
  setPresentingText
}) => {

  // States
  const [visibility, setDialogVisibility] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [selectedText, setSelectedText] = useState("");

  // Constants
  const DIALOG_BOX_POSITION = { X: 'right' };

  // useCallbacks
  const deleteHighlight = useCallback((element) => {
    if (element && element.parentNode) {
      const textContent = element.textContent.trim();
      const compID = element.id;
      element.parentNode.replaceChild(document.createTextNode(textContent), element);

      setHighlightedWords((prevHighlightedWords) => {
        const newArray = prevHighlightedWords.filter((word) => {
          return word.text !== textContent || word.component !== compID
        }
        );
        highlightText(newArray);
        return newArray;
      });

      // Check if there are no other highlights with the same compTitle
      const hasNoOtherHighlights = document.querySelectorAll(`[id="${compID}"]`).length === 0;

      if (hasNoOtherHighlights) {
        updateComponents('REMOVE_FROM_TEXT', { title: compID });
      }

      // Update presentingText
      setPresentingText((prevText) => prevText.replace(element.outerHTML, textContent));
    }
  }, [highlightText, setHighlightedWords, updateComponents, setPresentingText]);

  const showDialog = useCallback((title, text) => {
    setDialogTitle(title);
    setDialogText(text);
    setDialogVisibility(true);
  }, [])

  const handleDialogClick = useCallback(() => {
    showDialog("ASP.NET", "Actual content about ASP.NET");
  }, [showDialog]);

  const handleAccordionClick = useCallback((comp) => {

    if (isAddingMode && selectedText !== "") {
      createHighlight(comp, selectedText);
      setSelectedText("");
    }
  }, [createHighlight, isAddingMode, selectedText]);
  
  // useEffects
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      if (text !== "") {
        setSelectedText(text);
      } 
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    }
  }, []);

  useEffect(() => {
    const handleDeleteHighlight = (event) => {
      if (isDeleteMode && (event.target.matches(".highlight") || event.target.matches("[data-highlight]"))) {
        deleteHighlight(event.target);
      }
    };

    document.addEventListener("click", handleDeleteHighlight);

    return () => {
      document.removeEventListener("click", handleDeleteHighlight);
    }
  }, [deleteHighlight, isDeleteMode]);
  
  useEffect(() => {
    console.log('SidePanel received new components:', components);
    console.log('textComps:', components.textComps);
    console.log('missingComps:', components.missingComps);
  }, [components]);

  // Helper functions
  const dialogClose = () => setDialogVisibility(false);

  const onBeforeOpen = (args) => {
    args.maxHeight = "80%";
  };

  return (
    <StyledSubBodyContainer2>
      <StyledDialogBox
        header={dialogTitle}
        content={dialogText}
        showCloseIcon={true}
        visible={visibility}
        width="25vw"
        height="90vh"
        target="#target"
        resizeHandles={["South"]}
        enableResize={true}
        allowDragging={true}
        close={dialogClose}
        beforeOpen={onBeforeOpen}
        position={DIALOG_BOX_POSITION}
      />

      <StyledAccordionContainer>
        <h2>Notes</h2>
        <StyledNotesButton color={Constants.CAM} onClick={handleDialogClick}>
          ASP.NET
        </StyledNotesButton>
      </StyledAccordionContainer>
      <StyledAccordionContainer>
        <h2>Annotation</h2>
        <StyledAccordionComponent expandMode="Single"
          expanding={(e) => {
            const comp = components.textComps.find(c => c.title === e.item.header);
            if (comp) handleAccordionClick(comp);
          }}
        >
          <AccordionItemsDirective>
            {components.textComps && components.textComps.map((comp, index) => (
              <AccordionItemDirective
                key={index}
                expanded={false}
                header={comp.title}
                content={comp.description}
              />
            ))}
          </AccordionItemsDirective>
        </StyledAccordionComponent>
      </StyledAccordionContainer>
      <StyledAccordionMissingContainer>
        <h2>Missing</h2>
        <StyledAccordionComponent expandMode="Single"
          expanding={(e) => {
            const comp = components.missingComps.find(c => c.title === e.item.header);
            if (comp) handleAccordionClick(comp);
          }}
        >
          <AccordionItemsDirective>
            {components.missingComps && components.missingComps.map((comp, index) => (
              <AccordionItemDirective
                key={index}
                expanded={false}
                header={comp.title}
                content={comp.description}
              />
            ))}
          </AccordionItemsDirective>
        </StyledAccordionComponent>
      </StyledAccordionMissingContainer>
      <StyledEditContainer>
        <h2>Edit</h2>
        <StyledEditInnerContainer>
          <StyledEditButtonContainer color={Constants.GREEN}>
            <h6>Add</h6>
            <StyledEditButton
              isToggle={true}
              onClick={() => {
                isDeleteMode && setIsDeleteMode(false)
                setIsAddingMode((prevState) => !prevState)
              }}
              iconCss="e-icons e-edit-2"
            ></StyledEditButton>
          </StyledEditButtonContainer>
          <StyledEditButtonContainer color={Constants.ORANGE}>
            <h6>Delete</h6>
            <StyledEditButton
              isToggle={true}
              iconCss="e-icons e-delete-2"
              onClick={() => {
                isAddingMode && setIsAddingMode(false)
                setIsDeleteMode((prevState) => !prevState)
              }}
            ></StyledEditButton>
          </StyledEditButtonContainer>
        </StyledEditInnerContainer>
        {isAddingMode && "Adding Mode is ON"}
        {isDeleteMode && "Delete Mode is ON"}
      </StyledEditContainer>
    </StyledSubBodyContainer2>
  );
};

export default SidePanel;
