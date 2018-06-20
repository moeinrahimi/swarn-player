import React, { Component } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import config from '../../constants/config'
import './style.css'
class Settings extends Component{
  constructor(props){
    super(props)
    this.state = {
      newDir : '',
      settings : [],
    }
  }
  _dir = (e)=>{
    let newDir = e.target.value
    this.setState({newDir : newDir})
  }
  _saveDirectory = async () =>{
    try{
    let {data} = await axios({
      method : 'post',
      url : config.baseURL + 'settings',
      data : {newDir:this.state.newDir}
    });

      if(data.success == true){ 
      this.setState({
        settings:[...this.state.settings,data.newDir],
      });
      this.props.getMusicDirs()
    }
  }catch(e){
      console.log(e.data.message)
      toast.error(e.data.message) 
    }
  
  }
_getSettings = () => {

  axios({
    method : 'get',
    url : config.baseURL + 'settings',
  }).then(res=>{
    // console.log(res.data)
    this.setState({
      settings : res.data.settings
    })
  })
}
componentDidMount= ()=>{
  this._getSettings()
}
_renderDirectories = ()=>{
  return (
    this.state.settings.map((setting,index)=>{
      return (
        <div>
        <p key={index}>{setting.path}
         <i className='mdi mdi-minus-circle' onClick={()=>this._removeDir(setting,index)}></i>
        </p>
        
        </div>
      )
      
    })
  )
}
_removeDir =  async (dir) =>{
  console.log(dir)
  try{
  let {data} = await axios({
    url :  config.baseURL + `settings/${dir.id}`,
    method : 'delete',
  })
  console.log(data)
  if(data.success == true){
    let settings = this.state.settings 
    let index = settings.indexOf(dir)
    settings.splice(index,1)
    console.log(settings)
    this.setState({settings:settings})
  }
}catch(e){
  console.log(e)
  toast('error while trying to remove directory') 
}
}
  render(){
    let {show,onClick} = this.props
    return (
      <div className={'modal fade ' + (show == true ? 'showModal' : '') } id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Song Path</h5>
            <button type="button" className="close" onClick={onClick } data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
                  <div className="form-group">
            <label for="exampleInputEmail1">Song Directory</label>
            <input type="text" className="form-control" id="songPath" placeholder="D:/musics" onChange={(e) => this._dir(e)}/>
            <small id="emailHelp" className="form-text text-muted">must be an absolute path on your device which music-player is running on it</small>
              </div>
              <div id="added-dirs">
              {this._renderDirectories()}
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClick }>Close</button>
            <button type="button" className="btn btn-primary" onClick={this._saveDirectory}>add directory</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
  
}
export default Settings