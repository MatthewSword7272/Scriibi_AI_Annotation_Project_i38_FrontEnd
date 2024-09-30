import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import { ORANGE } from "Constraints/constants";
import styled from "styled-components";

const StyledToast = styled(ToastComponent)`
  .e-toast {
    background-color: ${ORANGE} !important
  }
`

export { StyledToast }