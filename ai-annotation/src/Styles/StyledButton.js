import styled from "styled-components";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import {GREEN, WHITE} from '../Constraints/constants';

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