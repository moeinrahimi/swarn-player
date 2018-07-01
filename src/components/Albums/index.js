import {Redirect, Route, Link } from 'react-router-dom';


        import React, { Component } from 'react';
        import config from '../../constants/config'
        let noArtworkImage = config.baseURL + 'default.jpg'
        export default class Albums extends Component {
          _renderView = (album)=>{
            let isPlaying = this.props.isPlaying
            let currentSong = this.props.currentSong
            let condition = isPlaying && currentSong.albummId == album.id
           return (
              <div className="column is-2">
            
            
            <div className={ condition ? ' music-thumb-active'  : 'music-thumb'}>            
              <img src={album.artwork ? config.baseURL + album.artwork : noArtworkImage} alt="" />
            <div className={condition ? "thumb-overlay-active" : "thumb-overlay"}>
              <i className={condition ? " fa fa-pause-circle":"fa fa-play-circle"}></i>
            </div>
        </div>
        <div className="music-caption">
        <Link to={{ pathname: `/album/${album.id}`, state: {tester:'hosh'} }}>{album.title}</Link>
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
            {this.props.albums.map((album,index)=>{ 
        return (
          <div  onClick={e=>this.props.playSong(album, index)}  key={album.id}  > 
            {this._renderView(album)}
          </div>
        )
    
          })} 
             
          </div>
  
         
          </div>
        
        </div>
        )
          }
        }