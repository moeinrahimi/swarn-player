import React, { Component } from 'react';
import { toast } from 'react-toastify';
import './style.css'
import request from './request'
import Albums from '../../components/Albums'

class Search extends Component{
  constructor(props){
    super(props)
    this.state = {
      results : [],
      
    }
  }
  _search(e){
    let q = e.target.value
     request.searchEverything(q)
    .then(result=>{
      this.setState({results:result.result})
    })
  }

  render(){
    let {results} = this.state
    return (
      <div>
      <div id={'search-modal-active'}>
        <div id="search-container">
          <div id="content">
           <input type="text" onChange={((e)=>this._search(e))} placeholder="Start Typing..."/>
           </div>
      </div>
        </div>
        <div className="column">
        <Albums 
        albums={results}
        title={'Results'}
        />
        </div>
      </div>
     
    )
  }
}
export default Search