import React, { Component } from 'react';
import CollectionPageNavs from '../../components/CollectionPageNavs';
import SongList from '../../components/SongList';
import request from '../../helpers/request';
import { toast } from 'react-toastify';
import { Switch,BrowserRouter as Router, Route, Link,IndexRoute } from "react-router-dom";


import {playPlaylist,setTitle,togglePlay} from '../../helpers/player';
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
  song:state.song,
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
class FavoritedSongs extends Component{
  constructor(props){
    super(props)
    this.state = {
      songs : [],
    }
  }
  async componentDidMount(){
    let favorited = await request.favoritedSongs()
    console.log(favorited)
    this.setState({songs : favorited.favorites})
    
  } 
  togglePlaylistModal() {
    this.setState({
      playlistModal:!this.state.playlistModal
    })
  }

 
  render(){
    let {songs} = this.state
    return (
      <div>

        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <CollectionPageNavs />
        
        </div>
        
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
          <SongList songs={songs}  />
          </div>
        </div>
        
      </div>
     
    )
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoritedSongs);
