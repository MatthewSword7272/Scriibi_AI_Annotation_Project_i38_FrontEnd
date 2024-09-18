import React, { useCallback, useEffect, useState } from 'react';
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import * as Constants from "../Constraints/constants";
import { StyledSubBodyContainer2 } from 'Styles/StyledBody';
import { StyledAccordionComponent } from 'Styles/StyledAccordion';
import { StyledAccordionContainer, StyledAccordionMissingContainer } from 'Styles/StyledAccordionContainer';
import { StyledEditContainer } from 'Styles/StyledEditContainer';
import { StyledNotesButton } from 'Styles/StyledButton';
import { StyledDialogBox } from 'Styles/StyledDialogBox';
import EditButtons from './EditButtons';

const SidePanel = ({
  isDeleteMode,
  isAddingMode,
  components,
  createHighlight,
  setIsAddingMode,
  setIsDeleteMode,
  setHighlightedWords,
  highlightText,
  updateComponents
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
      const textContent = element.textContent;
      const compTitle = element.id;
      element.parentNode.replaceChild(document.createTextNode(textContent), element);

      setHighlightedWords((prevHighlightedWords) => {
        const newArray = prevHighlightedWords.filter(
          (word) => word.text !== textContent || word.component !== compTitle
        );
        highlightText(newArray);
        return newArray;
      });

      // Check if there are no other highlights with the same compTitle
      const hasNoOtherHighlights = document.querySelectorAll(`[id="${compTitle}"]`).length === 0;

      if (hasNoOtherHighlights) {
        updateComponents('REMOVE_FROM_TEXT', { title: compTitle });
      }
    }
  }, [highlightText, setHighlightedWords, updateComponents]);

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
      if (text) setSelectedText(text);
    };

    const handleDeleteHighlight = (event) => {
      if (isDeleteMode && (event.target.matches(".highlight") || event.target.matches("[data-highlight]"))) {
        deleteHighlight(event.target);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("click", handleDeleteHighlight);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("click", handleDeleteHighlight);
    }
  }, [deleteHighlight, isDeleteMode])
  
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
        <EditButtons
          isDeleteMode={isDeleteMode}
          isAddingMode={isAddingMode}
          setIsDeleteMode={setIsDeleteMode}
          setIsAddingMode={setIsAddingMode}
        />
        {isAddingMode && "Adding Mode is ON"}
        {isDeleteMode && "Delete Mode is ON"}
      </StyledEditContainer>
    </StyledSubBodyContainer2>
  );
};

export default SidePanel;
