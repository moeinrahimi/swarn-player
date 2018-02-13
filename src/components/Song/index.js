import React, { Component } from 'react';
import './style.css'
import config from '../../constants/config'
export default class Song extends Component {
  _renderView = (song)=>{
    let bg = {
      a:`rgb(${song.color['Vibrant'] ? song.color['Vibrant']._rgb.join(',') : ''})`,
      b:`rgb(${song.color['DarkMuted'] ? song.color['DarkMuted']._rgb.join(',') : ''})`,
      c:`rgb(${song.color['DarkVibrant'] ?  song.color['DarkVibrant']._rgb.join(',') : ''})`,
      d:`rgb(${song.color['LightMuted']? song.color['LightMuted']._rgb.join(',') : ''})`,
      e:`rgb(${song.color['LightVibrant'] ? song.color['LightVibrant']._rgb.join(',') : ''})`,
      f:`rgb(${song.color['Muted'] ? song.color['Muted']._rgb.join(',') : ''})`,
    }
    // console.log(song)
    return (
         <div className="music-box">
                <div className="music-cover" style={{'backgroundImage':`url("${config.baseURL}${song.artwork}")`}}>
                <div className="target a" style={{backgroundColor: bg.a}}></div>
                <div className="target b" style={{backgroundColor: bg.b}}></div>
                <div className="target c" style={{backgroundColor: bg.c}}></div> 
                <div className="target e" style={{backgroundColor: bg.e}}></div>
                 <div className="target a" style={{backgroundColor: bg.a}}></div> 
                <div className="target d" style={{backgroundColor: bg.d}}></div>
                <div className="target f" style={{backgroundColor: bg.f}}></div>
                </div>
            <div className="info-music" style={{'backgroundColor':bg.a}}>
              <a > {song.title}
              </a>  
            </div>
              </div>
    )
  }
  render(){
  return (
    <div id="music-list-container" className="row">
      {this.props.songs.map((song,index)=>{ 
        return (
          <div  onClick={e=>this.props.playSong(song, index)}  key={song.key}  className="col-sm"> 
            {this._renderView(song)}
          </div>
        )
    
      })} 
  </div>
)
  }
}