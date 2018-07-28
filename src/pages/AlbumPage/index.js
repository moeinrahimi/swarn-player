import React, { Component } from 'react';
import Image from '../../components/Image';
import request from '../../helpers/request'
import '../../assets/css/albumPage.css'
import {play,setTitle,togglePlay} from '../../helpers/player';
import { setAlbums,setCurrentSong ,setSongDetails,setIsPlaying,setSongs,setAlbum,setCurrentAlbum} from "../../redux/albums/actions/index";
import { connect } from "react-redux";
import SongList from '../../components/SongList';
const mapStateToProps = state => {
  return {
    song: state.song,
    songURL:state.songURL,
    album:state.album,
    playingStatus:state.playingStatus,
    songIndex:state.songIndex,
    isPlaying:state.isPlaying,
    songId:state.songId,
    audio:state.audio,
    shuffle:state.shuffle,
    songs:state.songs,
    song:state.song,
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
    }
  }
  async componentDidMount(){
    console.log('mounted')
    let albumId = this.props.match.params.id
    let currentAlbum = this.props.currentAlbum
    // if(currentAlbum.id != albumId){
      let  songs = await request.albumSongs(albumId)
      let album = await request.getAlbum(albumId)
      // this.props.setSongs(songs.songs)
      // this.props.setAlbum(album.album)
      this.setState({
        songs : songs.songs ,
        album : album.album,
        songId : ''
      })
    // }
    
  } 
  playAlbum = async (album) => {
    
    let isPlaying = Object.keys(this.props.song).length > 0 && this.state.album.id == this.props.song.albummId
    if(isPlaying)            

      return togglePlay(this.props)
    return play(album,this.props)
  }


  
  render(){
    const {album,songs} = this.state
    return (
      <div >
      
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
                <p>{songs.length} SONGS</p>
                </div>
                <div id="album-play-btn">
                <button onClick={()=>this.playAlbum(album)} className="button is-success">{album.id == this.props.song.albummId && this.props.isPlaying ? 'PAUSE' :'PLAY'}</button>
                </div>
              </div>
              
            </div>
            
          </div>
          <div className="column">
            <SongList songs={songs} />
          </div>

        </div>
      </div>
      </div>
    )
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
