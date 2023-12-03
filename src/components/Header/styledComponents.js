import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const NavContainer = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.background};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 30px;
`

export const NavCardContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NavImage = styled.img`
  height: 40px;
  width: 150px;
`
export const ItemLink = styled(Link)`
  text-decoration: none;
`
export const NavLists = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
export const NavbarList = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  list-style-type: none;
`

export const NavItem = styled.li``

export const NavButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`
export const Profile = styled.img`
  height: 40px;
  width: 40px;
`
export const LogoutButton = styled.button`
  height: 30px;
  width: 130px;
  border-color: ${props => props.textColor};
  background-color: ${props => props.background};
  color: ${props => props.textColor};
  border-radius: 6px;
  cursor: pointer;
  margin-left: 20px;
`
export const PopupView = styled.div`
  height: 300px;
  width: 500px;
  background-color: #212121;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`

export const CustomPara = styled.p`
  color: #fff;
  font-size: 20px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60%;
  margin-top: 20px;
`
export const ConfirmButtons = styled.button`
  height: 40px;
  width: 130px;
  border: 2px solid #7e858e;
  background-color: ${props => (props.bg ? '#4f46e5' : 'transparent')};
  color: ${props => (props.color ? '#fff' : '#7e858e')};
  border-radius: 6px;
  cursor: pointer;
`
