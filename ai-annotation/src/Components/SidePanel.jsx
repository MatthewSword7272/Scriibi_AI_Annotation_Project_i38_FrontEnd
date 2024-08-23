import React, { useState } from 'react';
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import * as Constants from "../Constraints/constants";
import { StyledSubBodyContainer2 } from 'Styles/StyledBody';
import { StyledAccordionComponent } from 'Styles/StyledAccordion';
import { StyledAccordionContainer, StyledAccordionMissingContainer } from 'Styles/StyledAccordionContainer';
import { StyledDialog } from 'Styles/StyledDialog';
import { StyledEditContainer, StyledEditInnerContainer, StyledEditButtonContainer, StyledEditButton } from 'Styles/StyledEditContainer';

const SidePanel = ({ text, isDeleteMode, isAddingMode, createHighlight, setIsDeleteMode,aspContent}) => {
  const [visibility, setDialogVisibility] = useState(true);

  const dialogClose = () => setDialogVisibility(false);
  const dialogOpen = () => setDialogVisibility(true);

  const position = { X: 'center', Y: 160 };

  const onBeforeOpen = (args) => {
    args.maxHeight = '800px';
  };

  return (
    <StyledSubBodyContainer2 id="target">
      <StyledDialog
        header="Resize Me!!!"
        showCloseIcon={true}
        visible={visibility}
        width="400px"
        height="750px"
        target="#target"
        resizeHandles={["All"]}
        open={dialogOpen}
        close={dialogClose}
        position={position}
        beforeOpen={onBeforeOpen}
      >
        This is a dialog with resizable support.
      </StyledDialog>
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