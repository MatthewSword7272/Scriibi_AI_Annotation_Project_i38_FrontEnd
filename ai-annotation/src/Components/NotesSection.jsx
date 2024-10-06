import React from 'react';
import { StyledAccordionContainer } from 'Styles/StyledAccordionContainer';
import { StyledNotesButton } from 'Styles/StyledButton';
import { CAM } from 'Constraints/constants';

const NotesSection = ({ handleDialogClick, notesList }) => {
  return (
    <StyledAccordionContainer>
      <h2>Notes</h2>
      {notesList? notesList.map((aNote, index) => {
        return (
          <StyledNotesButton color={CAM} onClick={handleDialogClick}>
            {aNote.name}
          </StyledNotesButton>
        );
      }) : <></>}
    </StyledAccordionContainer>
  );
};

export default NotesSection;
