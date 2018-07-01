import React, { Component } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
class AlbumPage extends Component{
  constructor(props){
    super(props)
    this.state = {
    
    }
  }
  componentDidMount(){
    console.log(this.props)
    let albumId = this.props.match.params.id
  }
 
  render(){
    return (
      <div className="columns">
<div className="column">
  <h1>album songs</h1>
</div>
      </div>
     
    )
  }
  
}
export default AlbumPage