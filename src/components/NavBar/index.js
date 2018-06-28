import React, { Component } from 'react';
export default class NavBar extends Component {
  render(){
    return (
      <nav>
        <a className="link active-link" href="">FEATURED</a> 
        <a className="link" href="">PODCASTS</a> 
        <a className="link" href="">GENRES & MOODS</a> 
        <a className="link" href="">NEW RELEASES</a> 
        <a className="link" href="">DISCOVER</a> 
      </nav>
    )
  }
}           
