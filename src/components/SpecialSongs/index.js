
        import React, { Component } from 'react';
        export default class Song extends Component {
          _renderView = (song)=>{
           return (
              <div className="column is-2">
            
            
            <div className="music-thumb">            
              <img src="https://lineup-images.scdn.co/YSR-2018_DEFAULT-en.jpg" alt="" />
            <div className="thumb-overlay">
              <i className="fa fa-play-circle "></i>
            </div>
        </div>
        <div className="music-caption">
              <span >Your Summer Rewind</span>
        </div>   
      </div>
           )
      }
          render(){
          return (
          <div id="special-music-wrapper">
          <div className="main-header-title">
            <h1>Made For Moein</h1>  
          </div>
        
          <div className="columns">        
            <div className="music-container">
            {this.props.songs.map((song,index)=>{ 
        return (
          <div  onClick={e=>this.props.playSong(song, index)}  key={song.key}  > 
            {this._renderView(song)}
          </div>
        )
    
          })} 
             
          </div>
  
         
          </div>
        
        </div>
        )
          }
        }