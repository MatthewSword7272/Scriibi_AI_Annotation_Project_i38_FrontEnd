import React from 'react';
import { StyledTooltipComponent } from "../Styles/StyledTooltip";
import { StyledEditButton, StyledEditButtonContainer, StyledEditInnerContainer } from 'Styles/StyledEditContainer';
import { GREEN, ORANGE } from 'Constraints/constants';

const HighlightTooltip = ({ children, isDeleteMode, isAddingMode, setIsDeleteMode, setIsAddingMode }) => {

  const EditButtons = () => {
    return (
      <StyledEditInnerContainer>
        <StyledEditButtonContainer color={GREEN}>
          <StyledEditButton
            isToggle={true}
            onClick={() => {
              isDeleteMode && setIsDeleteMode(false)
              setIsAddingMode((prevState) => !prevState)
            }}
            iconCss="e-icons e-edit-2"
          />
        </StyledEditButtonContainer>
        <StyledEditButtonContainer color={ORANGE}>
          <StyledEditButton
            isToggle={true}
            iconCss="e-icons e-delete-2"
            onClick={() => {
              isAddingMode && setIsAddingMode(false)
              setIsDeleteMode((prevState) => !prevState)
            }}
          />
        </StyledEditButtonContainer>
    </StyledEditInnerContainer>
    )
  }

  return (
    <StyledTooltipComponent
      content={() => EditButtons()}
    >
      {children}
    </StyledTooltipComponent>
  );
};

export default HighlightTooltip;