import styled from 'styled-components'
import {WHITE} from "../Constraints/colours";

const StyledHeader = styled.header`
    text-align: center;
    font-size: 20px;
    background-color: ${WHITE};
    border-bottom: 5px solid green;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const StyledHeaderSection = styled.div`
    display: flex;
    align-items: center;
    column-gap: 50px;
    margin-left: 20px;
`

const StyledHeaderLogo = styled.img`
    width: 7em;
`

const StyledHeaderLinks = styled.div`
    display: flex;
    column-gap: 70px;

    h4 {
        font-weight: 300;
    }
`

const StyledHeaderProfile = styled.div`
    display: flex;
    column-gap: 20px;
    margin-right: 20px;
`

export {StyledHeader, StyledHeaderLogo, StyledHeaderLinks, StyledHeaderProfile, StyledHeaderSection};