import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Image from '../../components/Image';

import axios from 'axios'
import {albumSongs,getAlbum} from '../../helpers/request'
import '../../assets/css/albumPage.css'
import { setAlbums,setCurrentSong ,setSongDetails,setIsPlaying,setSongs,setAlbum} from "../../redux/albums/actions/index";
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
};
};
const mapDispatchToProps = dispatch => {
return {
  setAlbums: albums => dispatch(setAlbums(albums)),
  setSongDetails: albums => dispatch(setSongDetails(albums)),
  setCurrentSong: song => dispatch(setCurrentSong(song)),
  setIsPlaying: song => dispatch(setIsPlaying(song)),
  setSongs: songs => dispatch(setSongs(songs)),
  setAlbum: album => dispatch(setAlbum(album))
};
};
class AlbumPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      songs : [],
      album : {}
    }
  }
  async componentDidMount(){
    console.log(this.props,albumSongs)
    let albumId = this.props.match.params.id
    let songs = this.props.songs
    let song = this.props.song
    if(!songs || !this.props.album || song.albummId != albumId){
     let  songs = await albumSongs(albumId)
      let album = await getAlbum(albumId)
      this.props.setSongs(songs.songs)
      this.props.setAlbum(album.album)
      
    }
    
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
    const {album} = this.props
    return (
      <div id="special-music-wrapper">
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
                <p>{this.props.songs.length} SONGS</p>
                </div>
                <div id="album-play-btn">
                <a href="#" className="button is-success">{album.id == this.props.song.albummId && this.props.isPlaying ? 'PAUSE' :'PLAY'}</a>
                </div>
                
              </div>
              
            </div>
            
          </div>
          <div className="column">
            <div id="songs" >
              {this.props.songs.map((song,index)=>{
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
