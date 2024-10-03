import styled from 'styled-components';


const StyledFlag = styled.span`
  z-index: 1;
  background: ${(props) => props.color};
  position: absolute;
  border-radius: 5px;
  padding: 3px 8px;
  line-height: normal;
  cursor: pointer;
  transform: ${(props) => props.translate};
  height: 15px;
  width: 15px;
  color: white;
`;

export default StyledFlag;