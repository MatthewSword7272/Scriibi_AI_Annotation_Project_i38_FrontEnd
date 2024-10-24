import { DialogComponent } from "@syncfusion/ej2-react-popups";
import styled from "styled-components";

const StyledDialogBox = styled(DialogComponent)`

    border-radius: 15px;
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .5);

    .e-dlg-header {
        color: green;
        font-size: 1.5rem;
        font-weight: 700;
    }

    .e-dlg-header-content {
        border-radius: 15px 15px 0 0; // Matching top corners
        text-transform: capitalize;
    }

   .e-dialog-border-resize .e-south {
        border-radius: 0 0 15px 15px; // Matching top corners
    }

    .e-dlg-content {
        font-size: 1rem;
    }
`

export {StyledDialogBox}

