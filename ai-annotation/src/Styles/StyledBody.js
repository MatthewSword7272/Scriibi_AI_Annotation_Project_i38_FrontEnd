import styled from 'styled-components'

const StyledBodyContainer = styled.div`
    border: 3px solid black;
    border-radius: 30px;
    padding: 10px;
    margin: 30px 20px;
    display: inline-flex;
    justify-content: space-evenly;
    width: 95vw;
    column-gap: 20px;
    height: 110vh;
    min-height: 63em;
`

const StyledSubBodyContainer1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70vw;
    overflow-y: hidden;
`;

const StyledSubBodyContainer2 = styled.div`
    width: 25vw;
    max-width: 20%;

`

export {StyledBodyContainer, StyledSubBodyContainer1, StyledSubBodyContainer2}