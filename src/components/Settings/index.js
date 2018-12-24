import React, { Component } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import config from '../../constants/config'
import './style.css'
import * as socketActions from "../../redux/socket/actions/index";
import store from '../../redux/store'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";





const mapStateToProps = state => {
    return {
        newSongInfo: state.socketReducer.newSongInfo
    };
};
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...socketActions }, dispatch),
   
    };
};
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
      if(data.message_id == 0){
        await axios({
          method : 'post',
          url : config.baseURL + 'songs/index',
          data : {directoryId:data.newDir.id}
        });
        this.props.getMusicDirs()
      }
        
    }
  }catch(e){
      console.log(e)
      toast.error('something went wrong ,  try again') 
    }
  
  }
_getSettings = () => {

  axios({
    method : 'get',
    url : config.baseURL + 'settings',
  }).then(res=>{
    this.setState({
      settings : res.data.settings
    })
  })
}
componentDidMount= ()=>{
  this._getSettings()
}
toggleModal= ()=>{
  this.setState({
    show : !this.state.show
  })
}
_reIndex = (id) => {
  console.log('reindex called')
  this.props.actions.syncSongs(id)
  let toastId
  store.subscribe(() => {
      let song = store.getState().socketReducer
      let message = `new song added :  ${song.newSongInfo.song} - ${song.newSongInfo.counter} `
      if(toast.isActive(toastId)){
        
        toast.update(toastId,{
          render: message
        })
      }else{
        
        toastId = toast(message, { toastId: toastId })
        
      }

  })
  this.setState({
    show : !this.state.show
  })
}
_renderDirectories = ()=>{
  return (
    this.state.settings.map((setting,index)=>{
      return (
        <div key={setting.id}>
        <p >{setting.path}
         <i className='fa fa-minus-round' onClick={()=>this._removeDir(setting,index)}></i>
         <i className='fa fa-minus-round' onClick={()=>this._reIndex(setting.id)}>REINDEX</i>
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
    let {show} = this.state
    return (
      <div className={show ? 'modal is-active' : 'modal'}>
  <div className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Modal title</p>
      <button className="delete" aria-label="close" onClick={() => this.toggleModal()}></button>
    </header>
    <section className="modal-card-body">
    <div className="field">
  <label className="label">Add Song Path</label>
  <div className="control">
    <input className="input" type="text" placeholder="D:/musics"  onChange={(e) => this._dir(e)} />
    </div>
    </div>
    {this._renderDirectories()}
    </section>
    <footer className="modal-card-foot">
      <button className="button is-success" onClick={this._saveDirectory}>add directory</button>
    </footer>
  </div>
</div>
     
    )
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Settings);
// export default Settings