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
import { setAlbums,setCurrentSong } from "./redux/albums/actions/index";
import { connect } from "react-redux";
        const mapDispatchToProps = dispatch => {
          return {
            setAlbums: albums => dispatch(setAlbums(albums)),
            setCurrentSong: song => dispatch(setCurrentSong(song))
          };
        };
class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: [],
      albums: [],
      songURL: '',
      playingStatus: Sound.status.STOPPED,
      isPlaying: 0,
      folderSongs: [],
      currentSongs: [],
      latestSongs :[],
      songName: '',
      settings : '',
      songIndex: '',
      songId: '',
      audio: {},
      song: '',
      isOpen: false,
      backgroundImage: '',
      player : '',
      shuffle : false 
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
    if (this.state.playingStatus === Sound.status.PLAYING) {
      this.setState({ playingStatus: Sound.status.PAUSED, isPlaying: 0 })
    } else {
      this.setState({ playingStatus: Sound.status.PLAYING, isPlaying: 1 })
    }
  }
  playSong = async (song, index) => {
    let { data } = await axios(config.baseURL+`album/songs?albumId=${song.id}`)

    this.setState({
      folders: data.songs
    })

    song = this.state.folders[0]
    this.props.setCurrentSong(song)
    console.log(song)
    // colorizeBG(song)
    this.setTitle(song)
    let songUrl = song.fullPath
    // console.log(song)
    songUrl = `${config.baseURL}songs/play?path=${encodeURIComponent(songUrl)}`
    this.setState({
      songURL: songUrl,
      playingStatus: Sound.status.PLAYING,
      songIndex: 0,
      isPlaying: 1,
      songId: song.id,
      song: song
    })
  }

  getSelectedPathSongs = async (song) => {
    this.setState({ isOpen: true })
    let dir = song.dir
    let songName = song.album
    let url = config.baseURL + song.artwork
    console.log(config.baseURL + song.artwork, 'adsasdsad')
    this.setState({
      backgroundImage: url
    })

    try {
      let isFetched = false
      let currentSongs = []
      this.state.folderSongs.forEach(folderSonng => {
        if (folderSonng.dir == dir) {
          isFetched = true
          currentSongs = folderSonng.songs
        }
      })
      if (isFetched) {
        this.setState({
          songName: songName,
          currentSongs: currentSongs,
        })
        return
      }
      let { data } = await axios.get(`${config.baseURL}songs/list?dir=${dir}`)
      this.setState({
        songName: songName,
        folderSongs: [...this.state.folderSongs, { dir: dir, songs: data.songs }],
        currentSongs: data.songs,

      })

    } catch (e) {
      console.log(e)
      toast.error('error while trying to get selected folder songs')
    }

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
    // this.setState({
    //   // elapsed: elapsed,
    //   total: total,
    //   position: position
    // })
  }

  handleSongLoading = (audio) => {
    this.setState({
      audio: audio
    })
  }


  NextSong = () => {

    let { folders, songIndex , shuffle} = this.state
    const songsLength = folders.length
    songIndex += 1
    if (songIndex >= songsLength) {
      if(shuffle){
        songIndex = 0
        // return true 
      }
      
    }

    if(songIndex >= songsLength) return 

    let song = folders[songIndex]
    // console.log(song,'aaaa')
    let songPath = song.fullPath
    let songURL = `${config.baseURL}songs/play?path=${encodeURIComponent(songPath)}`
    this.setTitle(song)
    // console.log(song)
    this.setState({
      songIndex: songIndex,
      songURL: songURL,
      songId: song.id,
      song : song
    })
  }

  PreviousSong = () => {
    let { folders, songIndex } = this.state
    const songsLength = folders.length
    songIndex -= 1
    if (songIndex == -1) {
      songIndex = 0
    }
    let song = folders[songIndex]
    let songPath = song.fullPath
    let songURL = `${config.baseURL}songs/play?path=${encodeURIComponent(songPath)}`
    this.setTitle(song)
    this.setState({
      songIndex: songIndex,
      songURL: songURL
    })
  }

  setTitle = (song) => {
    console.log(song,'aaaaaaaaa')
    let artist 
    if(Array.isArray(song.artist)){
      artist = song.artist[0]
    }else{
      artist = song.artist
    }
    console.log(song)
    document.title = `${song.title || 'Unknown'} - ${artist || 'Unknown'}`
  }

  shuffle = () => {
    console.log('shuffle func ')
    this.setState({
      shuffle : !this.state.shuffle 
    })
  }

toggleCollaps = () => {
  this.setState({ isOpen: !this.state.isOpen })
}
settingsModal = (a)=>{
  console.log(a)
  this.settings.toggleModal()
}
  render() {
    return (
    
       
      <div>
               
      <Sound
        url={this.state.songURL}
        playStatus={this.state.playingStatus}
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
       {/* <Route path="/" exact  component={App}/> */}
        
       <Home
          albums={this.state.albums}
          latestSongs={this.state.latestSongs}
          playSong={this.playSong}
          title={'Recently Added Albums'}
        />
      <Route path="/:id" component={AlbumPage}/>
        
       {/* <Route path="/:id" component={AlbumPage}/>
 
          <Route path='/' exact component={()=> <Home
          albums={this.state.albums}
          latestSongs={this.state.latestSongs}
          playSong={this.playSong}
          title={'Recently Added Albums'}
        />
        } >
        {this.props.children}

      </Route> */}
        
       

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
               audio={this.state.audio}
               isPlaying={this.state.isPlaying}
               song={this.state.song}
               shuffle={this.shuffle}
 />
     </div>
     </div>
     </div>
     
       </div>
    );
  }
}


export default connect(null, mapDispatchToProps)(Routes);