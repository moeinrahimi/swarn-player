import React, { Component } from 'react';
import Image from '../../components/Image';
import Sound from 'react-sound';

import axios from 'axios'
import config from '../../constants/config'
import request from '../../helpers/request'
import {playPlaylist,setTitle} from '../../helpers/player';
import { setCurrentSong ,setSongDetails,setIsPlaying,setSongs,setCurrentPlaylist,setPlaylist} from "../../redux/albums/actions/index";
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
  currentPlaylist : state.currentPlaylist,
  playlist : state.playlist,
};
};
const mapDispatchToProps = dispatch => {
return {
  setSongDetails: albums => dispatch(setSongDetails(albums)),
  setCurrentSong: song => dispatch(setCurrentSong(song)),
  setIsPlaying: song => dispatch(setIsPlaying(song)),
  setSongs: songs => dispatch(setSongs(songs)),
  setCurrentPlaylist: album => dispatch(setCurrentPlaylist(album)),
  setPlaylist: album => dispatch(setPlaylist(album)),

};
};
class Collection extends Component{
  constructor(props){
    super(props)
    this.state = {
      songs : [],
      playlist : {}
    }
  }
   componentDidMount(){
    // console.log(this.props,'play')
    const {currentPlaylist} = this.props
    let playlistId = this.props.match.params.id
   axios(`${config.baseURL}playlists/${playlistId}`)
   .then(data=>{
    console.log(data,'0aaa')
    // this.props.setSongs(data.data.songs)
     this.setState({songs : data.data.songs,playlist : data.data.playlist })
    // this.props.setPlaylist(data.data.playlist)
   })
    
    
  } 
  async playPlaylist(songs,index){
    let isPlaying = this.props.isPlaying && this.state.playlist.id == this.props.match.params.id
    if(isPlaying)
    return this.props.TogglePlay()
    
  let song = songs[0]
  this.props.setCurrentSong(song)        
  this.props.setSongs(songs)        
  this.props.setCurrentPlaylist(this.state.playlist)
  setTitle(song)
  let songUrl = song.fullPath
  songUrl = `${config.baseURL}songs/play?path=${encodeURIComponent(songUrl)}`
  this.props.setSongDetails({
      songURL: songUrl,
      playingStatus: Sound.status.PLAYING,
      songIndex: 0,
      songId: song.id,
    
  })
  this.props.setIsPlaying(1)
  
  }
  async playSingleSong(song,i){
    this.props.setCurrentSong(song)
    this.props.setSongs(this.state.songs)     
    setTitle(song)
    let songUrl = song.fullPath
    songUrl = `${config.baseURL}songs/play?path=${encodeURIComponent(songUrl)}`
    this.props.setSongDetails({
        songURL: songUrl,
        playingStatus: Sound.status.PLAYING,
        songIndex: i,
        songId: song.id,
      
    })
    this.props.setIsPlaying(1)
    this.props.setCurrentPlaylist(this.state.playlist)
  
  }
  _renderView(){
    return (
      <div>

      </div>
    )
  }


  _renderView(song){
    return (
         
                <div className="song">
                <div className="song-icon">
                <i className="fa fa-music"></i>
                </div>
                <div className="song-info">
                <span>{song.title}</span>
                <span>{song.artist} . {song.album}</span>
                </div>

                <div className="song-time">
                <span>{song.duration * 60}</span>
                </div>

              </div>

    )
  }
  render(){
    let {currentPlaylist} = this.props
    let {songs,playlist} = this.state
    // console.log(playlist,'a',songs)
    
    return (
    <div id="special-music-wrapper">
        <div className="columns">
          <div className="column is-4">
            <div id="album-container">
              <div id="album-info">
              <Image image={songs.length >0 ? songs[0].albumm.artwork : ''}  />
                <div id="album-title">
                <h2>{playlist.title}</h2>
                </div>
                <div id="album-description">
                <p>We made you a personalized playlist with songs to take you back in time.</p>
                </div>
                <div id="album-songs-count">
                <p>{this.props.songs.length} SONGS</p>
                </div>
                <div id="album-play-btn">

                <a href="#" onClick={()=>this.playPlaylist(songs)} className="button is-success">{currentPlaylist.id == this.props.match.params.id && this.props.isPlaying ? 'PAUSE' :'PLAY'}</a>
                </div>
              </div>
              
            </div>
            
          </div>
          <div className="column">
            <div id="songs" >
              {songs.map((song,index)=>{
                return (
                  <div  key={song.id}  onClick={()=>this.playSingleSong(song,index)} > 
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
export default connect(mapStateToProps, mapDispatchToProps)(Collection);
