import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillFire} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
// import NxtContext from '../../context/NxtContext'
import NavigationBars from '../NavigationBars'
import Header from '../Header'
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
import NxtContext from '../../context/NxtContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {trendingVideos: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
        viewsCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))
      this.setState({
        trendingVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => {
    this.getTrendingVideos()
  }

  renderFailureView = () => (
    <NxtContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? '#fff' : '#000'
        return (
          <FailureContainer>
            <FailureImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
            />
            <NoVideoTitle textColor={textColor}>
              Oops! Something Went Wrong
            </NoVideoTitle>
            <VideoName textColor={textColor}>
              We are having some trouble to complete your request Please try
              again.
            </VideoName>
            <CustomButton
              bgColor
              color
              onClick={this.retry}
              textColor={textColor}
            >
              Retry
            </CustomButton>
          </FailureContainer>
        )
      }}
    </NxtContext.Consumer>
  )

  renderLoader = () => (
    <RenderLoader data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </RenderLoader>
  )

  renderTrendingVideos = () => (
    <NxtContext.Consumer>
      {value => {
        const {trendingVideos} = this.state
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? '#fff' : '#000'
        return (
          <TrendingList>
            {trendingVideos.map(eachVideo => (
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
                        {eachVideo.viewsCount} views
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

  renderGetAllTrendingVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideos()
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
              <CardContainer data-testid="trending" background={background}>
                <MainHeading>
                  <AiFillFire size={30} color="#ff0b37" />
                  <TrendingHeading textColor={textColor}>
                    Trending
                  </TrendingHeading>
                </MainHeading>
                {this.renderGetAllTrendingVideos()}
              </CardContainer>
            </>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}
export default Trending
