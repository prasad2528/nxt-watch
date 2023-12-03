import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import NxtContext from '../../context/NxtContext'
import {
  NavigationContainer,
  NavigationBarsContainer,
  NavigationBarsDetails,
  NavText,
  NavigationFooterContainer,
  FooterText,
  FooterIconsContainer,
  FooterIcon,
  Description,
  NavLink,
} from './styledComponents'

const NavigationBars = () => (
  <NxtContext.Consumer>
    {value => {
      const {isDarkTheme, activeTab, changeTab} = value
      const background = isDarkTheme ? '#383838' : '#fff'
      const textColor = isDarkTheme ? '#fff' : '#000'
      const activeTabBg = isDarkTheme ? '#475569' : '#cdd5e1'
      const onClickTabHome = () => {
        changeTab('Home')
        console.log('Home')
      }
      const onClickTabTrending = () => {
        changeTab('Trending')
        console.log('trending')
      }
      const onClickTabGaming = () => {
        changeTab('Gaming')
        console.log('gaming')
      }
      const onClickTabSavedVideos = () => {
        changeTab('SavedVideos')
      }
      const getIconColor = tab => (activeTab === tab ? '#ff0b37' : '#909090')
      return (
        <NavigationContainer background={background}>
          <NavigationBarsContainer>
            <NavLink to="/">
              <NavigationBarsDetails
                key="home"
                bgColor={activeTab === 'Home' ? activeTabBg : 'none'}
                onClick={onClickTabHome}
              >
                <AiFillHome size={30} color={getIconColor('Home')} />
                <NavText textColor={textColor}>Home</NavText>
              </NavigationBarsDetails>
            </NavLink>
            <NavLink to="/trending">
              <NavigationBarsDetails
                key="trending"
                bgColor={activeTab === 'Trending' ? activeTabBg : 'none'}
                onClick={onClickTabTrending}
              >
                <AiFillFire size={30} color={getIconColor('Trending')} />
                <NavText textColor={textColor}>Trending</NavText>
              </NavigationBarsDetails>
            </NavLink>
            <NavLink to="/gaming">
              <NavigationBarsDetails
                key="gaming"
                bgColor={activeTab === 'Gaming' ? activeTabBg : 'none'}
                onClick={onClickTabGaming}
              >
                <SiYoutubegaming size={30} color={getIconColor('Gaming')} />
                <NavText textColor={textColor}>Gaming</NavText>
              </NavigationBarsDetails>
            </NavLink>
            <NavLink to="/saved-videos">
              <NavigationBarsDetails
                key="SavedVideos"
                bgColor={activeTab === 'SavedVideos' ? activeTabBg : 'none'}
                onClick={onClickTabSavedVideos}
              >
                <CgPlayListAdd size={30} color={getIconColor('SavedVideos')} />
                <NavText textColor={textColor}>Saved videos</NavText>
              </NavigationBarsDetails>
            </NavLink>
          </NavigationBarsContainer>
          <NavigationFooterContainer>
            <FooterText textColor={textColor}>CONTACT US</FooterText>
            <FooterIconsContainer>
              <FooterIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <FooterIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <FooterIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </FooterIconsContainer>
            <Description textColor={textColor}>
              Enjoy! Now to see your channels and recommendations!
            </Description>
          </NavigationFooterContainer>
        </NavigationContainer>
      )
    }}
  </NxtContext.Consumer>
)
export default NavigationBars
