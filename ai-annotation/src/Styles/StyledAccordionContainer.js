import styled from "styled-components";
import * as Constants from "../constants";

const StyledAccordionContainer = styled.div`
    background-color: ${Constants.WHITE};
    margin: 20px 0;
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .5);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Raleway", sans-serif;

    h2 {
        margin-top: 0;
    }

`

const StyledAccordionMissingContainer = styled.div`
    background-color: transparent;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    border: #D86918 solid 2px;
    max-width: 27em;

    h3 {
        color: #D86918;
        text-align: center;
        margin: 0 0 10px 0;
        font-weight: 500;
    }

`

export {StyledAccordionContainer, StyledAccordionMissingContainer}