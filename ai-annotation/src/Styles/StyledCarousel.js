import styled from "styled-components";
import {ReactComponent as Arrow_Left} from '../Assets/Arrow_Left.svg';
import {ReactComponent as Arrow_Right} from '../Assets/Arrow_Right.svg';
import { GREEN, GREY } from "Constraints/constants";

const StyledCarouselContainer = styled.div`
    display: flex;
    width: 100%;
    min-height: 30%;
    justify-content: center;
    margin: 20px 0;
    flex-direction: column;
    align-items: center;
`

const StyledH4 = styled.h4`
    transform: translateX(${({index, activeIndex}) => (index - activeIndex) * 110}%);
    position: absolute;
    transition: 0.5s ease;
    margin: 0;
    text-align: center;
    width: 27.5%;
`

const StyledLevelHeadingInnerContainer = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    justify-content: center;
    height: 45px;
    align-items: center;
    overflow: hidden;
`

const StyledLevelHeadingContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`

const StyledCarouselDot = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${({ activeIndex, currentIndex }) => activeIndex === currentIndex ? `${GREEN}` : `${GREY}`};
    border-radius: 50%;
`

const StyledDotContainer = styled.div`
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .5);
    border-radius: 10px;
    padding: 5px 5%;
    column-gap: 60px;
    display: flex;
    justify-content: space-around;
    width: 85%;
    margin: 10px 0;
    transition: 0.5s ease;
    transform: translateX(${({activeIndex, totalItems}) => (Math.floor(totalItems / 2) - activeIndex) * 32.5}%);
`

const StyledCarouselDescriptionContainer = styled.div`
    position: relative;
    width: 75%;
    height: 300px;
`

const StyledCarouselDescription = styled.div`
    min-width: 40%;
    position: absolute;
    transform: translateX(${({currentIndex, activeIndex}) => (currentIndex - activeIndex) * 105}%);
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .5);
    transition: 0.5s ease;
    border-radius: 10px;
    width: 20vw;
    left: 30%;
    height: 90%;

    ul {
        text-align: left;
        padding: 10px 30px;
        font-size: 15px;
        height: 100%;
        overflow-y: auto;
    }
`

const StyledArrowButtonLeft = styled(Arrow_Left)`
    position: relative;
    width: 20px;
    
    &:hover {
        cursor: pointer;
    }
`;
const StyledArrowButtonRight = styled(Arrow_Right)`
    position: relative;
    width: 20px;
   
    &:hover {
        cursor: pointer;
    }
`;

export {
    StyledCarouselContainer,
    StyledCarouselDot, 
    StyledArrowButtonLeft, 
    StyledArrowButtonRight, 
    StyledDotContainer,
    StyledCarouselDescription,
    StyledH4,
    StyledCarouselDescriptionContainer,
    StyledLevelHeadingContainer,
    StyledLevelHeadingInnerContainer
}