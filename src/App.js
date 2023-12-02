import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import NxtContext from './context/NxtContext'
import './App.css'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoDetails from './components/VideoDetails'
import SavedVideos from './components/SavedVideos'

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
    const {isDarkTheme, activeTab} = this.state
    return (
      <NxtContext.Provider
        value={{
          isDarkTheme,
          activeTab,
          toggleTheme: this.toggleTheme,
          changeTab: this.changeTab,
          addVideo: this.addVideo,
          onRemoveVideo: this.OnRemoveVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <Route exact path="/" component={Home} />
          <Route exact path="/videos/:id" component={VideoDetails} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/savedVideos" component={SavedVideos} />
        </Switch>
      </NxtContext.Provider>
    )
  }
}

export default App
