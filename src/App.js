import React, { Component } from 'react';
import axios from 'axios'
import Sound from 'react-sound'
import Song from './components/Song/index';
import { ToastContainer, toast } from 'react-toastify';
import Player from './components/Player/index';
import PlayList from './components/PlayList/index';
import Settings from './components/Settings';
import config from './constants/config'
import BackgroundImage from './components/BackgroundImage'
import { colorizeBG } from './helpers';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: [],
      songURL: '',
      playingStatus: Sound.status.STOPPED,
      isPlaying: 0,
      folderSongs: [],
      currentSongs: [],
      songName: '',
      songIndex: '',
      songId: '',
      audio: {},
      showModal: false,
      song: '',
      winHeight: '',
      isOpen: false,
      backgroundImage: '',
      player : '',
      shuffle : false 
    }
  }
  getMusicDirs = async () => {
    try {
      let { data } = await axios(config.baseURL)
      console.log(data.albums)
      // console.log(JSON.stringify(data.folders) )
      this.setState({
        folders: [...this.state.folders, ...data.folders]
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
    this.getMusicDirs()
    
    document.addEventListener('keydown', this._keyBoardListener, false)
    var winHeight;
    var editHight = 200
    var body = document.querySelector('body')
    if (window.innerWidth >= 992) {
      editHight = -200
    }
    winHeight = window.innerHeight + editHight
    this.setState({ winHeight: winHeight })
    window.addEventListener("resize", (e) => {
      winHeight = window.innerHeight + editHight
      if (window.innerWidth >= 992) {
        editHight = -200
      }
      this.setState({ winHeight: winHeight })
    });

  }

  TogglePlay = () => {
    if (this.state.playingStatus === Sound.status.PLAYING) {
      this.setState({ playingStatus: Sound.status.PAUSED, isPlaying: 0 })
    } else {
      this.setState({ playingStatus: Sound.status.PLAYING, isPlaying: 1 })
    }
  }
  playSong = (song, index) => {
    colorizeBG(song)
    this.setTitle(song)
    let songUrl = song.fullPath
    console.log(song)
    songUrl = `${config.baseURL}songs/play?path=${encodeURIComponent(songUrl)}`
    this.setState({
      songURL: songUrl,
      playingStatus: Sound.status.PLAYING,
      songIndex: index,
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
  settingsModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }
  toggleCollaps = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  render() {
    // .tcon-transform

    console.log(this.state.backgroundImage, 'dasdadsasd')
    return (

      <div className="col">
        <BackgroundImage url={this.state.backgroundImage} />

        <ToastContainer />
        <header className="App-header">
          <h1 className="App-title">Swan Music Player</h1>
        </header>
        <div className="add-song" onClick={this.settingsModal}>
          <span className="flaticon-add-button"></span>
        </div>
        <Settings show={this.state.showModal} onClick={this.settingsModal} getMusicDirs={this.getMusicDirs} />

        <div className="bg-section">
          <button type="button" className={'tcon tcon-menu--xcross' + (this.state.isOpen ? ' tcon-transform' : '')} aria-label="toggle menu" onClick={this.toggleCollaps}>
            <span className="tcon-menu__lines" aria-hidden="true"></span>
            <span className="tcon-visuallyhidden">toggle menu</span>

          </button>
          <div>
            <Sound
            volume={0}
              url={this.state.songURL}
              playStatus={this.state.playingStatus}
              onLoading={this.handleSongLoading}
              onPlaying={(audio) => this.handleSongPlaying(audio)}
              onFinishedPlaying={this.NextSong}
            />
            <div className="row">
              <div className="col-lg-3 col-lg-offset-1 col-sm-12">
                <div className={'list-song   col-md-3 col-sm-6 col-xs-12' + (this.state.isOpen ? ' open' : '')} style={{ height: + this.state.winHeight + 'px' }}>
                  <h1> {this.state.songName}  </h1>
                  <ul>
                    {this.renderSongs(this.state.currentSongs)}
                  </ul> 
                </div>
              </div>
              <div className="col-lg-8 col-md-1">
                {this.state.folders ?

                  <Song
                    songs={this.state.folders}
                    playSong={this.playSong}
                  />
                  : ''}
              </div>

            </div>
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
    );
  }
}

export default App;
// TODO: add redis to store musics data
// TODO: Player show elapsed time and current time of song 
// TODO: shuffle and loop btn 

