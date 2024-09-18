import React from 'react';
import { StyledTooltipComponent } from "../Styles/StyledTooltip";
import EditButtons from "./EditButtons";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const HighlightTooltip = ({ children, isDeleteMode, isAddingMode, setIsDeleteMode, setIsAddingMode }) => {

  return (
    <TooltipComponent
      content={() => <EditButtons
        isDeleteMode={isDeleteMode}
        isAddingMode={isAddingMode}
        setIsDeleteMode={setIsDeleteMode}
        setIsAddingMode={setIsAddingMode}
      />}
    >
      {children}
    </TooltipComponent>
  );
};

export default HighlightTooltip;