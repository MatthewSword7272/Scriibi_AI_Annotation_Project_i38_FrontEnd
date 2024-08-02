import styled from "styled-components";
import { GREEN } from "../constants";

const StyledTextAreaWrapper = styled.div`
    
    .e-input-group:not(.e-float-icon-left):not(.e-float-input)::before,
    .e-input-group:not(.e-float-icon-left):not(.e-float-input)::after,
    .e-input-group textarea.e-input::selection
    {
        background: ${GREEN};
    }
    
`

export {StyledTextAreaWrapper}