import styled from 'styled-components';
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { WHITE } from '../Constraints/constants';

export const StyledTooltipComponent = styled(TooltipComponent)`
  
  font-size: revert;
  display: inline-block;
  vertical-align: baseline;

  .e-tooltip-wrap {
    background-color: ${WHITE} !important;
    border: 1px solid #ccc !important;
    border-radius: 4px !important;
  }

  .e-tooltip-wrap .e-tip-content {
    background-color: ${WHITE} !important;
    color: #333 !important;
    padding: 8px !important;
  }

  && .e-tooltip-wrap {
    background-color: ${WHITE} !important;
  }

  && .e-tooltip-wrap[style*="background-color"] {
    background-color: ${WHITE} !important;
  }

  .e-tooltip-wrap {
    background-color: ${WHITE} !important;
    border: 1px solid #ccc !important;
    border-radius: 4px !important;
  }

  .e-tooltip-wrap .e-tip-content {
    background-color: ${WHITE} !important;
    color: #333 !important;
    padding: 8px !important;
  }

  &.custom-tooltip {
    .e-tooltip-wrap, .e-tooltip-wrap .e-tip-content {
      background-color: inherit;
      color: inherit;
    }
  }

  mark {
    display: inline;
    height: auto;
    vertical-align: baseline;
  }

`;