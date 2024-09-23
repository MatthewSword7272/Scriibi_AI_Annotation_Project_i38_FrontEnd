import React, { useCallback, useEffect, useState } from 'react';
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { StyledSubBodyContainer2 } from 'Styles/StyledBody';
import { StyledDialogBox } from 'Styles/StyledDialogBox';
import { GREEN, ORANGE } from 'Constraints/constants';
import NotesSection from './NotesSection';
import AnnotationSection from './AnnotationSection';
import MissingSection from './MissingSection';
import EditSection from './EditSection';

const SidePanel = ({
  isDeleteMode,
  isAddingMode,
  components,
  updateHighlights,
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
  const [selectedText, setSelectedText] = useState({text: "", index: -1});

  // Constants
  const DIALOG_BOX_POSITION = { X: 'right', Y: 'top' };

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

    if (isAddingMode && selectedText.text !== "") {
      updateHighlights(comp, selectedText.text, selectedText.index);
      setSelectedText({ text: "", index: -1 });
    }
  }, [updateHighlights, isAddingMode, selectedText]);

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
        const range = selection.getRangeAt(0);
        const preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(document.querySelector('.e-content'));
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        const index = preSelectionRange.toString().length;
  
        setSelectedText({ text, index });
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

      <NotesSection handleDialogClick={handleDialogClick} />
      <AnnotationSection components={components} handleAccordionClick={handleAccordionClick} />
      <MissingSection components={components} handleAccordionClick={handleAccordionClick} />
      <EditSection 
        isAddingMode={isAddingMode}
        isDeleteMode={isDeleteMode}
        setIsAddingMode={setIsAddingMode}
        setIsDeleteMode={setIsDeleteMode}
      />
    </StyledSubBodyContainer2>
  );
};

export default SidePanel;
