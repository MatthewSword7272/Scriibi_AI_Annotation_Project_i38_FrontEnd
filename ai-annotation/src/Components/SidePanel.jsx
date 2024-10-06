import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { StyledToast } from 'Styles/StyledToast';
import { StyledSubBodyContainer2 } from 'Styles/StyledBody';
import { StyledDialogBox } from 'Styles/StyledDialogBox';
import { GREEN, ORANGE } from 'Constraints/constants';
import NotesSection from './NotesSection';
import EditSection from './EditSection';
import AccordionSection from './AccordionSection';

const SidePanel = ({
  isDeleteMode,
  isAddingMode,
  components,
  updateHighlights,
  setIsAddingMode,
  setIsDeleteMode,
  setHighlightedWords,
  updateComponents,
  setPresentingText,
  selectedSkill
}) => {
  // States
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [selectedText, setSelectedText] = useState({ text: "", index: -1 });

  // Refs
  const toastInstance = useRef(null);

  // Constants
  const DIALOG_BOX_POSITION = { X: 'right', Y: 'top' };
  const TOAST_POSITION = { X: 'center', Y: 'top' };
  const contextMenuItems = [
    { text: 'Add', iconCss: 'e-icons e-edit-2', id: 'add', color: GREEN },
    { text: 'Delete', iconCss: 'e-icons e-delete-2', id: 'delete', color: ORANGE }
  ];

  // Helper functions
  const showDialog = (title, text) => {
    setDialogTitle(title);
    setDialogText(text);
    setDialogVisibility(true);
  };

  const showToast = useCallback(() => {
    if (toastInstance.current) {
      toastInstance.current.show();
    }
  }, []);

  const deleteHighlight = useCallback((target) => {

    if (!target || !target.matches('.highlight, [data-highlight]')) return;
    const highlightText = target.textContent;
    const componentId = target.id;
    const componentName = target.dataset.componentName

    setPresentingText((prevText) => {
      const regex = new RegExp(`<mark[^>]*id="${componentId}"[^>]*>?.*</mark>`, 'g');
      return prevText.replace(regex, highlightText);
    });

    setHighlightedWords((prevHighlights) => ({
      ...prevHighlights,
      [selectedSkill]: prevHighlights[selectedSkill].filter(highlight => 
        !(highlight.text === highlightText && highlight.component === componentName)
      )
    }));

    setTimeout(() => {
      const remainingHighlights = document.querySelectorAll(`[id="${componentId}"]`);
      if (remainingHighlights.length === 0) {
        updateComponents('REMOVE_FROM_TEXT', { title: componentName });
      }
    }, 0);
  }, [setPresentingText, setHighlightedWords, selectedSkill, updateComponents]);

  // Event handlers
  const handleDialogClick = () => showDialog("ASP.NET", "Actual content about ASP.NET");

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

  const dialogClose = () => setDialogVisibility(false);

  const onDialogBeforeOpen = (args) => {
    args.maxHeight = "80%";
  };

  const onToastBeforeOpen = (e) => {
    e.cancel = toastInstance.current.element.childElementCount === 1;
  };

  // Effects
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection.rangeCount === 0) return; //Check if there is a selection
      const text = selection.toString().trim();
      const range = selection.getRangeAt(0);
      const editViewContainer = range.commonAncestorContainer.parentElement.parentElement;

      if (text !== "" && editViewContainer.id.startsWith('rte-target')) {
        const preSelectionRange = range.cloneRange(); // Create a new range that's a copy of the current selection range
        preSelectionRange.selectNodeContents(document.querySelector('.e-content')); // Create a new range that's a copy of the current selection range
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        const index = preSelectionRange.toString().length;

        // Create a temporary element to hold the selection
        const tempContainer = document.createElement('span');
        tempContainer.appendChild(range.cloneContents());
        const containsMark = tempContainer.querySelectorAll('mark.highlight').length > 0; // Check if the temporary container contains any <mark> nodes

        // if no overlapping highlights
        if (!containsMark) {
          setSelectedText({ text, index });
        } else {
          showToast();
        }
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, [showToast]);

  useEffect(() => {
    const handleDeleteHighlight = (event) => {
      if (isDeleteMode && (event.target.matches(".highlight") || event.target.matches("[data-highlight]"))) {
        deleteHighlight(event.target);
      }
    };

    document.addEventListener("click", handleDeleteHighlight);
    return () => document.removeEventListener("click", handleDeleteHighlight);
  }, [deleteHighlight, isDeleteMode]);

  useEffect(() => {
    console.log('SidePanel received new components:', components);
    console.log('textComps:', components.textComps);
    console.log('missingComps:', components.missingComps);
    console.log('Notes:', components.notes);
  }, [components]);

  return (
    <StyledSubBodyContainer2>
      <ContextMenuComponent
        items={contextMenuItems}
        select={handleContextMenuSelect}
        target='#rte-target'
      />

      <StyledToast
        cssClass="e-toast-warning"
        ref={toastInstance}
        title="Warning"
        content="Text has already been highlighted"
        position={TOAST_POSITION}
        icon='e-warning toast-icons'
        beforeOpen={onToastBeforeOpen}
      />

      <StyledDialogBox
        header={dialogTitle}
        content={dialogText}
        showCloseIcon={true}
        visible={dialogVisibility}
        width="25vw"
        height="90vh"
        target="#target"
        resizeHandles={["South"]}
        enableResize={true}
        allowDragging={true}
        close={dialogClose}
        beforeOpen={onDialogBeforeOpen}
        position={DIALOG_BOX_POSITION}
      />

      <NotesSection handleDialogClick={handleDialogClick} notesList={components.notes} />
      <AccordionSection title="Annotation" components={components.textComps} handleAccordionClick={handleAccordionClick} />
      <AccordionSection title="Missing" components={components.missingComps} handleAccordionClick={handleAccordionClick} isMissing={true} />
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