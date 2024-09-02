import React, { useCallback, useState } from 'react';
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import * as Constants from "../Constraints/constants";
import { StyledSubBodyContainer2 } from 'Styles/StyledBody';
import { StyledAccordionComponent, StyledAccordionItem } from 'Styles/StyledAccordion';
import { StyledAccordionContainer, StyledAccordionMissingContainer } from 'Styles/StyledAccordionContainer';
import { StyledEditContainer, StyledEditInnerContainer, StyledEditButtonContainer, StyledEditButton } from 'Styles/StyledEditContainer';
import { StyledNotesButton } from 'Styles/StyledButton';
import { DialogComponent } from '@syncfusion/ej2-react-popups';

const SidePanel = ({ text, isDeleteMode, isAddingMode, createHighlight, colors, setIsDeleteMode,aspContent}) => {
  const [visibility, setDialogVisibility] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");

  const generateRandomColour = () => { //Select colour
    let color = Math.floor(Math.random() * colors.length);
    return color
  }

  const [accordionColor, setAccordionColor] = useState(colors)

  const dialogClose = () => setDialogVisibility(false);
  // const dialogOpen = () => setDialogVisibility(true);

  const position = { X: 'right', Y: 'top' };

  const onBeforeOpen = (args) => {
    args.maxHeight = '800px';
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

  const array = [1, 2, 3]

  return (
    <StyledSubBodyContainer2>
      <DialogComponent
        header={dialogTitle}
        content={dialogText}
        showCloseIcon={true}
        visible={visibility}
        width="500px"
        height="650px"
        target="#target"
        resizeHandles={["All"]}
        allowDragging={true}
        enableResize={true}
        close={dialogClose}
        beforeOpen={onBeforeOpen}
        position={position}
      />
      <StyledAccordionContainer>
        <h2>Notes</h2>
        <StyledNotesButton color={Constants.CAM} onClick={handleDialogClick}>ASP.NET</StyledNotesButton>
      </StyledAccordionContainer>
      <StyledAccordionContainer>
        <h2>Annotation</h2>
        <StyledAccordionComponent expandMode="Multiple">
          <AccordionItemsDirective>
            {array.map(index => (
              <StyledAccordionItem
                expanded={false}
                header="ASP.NET"
                content={aspContent}
                color={colors[index]}
              />
            ))}
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