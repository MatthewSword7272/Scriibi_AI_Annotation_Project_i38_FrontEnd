import styled from "styled-components";
import {ReactComponent as Arrow_Left} from '../Assets/Arrow_Left.svg';
import {ReactComponent as Arrow_Right} from '../Assets/Arrow_Right.svg';

const StyledCarouselContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 15px;
`

const StyledCarouselInnerContainer = styled.div`
    display: flex;
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .5);
`

const StyledCarouselDesc = styled.div`
    width: 21vw;
    
    div {
        text-align: left;

        ul{
            padding: 0 20px;
        }
    }
`

const StyledArrowButtonLeft = styled(Arrow_Left)``;
const StyledArrowButtonRight = styled(Arrow_Right)``;

export {StyledCarouselContainer, StyledCarouselDesc, StyledCarouselInnerContainer, StyledArrowButtonLeft, StyledArrowButtonRight}