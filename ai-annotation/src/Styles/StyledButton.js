import styled from "styled-components";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import {BLACK, GREEN, WHITE} from '../Constraints/constants';

const StyledButtonComponent = styled(ButtonComponent)`
    background-color: ${GREEN};
    border-radius: 10px;
    padding: 15px 40px;
    color: ${WHITE};
    text-transform: capitalize;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    transition: 0.3s ease;

    &:hover {
        background-color: ${GREEN};
        color: ${WHITE};
    }
`

const StyledNotesButton = styled(StyledButtonComponent)`
    border-radius: 20px;
    width: 95%;
    background-color: ${({ color }) => color};
    font-size: 15px;
    padding: 10px 15px;
    color: ${BLACK};

    &:hover {
        background-color: ${({ color }) => color};
        color: revert;
    }
`;

export {StyledButtonComponent, StyledNotesButton}
