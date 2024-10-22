import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { StyledToast } from 'Styles/StyledToast';
import { StyledSubBodyContainer2 } from 'Styles/StyledBody';
import { StyledDialogBox } from 'Styles/StyledDialogBox';
import { GREEN, ORANGE } from 'Constraints/colours';
import NotesSection from './NotesSection';
import EditSection from './EditSection';
import AccordionSection from './AccordionSection';
import convertStringtoHTML from 'function/convertStringToHTML';

const SidePanel = ({
  modeProps,
  componentProps,
  updateHighlights,
  setHighlightedWords,
  setPresentingText,
  selectedSkill,
  flagProps,
  isAnnotated, 
  textComponent,
  dialogText
}) => {
  
  const { isDeleteMode, isAddingMode, setIsAddingMode, setIsDeleteMode } = modeProps;
  const { components, updateComponents } = componentProps;
  const { flagCounts, setFlagCounts } = flagProps;

  // States
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
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
  const showDialog = (title) => {
    setDialogTitle(title);
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
    const componentName = target.dataset.componentName;
    const subBackground = target.style.getPropertyValue('--subcomponent-background');

    setHighlightedWords(prevHighlights => {
      const currentSkillHighlights = Array.isArray(prevHighlights[selectedSkill]) 
        ? prevHighlights[selectedSkill] 
        : [];
      const updatedHighlights = currentSkillHighlights.filter(highlight => 
        !(highlight.text === highlightText && highlight.component === componentName)
      );
      return {
        ...prevHighlights,
        [selectedSkill]: updatedHighlights
      };
    });

    setPresentingText(prevTexts => {
      const prevText = prevTexts[selectedSkill];
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = prevText;
      const highlightToRemove = tempDiv.querySelector(`[id="${componentId}"]`);
      if (highlightToRemove) {
        highlightToRemove.outerHTML = highlightToRemove.textContent;
      }
      return {
        ...prevTexts,
        [selectedSkill]: tempDiv.innerHTML
      };
    });

    setFlagCounts(prevCounts => {
      const componentCounts = prevCounts[componentName] || {};
      const flagType = subBackground && subBackground === GREEN ? 'correct' : 'incorrect';

      if (componentCounts[flagType] === undefined) {
        return prevCounts; // Return previous state without changes
      }
      return {
        ...prevCounts,
        [componentName]: {
          ...componentCounts,
          [flagType]: Math.max(0, componentCounts[flagType] - 1)
        }
      };
    });

    setTimeout(() => {
      const remainingHighlights = document.querySelectorAll(`[data-component-name="${componentName}"]`);
      if (remainingHighlights.length === 0) {
        updateComponents('REMOVE_FROM_TEXT', { name: componentName });
      }
    }, 0);
  }, [selectedSkill, setFlagCounts, setHighlightedWords, setPresentingText, updateComponents]);

  // Event handlers
  const handleDialogClick = (note) => showDialog(note.name);

  const handleAccordionClick = useCallback((comp, subBackground = undefined, subText = undefined) => {
    if (isAddingMode && selectedText.text !== "") {
      updateHighlights(comp, selectedText.text, selectedText.index, subBackground, subText);
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
          // unselect text, reset selectedText state, then alert user
          selection.removeAllRanges()
          setSelectedText({ text: "", index: -1 });
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

  // Debug: Text Component
  // useEffect(() => {
  //   console.log('SidePanel received new components:', components);
  // }, [components]);

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
        content={dialogText instanceof Array? convertStringtoHTML(dialogText[0]): convertStringtoHTML(dialogText)} // Temporary solution to handle inconsistent dialog type
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
        animationSettings ={{
          effect: 'Zoom',
          duration: 400,
          delay: 0
        }}
      />
      {isAnnotated &&
        <EditSection 
          isAddingMode={isAddingMode}
          isDeleteMode={isDeleteMode}
          setIsAddingMode={setIsAddingMode}
          setIsDeleteMode={setIsDeleteMode}
        />
      }
      <NotesSection handleDialogClick={handleDialogClick} notesList={components.notes} />
      <AccordionSection title="Annotation" textComponent={textComponent} components={components.textComps} handleAccordionClick={handleAccordionClick} flagCounts={flagCounts}/>
      <AccordionSection title="Missing" textComponent={textComponent} components={components.missingComps} handleAccordionClick={handleAccordionClick} flagCounts={flagCounts} isMissing={true} />
    </StyledSubBodyContainer2>
  );
};

export default SidePanel;
