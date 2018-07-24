import React, { Component } from 'react';
    import { ToastContainer, toast } from 'react-toastify';

import Image from '../../components/Image';
import Sound from 'react-sound'
import axios from 'axios'
import config from '../../constants/config'
import request from '../../helpers/request'
import '../../assets/css/albumPage.css'
import {play,setTitle,togglePlay} from '../../helpers/player';
import { setAlbums,setCurrentSong ,setSongDetails,setIsPlaying,setSongs,setAlbum,setCurrentAlbum} from "../../redux/albums/actions/index";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { song: state.song,
  
  songURL:state.songURL,
  album:state.album,
  playingStatus:state.playingStatus,
  songIndex:state.songIndex,
  isPlaying:state.isPlaying,
  songId:state.songId,
  audio:state.audio,
  shuffle:state.shuffle,
  songs:state.songs,
  currentSongs : state.currentSongs,
  currentAlbum : state.currentAlbum,
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
class AlbumPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      songs : [],
      album : {},
      showPlaylistModal : false ,
      playlists : []
    }
  }
  async componentDidMount(){
    console.log('mounted')
    let albumId = this.props.match.params.id
    let currentAlbum = this.props.currentAlbum
    // if(currentAlbum.id != albumId){
      let  songs = await request.albumSongs(albumId)
      let album = await request.getAlbum(albumId)
      let {data} = await axios(`${config.baseURL}playlists`)
      // this.props.setSongs(songs.songs)
      // this.props.setAlbum(album.album)
      this.setState({
        songs : songs.songs ,
        album : album.album,
        playlists : data.playlists,
        songId : ''
      })
    // }
    
  } 
  playAlbum = async (album) => {
    
    let isPlaying = this.props.isPlaying && this.state.album.id == this.props.song.albummId
    if(isPlaying)
      return togglePlay(this.props)
    return play(album,this.props)
  }
  playSong = async (song,i) => {
    this.props.setCurrentSong(song)    
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

  _renderView(song,index){
    return (
         
                <div className="song">
                
                <div className="song-icon">
                <i className="fa fa-music"></i>
                </div>
                <div  onClick={()=>this.playSong(song,index)}>
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
                      <a href="#" className="dropdown-item" onClick={() =>this.showPlaylistModal(song)}>
                        Add to Playlist 
                      </a>
                      
    </div>
  </div>
</div>
                <span>{song.duration * 60}</span>
                
                </div>

              </div>

    )
  }
  render(){
    const {album,songs,showPlaylistModal} = this.state
    return (
      <div id="special-music-wrapper">
      <div className={showPlaylistModal ? 'modal is-active' : 'modal'}>
  <div className="modal-background"></div>
  <div className="modal-content">
    <div className="columns">
    {this.state.playlists.map(playlist=>{
      return (
        <div className="column is-4">
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
        <div className="columns">
          <div className="column is-4">
            <div id="album-container">
              <div id="album-info">
                <Image image={album.artwork}/>

                <div id="album-title">
                <h2>{album.title}</h2>
                </div>
                <div id="album-description">
                <p>We made you a personalized playlist with songs to take you back in time.</p>
                </div>
                <div id="album-songs-count">
                <p>{songs.length} SONGS</p>
                </div>
                <div id="album-play-btn">
                <a href="#" onClick={()=>this.playAlbum(album)} className="button is-success">{album.id == this.props.song.albummId && this.props.isPlaying ? 'PAUSE' :'PLAY'}</a>
                </div>
              </div>
              
            </div>
            
          </div>
          <div className="column">
            <div id="songs">
              {songs.map((song,index)=>{
                return (
                  <div  key={song.id}  > 
            {this._renderView(song,index)}
          </div>
             
                )
              })}
              
            </div>
          </div>

        </div>
      </div>
     
    )
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
