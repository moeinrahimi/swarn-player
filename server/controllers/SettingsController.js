const path = require('path')
const fs =require('fs')
const {  getConfig , getDirFiles , getArtwork , getMusicMeta,findSongs} = require('../helpers/song')
const SettingsRouter = require('express').Router()

let configPath = path.resolve(__dirname,'../config.json')
SettingsRouter.post('/',saveDir)
SettingsRouter.get('/',getDirs)
SettingsRouter.delete('/',deleteDir)
async function saveDir(req,res,next){
    try{
      console.log(req.body)
      // return
      let dir = req.body.newDir
      let config = JSON.parse(getConfig())
      fs.lstatSync(dir).isDirectory() // check if directory is directory
        
      if(config.dirs.includes(dir)){
        return res.status(400).json({success:false,message_id:3,message:'directory already exists' })
      }
      config.dirs.push(dir)
      fs.writeFileSync(configPath,JSON.stringify(config))

    return res.status(200).json({success: true,message_id: 0,message: 'new directory added successfully'})
    }catch(error){
      console.log(error)
      if(error.code == 'ENOENT'){
        return res.status(400).json({success:false,message_id:4,message:'not a valid directory' })

      }
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
}
async function getDirs(req,res){
  try{
    let {dirs} = JSON.parse(getConfig())
    return res.status(200).json({success:true,message_id:0,settings:dirs })
  }catch(e){
    console.log(e)
    return res.status(name).json({success:status,message_id:0,message:'something bad happened' })
  }
}
async function deleteDir(req,res,next){
    try{
      let dir = req.body.dir
      let config = JSON.parse(getConfig())
      console.log(config.dirs[dir],'dasssssssssssss')
      let index = config.dirs.indexOf(dir)
       config.dirs.splice(index,1)
      fs.writeFileSync(configPath,JSON.stringify(config))
    return res.status(200).json({success: true,message_id: 0,message: 'directory deleted successfully'})
    }catch(error){
      console.log(error)
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
}
module.exports = SettingsRouter