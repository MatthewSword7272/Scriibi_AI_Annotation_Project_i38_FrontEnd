import styled from "styled-components";
import {ReactComponent as Arrow_Left} from '../Assets/Arrow_Left.svg';
import {ReactComponent as Arrow_Right} from '../Assets/Arrow_Right.svg';
import { GREEN, GREY } from "Constraints/constants";

const StyledCarouselContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  margin: 20px 0;
`;

const StyledCarouselInnerContainer = styled.div`
  transition: transform 0.5s ease;
  transform: translateX(${({gridCentre}) => -gridCentre * 150}px);
  width: 95%;
`;

const StyledCarouselGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCarouselRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 15px;

  &:nth-child(1) {
    margin-bottom: 20px;
  }
`;

const StyledH4 = styled.h4`
  margin: 0;
  text-align: center;
  width: 20px;
  flex-shrink: 0;
`;

const StyledDotContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center; 
  width: 90%;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, .5);
  border-radius: 10px;
  padding: 3px 0;
  column-gap: 3vw;
`;

const StyledCarouselDot = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ isActive }) => isActive ? GREEN : GREY};
  border-radius: 50%;
  transition: transform 0.3s ease;
  flex-shrink: 0;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const StyledCarouselDescription = styled.div`
  width: 240px;
  flex-shrink: 0;
  font-size: 14px;

  ul {
    padding: 0 20px;
    max-height: 200px;
    overflow-y: auto;
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
    StyledCarouselGrid,
    StyledCarouselDescription,
    StyledCarouselRow,
    StyledArrowContainer
}