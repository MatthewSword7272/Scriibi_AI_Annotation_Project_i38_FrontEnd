import { AccordionComponent } from "@syncfusion/ej2-react-navigations";
import styled from "styled-components";
import {WHITE, BLACK} from '../Constraints/constants';


const StyledAccordionComponent = styled(AccordionComponent)`
  border: transparent;
  text-align: center;
  font-weight: 500;
  width: 35vw !important;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  border-radius: 20px !important;

  ${props => props.colors.map((color, index) => `
      .e-acrdn-item:nth-child(${index + 1}), .e-acrdn-item.e-selected:nth-child(${index + 1}) {
        border-radius: 20px !important;
        border: none;
        color: ${BLACK} !important;
        background-color: ${color} !important;

        .e-acrdn-header {
          border-radius: 20px !important;
          background: ${color} !important;

          .e-acrdn-header-content {
            color: ${BLACK} !important;
            font-weight: bold;
          }
        }

        &.e-select .e-acrdn-panel .e-acrdn-content {
          background: ${WHITE};
          border: 5px ${color} solid;
          border-radius: 20px;
        }
      }
    `)
  }

  .e-toggle-icon {
      padding-left: 10px;
      border-left: 2px solid black;
    }

  .e-acrdn-item.e-item-focus.e-expand-state.e-select, 
  .e-acrdn-item.e-item-focus.e-select.e-selected.e-expand-state,
  .e-acrdn-item.e-select.e-item-focus {
    border: unset;
  }

`;

export { StyledAccordionComponent };
