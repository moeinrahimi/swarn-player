import React, { Component } from 'react';
import axios from 'axios'
import Sound from 'react-sound'
import Song from './components/Song/index';
import { ToastContainer, toast } from 'react-toastify';
import Player from './components/Player/index';
import PlayList from './components/PlayList/index';
import config from './constants/config'
import BackgroundImage from './components/BackgroundImage'
import { colorizeBG } from './helpers';
import Settings from './components/Settings';
  
  
// new design 
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
import Albums from './components/Albums'
import AlbumPage from './pages/AlbumPage'
import { Route, Link } from 'react-router-dom';
class App extends Component {
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
    colorizeBG(song)
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
  renderSongs = (data) => {
    // console.log(data)
    return (
      <div>

        {data.map((song, index) => (
          <PlayList
            songId={song.id}
            id={this.state.songId}
            onClick={e => this.playSong(song, index)}
            song={song}
            index={index}
            name={song.title}
            isPlaying={this.state.isPlaying}
            songIndex={this.state.songIndex}
          />
        ))}
      </div>
    )
  }

toggleCollaps = () => {
  this.setState({ isOpen: !this.state.isOpen })
}
settingsModal = (a)=>{
  console.log(a)
  this.settings.toggleModal()
}

  render() {
    // .tcon-transform

    console.log(this.state.backgroundImage, 'dasdadsasd')
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
      <NavBar/>
      x<Settings  getMusicDirs={this.getMusicDirs} ref={instance =>{this.settings = instance}} />
      {/* <div className="column">
       <Albums 
       albums={this.state.albums}
       currentSong={this.state.song}
       playSong={this.playSong}
       isPlaying={this.state.isPlaying}
       title={'Albums'}
       />
      
        </div> */}
      {/* <div className="column">
      <Albums 
       albums={this.state.latestSongs}
       currentSong={this.state.song}
       playSong={this.playSong}
       isPlaying={this.state.isPlaying}
       title={'Recently Added Albums'}
       />
        </div> */}
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

export default App;
// TODO: add redis to store musics data
// TODO: Player show elapsed time and current time of song 
// TODO: shuffle and loop btn 
