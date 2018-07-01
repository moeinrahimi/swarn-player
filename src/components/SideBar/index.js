import React, { Component } from 'react';

export default class SideBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }

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
        <a className="link" href="#">Dorothy</a>
        <span className="type">Artist</span>
        <a className="link" href="#">Eminem</a>
        <span className="type">Artist</span>
        <a className="link" href="#">Ellie Goulding</a>
        <span className="type">Artist</span>
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