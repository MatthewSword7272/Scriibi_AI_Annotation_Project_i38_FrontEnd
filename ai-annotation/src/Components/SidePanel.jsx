import React, { useCallback, useEffect, useState } from 'react';
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import * as Constants from "../Constraints/constants";
import { StyledSubBodyContainer2 } from 'Styles/StyledBody';
import { StyledAccordionComponent } from 'Styles/StyledAccordion';
import { StyledAccordionContainer, StyledAccordionMissingContainer } from 'Styles/StyledAccordionContainer';
import { StyledEditContainer, StyledEditInnerContainer, StyledEditButtonContainer, StyledEditButton } from 'Styles/StyledEditContainer';
import { StyledNotesButton } from 'Styles/StyledButton';
import { StyledDialogBox } from 'Styles/StyledDialogBox';

const SidePanel = ({isDeleteMode, isAddingMode, textComps, missingComps, createHighlight, setIsAddingMode, setIsDeleteMode}) => {

  const [visibility, setDialogVisibility] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const handleSelectionChange = () => {
      // Get highlighted text and save state
      const selection = document.getSelection();
      const text = selection.toString().trim();
      if (text) {
        setSelectedText(text);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    }
  }, [])
  

  const dialogClose = () => setDialogVisibility(false);
  // const dialogOpen = () => setDialogVisibility(true);

  const position = { X: 'right'};

  console.log(selectedText);

  const onBeforeOpen = (args) => {
    args.maxHeight = "80%";
  };

  let testString = "Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services.";

  const showDialog = useCallback((title, text) => {
    setDialogTitle(title);
    setDialogText(text);
    setDialogVisibility(true);
  }, [])

  const handleDialogClick = useCallback(() => {
    showDialog("ASP.NET", testString);
  }, [showDialog, testString]);

  const handleAccordionClick = useCallback((comp, element) => {

    if (isAddingMode && selectedText !== "") {
      createHighlight(comp, element, selectedText);
    }
    setIsAddingMode(false);
    setSelectedText("");

  }, [createHighlight, isAddingMode, selectedText, setIsAddingMode]);

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
          position={position}
        />

      <StyledAccordionContainer>
        <h2>Notes</h2>
        <StyledNotesButton color={Constants.CAM} onClick={handleDialogClick}>
          ASP.NET
        </StyledNotesButton>
      </StyledAccordionContainer>
      <StyledAccordionContainer>
        <h2>Annotation</h2>
        <StyledAccordionComponent expandMode="Multiple">
          <AccordionItemsDirective>
            {textComps && textComps.map((comp) => (
            <AccordionItemDirective
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
        <StyledAccordionComponent expandMode="Multiple"
          expanding={(e) => {
            const comp = missingComps.find(c => c.title === e.item.header);
            if (comp) handleAccordionClick(comp, e);
          }}
        >
          <AccordionItemsDirective>
            {missingComps && missingComps.map((comp) => (
              <AccordionItemDirective
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
              isToggle={isAddingMode}
              onClick={() => selectedText !== "" && !isDeleteMode && setIsAddingMode((prevState) => !prevState)}
              iconCss="e-icons e-edit-2"
            ></StyledEditButton>
          </StyledEditButtonContainer>
          <StyledEditButtonContainer color={Constants.ORANGE}>
            <h6>Delete</h6>
            <StyledEditButton
              isToggle={isDeleteMode}
              iconCss="e-icons e-delete-2"
              onClick={() =>!isAddingMode && setIsDeleteMode((prevState) => !prevState)}
            ></StyledEditButton>
          </StyledEditButtonContainer>
        </StyledEditInnerContainer>
      </StyledEditContainer>
    </StyledSubBodyContainer2>
  );
};

export default SidePanel;
