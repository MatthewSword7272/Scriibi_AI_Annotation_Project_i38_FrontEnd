import styled from "styled-components";
import {ReactComponent as Arrow_Left} from '../Assets/Arrow_Left.svg';
import {ReactComponent as Arrow_Right} from '../Assets/Arrow_Right.svg';

const StyledCarouselContainer = styled.div`
    display: flex;
    column-gap: 15px;
    overflow: hidden;
    width: 100%;
    height: 45%;
    justify-content: center;
`

const StyledCarouselInnerContainer = styled.div`
    display: flex;
    margin: 20px 0;
    position: relative;
    width: 15vw;
    height: 22em;
`

const StyledCarouselDesc = styled.div`
    transform: translateX(${props => (props
// @ts-ignore
    .index - props.activeIndex) * 110}%);
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
            font-size: 15px;
        }
    }
`

const StyledArrowButtonLeft = styled(Arrow_Left)`
    position: relative;
    top: 120px;
    right: 17vw;
    &:hover {
        cursor: pointer;
    }
`;
const StyledArrowButtonRight = styled(Arrow_Right)`
    position: relative;
    top: 120px;
    left: 17vw;
    &:hover {
        cursor: pointer;
    }
`;

export {StyledCarouselContainer, StyledCarouselDesc, StyledCarouselInnerContainer, StyledArrowButtonLeft, StyledArrowButtonRight}