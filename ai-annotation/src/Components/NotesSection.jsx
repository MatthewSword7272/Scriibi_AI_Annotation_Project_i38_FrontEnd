import React from 'react';
import { StyledAccordionContainer } from 'Styles/StyledAccordionContainer';
import { StyledNotesButton } from 'Styles/StyledButton';
import { CAM } from 'Constraints/colours';

const NotesSection = ({ handleDialogClick, notesList }) => {
  return (
    <StyledAccordionContainer>
      <h2>Notes</h2>
      {notesList.length > 0 ? notesList.map((aNote, index) => {
        return (
          <StyledNotesButton key={index} color={CAM} onClick={() => handleDialogClick(aNote)}>
            {aNote.name}
          </StyledNotesButton>
        );
      }) : <p>No notes found</p>}
    </StyledAccordionContainer>
  );
};

export default NotesSection;
