import styled from "styled-components";
import {ReactComponent as Arrow_Left} from '../Assets/Arrow_Left.svg';
import {ReactComponent as Arrow_Right} from '../Assets/Arrow_Right.svg';
import { GREEN, GREY } from "Constraints/constants";

const StyledCarouselContainer = styled.div`
    display: flex;
    column-gap: 15px;
    overflow: hidden;
    width: 100%;
    min-height: 30%;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    margin-bottom: 50px;
`

const StyledCarouselInnerContainer = styled.div`
    display: flex;
    margin: 20px 0;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 90%;
    
`

const StyledCarouselDesc = styled.div`
    transform: translateX(${({currentIndex, activeIndex}) => (currentIndex - activeIndex) * 110}%);
    transition: 0.5s ease;
    position: absolute;
    width: 100%;
    height: 100%;
`

const StyledLevelHeadingContainer = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    justify-content: center;
    height: 45px;
    align-items: center;
    overflow: hidden;
`


const StyledH4 = styled.h4`
    transform: translateX(${({index, activeIndex}) => (index - activeIndex) * 110}%);
    position: absolute;
    transition: 0.5s ease;
    margin: 0;
    text-align: center;
    width: 35%;
`

const StyledCarouselDot = styled.div`
    margin: auto;
    width: 20px;
    height: 20px;
    background-color: ${({ activeIndex, currentIndex }) => activeIndex === currentIndex ? `${GREEN}` : `${GREY}`};
    border-radius: 50%;
    transform: translateX(${({activeIndex, currentIndex}) => (currentIndex - activeIndex) * 110}%);
  
`

const StyledDotContainer = styled.div`
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .5);
    border-radius: 10px;
    padding: 5px 5%;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 10px 0;
    
`

const StyledCarouselDescriptionContainer = styled.div`
    width: 100%;
    position: relative;
    overflow: visible;
    height: 300px;
    margin-top: 20px;
`

const StyledCarouselDescription = styled.div`
    width: 300px;
    height: 100%;
    position: absolute;
    /* width: 30%; */
    left: ${({currentIndex}) => currentIndex * 20}%;
    transform: translateX(${({currentIndex, activeIndex}) => (currentIndex - activeIndex) * 100}%);
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .5);
    transition: 0.5s ease;
    border-radius: 10px;
    box-sizing: border-box;

    ul {
        text-align: left;
        padding: 10px 30px;
        font-size: 15px;
        margin: 0;
        height: 100%;
        overflow-y: auto;
    }
`

const StyledArrowButtonLeft = styled(Arrow_Left)`
    position: relative;
    
    &:hover {
        cursor: pointer;
    }
`;
const StyledArrowButtonRight = styled(Arrow_Right)`
    position: relative;
   
    &:hover {
        cursor: pointer;
    }
`;

export {
    StyledCarouselContainer, 
    StyledCarouselDesc, 
    StyledCarouselInnerContainer, 
    StyledCarouselDot, 
    StyledArrowButtonLeft, 
    StyledArrowButtonRight, 
    StyledDotContainer,
    StyledCarouselDescription,
    StyledH4,
    StyledCarouselDescriptionContainer,
    StyledLevelHeadingContainer}