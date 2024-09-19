import React, { useCallback, useEffect, useState } from 'react';
import { AccordionItemDirective, AccordionItemsDirective, ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { StyledSubBodyContainer2 } from 'Styles/StyledBody';
import { StyledAccordionComponent } from 'Styles/StyledAccordion';
import { StyledAccordionContainer, StyledAccordionMissingContainer } from 'Styles/StyledAccordionContainer';
import { 
  StyledEditContainer, 
  StyledEditInnerContainer, 
  StyledEditButtonContainer, 
  StyledAddButton, 
  StyledDeleteButton 
} from 'Styles/StyledEditButtons';
import { StyledNotesButton } from 'Styles/StyledButton';
import { StyledDialogBox } from 'Styles/StyledDialogBox';
import { CAM, GREEN, ORANGE } from 'Constraints/constants';

const SidePanel = ({
  isDeleteMode,
  isAddingMode,
  components,
  createHighlight,
  setIsAddingMode,
  setIsDeleteMode,
  setHighlightedWords,
  updateComponents,
  setPresentingText
}) => {

  //Menu Items
  const contextMenuItems = [
    {
      text: 'Add',
      iconCss: 'e-icons e-edit-2',
      id: 'add',
      color: GREEN
    },
    {
      text: 'Delete',
      iconCss: 'e-icons e-delete-2',
      id: 'delete',
      color: ORANGE
    }
  ];

  // States
  const [visibility, setDialogVisibility] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [selectedText, setSelectedText] = useState("");

  // Constants
  const DIALOG_BOX_POSITION = { X: 'right' };

  const deleteHighlight = useCallback((target) => {
    if (!target || !target.matches('.highlight, [data-highlight]')) return;

    const highlightText = target.textContent;
    const componentId = target.id;

    setPresentingText((prevText) => {
      const regex = new RegExp(`<mark[^>]*id="${componentId}"[^>]*>${highlightText}</mark>`, 'g');
      return prevText.replace(regex, highlightText);
    });

    setHighlightedWords((prevHighlights) => 
      prevHighlights.filter(highlight => 
        !(highlight.text === highlightText && highlight.component === componentId)
      )
    );

    setTimeout(() => {
      const remainingHighlights = document.querySelectorAll(`[id="${componentId}"]`);
      if (remainingHighlights.length === 0) {
        updateComponents('REMOVE_FROM_TEXT', { title: componentId });
      }
    }, 0);
  }, [updateComponents, setHighlightedWords, setPresentingText]);

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

  const handleContextMenuSelect = (args) => {
    if (args.item.id === 'add') {
      isDeleteMode && setIsDeleteMode(false);
      setIsAddingMode((prevState) => !prevState);
    } else if (args.item.id === 'delete') {
      isAddingMode && setIsAddingMode(false);
      setIsDeleteMode((prevState) => !prevState);
    }
  };
  
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

      <ContextMenuComponent
        items={contextMenuItems}
        select={handleContextMenuSelect}
        target='#rte-target' // Replace with the actual ID of your Rich Text Editor
      />

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
        <StyledNotesButton color={CAM} onClick={handleDialogClick}>
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
          <StyledEditButtonContainer color={GREEN}>
            <h6>Add</h6>
            <StyledAddButton
              isAddingMode={isAddingMode}
              onClick={() => {
                isDeleteMode && setIsDeleteMode(false)
                setIsAddingMode((prevState) => !prevState)
              }}
              iconCss="e-icons e-edit-2"
            ></StyledAddButton>
          </StyledEditButtonContainer>
          <StyledEditButtonContainer color={ORANGE}>
            <h6>Delete</h6>
            <StyledDeleteButton
              isDeleteMode={isDeleteMode}
              iconCss="e-icons e-delete-2"
              onClick={() => {
                isAddingMode && setIsAddingMode(false)
                setIsDeleteMode((prevState) => !prevState)
              }}
            ></StyledDeleteButton>
          </StyledEditButtonContainer>
        </StyledEditInnerContainer>
      </StyledEditContainer>
    </StyledSubBodyContainer2>
  );
};

export default SidePanel;
