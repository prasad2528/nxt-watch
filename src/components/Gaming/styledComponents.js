import {Link} from 'react-router-dom'
import styled from 'styled-components'

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

export const TrendingHeading = styled.h1`
  margin-left: 20px;
  color: ${props => props.textColor};
`
export const TrendingList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  // border: 2px solid red;
`

export const VideoItem = styled.li`
  margin: 20px 0 50px 20px;
`
export const NoVideoTitle = styled.h1`
  font-weight: 400;
`

export const VideoViewsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`
export const VideoTitle = styled.p`
  font-size: 20px;
  color: ${props => props.textColor};
`
export const VideoName = styled.p`
  color: ${props => props.textColor};
`
export const VideoDetails = styled.div``
export const VideoImage = styled.img`
  width: 250px;
  height: 380px;
  margin-right: 30px;
`
export const RenderLoader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
export const CustomButton = styled.button`
  width: 120px;
  height: 40px;
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: #4f46e5;
  color: #fff;
`
export const ItemLink = styled(Link)`
  text-decoration: none;
`
