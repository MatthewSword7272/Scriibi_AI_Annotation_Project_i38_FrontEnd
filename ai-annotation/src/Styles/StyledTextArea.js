import { TextAreaComponent } from "@syncfusion/ej2-react-inputs";
import styled from "styled-components";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(process.env.SYNCFUSION_KEY);

const StyledTextArea = styled(TextAreaComponent)`
    textarea {
        border: black 5px solid;
    }
    
`

export {StyledTextArea}