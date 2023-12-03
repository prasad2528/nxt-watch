import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const NavigationContainer = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25%;
  background-color: ${props => props.background};
  position: fixed;
  top: 90px;
  left: 0;
  z-index: 1000;
`
export const NavLink = styled(Link)`
  text-decoration: none;
`
export const NavigationBarsContainer = styled.div`
  padding-left: 30px;
  width: 100%;
`
export const NavigationBarsDetails = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 90%;
  background-color: ${props => props.bgColor};
  padding-left: 20px;
  color: ${props => props.color};
`

export const NavigationFooterContainer = styled.div`
  width: 350px;
  padding-left: 30px;
`
export const NavText = styled.p`
  margin-left: 20px;
  font-size: 20px;
  color: ${props => props.textColor};
`
export const FooterText = styled.p`
  font-weight: 600;
  font-family: 'Roboto';
  color: ${props => props.textColor};
`
export const FooterIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  width: 150px;
`

export const FooterIcon = styled.img`
  background-color: transparent;
  width: 30px;
  height: 30px;
`
export const Description = styled.p`
  font-weight: 500;
  color: ${props => props.textColor};
`
