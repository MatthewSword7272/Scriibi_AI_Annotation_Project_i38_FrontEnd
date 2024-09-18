import React from 'react';
import * as Constants from "../Constraints/constants";
import { StyledEditInnerContainer, StyledEditButtonContainer, StyledEditButton } from 'Styles/StyledEditContainer';

const EditButtons = ({ isDeleteMode, isAddingMode, setIsDeleteMode, setIsAddingMode }) => {
  return (
    <StyledEditInnerContainer>
      <StyledEditButtonContainer color={Constants.GREEN}>
        <h6>Add</h6>
        <StyledEditButton
          isToggle={true}
          onClick={() => {
            isDeleteMode && setIsDeleteMode(false)
            setIsAddingMode((prevState) => !prevState)
          }}
          iconCss="e-icons e-edit-2"
        />
      </StyledEditButtonContainer>
      <StyledEditButtonContainer color={Constants.ORANGE}>
        <h6>Delete</h6>
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
  );
};

export default EditButtons;