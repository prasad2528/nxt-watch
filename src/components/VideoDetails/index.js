import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {CgPlayListAdd} from 'react-icons/cg'
import {Component} from 'react'
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
} from './styledComponents'

class VideoDetails extends Component {
  state = {videoDetail: [], isLiked: false, isDisliked: false, isSaved: false}

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
    // thumbnailUrl: data.video_details.thumbnail_url,
    name: data.video_details.channel.name,
    profileImageUrl: data.video_details.channel.profile_image_url,
    subscriberCount: data.video_details.subscriber_count,
    viewCount: data.video_details.view_count,
    publishedAt: data.video_details.published_at,
    description: data.video_details.description,
  })

  getAllVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
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
      const updatedData = this.formattedData(data)
      console.log(updatedData)
      this.setState({videoDetail: updatedData})
    }
  }

  render() {
    const {videoDetail, isLiked, isDisliked, isSaved} = this.state
    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      profileImageUrl,
      id,
      subscriberCount,
      description,
      name,
    } = videoDetail
    return (
      <NxtContext.Consumer>
        {value => {
          const {isDarkTheme, addVideo, onRemoveVideo} = value
          const textColor = isDarkTheme ? '#fff' : '#000'
          const background = isDarkTheme ? '#000000' : '#ffffff'

          const onAddOrRemoveItem = () => {
            if (isSaved === true) {
              onRemoveVideo(id)
            } else {
              addVideo({...videoDetail, isSaved: true})
            }
          }

          const saveVideoToList = () => {
            this.setState(
              prevState => ({isSaved: !prevState.isSaved}),
              onAddOrRemoveItem,
            )
          }

          return (
            <>
              <HomeContainer background={background}>
                <Header />
                <NavigationBars />
                <CardContainer background={background}>
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
                      <Paragraph textColor={textColor}>
                        {viewCount} Views
                      </Paragraph>
                      <Paragraph textColor={textColor}>{publishedAt}</Paragraph>
                    </ViewsContainer>
                    <LikesContainer>
                      <LikeContainer>
                        <MainButton
                          type="button"
                          onClick={this.onClickLike}
                          color={isLiked ? '#4f46e5' : '#475569'}
                        >
                          <BiLike size={20} />
                        </MainButton>
                        <Paragraph textColor={textColor}>Like</Paragraph>
                      </LikeContainer>
                      <LikeContainer>
                        <MainButton
                          type="button"
                          onClick={this.onClickDislike}
                          color={isDisliked ? '#4f46e5' : '#475569'}
                        >
                          <BiDislike size={20} />
                        </MainButton>
                        <Paragraph textColor={textColor}>DisLike</Paragraph>
                      </LikeContainer>
                      <LikeContainer>
                        <MainButton
                          type="button"
                          onClick={saveVideoToList}
                          color={isSaved ? '#4f46e5' : '#475569'}
                        >
                          <CgPlayListAdd size={20} />
                        </MainButton>
                        <Paragraph textColor={textColor}>Save</Paragraph>
                      </LikeContainer>
                    </LikesContainer>
                  </FlexContainer>
                  <Line />
                  <ProfileContainer>
                    <Profile src={profileImageUrl} alt={id} />
                    <ProfileDetailsContainer>
                      <ProfileDetails>
                        <Paragraph textColor={textColor}>{name}</Paragraph>
                        <Paragraph textColor={textColor}>
                          {subscriberCount}
                        </Paragraph>
                      </ProfileDetails>
                      <Paragraph textColor={textColor}>{description}</Paragraph>
                    </ProfileDetailsContainer>
                  </ProfileContainer>
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
