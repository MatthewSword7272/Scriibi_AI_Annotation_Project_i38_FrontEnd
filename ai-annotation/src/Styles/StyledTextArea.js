import styled from "styled-components";
import { RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor';
import { GREEN } from "../constants";

// const StyledTextAreaWrapper = styled.div`
    
//     .e-input-group:not(.e-float-icon-left):not(.e-float-input)::before,
//     .e-input-group:not(.e-float-icon-left):not(.e-float-input)::after,
//     .e-input-group textarea.e-input::selection
//     {
//         background: ${GREEN};
//     }
    
// `

const StyledRichTextEditor = styled(RichTextEditorComponent)`
    width: 65em !important;
    height: 40em !important;
    text-align: left;
`

export {StyledRichTextEditor}