import styled from "styled-components";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import {BLACK, GREEN, WHITE} from '../Constraints/constants';

const StyledButtonComponent = styled(ButtonComponent)`
    background-color: ${GREEN};
    border-radius: 10px;
    padding: 15px 40px;
    color: ${WHITE};
    text-transform: capitalize;
    transition: 0.3s ease;

    &:hover {
        background-color: #006400;
        color: white;
    }
`

const StyledNotesButtonComponent = styled(StyledButtonComponent)`
    background-color: ${({ color }) => color};
    box-shadow: none;
    width: 100%;
    border-radius: 20px;
    padding: 10px 20px;
    color: ${BLACK};
    font-size: 16px;

    &:hover {
        background-color: ${({ color }) => color};
        color: ${BLACK};
    }
`

export {StyledButtonComponent, StyledNotesButtonComponent}