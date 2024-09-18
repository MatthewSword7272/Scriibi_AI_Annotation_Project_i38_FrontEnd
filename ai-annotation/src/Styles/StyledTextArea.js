import styled from "styled-components";
import { RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor';

const StyledRichTextEditor = styled(RichTextEditorComponent)`
    width: 65em !important;
    height: 40em !important;
    text-align: left;

    .e-rte-content {
        height: 30em;
    }
`

export {StyledRichTextEditor}