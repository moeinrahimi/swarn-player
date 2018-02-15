import React, { Component } from 'react';
import './style.css'
export default class Player extends Component {

  render(){
     const {audio,position,total,elapsed,isPlaying,song}=this.props
     let progressBar = (audio.position/audio.duration) * 100 

    return (
      <div id="player"> 
        <button onClick={this.props.PreviousSong} className="mdi mdi-skip-previous-circle-outline"></button>
        <button onClick={this.props.TogglePlay} className={'mdi ' + (isPlaying == 1 ? 'mdi-pause-circle-outline' : ' mdi-play-circle-outline')}></button>
        <button onClick={this.props.NextSong} className="mdi mdi-skip-next-circle-outline"></button>
        <div>
        <span>{elapsed}</span>
        <div className="progress-music">
          
          <div className="progress" style={{width:progressBar + '%'}}>  
          </div>
          
        </div>
        </div>
        <div className="info-active-music">
          <span className="title">{song.title ? song.title : song.name}</span>
          <span className="album"> {song.artist ? song.artist : 'Unknown Artist'}</span>
          {/* <span className="genre">{song.genre ? `[ ${song.genre[0]} ]` : ''}</span> */}
        </div>
          
        
      </div>
    )
  }
}