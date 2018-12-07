import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Link, IndexRoute } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import AlbumPage from './pages/AlbumPage'
import Collection from './pages/Collection'
import FavoritedSongs from './pages/FavoritedSongs'
import Search from './pages/Search'
import PlaylistPage from './pages/PlaylistPage'
import Settings from './components/Settings';
import SideBar from './components/SideBar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Player from './components/Player/index';
import Home from './components/Home';
import { play } from './helpers/player';
import request from './helpers/request'
import config from './constants/config'
import { setAlbums, setCurrentSong, setSongDetails, setIsPlaying, setSongs, setAlbum, setCurrentAlbum } from "./redux/albums/actions/index";
import { connect } from "react-redux";



const mapStateToProps = state => {
  return {
    song: state.song,
    songs: state.songs,
    songURL: state.songURL,
    playingStatus: state.playingStatus,
    songIndex: state.songIndex,
    isPlaying: state.isPlaying,
    songId: state.songId,
    audio: state.audio,
    shuffle: state.shuffle,
    currentAlbum: state.currentAlbum,
    albums: state.albums,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setAlbums: albums => dispatch(setAlbums(albums)),
    setSongDetails: albums => dispatch(setSongDetails(albums)),
    setCurrentSong: song => dispatch(setCurrentSong(song)),
    setIsPlaying: song => dispatch(setIsPlaying(song)),
    setSongs: songs => dispatch(setSongs(songs)),
    setAlbum: album => dispatch(setAlbum(album)),
    setCurrentAlbum: album => dispatch(setCurrentAlbum(album)),
  };
};
class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latestSongs: [],
      settings: '',
      player: '',
      audio: ''
      
    }
          

  }
  getMusicDirs = async () => {
    try {
      let { data } = await axios(config.baseURL)
      this.props.setAlbums(data.folders);

    } catch (e) {
      console.log(e)
      toast.error('error while trying to get music directories')
    }
  }
  getRecentlySongs = async () => {
    try {
      let { data } = await axios(config.baseURL + 'songs/recently')
      this.setState({
        latestSongs: [...this.state.latestSongs, ...data.albums]
      })
    } catch (e) {
      console.log(e)
      toast.error('error while trying to get music directories')
    }
  }
  _keyBoardListener = (e) => {
    if (e.keyCode == 112) {
      // this.TogglePlay()
    }

  }
  componentDidMount = () => {
    console.log(this.player)
    this.getMusicDirs()
    this.getRecentlySongs()
    document.addEventListener('keydown', this._keyBoardListener, false)
  }

  playAlbum = async (album) => {
    request.createHistory(this.props.songId, album.id)
    return play(album, this.props)
  }


  shuffle = () => {
    console.log('shuffle func ')

    this.props.setSongDetails({
      shuffle: !this.props.shuffle
    })
  }


  settingsModal = (a) => {
    console.log(a)
    this.settings.toggleModal()
  }
  render() {
    const { audio, isPlaying, song, currentAlbum } = this.props
    return (
      <div>
        <ToastContainer autoClose={3000} />
        <div className="columns ">
          <div className="column is-1 hide-mobile">
            <SideBar settingsModal={this.settingsModal} />
          </div>
          < div className = "column is-11" >

            <div className="main">



              <Settings getMusicDirs={this.getMusicDirs} ref={instance => { this.settings = instance }} />

              <Switch>
                <Route path="/collection/:id" component={PlaylistPage} />
                <Route path="/collection" excact component={Collection} />

                <Route path="/search" excact component={Search} />
                <Route path="/favorited" excact component={FavoritedSongs} />


                <Route path="/:id" component={AlbumPage} />

                <Route path='/' component={() => <Home
                  albums={this.props.albums}
                  latestSongs={this.state.latestSongs}
                  playAlbum={this.playAlbum}


                />
                } >
                </Route>
              </Switch>
            </div>

          </div>


        </div>
        <div className="columns">
          <div className="column">

            <Player
              ref={instance => { this.player = instance }}
              NextSong={this.NextSong}
              audio={audio}
              isPlaying={isPlaying}
              song={song}
              album={currentAlbum}
              shuffle={this.shuffle}
            />
          </div>
        </div>
      </div>

    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Routes);