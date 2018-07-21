import { Link } from 'react-router-dom';
import { connect } from "react-redux";

        import React, { Component } from 'react';
        import config from '../../constants/config'
        const mapStateToProps = state => {
          return { articles: state.articles };
        };
        
        let noArtworkImage = config.baseURL + 'default.jpg'
       class Albums extends Component {
         componentDidMount(){
         }
         play(album,i,isPlaying){
           console.log(this.props)
           if(isPlaying)
           return this.props.TogglePlay()
          this.props.playAlbum(album, i)
         }
          _renderView = (album,index)=>{
            let isPlaying = this.props.isPlaying
            let currentSong = this.props.currentSong
            let condition = isPlaying && currentSong.albummId == album.id
           return (
              <div className="column is-2">
            
              
            <div className={ condition ? ' music-thumb-active'  : 'music-thumb'} onClick={e=> this.play(album,index,condition)}>            
              <img src={album.artwork ? config.baseURL + album.artwork : noArtworkImage} alt="" />
            <div className={condition ? "thumb-overlay-active" : "thumb-overlay"}>
              <i className={condition ? " fa fa-pause-circle":"fa fa-play-circle"}></i>
            </div>
        </div>
        <div className="music-caption">
        <Link to={{ pathname: `/${album.id}`}}>{album.title}</Link>
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
          <div  key={album.id}  > 
            {this._renderView(album,index)}
          </div>
        )
          })}              
          </div>
          </div>
        
        </div>
        )
          }
        }
export default connect(mapStateToProps) (Albums)