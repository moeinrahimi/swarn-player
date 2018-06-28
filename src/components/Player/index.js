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
      <div className="columns">
        <div className="column is-2">
          <div id="currently-playing">
            <div id="currently-cover">
            <img src="https://i.scdn.co/image/687f24c44322827d1a255645e366c83f90cfbd0f" alt="" />
            </div>
            <div id="currently-text">
              <span><a href="" className="link">The One That Got Away</a></span>
              <h1>Francios Mulder</h1>
            </div>
            <div id="add-to-favaorite">
              <i className="fa fa-plus"></i>
            </div>
            
          </div>
        </div>
        <div className="column is-8">
          <div id="player-controller">
            <div id="player-controls">
                <i className="link fa fa-random"></i>
                  <i className="link fa fa-step-backward"></i>
                    <i className="link fa fa-play"></i>
                      <i className="link fa fa-step-forward"></i>
                        <i className="link fa fa-redo-alt"></i>
            </div>
            <div id="progress-bar-container">
              <span className="link">00:42</span>
              <div id="progress-bar">
                <div id="middle-bar">

                </div>
              </div>
              <span className="link">00:42</span>
            </div>
          </div>
        </div>
        <div className="column is-2">
          <div id="sound">
             <i className="link fa fa-volume-up"></i>
             <i className="link fa fa-volume-down"></i>
                    <i className="link fa fa-volume-off"></i>
                    <i className="link fa fa-volume-down"></i> 
                    <input type="range" min="1" max="100" value="50" className="volume-slider" />
          </div>
        </div>
      </div>
      
    </div>
    )
  }
}