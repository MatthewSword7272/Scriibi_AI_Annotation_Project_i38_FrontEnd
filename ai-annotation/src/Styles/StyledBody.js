import styled from 'styled-components'

const StyledBody = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    justify-items: center;
    padding-bottom: 5em;
`;

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
`

const StyledMovieInfoBody = styled(StyledContainer)`
    display: flex;
    flex-direction: column;
    margin: 30px;
    margin-top: 100px;
    row-gap: 2em;
    align-items: center;
    padding: 30px 0;
`;

const StyledMovieInfoInnerBody = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10vw;
`

const StyledBodyMovieInfoImage = styled.div`
    img
    {
        width: 100%;
        height: auto;
        display: block;
        max-width: 250px;
        min-width: 100px;
    }
    
`

const StyledMovieInfoDiv = styled.div`
    font-size: larger;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export {StyledBody, StyledMovieInfoBody, StyledBodyMovieInfoImage, StyledMovieInfoDiv, StyledBodyContainer, StyledMovieInfoInnerBody};