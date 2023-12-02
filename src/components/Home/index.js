import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import {MdClose} from 'react-icons/md'
import Header from '../Header'
import {
  CardContainer,
  BannerBgContainer,
  BannerImage,
  Paragraph,
  CustomButton,
  SearchContainer,
  SearchInput,
  SearchButton,
  CloseButton,
  BannerDetails,
  ApiDetailsContainer,
  UlContainer,
  ListContainer,
  VideoImage,
  VideoDetailsContainer,
  VideoDetails,
  VideoTitle,
  VideoLogo,
  VideoViewsContainer,
  VideoName,
  RenderLoader,
  FailureContainer,
  FailureImage,
  NoVideosContainer,
  NoVideosImage,
  ItemLink,
} from './styledComponents'
import NavigationBars from '../NavigationBars'
import NxtContext from '../../context/NxtContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    homeVideosList: [],
    bannerShow: true,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      }))

      this.setState({
        homeVideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.setState({searchInput: ''}, this.getHomeVideos)
  }

  renderGetAllVideos = () => {
    const {homeVideosList} = this.state
    return (
      <NxtContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const textColor = isDarkTheme ? '#fff' : '#010101'
          return (
            <UlContainer>
              {homeVideosList.map(eachVideo => (
                <ItemLink to={`/videos/${eachVideo.id}`}>
                  <ListContainer key={eachVideo.id}>
                    <VideoImage
                      src={eachVideo.thumbnailUrl}
                      alt={eachVideo.id}
                    />
                    <VideoDetailsContainer>
                      <VideoLogo
                        src={eachVideo.profileImageUrl}
                        alt={eachVideo.id}
                      />
                      <VideoDetails>
                        <VideoTitle textColor={textColor}>
                          {eachVideo.title}
                        </VideoTitle>
                        <VideoName>{eachVideo.name}</VideoName>
                        <VideoViewsContainer>
                          <VideoName>{eachVideo.viewCount} views</VideoName>
                          <VideoName>{eachVideo.publishedAt}</VideoName>
                        </VideoViewsContainer>
                      </VideoDetails>
                    </VideoDetailsContainer>
                  </ListContainer>
                </ItemLink>
              ))}
            </UlContainer>
          )
        }}
      </NxtContext.Consumer>
    )
  }

  renderNoVideosView = () => (
    <NoVideosContainer>
      <NoVideosImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <VideoTitle>No Search results found</VideoTitle>
      <VideoName>Try different key words or remove search filter</VideoName>
      <CustomButton type="button" onClick={this.onRetry} bgColor color>
        Retry
      </CustomButton>
    </NoVideosContainer>
  )

  renderSuccessView = () => {
    const {homeVideosList} = this.state
    if (homeVideosList.length === 0) {
      return this.renderNoVideosView()
    }
    return this.renderGetAllVideos()
  }

  onCloseBanner = () => this.setState({bannerShow: false})

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getHomeVideos()
  }

  getResults = event => {
    if (event.key === 'Enter') {
      this.getHomeVideos()
    }
  }

  renderLoader = () => (
    <RenderLoader data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </RenderLoader>
  )

  renderFailureView = () => (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure"
      />
      <VideoTitle>Oops! Something Went Wrong</VideoTitle>
      <VideoName>
        We are having some trouble to complete your request Please try again.
      </VideoName>
      <CustomButton bgColor color>
        Retry
      </CustomButton>
    </FailureContainer>
  )

  renderHomeAllVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {bannerShow, searchInput} = this.state
    return (
      <NxtContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const background = isDarkTheme ? '#000000' : '#ffffff'
          const textColor = isDarkTheme ? '#fff' : '#000'
          return (
            <>
              <Header />
              <NavigationBars />
              <CardContainer background={background}>
                {bannerShow ? (
                  <BannerBgContainer background={background}>
                    <BannerDetails>
                      <BannerImage
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="website logo"
                      />
                      <Paragraph>
                        Buy Nxt Watch Premium prepaid plans with
                        <br /> UPI
                      </Paragraph>
                      <CustomButton type="button">GET IT NOW</CustomButton>
                    </BannerDetails>
                    <CloseButton type="button" onClick={this.onCloseBanner}>
                      <MdClose size={20} />
                    </CloseButton>
                  </BannerBgContainer>
                ) : null}
                <ApiDetailsContainer background={background}>
                  <SearchContainer>
                    <SearchInput
                      type="search"
                      placeholder="search"
                      onChange={this.onChangeSearchInput}
                      value={searchInput}
                      onKeyDown={this.getResults}
                      background={background}
                      textColor={textColor}
                    />
                    <SearchButton
                      data-testid="searchButton"
                      onClick={this.onClickSearch}
                    >
                      <AiOutlineSearch />
                    </SearchButton>
                  </SearchContainer>
                  {this.renderHomeAllVideos()}
                </ApiDetailsContainer>
              </CardContainer>
            </>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}
export default Home
