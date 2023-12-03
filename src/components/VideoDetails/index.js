import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {CgPlayListAdd} from 'react-icons/cg'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import NavigationBars from '../NavigationBars'
import NxtContext from '../../context/NxtContext'
import {
  VideoContainer,
  VideoTitle,
  FlexContainer,
  ViewsContainer,
  Paragraph,
  LikesContainer,
  LikeContainer,
  Line,
  ProfileContainer,
  ProfileDetailsContainer,
  ProfileDetails,
  Profile,
  MainButton,
  CardContainer,
  HomeContainer,
  RenderLoader,
  FailureContainer,
  FailureImage,
  CustomButton,
  VideoName,
  NoVideoTitle,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoDetails extends Component {
  state = {
    videoDetail: [],
    isLiked: false,
    isDisliked: false,
    isSaved: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAllVideoDetails()
  }

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  formattedData = data => ({
    id: data.video_details.id,
    title: data.video_details.title,
    videoUrl: data.video_details.video_url,
    thumbnailUrl: data.video_details.thumbnail_url,
    name: data.video_details.channel.name,
    profileImageUrl: data.video_details.channel.profile_image_url,
    subscriberCount: data.video_details.channel.subscriber_count,
    viewCount: data.video_details.view_count,
    publishedAt: data.video_details.published_at,
    description: data.video_details.description,
  })

  getAllVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
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
      console.log('data loaded')
      const updatedData = this.formattedData(data)
      console.log(updatedData)
      this.setState({
        videoDetail: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => {
    this.getAllVideoDetails()
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
              We are having some trouble to complete your request. Please try
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

  renderGetVideoDetails = () => (
    <NxtContext.Consumer>
      {value => {
        const {videoDetail, isSaved, isLiked, isDisliked} = this.state
        const {
          videoUrl,
          title,
          viewCount,
          publishedAt,
          profileImageUrl,
          subscriberCount,
          description,
          name,
        } = videoDetail
        const {isDarkTheme, addVideo, onRemoveVideo} = value
        const textColor = isDarkTheme ? '#fff' : '#000'
        const saveVideoToList = () => {
          if (isSaved) {
            onRemoveVideo(videoDetail.id)
          } else {
            addVideo({...videoDetail, isSaved: true})
          }
          this.setState(prevState => ({isSaved: !prevState.isSaved}))
        }

        return (
          <>
            <VideoContainer>
              {videoUrl && (
                <ReactPlayer
                  url={videoDetail.videoUrl}
                  controls
                  width="100%"
                  height="60vh"
                />
              )}
            </VideoContainer>
            <VideoTitle textColor={textColor}>{title}</VideoTitle>
            <FlexContainer>
              <ViewsContainer>
                <Paragraph textColor={textColor}>{viewCount} Views</Paragraph>
                <Paragraph textColor={textColor}>{publishedAt}</Paragraph>
              </ViewsContainer>
              <LikesContainer>
                <LikeContainer>
                  <MainButton
                    type="button"
                    onClick={this.onClickLike}
                    color={isLiked ? '#2563eb' : '#64748b'}
                  >
                    <BiLike size={20} />
                  </MainButton>
                  <MainButton
                    type="button"
                    onClick={this.onClickLike}
                    color={isLiked ? '#2563eb' : '#64748b'}
                  >
                    Like
                  </MainButton>
                </LikeContainer>
                <LikeContainer>
                  <MainButton
                    type="button"
                    onClick={this.onClickDislike}
                    color={isDisliked ? '#2563eb' : '#64748b'}
                  >
                    <BiDislike size={20} />
                  </MainButton>
                  <MainButton
                    type="button"
                    onClick={this.onClickDislike}
                    color={isDisliked ? '#2563eb' : '#64748b'}
                  >
                    DisLike
                  </MainButton>
                </LikeContainer>
                <LikeContainer>
                  <MainButton
                    type="button"
                    onClick={saveVideoToList}
                    color={isSaved ? '#2563eb' : '#64748b'}
                  >
                    <CgPlayListAdd size={20} />
                  </MainButton>
                  <MainButton
                    type="button"
                    onClick={saveVideoToList}
                    color={isSaved ? '#2563eb' : '#64748b'}
                  >
                    {isSaved ? 'saved' : 'save'}
                  </MainButton>
                </LikeContainer>
              </LikesContainer>
            </FlexContainer>
            <Line />
            <ProfileContainer>
              <Profile src={profileImageUrl} alt="channel logo" />
              <ProfileDetailsContainer>
                <ProfileDetails>
                  <Paragraph textColor={textColor}>{name}</Paragraph>
                  <Paragraph textColor={textColor}>
                    {subscriberCount} subscribers
                  </Paragraph>
                </ProfileDetails>
                <Paragraph textColor={textColor}>{description}</Paragraph>
              </ProfileDetailsContainer>
            </ProfileContainer>
          </>
        )
      }}
    </NxtContext.Consumer>
  )

  renderVideoResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGetVideoDetails()
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
          return (
            <>
              <HomeContainer
                data-testid="videoItemDetails"
                background={background}
              >
                <Header />
                <NavigationBars />
                <CardContainer background={background}>
                  {this.renderVideoResults()}
                </CardContainer>
              </HomeContainer>
            </>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}
export default VideoDetails
