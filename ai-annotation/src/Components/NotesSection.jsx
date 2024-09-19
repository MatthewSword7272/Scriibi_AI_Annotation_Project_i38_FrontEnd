import React from 'react';
import { StyledAccordionContainer } from 'Styles/StyledAccordionContainer';
import { StyledNotesButton } from 'Styles/StyledButton';
import { CAM } from 'Constraints/constants';

const NotesSection = ({ handleDialogClick }) => {
  return (
    <StyledAccordionContainer>
      <h2>Notes</h2>
      <StyledNotesButton color={CAM} onClick={handleDialogClick}>
        ASP.NET
      </StyledNotesButton>
    </StyledAccordionContainer>
  );
};

export default NotesSection;
