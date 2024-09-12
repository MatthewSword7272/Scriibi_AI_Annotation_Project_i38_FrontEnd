import { AccordionComponent } from "@syncfusion/ej2-react-navigations";
import styled from "styled-components";
import {WHITE, BLACK} from '../Constraints/constants';
import { COLOURS } from "Constraints/colours";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffledColours = shuffleArray(COLOURS)

const StyledAccordionComponent = styled(AccordionComponent)`
  border: transparent;
  text-align: center;
  font-weight: 500;
  width: 35vw !important;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  border-radius: 20px !important;

  ${() => shuffledColours.map((color, index) => `
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

  .e-acrdn-item.e-item-focus.e-expand-state.e-select, 
  .e-acrdn-item.e-item-focus.e-select.e-selected.e-expand-state,
  .e-acrdn-item.e-select.e-item-focus {
    border: unset;
  }

`;

export { StyledAccordionComponent };
