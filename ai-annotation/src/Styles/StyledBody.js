import styled from 'styled-components'

const StyledContainer = styled.div`
    background-color: #c2c2c2;
    border: 3px solid black;
    border-radius: 30px;
`

const StyledBodyContainer = styled(StyledContainer)`
    padding: 10px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 30px;
    display: flex;
    justify-content: space-evenly;
`

const StyledSubBodyContainer2 = styled.div`
    width: 30em;

`

export {StyledBodyContainer, StyledSubBodyContainer2};