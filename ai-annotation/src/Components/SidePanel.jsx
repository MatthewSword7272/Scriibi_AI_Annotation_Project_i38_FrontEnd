import React, { useCallback, useState } from 'react';
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import * as Constants from "../Constraints/constants";
import { StyledSubBodyContainer2 } from 'Styles/StyledBody';
import { StyledAccordionComponent } from 'Styles/StyledAccordion';
import { StyledAccordionContainer, StyledAccordionMissingContainer } from 'Styles/StyledAccordionContainer';
import { StyledEditContainer, StyledEditInnerContainer, StyledEditButtonContainer, StyledEditButton } from 'Styles/StyledEditContainer';
import { StyledNotesButton } from 'Styles/StyledButton';
import { DialogComponent } from '@syncfusion/ej2-react-popups';

const SidePanel = ({text, isDeleteMode, isAddingMode, createHighlight, setIsAddingMode, setIsDeleteMode, aspContent}) => {

  const [visibility, setDialogVisibility] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");

  const dialogClose = () => setDialogVisibility(false);
  // const dialogOpen = () => setDialogVisibility(true);

  const position = { X: 'right'};

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

  const testArray = [1, 2, 3];

  return (
    <StyledSubBodyContainer2>
      <DialogComponent
        header={dialogTitle}
        content={dialogText}
        showCloseIcon={true}
        visible={visibility}
        width="25vw"
        height="90vh"
        target="#target"
        resizeHandles={["South"]}
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
            {testArray.map(() => (
              <AccordionItemDirective
                expanded={false}
                header="ASP.NET"
                content={aspContent}
              />
            ))}
          </AccordionItemsDirective>
        </StyledAccordionComponent>
      </StyledAccordionContainer>
      <StyledAccordionMissingContainer>
        <h2>Missing</h2>
        <StyledAccordionComponent expandMode="Multiple">
          <AccordionItemsDirective>
            {testArray.map(() => (
              <AccordionItemDirective
                expanded={false}
                header="ASP.NET"
                content={aspContent}
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
              onClick={() => text !== "" && !isDeleteMode && createHighlight()}
              iconCss="e-icons e-edit-2"
            ></StyledEditButton>
          </StyledEditButtonContainer>
          <StyledEditButtonContainer color={Constants.ORANGE}>
            <h6>Delete</h6>
            <StyledEditButton
              isToggle={true}
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
