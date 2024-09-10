import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import styled from "styled-components";

const StyledEditContainer = styled.div`
    border-radius: 10px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .5);
    padding-top: 10px;

    h2 {
        margin: 0;
    }
`

const StyledEditInnerContainer = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 20px;

    h6 {
        font-weight: 200;
        margin: 10px;
    }
`

const StyledEditButtonContainer = styled.div`

    color: ${props => props.color};

    .e-btn {
        border-color: ${props => props.color};

        &:hover {
            border-color: ${props => props.color};
        }
    }
`

const StyledEditButton = styled(ButtonComponent)`
    
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    border-radius: 10px;

    span {
        font-size: 20px !important;
    }
`

export {StyledEditContainer, StyledEditInnerContainer, StyledEditButton, StyledEditButtonContainer}