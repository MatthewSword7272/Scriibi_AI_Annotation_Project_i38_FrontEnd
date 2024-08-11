import styled from "styled-components";
import {ReactComponent as Arrow_Left} from '../Assets/Arrow_Left.svg';
import {ReactComponent as Arrow_Right} from '../Assets/Arrow_Right.svg';

const StyledCarouselContainer = styled.div`
    display: flex;
    column-gap: 15px;
    overflow: hidden;
    max-width: 70%;
    height: 45%;
`

const StyledCarouselInnerContainer = styled.div`
    display: flex;
    margin: 20px 0;
    position: relative;
    width: 20vw;
`

const StyledCarouselDesc = styled.div`
    transform: translateX(${props => (props.index - props.activeIndex) * 110}%);
    transition: opacity 0.5s ease;
    transform: 0.5s ease;
    position: absolute;
    width: 100%;
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .5);
    border-radius: 10px;
    z-index: -1;
    height: 100%;
    
    div {
        text-align: left;

        ul{
            padding: 0 30px;
        }
    }
`

const StyledArrowButtonLeft = styled(Arrow_Left)`
    position: relative;
    top: 120px;
    &:hover {
        cursor: pointer;
    }
`;
const StyledArrowButtonRight = styled(Arrow_Right)`
    position: relative;
    top: 120px;
    &:hover {
        cursor: pointer;
    }
`;

export {StyledCarouselContainer, StyledCarouselDesc, StyledCarouselInnerContainer, StyledArrowButtonLeft, StyledArrowButtonRight}