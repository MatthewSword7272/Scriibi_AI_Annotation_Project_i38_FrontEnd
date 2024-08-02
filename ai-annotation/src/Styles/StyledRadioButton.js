import styled from "styled-components";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
import { registerLicense } from '@syncfusion/ej2-base';
import {GREEN} from '../constants';

registerLicense(process.env.SYNCFUSION_KEY);

const StyledRadioButtonContainer = styled.div`

    display: flex;
    justify-content: center;
    column-gap: 10px;
    margin-bottom: 20px;

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

export { StyledRadioButtonContainer, StyledRadioButton };