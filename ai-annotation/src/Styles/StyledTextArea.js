import styled from "styled-components";
import { RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor';
import { GREEN } from "../Constraints/constants";

// const StyledTextAreaWrapper = styled.div`
    
//     .e-input-group:not(.e-float-icon-left):not(.e-float-input)::before,
//     .e-input-group:not(.e-float-icon-left):not(.e-float-input)::after,
//     .e-input-group textarea.e-input::selection
//     {
//         background: ${GREEN};
//     }
    
// `

const StyledRichTextEditor = styled(RichTextEditorComponent)`
    text-align: left;

    div div {
        height: 30em;
    }
`

export {StyledRichTextEditor}