import React, { Component } from 'react';
import './style.css'
export default class Player extends Component {

  render(){
     const {audio,position,total,elapsed,isPlaying,song}=this.props
     let progressBar = (audio.position/audio.duration) * 100 

    return (
      <div id="player"> 
      
        <button title="shuffle all" className="mdi mdi-shuffle-variant"></button>

        <button  title="prev" onClick={this.props.PreviousSong} className="mdi mdi-skip-previous-circle-outline"></button>
        <button title="play" onClick={this.props.TogglePlay} className={'mdi ' + (isPlaying == 1 ? 'mdi-pause-circle-outline' : ' mdi-play-circle-outline')}></button>
        <button title="next"  onClick={this.props.NextSong} className="mdi mdi-skip-next-circle-outline"></button>
        <button title="repeat"  className="mdi mdi-repeat"></button>
        <div>

        <div className="wrapper-progress">

            <span className="total">{total}</span>
          <span className="elapsed">{elapsed}</span>
        <div className="progress-music">
              <div className="progress" style={{width:progressBar + '%'}}></div>
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