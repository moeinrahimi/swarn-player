import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { setAlbums,setCurrentSong ,setSongDetails,setIsPlaying,setSongs,setAlbum,setCurrentAlbum} from "../../redux/albums/actions/index";

import {play,togglePlay} from '../../helpers/player';
import request from '../../helpers/request'


        import React, { Component } from 'react';
        import config from '../../constants/config'
        const mapStateToProps = state => {
          return { song: state.song,
          songs:state.songs,
          songURL:state.songURL,
          playingStatus:state.playingStatus,
          songIndex:state.songIndex,
          isPlaying:state.isPlaying,
          songId:state.songId,
          audio:state.audio,
          shuffle:state.shuffle,
          currentAlbum : state.currentAlbum,
          song : state.song,

        };
        };
        const mapDispatchToProps = dispatch => {
        return {
          setAlbums: albums => dispatch(setAlbums(albums)),
          setSongDetails: albums => dispatch(setSongDetails(albums)),
          setCurrentSong: song => dispatch(setCurrentSong(song)),
          setIsPlaying: song => dispatch(setIsPlaying(song)),
          setSongs: songs => dispatch(setSongs(songs)),
          setAlbum: album => dispatch(setAlbum(album)),
          setCurrentAlbum: album => dispatch(setCurrentAlbum(album)),
        };
        };
        
        let noArtworkImage = config.baseURL + 'default.jpg'
       class Albums extends Component {
         componentDidMount(){
         }

        playAlbum = async (album) => {
          request.createHistory(this.props.songId,album.id)
          return play(album,this.props)
        }
      
         play(album,i,isPlaying){
           console.log(isPlaying , Object.keys(this.props.song).length > 0)
           if(isPlaying &&  Object.keys(this.props.song).length > 0)
           return togglePlay(this.props)
          this.playAlbum(album, i)
         }
          _renderView = (album,index)=>{
            let isPlaying = this.props.isPlaying
            let currentSong = this.props.song
            let condition = isPlaying && currentSong.albummId == album.id
            let toggleCondition =  currentSong.albummId == album.id
            
           return (
              <div className="column is-2">  
            <div className={ condition ? ' music-thumb-active'  : 'music-thumb'} onClick={() => this.play(album,index,toggleCondition)}>            
              {/* <img src={ noArtworkImage} alt="" /> */}
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
export default connect(mapStateToProps,mapDispatchToProps) (Albums)