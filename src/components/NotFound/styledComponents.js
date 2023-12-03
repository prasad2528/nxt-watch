import styled from 'styled-components'

export const NotFoundTitle = styled.h1`
  font-weight: 600;
`

export const NotFoundParagraph = styled.p`
  font-weight: 400;
`
export const NotFoundImage = styled.img`
  width: 80%;
`
export const CardContainer = styled.div`
  //display: flex;
  background-color: ${props => props.background};
  //justify-content: center;
  margin-left: 440px;
  overflow: hidden;
  margin-top: 90px;
  padding: 30px 0 30px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //border: 2px solid;
`
