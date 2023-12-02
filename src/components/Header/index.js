import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {
  NavContainer,
  NavCardContainer,
  NavImage,
  NavLists,
  NavButton,
  Profile,
  LogoutButton,
  PopupView,
  CustomPara,
  ButtonsContainer,
  ConfirmButtons,
} from './styledComponents'
import NxtContext from '../../context/NxtContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <NxtContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value
        const background = isDarkTheme ? '#383838' : '#fff'
        const textColor = isDarkTheme ? '#fff' : '#4f46e5'
        const onClickChangeTheme = () => {
          toggleTheme()
        }
        return (
          <NavContainer background={background}>
            <NavCardContainer>
              {isDarkTheme ? (
                <NavImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="website logo"
                />
              ) : (
                <NavImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                />
              )}
              <NavLists>
                <NavButton type="button" onClick={onClickChangeTheme}>
                  {isDarkTheme ? (
                    <BsBrightnessHigh size={35} color="#fff" />
                  ) : (
                    <BsMoon size={35} />
                  )}
                </NavButton>
                <Profile
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
                <Popup
                  modal
                  trigger={
                    <LogoutButton
                      type="button"
                      background={background}
                      textColor={textColor}
                    >
                      Logout
                    </LogoutButton>
                  }
                >
                  {close => (
                    <PopupView>
                      <CustomPara>Are you sure,you want to logout?</CustomPara>
                      <ButtonsContainer>
                        <ConfirmButtons type="button" onClick={() => close()}>
                          Cancel
                        </ConfirmButtons>
                        <ConfirmButtons
                          type="button"
                          onClick={onClickLogout}
                          bg
                          color
                        >
                          Confirm
                        </ConfirmButtons>
                      </ButtonsContainer>
                    </PopupView>
                  )}
                </Popup>
              </NavLists>
            </NavCardContainer>
          </NavContainer>
        )
      }}
    </NxtContext.Consumer>
  )
}
export default withRouter(Header)
