import React, { Component } from 'react';
import favoritedSongs from "../../helpers/favortiedSongs";
import Image from '../../components/Image';
import config from '../../constants/config'
import axios from 'axios'
import { toast } from 'react-toastify';

import {play,setTitle,togglePlay} from '../../helpers/player';
import { setCurrentSong ,setSongDetails,setIsPlaying,setSongs} from "../../redux/albums/actions/index";
import { connect } from "react-redux";
import Sound from "react-sound";
const mapStateToProps = state => {
  return {
    song: state.song,
    songURL:state.songURL,
    playingStatus:state.playingStatus,
    songIndex:state.songIndex,
    isPlaying:state.isPlaying,
    audio:state.audio,
};
};
const mapDispatchToProps = dispatch => {
return {
  setSongDetails: albums => dispatch(setSongDetails(albums)),
  setCurrentSong: song => dispatch(setCurrentSong(song)),
  setIsPlaying: song => dispatch(setIsPlaying(song)),
  setSongs: songs => dispatch(setSongs(songs)),

};
};
class SongList extends Component{
  constructor(props){
    super(props)
    this.state = {
      showPlaylistModal : false ,
      playlists : []
    }
  }
   playSong = async (song,i) => {
    this.props.setCurrentSong(song)    
    this.props.setSongs(this.props.songs)    
    setTitle(song)
    let songUrl = song.fullPath
    songUrl = `${config.baseURL}songs/play?path=${encodeURIComponent(songUrl)}`
    this.props.setSongDetails({
        songURL: songUrl,
        playingStatus: Sound.status.PLAYING,
        songIndex: i,
        songId: song.id,
      
    })
    this.props.audio.src = songUrl
    this.props.audio.play()
    this.props.setIsPlaying(1)
  
  
  }
  async componentDidMount(){
    let {data} = await axios(`${config.baseURL}playlists`)
    this.setState({
      playlists : data.playlists
    })
  }
  
  toggleModal = ()=>{
    this.setState({
      showPlaylistModal : !this.state.showPlaylistModal,
    })
  }
  showPlaylistModal = (song) =>{
    this.setState({
      songId:song.id
    })
    this.toggleModal()
  }
  addSongToPlaylist = async (playlist) =>{
    let {data} = await axios.post(`${config.baseURL}playlists/${playlist.id}`,{songId : this.state.songId})
    toast.success('song added to playlist successfully')
    this.toggleModal()
  
  
  }
  
   _renderView = (song, index) => {
    return (
  
      <div className="song">
  
        <div className="song-icon">
          <i className="fa fa-music"></i>
        </div>
        <div onClick={() => this.playSong(song, index)}>
          <div className="song-info">
            <span>{song.title}</span>
            <span>{song.artist} . {song.album}</span>
          </div>
        </div>
        <div className="song-time">
  
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <i className="fa fa-ellipsis-h" aria-haspopup="true" aria-controls="dropdown-menu3" ></i>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
              <div className="dropdown-content">
                <a href="#" className="dropdown-item" onClick={() => this.showPlaylistModal(song)}>
                  Add to Playlist
                      </a>
                {song.favoritedSong ?
                  <a href="#" className="dropdown-item" onClick={() => favoritedSongs.removeFavoritesSong(song,this.props)}>
                    Remove Favorited Songs From Library
                      </a>
                  :
                  <a href="#" className="dropdown-item" onClick={() => favoritedSongs.addSongToFavorites(song,this.props)}>
                    Add to Favorited Songs
                      </a>
                }
  
              </div>
            </div>
          </div>
          <span>{song.duration * 60}</span>
  
        </div>
  
      </div>
  
    )
  }
  render() {
    let {showPlaylistModal} = this.state
    return (
      <div>
      <div className={showPlaylistModal ? 'modal is-active' : 'modal'}>
  <div className="modal-background"></div>
  <div className="modal-content">
    <div className="columns">
    {this.state.playlists.map(playlist=>{
      return (
        <div className="column is-4" key={playlist.id}>
          <div className="playlist-container">
            <div className="playlist" onClick={(() => this.addSongToPlaylist(playlist))}>
        <Image image={playlist.songs.length > 0  ? playlist.songs[0].albumm.artwork : null}   />
        <span>{playlist.name}</span>
        <span>{playlist.songs.length} Songs </span>
        </div>
        </div>
        </div>
      )
    })}
    </div>
    </div>
  <button className="modal-close is-large" onClick={this.showPlaylistModal} aria-label="close"></button>

      </div>
      
    
    <div id="songs">
      {this.props.songs.map((song, index) => {
        return (
          <div key={song.id}  >
            {this._renderView(song, index)}
          </div>
  
        )
      })}
  
    </div>
    </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SongList);