import styled from "styled-components";
import {ReactComponent as Arrow_Left} from '../Assets/Arrow_Left.svg';
import {ReactComponent as Arrow_Right} from '../Assets/Arrow_Right.svg';

const StyledCarouselContainer = styled.div`
    display: flex;
    column-gap: 15px;
    overflow: hidden;
    width: 100%;
    min-height: 30%;
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
    transform: translateX(${({index, activeIndex}) => (index - activeIndex) * 110}%);
    transition: 0.5s ease;
    position: absolute;
    width: 100%;
    height: 100%;
    
    div {
        text-align: left;

        ul{
            padding: 0 30px;
            font-size: 15px;
        }
    }
`

const StyledCarouselDot = styled.div`
    margin: auto;
    display: flex;
    justify-content: space-between;
    width: 20px;
    height: 20px;
    background-color: ${({ activeIndex, currentIndex }) => activeIndex === currentIndex ? 'green' : '#b5b5b5'};
    border-radius: 50%;
  
`

const StyledDotContainer = styled.div`
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .5);
    border-radius: 10px;
    padding: 5px 0;
`

const StyledArrowButtonLeft = styled(Arrow_Left)`
    position: relative;
    top: 120px;
    right: 17vw;
    z-index: 1;
    &:hover {
        cursor: pointer;
    }
`;
const StyledArrowButtonRight = styled(Arrow_Right)`
    position: relative;
    top: 120px;
    left: 17vw;
    z-index: 1;
    &:hover {
        cursor: pointer;
    }
`;

export {StyledCarouselContainer, StyledCarouselDesc, StyledCarouselInnerContainer, StyledCarouselDot, StyledArrowButtonLeft, StyledArrowButtonRight, StyledDotContainer}