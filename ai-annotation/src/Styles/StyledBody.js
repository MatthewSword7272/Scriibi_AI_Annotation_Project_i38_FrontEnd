import styled from 'styled-components'

const StyledBodyContainer = styled.div`
    border: 3px solid black;
    border-radius: 30px;
    padding: 10px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 30px;
    display: inline-flex;
    justify-content: space-evenly;
    width: 95vw;
    column-gap: 20px;
`

const StyledSubBodyContainer1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledSubBodyContainer2 = styled.div`
    width: 30em;

`

export {StyledBodyContainer, StyledSubBodyContainer1, StyledSubBodyContainer2};