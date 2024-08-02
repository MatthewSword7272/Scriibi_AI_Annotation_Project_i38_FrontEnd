import styled from "styled-components";
import { registerLicense } from '@syncfusion/ej2-base';
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import {GREEN, WHITE} from '../constants';

registerLicense(process.env.SYNCFUSION_KEY);

const StyledButtonComponent = styled(ButtonComponent)`
    background-color: ${GREEN};
    border-radius: 10px;
    padding: 15px 40px;
    color: ${WHITE};
    text-transform: capitalize;

    :hover {
        
    }
`

export {StyledButtonComponent}