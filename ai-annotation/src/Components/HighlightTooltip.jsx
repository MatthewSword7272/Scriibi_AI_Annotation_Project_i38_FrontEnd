import React from 'react';
import { StyledTooltipComponent } from "../Styles/StyledTooltip";
import EditButtons from "./EditButtons";

const HighlightTooltip = ({ children, isDeleteMode, isAddingMode, setIsDeleteMode, setIsAddingMode }) => {

  return (
    <StyledTooltipComponent
      content={() => <EditButtons
        isDeleteMode={isDeleteMode}
        isAddingMode={isAddingMode}
        setIsDeleteMode={setIsDeleteMode}
        setIsAddingMode={setIsAddingMode}
      />}
    >
      {children}
    </StyledTooltipComponent>
  );
};

export default HighlightTooltip;