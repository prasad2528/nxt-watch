import styled from 'styled-components'

export const CardContainer = styled.div`
  //display: flex;
  background-color: ${props => props.background};
  //justify-content: center;
  margin-left: 440px;
  overflow: hidden;
  margin-top: 90px;
  padding: 50px 0 50px 60px;
  //border: 2px solid;
`

export const HomeContainer = styled.div`
  background-color: ${props => props.background};
  min-height: 100vh;
  padding: 20px 0;
`
export const VideoContainer = styled.div`
  width: 95%;
`

export const VideoUrl = styled.img`
  width: 100%;
`
export const VideoTitle = styled.h2`
  color: ${props => props.textColor};
  color: ${props => props.textColor};
`
export const ViewsContainer = styled.div`
  display: flex;
  align-items: center;
`
export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Paragraph = styled.p`
  margin-right: 30px;
  font-weight: 600;
  color: ${props => props.textColor};
`
export const LikesContainer = styled.div`
  display: flex;
  align-items: center;
`
export const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`
export const Line = styled.hr``
export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`
export const ProfileDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const ProfileDetails = styled.div``
export const Profile = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  align-self: flex-start;
  margin-top: 15px;
`
export const MainButton = styled.button`
  height: 40px;
  width: 40px;
  cursor: pointer;
  color: ${props => props.color};
  border: none;
  outline: none;
  background-color: transparent;
`
