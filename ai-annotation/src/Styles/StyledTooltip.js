import styled from 'styled-components';
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

export const StyledTooltipComponent = styled(TooltipComponent)`
  /* Add your custom styles here */
  .e-tooltip-wrap {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .e-tip-content {
    padding: 8px;
    font-size: 14px;
    color: #333;
  }

  div div {
    height: 0px;
  }

  /* You can add more custom styles as needed */
`;