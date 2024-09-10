import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { GREY } from "Constraints/constants";
import styled from "styled-components";

const StyledDialogBox = styled(DialogComponent)`

    border-radius: 15px;

    .e-dlg-header-content {
        border-radius: 15px 15px 0 0; // Matching top corners
        border: ${GREY} 3px solid;
        border-bottom: 0;
    }

    
    .e-dlg-content {
        border-left: ${GREY} 3px solid;
        border-right: ${GREY} 3px solid;
    }

   .e-dialog-border-resize .e-south {
        border-radius: 0 0 15px 15px; // Matching top corners
        border-bottom: ${GREY} 3px solid;
    }
`

export {StyledDialogBox}

