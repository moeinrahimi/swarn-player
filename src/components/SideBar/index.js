import React, { Component } from 'react';
import request from '../../helpers/request'
import { connect } from "react-redux";

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
    console.log(this.props.currentAlbum , this.props.songs ,1111111111111 )
    if(this.props.currentAlbum.id == history.albumId){
      icon = 'hi'
    }
    return (
      <div>
      <a className="link" href="#">{history.album.title} {icon}</a>
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
        <i className="fa fa-home"><a className="link" href="">Home</a></i>
        </div>
        <div className="sidebar-menu-data" onClick={this.props.settingsModal}>
        <i className="fa fa-plus"><a className="link" href="#">Add Folder</a></i>
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