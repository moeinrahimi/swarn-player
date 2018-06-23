import React, { Component } from 'react';
import './style.css'
export default class Player extends Component {
  constructor(props){
    super(props)
    this.state = {

    
    elapsed: '00:00',
    total: '00:00',
    position: 0,
  }
  }
  
  setEplapsed = (elapsed,total,position)=>{
    console.log(elapsed,total,position)
        this.setState({
      elapsed: elapsed,
      total: total,
      position: position
    })
  }
  render(){
     const {audio,isPlaying,song}=this.props
     const {position,total,elapsed} = this.state
     let progressBar = (audio.position/audio.duration) * 100 

    return (
      <div id="player"> 
      
        <button title="shuffle all" onClick={this.props.shuffle} className="flaticon-arrows-2"></button>

        <button  title="prev" onClick={this.props.PreviousSong} className="flaticon-arrows"></button>
        <button title="play" onClick={this.props.TogglePlay} className={(isPlaying == 1 ? 'flaticon-pause-button' : ' flaticon-play-button')}></button>
        <button title="next"  onClick={this.props.NextSong} className="flaticon-arrows-1"></button>
        {/* <button title="repeat"  className="flaticon-update-arrow"></button> */}
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