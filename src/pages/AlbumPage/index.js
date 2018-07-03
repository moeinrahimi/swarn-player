import React, { Component } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import {albumSongs} from '../../helpers/request'
class AlbumPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      // songs : []
    }
  }
  async componentDidMount(){
    console.log(this.props,albumSongs)
    let albumId = this.props.match.params.id
    // let songs = await albumSongs(albumId)
    // this.setState({
    //   songs : songs
    // })
  } 
render(){
    return (
      <div id="special-music-wrapper">>
        <h1>album songssssssssssssssssssssssssssssssssssssssssssssssss</h1>
        <h1>album songssssssssssssssssssssssssssssssssssssssssssssssss</h1>
        <h1>album songssssssssssssssssssssssssssssssssssssssssssssssss</h1>
        <h1>album songssssssssssssssssssssssssssssssssssssssssssssssss</h1>
      </div>
     
    )
  }
  
}
export default AlbumPage