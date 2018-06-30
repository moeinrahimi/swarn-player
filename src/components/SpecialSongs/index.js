
        import React, { Component } from 'react';
        import config from '../../constants/config'
        let noArtworkImage = config.baseURL + 'default.jpg'
        export default class Song extends Component {
          _renderView = (song)=>{
           return (
              <div className="column is-2">
            
            
            <div className="music-thumb">            
              <img src={song.artwork ? config.baseURL + song.artwork : noArtworkImage} alt="" />
            <div className="thumb-overlay">
              <i className="fa fa-play-circle "></i>
            </div>
        </div>
        <div className="music-caption">
              <span >{song.title}</span>
        </div>   
      </div>
           )
      }
          render(){
          return (
          <div id="special-music-wrapper">
          <div className="main-header-title">
            <h1>{this.props.title}</h1>  
          </div>
        
          <div className="columns">        
            <div className="music-container">
            {this.props.songs.map((song,index)=>{ 
        return (
          <div  onClick={e=>this.props.playSong(song, index)}  key={song.id}  > 
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