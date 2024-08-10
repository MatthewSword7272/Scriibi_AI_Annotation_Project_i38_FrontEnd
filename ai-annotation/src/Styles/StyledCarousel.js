import styled from "styled-components";

const StyledCarouselContainer = styled.div`
    display: flex;
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .5);
`

const StyledCarouselDesc = styled.div`
    width: 21vw;
    
    div {
        text-align: left;

        ul{
            padding: 0 20px;
        }
    }
`

export {StyledCarouselContainer, StyledCarouselDesc}