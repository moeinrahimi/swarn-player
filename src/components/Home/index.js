import React, { Component } from 'react';
import NavBar from '../NavBar'
import Albums from '../Albums'
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { song: state.song };
};
class Home extends Component {
  componentDidMount(){
    console.log(this.props.song,'curr')
  }
  render(){
    return (
      <div>
      <NavBar/>
       
       <div  className="column">
       <Albums 
        albums={this.props.albums}
        currentSong={this.props.song}
        playSong={this.props.playSong}
        isPlaying={this.props.isPlaying}
        title={'Albums'}
        />
      <div className="column">
      <Albums                    
       albums={this.props.latestSongs}
       currentSong={this.props.song}
       playSong={this.playSong}
       isPlaying={this.props.isPlaying}
       title={'Recently Added Albums'}
       />
       </div>
      </div>
      </div>
    )
  }
}           
export default connect(mapStateToProps)(Home);