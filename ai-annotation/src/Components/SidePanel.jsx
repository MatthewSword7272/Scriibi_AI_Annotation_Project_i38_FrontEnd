import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { StyledSubBodyContainer2 } from 'Styles/StyledBody';
import { StyledDialogBox } from 'Styles/StyledDialogBox';
import { GREEN, ORANGE } from 'Constraints/constants';
import NotesSection from './NotesSection';
import EditSection from './EditSection';
import AccordionSection from './AccordionSection';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';

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
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [selectedText, setSelectedText] = useState({text: "", index: -1});

  // Constants
  const DIALOG_BOX_POSITION = { X: 'right', Y: 'top' };
  const TOAST_POSITION = { X: 'center', Y: 'top' };
  const toastInstance = useRef(null);

  const deleteHighlight = useCallback((target) => {
    if (!target || !target.matches('.highlight, [data-highlight]')) return;

    const highlightText = target.textContent;
    const componentId = target.id;

    setPresentingText((prevText) => {
      const regex = new RegExp(`<mark[^>]*id="${componentId}"[^>]*>${highlightText}</mark>`, 'g');
      return prevText.replace(regex, highlightText);
    });

    setHighlightedWords((prevHighlights) => ({
      ...prevHighlights,
      [selectedSkill]: prevHighlights[selectedSkill].filter(highlight => 
        !(highlight.text === highlightText && highlight.component === componentId)
      )
    }));

    setTimeout(() => {
      const remainingHighlights = document.querySelectorAll(`[id="${componentId}"]`);
      if (remainingHighlights.length === 0) {
        updateComponents('REMOVE_FROM_TEXT', { title: componentId });
      }
    }, 0);
  }, [setPresentingText, setHighlightedWords, selectedSkill, updateComponents]);

  const showDialog = useCallback((title, text) => {
    setDialogTitle(title);
    setDialogText(text);
    setDialogVisibility(true);
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const showToast = () => {
    if (toastInstance.current) {
      toastInstance.current.show();
    }
  }

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
      if (selection.rangeCount === 0) return; //Check if there is a selection
      const text = selection.toString().trim();
      const range = selection.getRangeAt(0);
      const editViewContainer = range.commonAncestorContainer.parentElement.parentElement;

      if (text !== "" && editViewContainer.id.startsWith('rte-target')) {
        // Create a new range that's a copy of the current selection range
        const preSelectionRange = range.cloneRange();
        // Set the start of the new range to the beginning of the content editable area
        preSelectionRange.selectNodeContents(document.querySelector('.e-content'));
        // Set the end of the new range to match the start of the user's selection
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        // Calculate the index of the selection start within the entire text content
        // This is done by converting the range to a string and measuring its length
        const index = preSelectionRange.toString().length;

        // Create a temporary element to hold the selection
        const tempContainer = document.createElement('div');
        tempContainer.appendChild(range.cloneContents());

        // Check if the temporary container contains any <mark> nodes
        const markNodes = tempContainer.querySelectorAll('mark');
        let containsMark = markNodes.length > 0;

        // if no overlapping highlights
        if (!containsMark) {
            setSelectedText({ text, index });
        } else {
          showToast();
        }
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    }
  }, [showToast]);

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

  const onDialogBeforeOpen = (args) => {
    args.maxHeight = "80%";
  };

  const onToastBeforeOpen = (e) => {
    if (toastInstance.current.element.childElementCount === 1) {
      e.cancel = true;
    }else {
      e.cancel = false;
    }
  }

  return (
    <StyledSubBodyContainer2>

      <ContextMenuComponent
        items={contextMenuItems}
        select={handleContextMenuSelect}
        target='#rte-target' // Replace with the actual ID of your Rich Text Editor
      />

      <ToastComponent
        cssClass="e-toast-warning"
        ref={toastInstance}
        title="Warning"
        content="Text has already been highlighted"
        position={TOAST_POSITION}
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

      <NotesSection handleDialogClick={handleDialogClick} />
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
