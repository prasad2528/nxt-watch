import {CgPlayListAdd} from 'react-icons/cg'
import {
  TrendingList,
  CardContainer,
  MainHeading,
  TrendingHeading,
  VideoItem,
  VideoViewsContainer,
  VideoDetails,
  VideoImage,
  VideoName,
  VideoTitle,
  ItemLink,
  FailureContainer,
  FailureImage,
  NoVideoTitle,
} from './styledComponents'
import NavigationBars from '../NavigationBars'
import Header from '../Header'
import NxtContext from '../../context/NxtContext'

const SavedVideos = () => {
  const savedList = () => (
    <NxtContext.Consumer>
      {value => {
        const {isDarkTheme, savedVideos} = value
        const textColor = isDarkTheme ? '#fff' : '#000'
        const {thumbnailUrl} = savedVideos
        console.log(savedVideos)
        console.log(thumbnailUrl)
        if (savedVideos.length === 0) {
          console.log(savedVideos.length)
          return (
            <FailureContainer>
              <FailureImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
                alt="no saved videos"
              />

              <NoVideoTitle textColor={textColor}>
                No saved videos found
              </NoVideoTitle>
              <VideoName textColor={textColor}>
                You can save your videos while watching them
              </VideoName>
            </FailureContainer>
          )
        }
        return (
          <TrendingList>
            {savedVideos.map(eachVideo => (
              <ItemLink to={`/videos/${eachVideo.id}`} key={eachVideo.id}>
                <VideoItem key={eachVideo.id}>
                  <VideoImage
                    src={eachVideo.thumbnailUrl}
                    alt="video thumbnail"
                  />
                  <VideoDetails>
                    <VideoTitle textColor={textColor}>
                      {eachVideo.title}
                    </VideoTitle>
                    <VideoName textColor={textColor}>
                      {eachVideo.name}
                    </VideoName>
                    <VideoViewsContainer>
                      <VideoName textColor={textColor}>
                        {eachVideo.viewCount} views
                      </VideoName>
                      <VideoName textColor={textColor}>
                        {eachVideo.publishedAt}
                      </VideoName>
                    </VideoViewsContainer>
                  </VideoDetails>
                </VideoItem>
              </ItemLink>
            ))}
          </TrendingList>
        )
      }}
    </NxtContext.Consumer>
  )

  return (
    <NxtContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const background = isDarkTheme ? '#0f0f0f' : '#ffffff'
        const textColor = isDarkTheme ? '#fff' : '#000'
        return (
          <>
            <Header />
            <NavigationBars />
            <CardContainer data-testid="savedVideos" background={background}>
              <MainHeading>
                <CgPlayListAdd size={40} color="#ff0b37" />
                <TrendingHeading textColor={textColor}>
                  saved videos
                </TrendingHeading>
              </MainHeading>
              {savedList()}
            </CardContainer>
          </>
        )
      }}
    </NxtContext.Consumer>
  )
}
export default SavedVideos
