import React from 'react';
import { 
  StyledEditContainer, 
  StyledEditInnerContainer, 
  StyledEditButtonContainer, 
  StyledAddButton, 
  StyledDeleteButton 
} from 'Styles/StyledEditButtons';
import { GREEN, ORANGE } from 'Constraints/colours';

const EditSection = ({ isAddingMode, isDeleteMode, setIsAddingMode, setIsDeleteMode }) => {
  return (
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
  );
};

export default EditSection;