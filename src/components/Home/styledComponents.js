import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const HomeBgContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.background};
`
export const CardContainer = styled.div`
  //display: flex;
  background-color: ${props => props.background};
  //justify-content: center;
  margin-left: 470px;
  overflow: hidden;
`
export const ItemLink = styled(Link)`
  text-decoration: none;
`

export const BannerBgContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 50px 20px;
  background-color: ${props => props.background};
  margin-top: 90px;
  width: 95%;
`
export const BannerImage = styled.img`
  width: 200px;
  height: 50px;
`
export const Paragraph = styled.p`
  font-size: 20px;
  font-family:"Roboto"
  font-weight:700;
  margin-bottom: 40px;
`
export const CustomButton = styled.button`
  outline: none;
  border: 2px solid #181818;
  background-color: ${props => (props.bgColor ? '#0b69ff' : 'transparent')};
  color: ${props => (props.color ? '#ffffff' : '#181818')};
  border-radius: 5px;
  height: 40px;
  width: 140px;
  font-weight: 600;
`
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 82px;
  margin-bottom: 30px;
  margin-top: 40px;
`

export const SearchInput = styled.input`
  width: 600px;
  height: 40px;
  border: 1px solid #93a3b8;
  outline: none;
  padding: 10px;
  background-color: ${props => props.background};
  color: ${props => props.textColor};
`

export const SearchButton = styled.button`
  width: 80px;
  height: 40px;
  outline: none;
  border: 1px solid #93a3b8;
  background-color: #cbd5e1;
  cursor: pointer;
`
export const CloseButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  align-self: flex-start;
  cursor: pointer;
`
export const BannerDetails = styled.div``
export const ApiDetailsContainer = styled.div`
  background-color: ${props => props.background};
  padding-top: 40px;
  margin-top: 30px;
  //border: 2px solid red;
  width: 100%;
`
export const UlContainer = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 30px;
  //border: 2px solid green;
  margin: 0;
  padding: 0;
`
export const ListContainer = styled.li`
  width: 400px;
  padding-bottom: 60px;
`
export const VideoImage = styled.img`
  width: 100%;
  margin-bottom: 10px;
`
export const VideoDetailsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  font-family: 'Roboto';
`
export const VideoDetails = styled.div``
export const VideoTitle = styled.p`
  font-weight: 400;
  font-size: 17px;
  color: ${props => props.textColor};
`
export const NoVideoTitle = styled.h1`
  font-weight: 400;
`
export const VideoViewsContainer = styled.div`
  display: flex;
  align-items: center;
`
export const VideoLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  margin-top: 20px;
`
export const VideoName = styled.p`
  color: #64748b;
  margin-right: 20px;
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
export const FlexContainer = styled.div`
  width: 80%;
  margin-left: 500px;
`
export const NoVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
export const NoVideosImage = styled.img`
  width: 300px;
  height: 300px;
`
