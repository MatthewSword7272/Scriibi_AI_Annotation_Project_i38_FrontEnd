import styled from "styled-components";
import {ORANGE, WHITE} from "../Constraints/constants";

const StyledAccordionContainer = styled.div`
    background-color: ${WHITE};
    margin: 20px 0;
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .5);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;


    h2 {
        margin-top: 0;
    }

`

const StyledAccordionMissingContainer = styled(StyledAccordionContainer)`
    border: ${ORANGE} solid 2px;

    h2 {
        color: ${ORANGE};
    }

`

export {StyledAccordionContainer, StyledAccordionMissingContainer}