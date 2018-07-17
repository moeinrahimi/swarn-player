import React, { Component } from 'react';
import Image from '../../components/Image';
import Sound from 'react-sound';
import { Switch,BrowserRouter as Router, Route, Link,IndexRoute } from "react-router-dom";
import PlaylistPage from '../PlaylistPage'
import axios from 'axios'
import config from '../../constants/config'
import request from '../../helpers/request'
import './style.css'
import {playPlaylist,setTitle} from '../../helpers/player';
import { setAlbums,setCurrentSong ,setSongDetails,setIsPlaying,setSongs,setCurrentPlaylist} from "../../redux/albums/actions/index";
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
};
};
const mapDispatchToProps = dispatch => {
return {
  setAlbums: albums => dispatch(setAlbums(albums)),
  setSongDetails: albums => dispatch(setSongDetails(albums)),
  setCurrentSong: song => dispatch(setCurrentSong(song)),
  setIsPlaying: song => dispatch(setIsPlaying(song)),
  setSongs: songs => dispatch(setSongs(songs)),
  setCurrentPlaylist: playlist => dispatch(setCurrentPlaylist(playlist)),

};
};
class Collection extends Component{
  constructor(props){
    super(props)
    this.state = {
      playlists : []
    }
  }
  async componentDidMount(){
    let {data} = await axios(`${config.baseURL}playlists`)
    this.setState({playlists : data.playlists})
    
  } 


  _renderPlaylists(playlist,index){
    let {isPlaying,currentPlaylist} = this.props
    let condition = isPlaying && currentPlaylist.id == playlist.id
    return (
      <div className="column is-2">
            <div className={condition ? ' music-thumb-active'  : 'music-thumb'} onClick={e=> playPlaylist(playlist,this.props,condition)}>            
              <Image image={playlist.songs[0].albumm.artwork}  />
            <div className={ condition ? "thumb-overlay-active" : "thumb-overlay"}>
              <i className={condition ? " fa fa-pause-circle":"fa fa-play-circle"}></i>
            </div>
        </div>
        <div className="music-caption">
        
        <Link to={{ pathname: `/collection/${playlist.id}`}}>{playlist.name}</Link>
        </div>   
      </div>
    )
  }
  render(){
    let {playlists} = this.state
    return (
      <div>
        <nav id="collection">
          <a className="link active-link" href="">PLAYLISTS</a> 
          <a className="link" href="">ALBUMS</a> 
        </nav>
        <div className="column">
        <div id="special-music-wrapper">
          <div className="main-header-title">
            <h1>{this.props.title}</h1>  
          </div>
        
          <div className="columns">        
            <div className="music-container">
            {playlists.map((playlist,index)=>{ 
        return (
          <div  key={playlist.id}  > 
            {this._renderPlaylists(playlist,index)}
          </div>
        )
          })}              
          </div>
          </div>
        
        </div>
        </div>
        
      </div>
     
    )
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(Collection);
