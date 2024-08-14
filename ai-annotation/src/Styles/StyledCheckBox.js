import styled from "styled-components";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import {GREEN} from '../Constraints/constants';

const StyledSkillContainer = styled.div`
    display: flex;
    column-gap: 20px;
    margin: 10px 0;
    justify-content: center;
    align-items: center;
`;


const StyledCheckBoxContainer = styled.div`
  display: contents;
  pointer-events: none;

  .e-checkbox-wrapper .e-frame.e-check,
  .e-checkbox-wrapper .e-checkbox:focus + .e-frame.e-check {
    background-color: ${GREEN};

    &::before {
      background-color: ${GREEN};
    }
  }

  .e-label {
    font-family: "Raleway", sans-serif;
    font-weight: 500;
  }
`;

const StyledCheckBox = styled(CheckBoxComponent)``

const StyledSkillButtonContainer = styled.div``

export { StyledCheckBoxContainer, StyledCheckBox, StyledSkillContainer, StyledSkillButtonContainer };