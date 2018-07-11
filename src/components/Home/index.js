import React, { Component } from 'react';
import NavBar from '../NavBar'
import Albums from '../Albums'
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { song: state.song,  folders:state.folders,
    songURL:state.songURL,
    playingStatus:state.playingStatus,
    songIndex:state.songIndex,
    isPlaying:state.isPlaying,
    songId:state.songId 
  };
};
class Home extends Component {
  componentDidMount(){
    console.log(this.props.isPlaying,'curr')
  }
  render(){
    return (
      <div>
      <NavBar/>
       
       <div  className="column">
       <Albums 
        albums={this.props.albums}
        currentSong={this.props.song}
        playAlbum={this.props.playAlbum}
        isPlaying={this.props.isPlaying}
        TogglePlay={this.props.TogglePlay}
        title={'Albums'}
        />
      <div className="column">
      <Albums                    
       albums={this.props.latestSongs}
       currentSong={this.props.song}
       playAlbum={this.playAlbum}
       isPlaying={this.props.isPlaying}
       TogglePlay={this.props.TogglePlay}
       title={'Recently Added Albums'}
       />
       </div>
      </div>
      </div>
    )
  }
}           
export default connect(mapStateToProps)(Home);
