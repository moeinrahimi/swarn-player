import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,IndexRoute } from "react-router-dom";
import App from './App'
import AlbumPage from './pages/AlbumPage'
import Settings from './components/Settings';
  
  
// new design 
import SideBar from './components/SideBar'

import axios from 'axios'
import Sound from 'react-sound'
import Song from './components/Song/index';
import { ToastContainer, toast } from 'react-toastify';
import Player from './components/Player/index';
import PlayList from './components/PlayList/index';
import Home from './components/Home';
import config from './constants/config'
import { setAlbums,setCurrentSong ,setSongDetails,setIsPlaying,setSongs,setAlbum} from "./redux/albums/actions/index";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { song: state.song,
  songs:state.songs,
  songURL:state.songURL,
  playingStatus:state.playingStatus,
  songIndex:state.songIndex,
  isPlaying:state.isPlaying,
  songId:state.songId,
  audio:state.audio,
  shuffle:state.shuffle,
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
};
};
class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: [],      
      latestSongs :[],
      settings : '',
      player : '',
    }
  }
  getMusicDirs = async () => {
    try {
      let { data } = await axios(config.baseURL)
      this.props.setAlbums(data.folders);
      this.setState({
        albums: [...this.state.albums, ...data.folders]
      })
    } catch (e) {
      console.log(e)
      toast.error('error while trying to get music directories')
    }
  }
  getRecentlySongs = async () => {
    try {
      let { data } = await axios(config.baseURL+'songs/recently')
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
      this.TogglePlay()
    }

  }
  componentDidMount = () => {
    // this.props.history.push('')
    this.getMusicDirs()
    this.getRecentlySongs()
    document.addEventListener('keydown', this._keyBoardListener, false)
  }

  TogglePlay = () => {
    if (this.props.playingStatus === Sound.status.PLAYING) {
      this.props.setSongDetails({ playingStatus: Sound.status.PAUSED })
      this.props.setIsPlaying(0)
    } else {
      this.props.setSongDetails({ playingStatus: Sound.status.PLAYING})
      this.props.setIsPlaying(1)
    }
  }
  playSong = async (album, index) => {
    let { data } = await axios(config.baseURL+`album/songs?albumId=${album.id}`)

    this.props.setAlbum(album)
    this.props.setSongs(data.songs)

    let song = this.props.songs[0]
    this.props.setCurrentSong(song)
    
    // console.log(song)
    // colorizeBG(song)
    this.setTitle(song)
    let songUrl = song.fullPath
    // console.log(song)
    songUrl = `${config.baseURL}songs/play?path=${encodeURIComponent(songUrl)}`
    this.props.setSongDetails({

        songURL: songUrl,
        playingStatus: Sound.status.PLAYING,
        songIndex: 0,
        songId: song.id,
      
    })
    this.props.setIsPlaying(1)

    

    console.log(this.props,'------------------')
  }


  formatMilliseconds = (milliseconds) => {
    // var hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;
    var minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;
    var seconds = Math.floor(milliseconds / 1000);
    milliseconds = Math.floor(milliseconds % 1000);

    return (minutes < 10 ? '0' : '') + minutes + ':' +
      (seconds < 10 ? '0' : '') + seconds;
  }

  handleSongPlaying = (audio) => {
    let elapsed = this.formatMilliseconds(audio.position)
    let total = this.formatMilliseconds(audio.duration)
    let position = audio.position / audio.duration
    this.player.setEplapsed(elapsed,total,position)

  }

  handleSongLoading = (audio) => {
    this.props.setSongDetails({audio:audio})
 
  }


  NextSong = () => {

    let { songs, songIndex , shuffle} = this.props
    console.log(songIndex,'indexxxxxxxxxxxxxxxxxxx')
    const songsLength = songs.length
    // songIndex = parseInt(songIndex)
    songIndex += 1
    if (songIndex >= songsLength) {
      if(shuffle){
        songIndex = 0
        // return true 
      }
      
    }

    if(songIndex >= songsLength) return 

    let song = songs[songIndex]
    // console.log(song,'aaaa')
    let songPath = song.fullPath
    let songURL = `${config.baseURL}songs/play?path=${encodeURIComponent(songPath)}`
    this.setTitle(song)
    // console.log(song)

    this.props.setSongDetails({
      songIndex: songIndex,
      songURL: songURL,
      songId: song.id,
    })
    this.props.setCurrentSong(song)
  }

  PreviousSong = () => {
    let { songs, songIndex } = this.props
    const songsLength = songs.length
    songIndex -= 1
    if (songIndex == -1) {
      songIndex = 0
    }
    let song = songs[songIndex]
    let songPath = song.fullPath
    let songURL = `${config.baseURL}songs/play?path=${encodeURIComponent(songPath)}`
    this.setTitle(song)
    this.props.setSongDetails({
      songIndex: songIndex,
      songURL: songURL
    })
    this.props.setCurrentSong(song)
  }

  setTitle = (song) => {
    // console.log(song,'aaaaaaaaa')
    let artist 
    if(Array.isArray(song.artist)){
      artist = song.artist[0]
    }else{
      artist = song.artist
    }
    // console.log(song)
    document.title = `${song.title || 'Unknown'} - ${artist || 'Unknown'}`
  }

  shuffle = () => {
    console.log('shuffle func ')

    this.props.setSongDetails({
      shuffle : !this.props.shuffle 
    })
  }


settingsModal = (a)=>{
  console.log(a)
  this.settings.toggleModal()
}
  render() {
    const {songURL,playingStatus,audio,isPlaying,song} = this.props
    return (
    
       
      <div>
               
      <Sound
        url={songURL}
        playStatus={playingStatus}
        onLoading={this.handleSongLoading}
        volume="0"
        onPlaying={(audio) => this.handleSongPlaying(audio)}
        onFinishedPlaying={this.NextSong}/>
             <div>
 
 <div className="columns is-gapless">
       
   <SideBar settingsModal={this.settingsModal}/>
   <div className="column">
     <div className="main">
      <Settings  getMusicDirs={this.getMusicDirs} ref={instance =>{this.settings = instance}} />
      <Route path="/:id" component={AlbumPage}/> 
      <Route path='/' exact component={()=> <Home
        albums={this.state.albums}
        latestSongs={this.state.latestSongs}
        playSong={this.playSong}
        title={'Recently Added Albums'}
      />
        } >

      </Route>
     </div>
     
     </div>
 
     
 </div>
 <div className="columns">
   <div className="column">
     
   <Player
              ref={instance =>{this.player = instance}}
               TogglePlay={this.TogglePlay}
               NextSong={this.NextSong}
               PreviousSong={this.PreviousSong}
               audio={audio}
               isPlaying={isPlaying}
               song={song}
               shuffle={this.shuffle}
 />
     </div>
     </div>
     </div>
     
       </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Routes);