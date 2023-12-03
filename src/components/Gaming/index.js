import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import NavigationBars from '../NavigationBars'
import Header from '../Header'
import NxtContext from '../../context/NxtContext'
import {
  CardContainer,
  MainHeading,
  TrendingHeading,
  TrendingList,
  VideoItem,
  VideoViewsContainer,
  VideoDetails,
  VideoImage,
  VideoName,
  VideoTitle,
  RenderLoader,
  FailureContainer,
  FailureImage,
  CustomButton,
  ItemLink,
  NoVideoTitle,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {gamingVideos: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewsCount: eachVideo.view_count,
      }))
      this.setState({
        gamingVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => {
    this.getGamingVideos()
  }

  renderFailureView = () => (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <NoVideoTitle>Oops! Something Went Wrong</NoVideoTitle>
      <VideoName>
        We are having some trouble to complete your request Please try again.
      </VideoName>
      <CustomButton bgColor color onClick={this.retry}>
        Retry
      </CustomButton>
    </FailureContainer>
  )

  renderLoader = () => (
    <RenderLoader data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </RenderLoader>
  )

  renderGamingVideos = () => (
    <NxtContext.Consumer>
      {value => {
        const {gamingVideos} = this.state
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? '#fff' : '#000'
        return (
          <TrendingList>
            {gamingVideos.map(eachVideo => (
              <ItemLink to={`videos/${eachVideo.id}`} key={eachVideo.id}>
                <VideoItem key={eachVideo.id}>
                  <VideoImage
                    src={eachVideo.thumbnailUrl}
                    alt="video thumbnail"
                  />
                  <VideoDetails>
                    <VideoTitle textColor={textColor}>
                      {eachVideo.title}
                    </VideoTitle>
                    <VideoViewsContainer>
                      <VideoName textColor={textColor}>
                        {eachVideo.viewsCount} Watching Worldwide
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

  renderGetAllGamingVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingVideos()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
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
              <CardContainer data-testid="gaming" background={background}>
                <MainHeading>
                  <SiYoutubegaming size={30} color="#ff0b37" />
                  <TrendingHeading textColor={textColor}>
                    Gaming
                  </TrendingHeading>
                </MainHeading>
                {this.renderGetAllGamingVideos()}
              </CardContainer>
            </>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}
export default Gaming
