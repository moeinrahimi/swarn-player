import React, { Component } from 'react';
import request from '../../helpers/request'
import { connect } from "react-redux";
import {  Link } from "react-router-dom";
const mapStateToProps = state => {
  return { song: state.song,
  playingStatus:state.playingStatus,
  isPlaying:state.isPlaying,
  currentAlbum : state.currentAlbum,
  songs : state.songs,
};
}
 class SideBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      histories : []
    }

  }
  async componentDidMount(){
    let histories = await request.getHistory()
    this.setState({histories : histories.histories})
  }
  renderHistory(history,i){
    let icon
    if(this.props.isPlaying && this.props.currentAlbum.id == history.albumId){
      icon = <i className=" fa fa-volume-up"/>
    }
    return (
      <div key={history.id}>
      <a className="link" href={`/${history.album.id}`}>{history.album.title} {icon}</a>
        <span className="type">Album</span>
        </div>
    )
  }
  render(){
    return (
         <div id="sidebar-container">
               
    <div className="sidebar">
      <div id="sidebar-logo">
        <img src="./assets/spotify-logo.png" alt="" />
      </div>
      <div id="sidebar-menu">
        <div className="sidebar-menu-data">
        <i className="fa fa-search"><a className="link" href="">Search</a></i>
        </div>
        <div className="sidebar-menu-data">
        <i className="fa fa-home"><a className="link" href="/">Home</a></i>
        </div>
        <div className="sidebar-menu-data" onClick={this.props.settingsModal}>
        <i className="fa fa-plus"><a className="link" href="#">Add Folder</a></i>
        </div>
        <div className="sidebar-menu-data" >
        <i className="fa fa-plus">
          <Link className="link" to={{ pathname: `/collection`}}>Your Library</Link>
          </i>
        </div>
      </div>
      <div id="recently-played">
        <span className="header-title link">RECENTLY PLAYED</span>
        {this.state.histories.map((history,i)=>{
           return this.renderHistory(history,i)
            
        })}

        
      </div>
      
      <div id="sidebar-profile">
        <div className="install">
        <i className="fa fa-arrow-alt-circle-down"><a className="link mrl-10" href="">Install App</a></i>
        </div>
      </div>
    </div>
    </div>
    )
  }
}

export default connect(mapStateToProps)(SideBar)