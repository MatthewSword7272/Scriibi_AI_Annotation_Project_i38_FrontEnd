import styled from "styled-components";
import {ReactComponent as Arrow_Left} from '../Assets/Arrow_Left.svg';
import {ReactComponent as Arrow_Right} from '../Assets/Arrow_Right.svg';
import { GREEN, GREY } from "Constraints/colours";

const StyledCarouselContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  margin: 20px 0;
`;

const StyledCarouselInnerContainer = styled.div`
  width: 99%;
  display: flex;
  flex-direction: column;
`;

const StyledCarouselRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  ${'' /* transform: translateX(${props => -props.gridCentre * 35}%); */}
  align-items: center;
  margin-bottom: 15px;
  transition: transform 0.5s ease-in-out;

  &:nth-child(1) {
    margin-bottom: 20px;
    column-gap: 4.5%;
  }

  &:nth-child(3) {
    align-items: flex-start;
  }
`;

const StyledH4 = styled.h4`
  margin: 0;
  text-align: center;
  width: 20px;
  font-weight: 600;
`;

const StyledDotContainer = styled.div`
  width: 100%;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, .5);
  border-radius: 10px;
  padding: 3px 0;
  
`;

const StyledDotInnerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center; 
  column-gap: 3vw;
  ${'' /* transform: translateX(${props => -props.gridCentre * 35}%); */}
  transition: transform 0.5s ease-in-out;
`

const StyledCarouselDot = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.isActive ? GREEN : GREY};
  border-radius: 50%;
  transition: transform 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const StyledCarouselDescription = styled.div`
  width: 75%;
  padding: 0 2vw;

  ul {
    font-family: 'Segoe UI', sans-serif;
    min-height: 300px;
    overflow-y: auto;
    padding-left: 20px;
  }
`;

const StyledArrowContainer = styled.div`
  position: absolute;
  top: 12em;
  display: flex;
  justify-content: space-between;
  column-gap: 55vw;
`;

const StyledArrowButtonLeft = styled(Arrow_Left)`
  width: 20px;
  cursor: pointer;
  z-index: 2;
`;

const StyledArrowButtonRight = styled(Arrow_Right)`
  width: 20px;
  cursor: pointer;
  z-index: 2;
`;


export {
    StyledCarouselContainer,
    StyledCarouselDot, 
    StyledArrowButtonLeft, 
    StyledArrowButtonRight, 
    StyledDotContainer,
    StyledH4,
    StyledCarouselInnerContainer,
    StyledCarouselDescription,
    StyledCarouselRow,
    StyledArrowContainer,
    StyledDotInnerContainer
}