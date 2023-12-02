import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  LoginBgContainer,
  LoginCardContainer,
  LoginImage,
  UserInputContainer,
  InputContainer,
  InputLabel,
  LoginContainer,
  CheckboxInput,
  PasswordContainer,
  CustomButton,
  Paragraph,
} from './styledComponents'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    isChecked: false,
    showSubmitMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitMsg: true, errorMsg})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    const {isChecked} = this.state
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
    console.log(isChecked)
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, isChecked, showSubmitMsg, errorMsg} = this.state
    const inputType = isChecked ? 'text' : 'password'
    return (
      <LoginBgContainer>
        <LoginCardContainer>
          <LoginImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <LoginContainer>
            <UserInputContainer>
              <InputLabel htmlFor="username">USERNAME</InputLabel>
              <InputContainer
                type="text"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Username"
              />
            </UserInputContainer>
            <UserInputContainer>
              <InputLabel htmlFor="password">PASSWORD</InputLabel>
              <InputContainer
                type={inputType}
                id="password"
                value={password}
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            </UserInputContainer>
            <PasswordContainer>
              <CheckboxInput
                type="checkbox"
                id="checkbox"
                onChange={this.onChangeCheckbox}
              />
              <InputLabel htmlFor="checkbox">Show Password</InputLabel>
            </PasswordContainer>
            <CustomButton type="submit" onClick={this.onSubmitUserDetails}>
              Login
            </CustomButton>
            {showSubmitMsg && <Paragraph>{errorMsg}</Paragraph>}
          </LoginContainer>
        </LoginCardContainer>
      </LoginBgContainer>
    )
  }
}
export default LoginRoute
