import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import NxtContext from './context/NxtContext'
import './App.css'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoDetails from './components/VideoDetails'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

class App extends Component {
  state = {
    isDarkTheme: false,
    activeTab: 'Home',
    savedVideos: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  changeTab = tab => {
    this.setState({activeTab: tab})
  }

  addVideo = video => {
    const {savedVideos} = this.state
    const index = savedVideos.find(eachVideo => eachVideo.id === video.id)
    if (index) {
      this.setState(prevState => ({savedVideos: [...prevState.savedVideos]}))
    } else {
      this.setState({savedVideos: [...savedVideos, video]})
    }
  }

  onRemoveVideo = id => {
    const {savedVideos} = this.state
    const updatedList = savedVideos.filter(eachVideo => eachVideo.id !== id)
    this.setState({savedVideos: updatedList})
  }

  render() {
    const {isDarkTheme, activeTab, savedVideos} = this.state
    return (
      <NxtContext.Provider
        value={{
          isDarkTheme,
          activeTab,
          savedVideos,
          toggleTheme: this.toggleTheme,
          changeTab: this.changeTab,
          addVideo: this.addVideo,
          onRemoveVideo: this.onRemoveVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </NxtContext.Provider>
    )
  }
}

export default App
