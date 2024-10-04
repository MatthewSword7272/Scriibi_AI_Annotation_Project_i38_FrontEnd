import styled from 'styled-components';


const StyledFlag = styled.span`
  z-index: 1;
  background: ${(props) => props.color};
  position: absolute;
  border-radius: 5px;
  padding: 3px 8px;
  line-height: initial;
  cursor: pointer;
  transform: ${(props) => props.translate};
  height: 1em;
  width: 1em;
  color: white;
`;

export default StyledFlag;