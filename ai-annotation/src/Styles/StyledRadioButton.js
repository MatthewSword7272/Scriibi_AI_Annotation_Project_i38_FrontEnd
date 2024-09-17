import styled from "styled-components";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
import { GREEN } from "Constraints/constants";

const StyledSkillContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 20px;
    margin-bottom: 10px;
`


const StyledRadioButtonContainer = styled.div`
    display: flex;
    column-gap: 15px;

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
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;

        @media only screen and (max-width: 1780px){
            width: 5vw;
        }
    }
`

const StyledRadioButton = styled(RadioButtonComponent)`
  
`

const StyledSkillButtonContainer = styled.div``

export { StyledRadioButtonContainer, StyledRadioButton, StyledSkillContainer, StyledSkillButtonContainer };