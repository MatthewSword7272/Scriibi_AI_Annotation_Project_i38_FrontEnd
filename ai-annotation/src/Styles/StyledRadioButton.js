import styled from "styled-components";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
import { GREEN } from "Constraints/constants";

const StyledSkillContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    margin-bottom: 10px;
`


const StyledRadioButtonContainer = styled.div`

    display: flex;
    justify-content: center;
    column-gap: 10px;

    div label span {
        text-overflow: ellipsis;
        white-space: nowrap !important;
        overflow: hidden;

        @media only screen and (max-width: 1780px){
            width: 6vw
        }
    }

    .e-radio:checked + label::after
    {
        background-color: ${GREEN};
        color: ${GREEN};
    }

    .e-radio:checked + label::before
    {
        border-color: ${GREEN};
    }

    .e-radio + label .e-label
    {
        font-family: "Raleway", "sans-serif";
        font-weight: 500;
    }
`

const StyledRadioButton = styled(RadioButtonComponent)`
  
`

const StyledSkillButtonContainer = styled.div``

export { StyledRadioButtonContainer, StyledRadioButton, StyledSkillContainer, StyledSkillButtonContainer };