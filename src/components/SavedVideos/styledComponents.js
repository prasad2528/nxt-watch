import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const TrendingList = styled.ul`
  list-style-type: none;
  // border: 2px solid red;
`

export const CardContainer = styled.div`
  //display: flex;
  background-color: ${props => props.background};
  //justify-content: center;
  margin-left: 440px;
  overflow: hidden;
  margin-top: 90px;
  padding: 30px 0 30px 60px;
  //border: 2px solid;
`
export const MainHeading = styled.div`
  display: flex;
  align-items: center;
  margin-left: 60px;
`
export const ItemLink = styled(Link)`
  text-decoration: none;
`

export const TrendingHeading = styled.h1`
  margin-left: 20px;
  color: ${props => props.textColor};
`
export const VideoItem = styled.li`
  display: flex;
  margin: 20px 0 50px 20px;
  width: 90%;
`

export const VideoViewsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`
export const VideoTitle = styled.h2`
  font-size: 20px;
  color: ${props => props.textColor};
`
export const VideoName = styled.p`
  color: ${props => props.textColor};
`
export const VideoDetails = styled.div`
  align-self: flex-start;
`
export const VideoImage = styled.img`
  width: 500px;
  margin-right: 30px;
`
export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const FailureImage = styled.img`
  width: 80%;
  height: 60%;
`
