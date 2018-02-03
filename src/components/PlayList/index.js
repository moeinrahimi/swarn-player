import React, { Component } from 'react';
import './style.css'
export default class PlayList extends Component {
  render(){
	
  let {song,songIndex,isPlaying} = this.props
    return (
      <li key={this.props.key} onClick={e=>this.props.onClick(this.props.song,this.props.index)} className={isPlaying == 1  &&  this.props.id === this.props.songId ? 'active' : ''}>
      	<i className={'mdi ' + (isPlaying === 1 && this.props.songId === this.props.id  ? 'mdi-pause-circle-outline' : 'mdi-play ' )}></i>
      	<span className="title">{song.title ? song.title : 'Unknown Song'}</span>
      	{/* <span className="album"><strong><i>album : </i></strong> {song.album ? song.album : ''}</span> */}
        {/* <span className="genre"><strong><i>genre : </i></strong>[{song.genre ? song.genre[0] : ''}]</span> */}
        
      	<span className="artist"><strong><i>artist : </i></strong>{song.artist ? song.artist : 'Unknown Artist'}</span>
      </li>
    )
  }
}           