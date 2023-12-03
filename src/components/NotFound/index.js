import {
  CardContainer,
  NotFoundTitle,
  NotFoundParagraph,
  NotFoundImage,
} from './styledComponents'
import Header from '../Header'
import NavigationBars from '../NavigationBars'
import NxtContext from '../../context/NxtContext'

const NotFound = () => (
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
            {isDarkTheme ? (
              <NotFoundImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
                alt="not found"
              />
            ) : (
              <NotFoundImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                alt="not found"
              />
            )}
            <NotFoundTitle textColor={textColor}>Page Not Found</NotFoundTitle>
            <NotFoundParagraph textColor={textColor}>
              we are sorry, the page you requested could not be found.
            </NotFoundParagraph>
          </CardContainer>
        </>
      )
    }}
  </NxtContext.Consumer>
)
export default NotFound
